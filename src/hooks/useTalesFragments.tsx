'use client'

import { useEffect } from 'react'

import { beginTaleStory, continueTaleStory } from '@/actions/tales'
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
    setPrevGenre
  } = useTalesFragmentsContext()

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

  const restartTales = () => {
    setFragments([])
    setMessages([])
    setIsLoadingFragment(true)
    setPrevGenre(null)
  }

  const startTale = async (genre: string | null) => {
    if (genre === null || genre === prevGenre) return
    restartTales()
    try {
      const response = await beginTaleStory(genre)
      setPrevGenre(genre)
      const { messages, ...rawFragment } = response
      setFragments([{ ...rawFragment, choiceSelectedIndex: null }])
      setMessages(messages)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingFragment(false)
    }
  }

  const continueStory = async (choice: string) => {
    setIsLoadingFragment(true)

    try {
      const response = await continueTaleStory({
        messages,
        choice
      })

      const { messages: responseMessages, ...rawFragment } = response
      setFragments(prev => [
        ...prev,
        { ...rawFragment, choiceSelectedIndex: null }
      ])
      setMessages(responseMessages)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingFragment(false)
    }
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
    prevGenre
  }
}
