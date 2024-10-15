import { BookOpen, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'

export default function Introduction () {
  return (
    <div className='w-full max-w-7xl px-4 md:px-6'>
      <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
        <div className='flex flex-col justify-center gap-4'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Potencia tu Imaginación
            </h2>
            <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Nuestra plataforma educativa combina la narración con selecciones interactivas,
              haciendo que el uso de la imaginación sea divertido y atractivo para niños de todas las edades.
            </p>
          </div>
          <ul className='mt-6 grid gap-6'>
            <li className='flex items-center space-x-2'>
              <BookOpen className='size-6 text-purple-600' />
              <span>Aprende de forma fácil</span>
            </li>
            <li className='flex items-center space-x-2'>
              <Zap className='size-6 text-purple-600' />
              <span>Historias creadas por IA</span>
            </li>
            <li className='flex items-center space-x-2'>
              <Sparkles className='size-6 text-purple-600' />
              <span>Mejora la experiencia de la historia</span>
            </li>
          </ul>
        </div>
        <div className='flex items-center justify-center'>
          <Image
            src='https://g-1x6hvq5bd3t.vusercontent.net/placeholder.svg'
            width={550}
            height={550}
            alt='AI Adventures educational interface'
            className='h-auto w-full rounded-xl shadow-lg'
          />
        </div>
      </div>
    </div>
  )
}
