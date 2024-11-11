import { DEFAULT_SETTINGS_VALUES, LOCAL_STORAGE_KEYS } from '@/constants'
import { settingsLocalStorageSchema } from '@/schemas/localStorage'
import { type SettingsType } from '@/types'

export function getSettingsFromLocalStorage (): SettingsType {
  const voiceIndex = localStorage.getItem(LOCAL_STORAGE_KEYS.VOICE_INDEX)

  const result = settingsLocalStorageSchema.safeParse({
    voiceIndex
  })

  if (!result.success) return DEFAULT_SETTINGS_VALUES

  const { voiceIndex: selectedVoiceIndex } = result.data

  return {
    selectedVoiceIndex
  }
}
