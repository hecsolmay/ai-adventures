import { useRef } from 'react'

import { useSettingsContext } from '@/providers/context/settings-context'
import { type SettingsType } from '@/types'
import { LOCAL_STORAGE_KEYS } from '@/constants'

export function useSettings () {
  const {
    selectedVoiceIndex,
    setSelectedVoiceIndex,
    openAiApiKey,
    setOpenAiApiKey
  } = useSettingsContext()
  const prevSettings = useRef<SettingsType>({
    selectedVoiceIndex,
    openAiApiKey
  })

  const handleSaveSettings = (openAiApiKey: string | null) => {
    setOpenAiApiKey(openAiApiKey)

    prevSettings.current = {
      selectedVoiceIndex,
      openAiApiKey
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.VOICE_INDEX,
      selectedVoiceIndex.toString()
    )
  }

  const handleRestoreSettings = () => {
    setSelectedVoiceIndex(prevSettings.current.selectedVoiceIndex)
    setOpenAiApiKey(prevSettings.current.openAiApiKey)
  }

  return {
    selectedVoiceIndex,
    setSelectedVoiceIndex,
    prevSettings,
    handleSaveSettings,
    handleRestoreSettings,
    openAiApiKey,
    setOpenAiApiKey
  }
}
