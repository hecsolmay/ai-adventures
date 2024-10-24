'use client'

import { Button } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'

import { type FragmentTypeWithSelection } from '@/types'
import { cn } from '@/utils/cn'

interface StoryFragmentProps {
  fragment: FragmentTypeWithSelection
  onSelectChoice: (choiceIndex: number) => void
}

export function StoryFragment ({
  fragment,
  onSelectChoice
}: StoryFragmentProps) {
  const { message, choiceSelectedIndex, choices } = fragment

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

  return (
    <li className='fragment-item mb-6 ms-6 lg:ms-12'>
      <span className='absolute -start-3 flex size-6 items-center justify-center rounded-full bg-yellow-300 text-gray-500 ring-8 ring-gray-100 dark:bg-yellow-700 dark:ring-gray-900'>
        <Star size={24} />
      </span>
      <p className='prose font-cinzel font-medium dark:prose-invert md:max-w-[95ch]'>
        {message}
      </p>

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
                  onClick={() => {
                    if (choiceSelectedIndex !== null) return
                    onSelectChoice(index)
                  }}
                >
                  {choice}
                </Button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </li>
  )
}
