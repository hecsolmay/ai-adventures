import { type LucideIcon } from 'lucide-react'

export interface FragmentType {
  message: string
  choices: string[]
  isError: boolean
}

export interface FragmentTypeWithSelection extends FragmentType {
  choiceSelectedIndex: number | null
}

export type Provider = 'openai' | 'groq'
export type LucideIconType = LucideIcon
