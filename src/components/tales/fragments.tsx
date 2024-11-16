'use client'

import { Button, Input, Tooltip } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleStop, SendHorizonal, Star, Volume2 } from 'lucide-react'
import { useState } from 'react'

import { type FragmentTypeWithSelection } from '@/types'
import { cn } from '@/utils/cn'
import { ShowGenerateImageButton } from '@/components/tales/actions'
import GenerateImage from '@/components/tales/generate-image'

import AnimatedAccordion from '../animations/animate-accordion'

interface StoryFragmentProps {
  fragment: FragmentTypeWithSelection
  onSelectChoice: (choiceIndex: number) => void
  playSpeechTale: () => void
  stopSpeechTale: () => void
  onCreateChoice: (choice: string) => void
}

export function StoryFragment ({
  fragment,
  onSelectChoice,
  playSpeechTale,
  stopSpeechTale,
  onCreateChoice
}: StoryFragmentProps) {
  const { message, choiceSelectedIndex, choices } = fragment
  const [hideForm, setHideForm] = useState(false)
  const [value, setValue] = useState('')
  const [isAccordionOpen, setIsAccordionOpen] = useState(true)

  const getIsChoiceSelected = (choice: string) => {
    const originalIndex = choices.indexOf(choice)
    return originalIndex === choiceSelectedIndex
  }

  const getSortedChoices = () => {
    if (choiceSelectedIndex === null) return choices

    const selectedChoice = choices[choiceSelectedIndex]
    return [
      selectedChoice,
      ...choices.filter((_, index) => index !== choiceSelectedIndex)
    ]
  }
  const reorderedChoices = getSortedChoices()

  const { isPlaying } = fragment

  const handlePlaySpeech = () => {
    if (isPlaying) {
      stopSpeechTale()
    } else {
      playSpeechTale()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (hideForm || value === '') return
    onCreateChoice(value)
    setHideForm(true)
  }

  const handleChange = (newValue: string) => {
    if (hideForm) return
    setValue(newValue)
  }

  const handleOptionClick = (index: number) => () => {
    if (choiceSelectedIndex !== null) return
    onSelectChoice(index)
    setHideForm(true)
  }

  return (
    <li className='fragment-item mb-6 ms-6 lg:ms-12'>
      <span className='absolute -start-3 flex size-6 items-center justify-center rounded-full bg-yellow-300 text-gray-500 ring-8 ring-gray-100 dark:bg-yellow-700 dark:ring-gray-900'>
        <Star size={24} />
      </span>
      <p className='prose font-cinzel font-medium dark:prose-invert md:max-w-[95ch]'>
        {message}
      </p>

      <div className='my-3 flex flex-wrap items-center justify-start gap-2'>
        <Tooltip
          placement='bottom-start'
          content={isPlaying ? 'Detener reproducción' : 'Reproducir historia'}
        >
          <Button
            className='text-slate-700'
            variant='light'
            onClick={handlePlaySpeech}
            isIconOnly
          >
            {!isPlaying && <Volume2 size={20} />}
            {isPlaying && <CircleStop size={20} />}
          </Button>
        </Tooltip>
        <ShowGenerateImageButton
          onClick={() => {
            setIsAccordionOpen(!isAccordionOpen)
          }}
          showImage={isAccordionOpen}
        />
      </div>

      <div className='mt-4'>
        <AnimatedAccordion show={isAccordionOpen}>
          <GenerateImage
            backgroundDescription={fragment.backgroundDescription}
          />
        </AnimatedAccordion>
      </div>

      <div className='mt-4 flex flex-wrap gap-2 pb-4'>
        <AnimatePresence>
          {reorderedChoices.map((choice, index) => {
            const isSelected = getIsChoiceSelected(choice)
            return (
              <motion.div
                key={choice}
                layout
                initial={{ opacity: 1 }}
                animate={{
                  opacity: choiceSelectedIndex === null || isSelected ? 1 : 0,
                  transition: { duration: 0.8 }
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
              >
                <Button
                  className={cn(
                    'whitespace-normal h-auto md:whitespace-nowrap text-medium px-4 py-2',
                    !isSelected && 'hover:bg-secondary hover:text-white',
                    isSelected && 'pointer-events-none text-white shadow-xl'
                  )}
                  variant={isSelected ? 'shadow' : 'bordered'}
                  disabled={choiceSelectedIndex !== null}
                  disableAnimation={choiceSelectedIndex !== null}
                  color='secondary'
                  onClick={handleOptionClick(index)}
                >
                  {choice}
                </Button>
              </motion.div>
            )
          })}
          <motion.div
            layout
            initial={{ opacity: 1 }}
            animate={{
              opacity: hideForm ? 0 : 1,
              transition: { duration: 0.8 }
            }}
          >
            <form onSubmit={handleSubmit}>
              <Input
                variant='bordered'
                disabled={hideForm}
                className='m-0 border-secondary text-medium md:whitespace-nowrap'
                color='secondary'
                onValueChange={handleChange}
                value={value}
                classNames={{
                  input: 'min-w-20 md:min-w-64 px-4 py-2',
                  inputWrapper:
                    'border-secondary data-[hover=true]:border-secondary/85 h-auto min-h-11 '
                }}
                placeholder='Escribe tu continuación...'
                endContent={
                  <button
                    className='text-secondary focus:outline-none'
                    type='submit'
                    disabled={hideForm}
                    aria-label='Click to send the tale continuation'
                  >
                    <SendHorizonal />
                  </button>
                }
                type='text'
              />
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </li>
  )
}
