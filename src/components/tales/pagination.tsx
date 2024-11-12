import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/utils/cn'
import { scrollToTop } from '@/utils/scroll'

interface PaginationProps {
  totalCharacters: number
  currentPage: number
  showing: string
  hasNextPage: boolean
  hasPrevPage: boolean
  onClickNext: () => void
  onClickPrev: () => void
}

export default function CharactersPagination (pagination: PaginationProps) {
  const {
    totalCharacters,
    showing,
    hasNextPage,
    hasPrevPage,
    onClickNext,
    onClickPrev
  } = pagination

  const handleClickNext = () => {
    if (!hasNextPage) return
    onClickNext()
    scrollToTop()
  }

  const handleClickPrev = () => {
    if (!hasPrevPage) return
    onClickPrev()
    scrollToTop()
  }

  return (
    <div className='mt-6 inline-flex w-full items-center justify-between gap-x-4 px-0 md:px-6'>
      <button
        className={cn(
          'hover:bg-slate-300 transition-background duration-150 rounded-md',
          hasPrevPage ? 'visible' : 'invisible'
        )}
        onClick={handleClickPrev}
        title='Ir a la página anterior'
      >
        <ChevronLeft className='size-8' />
      </button>
      <span className='text-center text-sm text-gray-500'>
        Mostrando {showing} de {totalCharacters} personajes
      </span>
      <button
        className={cn(
          'hover:bg-slate-300 transition-background duration-150 rounded-md',
          hasNextPage ? 'visible' : 'invisible'
        )}
        onClick={handleClickNext}
        title='Ir a la página siguiente'
      >
        <ChevronRight className='size-8' />
      </button>
    </div>
  )
}
