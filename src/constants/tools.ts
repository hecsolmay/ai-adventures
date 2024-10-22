import {
  Bot
  // Pencil,
  // Book,
  // Volume2,
  // GraduationCap,
  // ChartSpline
} from 'lucide-react'

import { type LucideIconType } from '@/types'

interface Tool {
  slug: string
  title: string
  description: string
  icon: LucideIconType
}

export const TOOLS: Tool[] = [
  {
    slug: 'tales',
    title: 'Creador de historias',
    description:
      'Cree historias únicas basadas en IA adaptadas a los intereses y el nivel de lectura de tu elección.',
    icon: Bot
  }
  // {
  //   slug: '2',
  //   title: 'Character Creator',
  //   description:
  //     'Design and customize characters for your adventures with our AI-assisted tool.',
  //   icon: Pencil
  // },
  // {
  //   slug: '3',
  //   title: 'Interactive Lessons',
  //   description:
  //     'Engage in fun, educational lessons that adapt to your child\'s learning style and pace.',
  //   icon: Book
  // },
  // {
  //   slug: '4',
  //   title: 'Vocabulary Builder',
  //   description:
  //     'Expand your child\'s vocabulary through context-rich stories and interactive exercises.',
  //   icon: Volume2
  // },
  // {
  //   slug: '5',
  //   title: 'Reading Companion',
  //   description:
  //     'An AI-powered reading assistant that helps with pronunciation and comprehension.',
  //   icon: GraduationCap
  // },
  // {
  //   slug: '6',
  //   title: 'Parent Dashboard',
  //   description:
  //     'Track your child\'s progress and customize their learning experience with our intuitive dashboard.',
  //   icon: ChartSpline
  // }
]
