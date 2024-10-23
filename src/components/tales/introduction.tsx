'use client'

import type { LucideIconType } from '@/types'

import { Drama, Gamepad, GitFork, Sparkle } from 'lucide-react'

import { InfoStartButton } from '@/components/tales/actions'
import { cn } from '@/utils/cn'

interface InfoCard {
  title: string
  description: string
  color?: string
  icon: LucideIconType
}

export const INFO_CARDS: InfoCard[] = [
  {
    title: 'Selecciona el género',
    description:
      'Aventura, fantasía, ciencia ficción, misterio, terror, histórico, romántico, suspense, comedia o crea uno personalizado.',
    color: 'text-teal-400',
    icon: Drama
  },
  {
    title: 'Inicia tu historia',
    description:
      'La inteligencia artificial generará un fragmento inicial de la historia basado en el género que has seleccionado.',
    color: 'text-cyan-400',
    icon: Sparkle
  },
  {
    title: 'Decide el rumbo',
    description:
      'Al final de cada fragmento, se te presentarán varias opciones para decidir cómo continúa la historia o crea tu propio camino.',
    color: 'text-indigo-400',
    icon: GitFork
  },
  {
    title: 'Experiencia interactiva',
    description:
      'A medida que tomas decisiones, la historia se desarrollará en tiempo real, ofreciéndote una experiencia interactiva y única.',
    color: 'text-purple-400',
    icon: Gamepad
  }
]

export default function TalesIntroduction () {
  return (
    <div className='space-y-6 lg:space-y-8'>
      <div className='inline-flex w-full items-center justify-center'>
        <h1 className='max-w-[20ch] text-pretty text-center text-3xl font-bold lg:text-4xl'>
          Bienvenido a tu{' '}
          <span className='text-primary'> creador de cuentos </span>
        </h1>
      </div>

      <p className='text-pretty font-medium'>
        Esta herramienta te permite crear historias únicas y personalizadas con
        la ayuda de inteligencia artificial. Aquí puedes sumergirte en aventuras
        sin fin, explorar mundos fantásticos, resolver misterios intrigantes y
        mucho más.
      </p>

      <ListOfInfoCards />

      <p>
        Prepárate para una experiencia narrativa única donde cada elección que
        hagas influirá en el curso de la historia. ¡Déjate llevar por tu
        imaginación y crea tu propia aventura!
      </p>

      <div className='inline-flex w-full justify-center'>
        <InfoStartButton />
      </div>
    </div>
  )
}

function ListOfInfoCards () {
  return (
    <div className='mx-auto grid gap-y-4 lg:w-full lg:grid-cols-4'>
      {INFO_CARDS.map(({ title, color, description, icon: Icon }) => (
        <div
          key={title}
          className='group rounded-lg border border-transparent px-5 py-4 text-center transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
        >
          <h2 className={cn('mb-3 text-2xl font-semibold', color)}>
            <Icon className='mx-auto size-8' />
            {title}
          </h2>
          <p className='mt-4 text-gray-500'>{description}</p>
        </div>
      ))}
    </div>
  )
}
