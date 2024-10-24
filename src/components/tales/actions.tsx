'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { BookOpenText, ChevronRight, Undo2 } from 'lucide-react'
import { motion } from 'framer-motion'

import useStepsTales from '@/hooks/useStepsTales'
import { cn } from '@/utils/cn'
import { scrollToTop } from '@/utils/scroll'
import useTalesFragments from '@/hooks/useTalesFragments'

export function InfoStartButton () {
  const { goNextStep } = useStepsTales()
  const handleClick = () => {
    goNextStep()
    scrollToTop()
  }

  return (
    <Button
      startContent={<BookOpenText className='size-5' />}
      className='px-12 text-medium text-white'
      color='primary'
      onClick={handleClick}
    >
      Empezar
    </Button>
  )
}

export function ReturnStepButton () {
  const { isLoadingFragment } = useTalesFragments()
  const { goPrevStep, currentStep } = useStepsTales()
  const handleClick = () => {
    if (currentStep === 0 || isLoadingFragment) return
    goPrevStep()
    scrollToTop()
  }

  if (currentStep === 0) return null

  const isClickAvailable = currentStep > 0 && !isLoadingFragment

  return (
    <Tooltip
      hidden={!isClickAvailable}
      showArrow
      content='Regresar a la sección anterior'
      placement='bottom-start'
    >
      <Button
        isIconOnly
        disabled={!isClickAvailable}
        className='absolute left-6 top-4 text-white disabled:opacity-70 disabled:hover:opacity-70'
        color='primary'
        onClick={handleClick}
      >
        <Undo2 className='size-5' />
      </Button>
    </Tooltip>
  )
}

interface SelectGenreButtonProps {
  genre: string
}

export function SelectCategoryButton ({
  genre: propGenre
}: SelectGenreButtonProps) {
  const { genre, setGenre } = useStepsTales()

  const isSelectedGenre = genre === propGenre

  const handleClick = () => {
    const newGenre = isSelectedGenre ? null : propGenre
    setGenre(newGenre)
  }

  return (
    <Button
      variant={isSelectedGenre ? 'shadow' : 'bordered'}
      color='secondary'
      className={cn(isSelectedGenre && 'text-white/90')}
      onClick={handleClick}
    >
      {propGenre}
    </Button>
  )
}

export function NextStepGenreButton () {
  const { goNextStep, genre } = useStepsTales()
  const isGenreSelected = genre !== null

  const handleClick = () => {
    if (!isGenreSelected) return
    goNextStep()
    scrollToTop()
  }

  return (
    <motion.div
      animate={{
        opacity: isGenreSelected ? 1 : 0,
        x: isGenreSelected ? 0 : 50
      }}
      exit={{ opacity: 0, x: -50 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='inline-flex w-full items-center justify-center'
    >
      <Button
        endContent={<ChevronRight className='size-5' />}
        className='px-12 text-medium text-white'
        color='primary'
        disabled={!isGenreSelected}
        onClick={handleClick}
      >
        Confirmar Elección
      </Button>
    </motion.div>
  )
}
