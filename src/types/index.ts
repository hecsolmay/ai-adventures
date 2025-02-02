import { type LucideIcon } from 'lucide-react'

export interface FragmentType {
  message: string
  choices: string[]
  isError: boolean
  backgroundDescription: string
}

export interface FragmentTypeWithSelection extends FragmentType {
  choiceSelectedIndex: number | null
  isPlaying: boolean
}

export type Provider = 'openai' | 'groq'
export type LucideIconType = LucideIcon
export interface SettingsType {
  selectedVoiceIndex: number
  openAiApiKey: string | null
}
