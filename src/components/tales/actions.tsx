'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import {
  ArrowDown,
  ArrowUp,
  BookOpenText,
  Bot,
  ChevronRight,
  RefreshCw,
  RotateCw,
  Undo2
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import useStepsTales from '@/hooks/useStepsTales'
import { cn } from '@/utils/cn'
import { scrollToTop } from '@/utils/scroll'
import useTalesFragments from '@/hooks/useTalesFragments'

import { MAX_STEPS } from './step-transition'

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

export function ScrollButton () {
  const [showButton, setShowButton] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const { fragments, isLoadingFragment } = useTalesFragments()
  const [scrollHeight, setScrollHeight] = useState(0)
  const { currentStep } = useStepsTales()

  useEffect(() => {
    const handleScroll = () => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (isLoadingFragment) {
        const loaderFragment =
          document.querySelector<HTMLDivElement>('.fragment-loader')
        setScrollHeight(loaderFragment?.offsetTop ?? 0)
      } else {
        const lastFragment = document.querySelector<HTMLDivElement>(
          '.fragment-item:last-child'
        )
        setScrollHeight(lastFragment?.offsetTop ?? 0)
      }

      setShowButton(scrollHeight > clientHeight && fragments.length > 1)
      setIsAtTop(scrollTop === 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fragments.length])

  if (currentStep !== MAX_STEPS) return null

  const scrollToPosition = (position: 'top' | 'bottom') => {
    window.scrollTo({
      top: position === 'top' ? 0 : scrollHeight,
      behavior: 'smooth'
    })
  }

  const handleClick = () => {
    scrollToPosition(isAtTop ? 'bottom' : 'top')
  }

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          className='fixed bottom-4 right-4 z-50'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={handleClick}
            aria-label={isAtTop ? 'Scroll to bottom' : 'Scroll to top'}
            className='rounded-full p-3 text-white'
            color='primary'
            variant='shadow'
          >
            {isAtTop && <ArrowDown className='size-6' />}
            {!isAtTop && <ArrowUp className='size-6' />}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ErrorMessageProps {
  onRetry?: () => void
}

export function ErrorMessage ({ onRetry }: ErrorMessageProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-2 text-red-600'>
      <Bot className='size-12' />
      <p>Algo salió mal, intenta nuevamente</p>
      <Button isIconOnly color='danger' className='bg-red-600'>
        <RotateCw className='size-5' onClick={onRetry} />
      </Button>
    </div>
  )
}

export function RestartTaleButton () {
  const { restartTales } = useTalesFragments()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { currentStep, setCurrentStep, setGenre } = useStepsTales()
  const handleClick = () => {
    if (currentStep === 0) return
    onOpen()
  }

  const handleRestart = (onClose: () => void) => () => {
    if (currentStep === 0) return
    setCurrentStep(1)
    scrollToTop()
    restartTales()
    onClose()
    setGenre(null)
  }

  if (currentStep === 0) return null

  return (
    <>
      <Tooltip showArrow content='Reiniciar el cuento' placement='bottom-end'>
        <Button
          isIconOnly
          className='absolute right-6 top-4 text-white disabled:opacity-70 disabled:hover:opacity-70'
          color='primary'
          onClick={handleClick}
        >
          <RefreshCw className='size-5' />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                ¿Estás seguro de que quieres reiniciar el cuento?
              </ModalHeader>
              <ModalBody>
                <p>
                  Al reiniciar el cuento, se{' '}
                  <span className='font-bold'>borrará</span> todo el progreso y
                  se comenzará de nuevo.
                </p>
                <p>¿Estás seguro de que quieres reiniciar el cuento?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  className='text-white '
                  color='primary'
                  onPress={handleRestart(onClose)}
                >
                  Reiniciar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
