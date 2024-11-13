'use client'

import {
  Button,
  Modal,
  ModalContent,
  Spinner,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import { Image, ImageOff } from 'lucide-react'
import { getCldImageUrl } from 'next-cloudinary'
import { useState } from 'react'

import { type FragmentTypeWithSelection } from '@/types'
import useTalesFragments from '@/hooks/useTalesFragments'

interface GenerateFragmentImageProps {
  fragment: FragmentTypeWithSelection
}

const MAX_RETRY_COUNT = 3

const delay = async (ms: number) =>
  await new Promise(resolve => setTimeout(resolve, ms))

export default function GenerateFragmentImage ({
  fragment
}: GenerateFragmentImageProps) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()
  const { characterPublicId } = useTalesFragments()
  const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [isError, setIsError] = useState(false)
  const [imgSrc, setImgSrc] = useState(
    getCldImageUrl({
      src: characterPublicId ?? '',
      replaceBackground: fragment?.backgroundDescription
    })
  )
  const [retryCount, setRetryCount] = useState(0)

  const getTooltipContent = () => {
    if (isError) return 'Error al cargar la imagen'
    return isLoadingImage ? 'Cargando imagen...' : 'Ver Imagen de la historia'
  }

  const handleLoadImage = () => {
    setIsLoadingImage(false)
    setIsError(false)
  }

  const handleErrorImage = () => {
    console.error('Error loading image')
    if (retryCount > MAX_RETRY_COUNT) {
      setIsLoadingImage(false)
      setIsError(true)
      return
    }

    retryLoadImage()
  }

  const retryLoadImage = async () => {
    await delay(1000)
    setRetryCount(prev => prev + 1)
    const url = new URL(imgSrc)
    url.searchParams.set('retry', retryCount.toString())
    setImgSrc(url.toString())
    setIsLoadingImage(true)
    setIsError(false)
  }

  const handlePress = () => {
    if (isLoadingImage || isError) return
    onOpen()
  }
  return (
    <>
      <img
        src={imgSrc}
        alt='Precarga de la imagen de la historia'
        style={{ display: 'none', width: 0, height: 0 }} // Hide the image to preload it
        onLoad={handleLoadImage}
        onError={handleErrorImage}
      />
      <Tooltip placement='bottom-start' content={getTooltipContent()}>
        <Button
          onPress={handlePress}
          className='text-slate-700'
          variant='light'
          disabled={isLoadingImage || isError}
          isIconOnly
        >
          {isLoadingImage && <Spinner size='sm' />}
          {!isLoadingImage && isError && <ImageOff size={20} />}
          {!isLoadingImage && !isError && <Image size={20} />}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <img src={imgSrc} alt={'Imagen original del cuento'} />
        </ModalContent>
      </Modal>
    </>
  )
}
