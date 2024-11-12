'use client'

import { Button } from '@nextui-org/react'
import { getCldImageUrl } from 'next-cloudinary'
import { useRef, useState } from 'react'

import CharactersPagination from '@/components/tales/pagination'
import { charactersPublicIds } from '@/constants/cloudinary'
import useStepsTales from '@/hooks/useStepsTales'
import useTalesFragments from '@/hooks/useTalesFragments'
import { cn } from '@/utils/cn'
import { scrollToTop } from '@/utils/scroll'

function getCharacters () {
  const characters = charactersPublicIds.map(({ publicId }) => {
    const url = getCldImageUrl({ src: publicId })
    return {
      url,
      publicId
    }
  })

  return characters
}

export type GetCharactersType = Awaited<ReturnType<typeof getCharacters>>

const MAX_CHARACTERS_PER_PAGE = 12
const DEFAULT_PAGE = 1

function getCharactersPage (
  charactersImages: GetCharactersType,
  page = DEFAULT_PAGE
) {
  const start = (page - 1) * MAX_CHARACTERS_PER_PAGE
  const end = start + MAX_CHARACTERS_PER_PAGE
  const hasNextPage = charactersImages.length > end
  const hasPrevPage = start > 0
  const showEnd = end > charactersImages.length ? charactersImages.length : end

  return {
    charactersImages: charactersImages.slice(start, end),
    hasNextPage,
    hasPrevPage,
    currentPage: page,
    totalPages: Math.ceil(charactersImages.length / MAX_CHARACTERS_PER_PAGE),
    totalCharacters: charactersImages.length,
    showing: `${start + 1} - ${showEnd}`
  }
}

export default function CharactersList () {
  const originalCharactersRef = useRef(getCharacters())
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const {
    characterPublicId,
    setCharacterPublicId,
    changePrevCharacterPublicId
  } = useTalesFragments()
  const { goNextStep } = useStepsTales()

  const pagination = getCharactersPage(
    originalCharactersRef.current,
    currentPage
  )

  if (originalCharactersRef.current.length === 0) {
    return null
  }

  const createHandleCharacterClick = (characterPublicId: string) => () => {
    setCharacterPublicId(characterPublicId)
  }

  const handleConfirmClick = () => {
    goNextStep()
    changePrevCharacterPublicId(characterPublicId)
    scrollToTop()
  }

  const { charactersImages, ...info } = pagination

  const createChangeCurrentPage = (type: 'next' | 'prev') => () => {
    if (type === 'next') {
      setCurrentPage(prev => prev + 1)
    } else {
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <div>
      <div className='inline-flex w-full items-center justify-center'>
        <h1 className='max-w-[20ch] text-pretty text-center text-3xl font-bold text-primary lg:text-4xl'>
          Selecciona tu personaje
        </h1>
      </div>

      <p className='mt-6 text-pretty text-center font-medium'>
        Este personaje se embarcará en tu aventura, haciendo que el mundo de tu
        historia se vea reflejado en su entorno.
      </p>

      <div className='mt-6 inline-flex w-full justify-center'>
        <Button
          disabled={characterPublicId === null}
          className='font-medium text-white disabled:pointer-events-none disabled:opacity-50'
          color='primary'
          onClick={handleConfirmClick}
        >
          Confirmar Elección
        </Button>
      </div>

      <ul className='mt-8 grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {charactersImages.map(character => (
          <li
            key={character.publicId}
            onClick={createHandleCharacterClick(character.publicId)}
            onDoubleClick={handleConfirmClick}
            className={cn(
              'rounded-lg border border-transparent p-4 transition-all duration-150 hover:cursor-pointer hover:border-secondary hover:shadow-md hover:shadow-secondary',
              characterPublicId === character.publicId &&
                'border-secondary shadow-secondary shadow-md'
            )}
          >
            <img
              className='aspect-[205/224] size-56 object-contain drop-shadow-md'
              src={character.url}
              alt={character.publicId}
            />
          </li>
        ))}
      </ul>

      <CharactersPagination
        {...info}
        onClickNext={createChangeCurrentPage('next')}
        onClickPrev={createChangeCurrentPage('prev')}
      />
    </div>
  )
}
