import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Hero () {
  return (
    <div className='w-full px-4 md:px-6'>
      <div className='flex flex-col items-center space-y-4 text-center'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none'>
            AI Adventures
          </h1>
          <p className='mx-auto max-w-[700px] text-white md:text-xl'>
            Únete a un viaje de imaginación y aprendizaje con el narrador de
            historias y educación basado en IA.
          </p>
        </div>
        <div className='space-x-4'>
          <Button
            as={Link}
            href='/tools/tales'
            className='bg-white text-purple-600 hover:bg-gray-100'
          >
            Crear tu historia
          </Button>
          <Button
            variant='bordered'
            className='border-white bg-transparent text-white hover:bg-white hover:text-purple-600'
            as={Link}
            href='/learn'
          >
            Aprender más
          </Button>
        </div>
      </div>
    </div>
  )
}
