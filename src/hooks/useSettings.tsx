import { useRef } from 'react'

import { useSettingsContext } from '@/providers/context/settings-context'
import { type SettingsType } from '@/types'
import { LOCAL_STORAGE_KEYS } from '@/constants'

export function useSettings () {
  const { selectedVoiceIndex, setSelectedVoiceIndex } = useSettingsContext()
  const prevSettings = useRef<SettingsType>({
    selectedVoiceIndex
  })

  const handleSaveSettings = () => {
    prevSettings.current = {
      selectedVoiceIndex
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.VOICE_INDEX,
      selectedVoiceIndex.toString()
    )
  }

  const handleRestoreSettings = () => {
    setSelectedVoiceIndex(prevSettings.current.selectedVoiceIndex)
  }

  return {
    selectedVoiceIndex,
    setSelectedVoiceIndex,
    prevSettings,
    handleSaveSettings,
    handleRestoreSettings
  }
}
