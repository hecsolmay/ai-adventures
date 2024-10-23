'use client'

import { Button } from '@nextui-org/react'
import { BookOpenText, Undo2 } from 'lucide-react'

import useStepsTales from '@/hooks/useStepsTales'

export function InfoStartButton () {
  const { goNextStep } = useStepsTales()
  const handleClick = () => {
    goNextStep()
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
  const { goPrevStep, currentStep } = useStepsTales()
  const handleClick = () => {
    goPrevStep()
  }

  if (currentStep === 0) return null

  return (
    <Button
      isIconOnly
      className='absolute left-6 top-4 text-white'
      color='primary'
      onClick={handleClick}
      title='Regresar a la sección anterior'
    >
      <Undo2 className='size-5' />
    </Button>
  )
}
