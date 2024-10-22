import { type LucideIcon } from 'lucide-react'

export interface FragmentType {
  message: string
  choices: string[]
  isError: boolean
}

export type Provider = 'openai' | 'groq'
export type LucideIconType = LucideIcon
