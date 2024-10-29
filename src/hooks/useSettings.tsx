import { useSettingsContext } from '@/providers/context/settings-context'

export function useSettings () {
  const { selectedVoiceIndex, setSelectedVoiceIndex } = useSettingsContext()

  return {
    selectedVoiceIndex,
    setSelectedVoiceIndex
  }
}
