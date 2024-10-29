'use client'

import { useEffect } from 'react'

import LoadingStoryFragment from '@/components/loaders/story-fragment-loader'
import { StoryFragment } from '@/components/tales/fragments'
import useStepsTales from '@/hooks/useStepsTales'
import useTalesFragments from '@/hooks/useTalesFragments'

export default function TalesCreation () {
  const {
    isLoadingFragment,
    setFragments,
    fragments,
    startTale,
    continueStory,
    prevGenre,
    restartTales,
    playSpeechTale,
    stopSpeechTale
  } = useTalesFragments()
  const { genre } = useStepsTales()

  useEffect(() => {
    if (prevGenre !== genre) {
      restartTales()
    }

    startTale(genre)
  }, [genre])

  const handleSelectChoice = (index: number) => (choiceIndex: number) => {
    const newFragments = structuredClone(fragments)
    newFragments[index].choiceSelectedIndex = choiceIndex
    setFragments(newFragments)
    continueStory(newFragments[index].choices[choiceIndex])
  }

  const isFirstMessageCreating = fragments.length === 0

  return (
    <div className='container mt-8 min-h-[70dvh] px-3 lg:px-6'>
      <ol className='relative border-s border-gray-500 dark:border-gray-700'>
        {fragments.map((fragment, index) => (
          <StoryFragment
            key={index}
            fragment={fragment}
            onSelectChoice={handleSelectChoice(index)}
            playSpeechTale={() => {
              playSpeechTale(index)
            }}
            stopSpeechTale={() => {
              stopSpeechTale(index)
            }}
          />
        ))}
      </ol>

      {isLoadingFragment && (
        <LoadingStoryFragment
          placeholder={
            isFirstMessageCreating
              ? 'Creando tu historia...'
              : 'Continuando tu historia...'
          }
        />
      )}
    </div>
  )
}
