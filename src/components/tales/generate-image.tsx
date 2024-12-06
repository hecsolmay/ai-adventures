'use client'

import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  AlertOctagon,
  Clock,
  ImageOff,
  Key,
  Loader2,
  RefreshCw,
  Settings
} from 'lucide-react'
import { useEffect, useState } from 'react'

// import { generateTaleImage } from '@/utils/image'
import { useSettings } from '@/hooks/useSettings'
import { type DivProps } from '@/types/props'
import { cn } from '@/utils/cn'

const MAX_RETRY_COUNT = 3

interface GenerateImageProps {
  backgroundDescription: string
  onImageGenerated?: (imageUrl: string) => void
}

const randomDelay = async () => {
  // random delay between 4000 and 6000 milliseconds
  const delay = Math.random() * 4000 + 4000
  return await new Promise(resolve => setTimeout(resolve, delay))
}

export default function GenerateImage ({
  backgroundDescription,
  onImageGenerated
}: GenerateImageProps) {
  const { openAiApiKey } = useSettings()
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (isLoading || retryCount > MAX_RETRY_COUNT) return

    if (openAiApiKey === null || openAiApiKey === '') {
      setIsError(true)
      return
    }

    const getGeneratedImage = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        // const response = await generateTaleImage(
        //   backgroundDescription,
        //   openAiApiKey
        // )

        // const { imageUrl } = response

        // if (imageUrl === null) {
        //   setIsError(true)
        //   return
        // }

        await randomDelay()

        const imageUrl = backgroundDescription
        setImageSrc(imageUrl)
        onImageGenerated?.(imageUrl)
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getGeneratedImage()
  }, [retryCount, openAiApiKey])

  const handleRetry = () => {
    if (retryCount > MAX_RETRY_COUNT) return
    setRetryCount(prev => prev + 1)
  }

  if (retryCount > MAX_RETRY_COUNT) {
    return <GenerateImageMaxRetryReached />
  }

  if ((openAiApiKey === null || openAiApiKey === '') && imageSrc === null) {
    return <GenerateImageNoApiKey />
  }

  if (isError) {
    return <GenerateImageError onRetry={handleRetry} />
  }

  if (isLoading) {
    return <GenerateImageLoading />
  }

  if (imageSrc === null) {
    return <GenerateImageEmpty />
  }

  return (
    <GenerateImageContainer>
      <img
        src={imageSrc}
        className='h-96 w-full max-w-96 rounded-md object-cover'
        alt='Imagen generada del párrafo'
      />
    </GenerateImageContainer>
  )
}

function GenerateImageContainer ({ children, className, ...props }: DivProps) {
  return (
    <div
      className={cn('container mx-auto flex justify-center aspect-video h-96 w-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function GenerateImageEmpty () {
  return (
    <GenerateImageContainer>
      <div className='flex size-full items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md overflow-hidden rounded-lg'
        >
          <div className='p-6 pt-0'>
            <div className='mb-4 flex flex-col items-center'>
              <ImageOff className='mb-4 size-16 text-gray-400 dark:text-gray-500' />
              <h2 className='text-center text-xl font-semibold text-gray-800 dark:text-gray-200'>
                No hay imagen para mostrar
              </h2>
            </div>
            <p className='mb-4 text-center text-sm text-gray-600 dark:text-gray-400'>
              Actualmente no hay imagen para mostrar.
            </p>
            <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
              Puedes continuar la historia o intentar de nuevo más tarde.
            </p>
          </div>
        </motion.div>
      </div>
    </GenerateImageContainer>
  )
}

function GenerateImageLoading () {
  return (
    <GenerateImageContainer>
      <div className='flex size-full flex-col items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center'
        >
          <Loader2 className='size-10 animate-spin text-gray-600 dark:text-gray-300' />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='mt-4 text-sm font-medium text-gray-600 dark:text-gray-300'
          >
            Generando imagen...
          </motion.p>
        </motion.div>
      </div>
    </GenerateImageContainer>
  )
}

function GenerateImageNoApiKey () {
  return (
    <GenerateImageContainer>
      <div className='flex size-full items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md overflow-hidden rounded-lg'
        >
          <div className='p-6 pt-0'>
            <div className='mb-4 flex items-center'>
              <Key className='mr-2 size-6 text-yellow-500' />
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                API Key Requerida
              </h2>
            </div>
            <p className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
              Una API KEY de OpenAI es necesaria para generar imágenes.
            </p>
            <p className='mb-6 text-sm text-gray-600 dark:text-gray-400'>
              Para empezar a usar esta funcionalidad, por favor, añade una clave
              de API de OpenAI en la configuración.
            </p>
            <div className='flex items-center text-sm text-blue-600 dark:text-blue-400'>
              <Settings className='mr-2 size-4' />
              <span>Ve a la configuración para añadir una clave</span>
            </div>
          </div>
        </motion.div>
      </div>
    </GenerateImageContainer>
  )
}

interface GenerateImageErrorProps {
  onRetry: () => void
}

function GenerateImageError ({ onRetry }: GenerateImageErrorProps) {
  return (
    <GenerateImageContainer>
      <div className='flex size-full flex-col items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center text-center'
        >
          <AlertCircle className='mb-4 size-12 text-red-500' />
          <h2 className='mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200'>
            Generación de imagen fallida
          </h2>
          <p className='mb-6 max-w-xs text-sm text-gray-600 dark:text-gray-400'>
            No se pudo generar la imagen. Esto puede deberse a que la API KEY de
            OpenAI no esté configurada o por un error en la inesperado. Por
            favor, intente nuevamente.
          </p>
          <Button
            color='primary'
            onClick={onRetry}
            className='flex items-center text-white'
          >
            <RefreshCw className='mr-2 size-4' />
            Reintentar generación
          </Button>
        </motion.div>
      </div>
    </GenerateImageContainer>
  )
}

function GenerateImageMaxRetryReached () {
  return (
    <GenerateImageContainer>
      <div className='flex size-full items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md overflow-hidden rounded-lg'
        >
          <div className='p-6 pt-0'>
            <div className='mb-4 flex items-center'>
              <AlertOctagon className='mr-2 size-6 text-red-500' />
              <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                Limite de intentos de generación alcanzado
              </h2>
            </div>
            <p className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
              Haz alcanzado el límite de intentos de generación.
            </p>
            <p className='mb-6 text-sm text-gray-600 dark:text-gray-400'>
              Por favor, espera antes de intentar nuevamente o considera
              actualizar tu plan para más generaciones de imágenes.
            </p>
            <div className='flex items-center text-sm text-blue-600 dark:text-blue-400'>
              <Clock className='mr-2 size-4' />
              <span>Intenta de nuevo más tarde o actualiza tu plan</span>
            </div>
          </div>
        </motion.div>
      </div>
    </GenerateImageContainer>
  )
}
