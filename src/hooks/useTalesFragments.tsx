'use client'

import { useEffect } from 'react'

import { beginTaleStory, continueTaleStory } from '@/actions/tales'
import { useSettings } from '@/hooks/useSettings'
import { useTalesFragmentsContext } from '@/providers/context/tales-fragments-context'

export default function useTalesFragments () {
  const {
    fragments,
    setFragments,
    messages,
    setMessages,
    isLoadingFragment,
    setIsLoadingFragment,
    prevGenre,
    setPrevGenre,
    isError,
    setIsError
  } = useTalesFragmentsContext()

  const { selectedVoiceIndex } = useSettings()

  useEffect(() => {
    if (fragments.length <= 1) return

    let scrollToHeight = 0

    if (isLoadingFragment) {
      const loaderFragment =
        document.querySelector<HTMLDivElement>('.fragment-loader')
      scrollToHeight = loaderFragment?.offsetTop ?? 0
    } else {
      const lastFragment = document.querySelector<HTMLDivElement>(
        '.fragment-item:last-child'
      )
      scrollToHeight = lastFragment?.offsetTop ?? 0
    }
    window.scrollTo({
      top: scrollToHeight,
      behavior: 'smooth'
    })
  }, [fragments.length, isLoadingFragment])

  useEffect(() => {
    window.speechSynthesis.addEventListener('', () => {})
  }, [])

  const restartTales = () => {
    setFragments([])
    setMessages([])
    setIsLoadingFragment(true)
    setPrevGenre(null)
    setIsError(false)
  }

  const startTale = async (genre: string | null) => {
    if (genre === null || genre === prevGenre) return
    restartTales()
    try {
      const response = await beginTaleStory(genre)
      setPrevGenre(genre)
      const { messages, ...rawFragment } = response
      setFragments([
        { ...rawFragment, choiceSelectedIndex: null, isPlaying: false }
      ])
      setMessages(messages)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoadingFragment(false)
    }
  }

  const continueStory = async (choice: string) => {
    setIsLoadingFragment(true)
    setIsError(false)
    try {
      const response = await continueTaleStory({
        messages,
        choice
      })

      const { messages: responseMessages, ...rawFragment } = response
      setFragments(prev => [
        ...prev,
        { ...rawFragment, choiceSelectedIndex: null, isPlaying: false }
      ])
      setMessages(responseMessages)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoadingFragment(false)
    }
  }

  const playSpeechTale = (taleIndex: number) => {
    const cloneTalesFragments = structuredClone(fragments)
    const foundFragment = cloneTalesFragments[taleIndex]

    if (foundFragment == null) return

    const newFragments = cloneTalesFragments.map((fragment, index) => {
      if (index === taleIndex) {
        return {
          ...fragment,
          isPlaying: true
        }
      }
      return {
        ...fragment,
        isPlaying: false
      }
    })

    setFragments(newFragments)
    window.speechSynthesis.cancel()

    let addMessage = ''
    const joinChoices = foundFragment.choices.join('. ')

    if (foundFragment.choiceSelectedIndex !== null) {
      addMessage = `${
        foundFragment.choices[foundFragment.choiceSelectedIndex]
      }. `
    } else {
      addMessage = `Escoge una opción para continuar la historia. ${joinChoices}`
    }

    const messageToRead = `${foundFragment.message}\n ${addMessage}`
    const utterance = new SpeechSynthesisUtterance(messageToRead)
    const voices = speechSynthesis.getVoices()
    utterance.voice = voices[selectedVoiceIndex]
    window.speechSynthesis.speak(utterance)
    utterance.onend = () => {
      const finishedReadFragments = fragments.map(fragment => ({
        ...fragment,
        isPlaying: false
      }))
      setFragments(finishedReadFragments)
    }
  }

  const stopSpeechTale = (taleIndex: number) => {
    const foundFragment = fragments[taleIndex]

    if (foundFragment == null || !foundFragment.isPlaying) return

    setFragments(prev => [
      ...prev.map((fragment, index) => {
        if (index === taleIndex) {
          return {
            ...fragment,
            isPlaying: false
          }
        }
        return fragment
      })
    ])

    window.speechSynthesis.cancel()
  }

  return {
    fragments,
    setFragments,
    messages,
    setMessages,
    isLoadingFragment,
    setIsLoadingFragment,
    restartTales,
    startTale,
    continueStory,
    prevGenre,
    playSpeechTale,
    stopSpeechTale,
    isError
  }
}
