import { type CoreMessage } from 'ai'
import { type Dispatch, type SetStateAction } from 'react'

import { type FragmentTypeWithSelection } from '@/types/index'

export interface StepTalesContextType {
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  genre: string | null
  setGenre: Dispatch<SetStateAction<string | null>>
}

export interface TalesFragmentsContextType {
  fragments: FragmentTypeWithSelection[]
  setFragments: Dispatch<SetStateAction<FragmentTypeWithSelection[]>>
  messages: CoreMessage[]
  setMessages: Dispatch<SetStateAction<CoreMessage[]>>
  isLoadingFragment: boolean
  setIsLoadingFragment: Dispatch<SetStateAction<boolean>>
  prevGenre: string | null
  changePrevGenre: (genre: string | null) => void
  isError: boolean
  setIsError: Dispatch<SetStateAction<boolean>>
}

export interface SettingsContextType {
  selectedVoiceIndex: number
  setSelectedVoiceIndex: Dispatch<SetStateAction<number>>
  openAiApiKey: string | null
  setOpenAiApiKey: Dispatch<SetStateAction<string | null>>
}
