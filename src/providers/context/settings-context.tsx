import { createContext, useContext, useEffect, useState } from 'react'

import { DEFAULT_SETTINGS_VALUES } from '@/constants'
import { type SettingsContextType } from '@/types/context'
import { getSettingsFromLocalStorage } from '@/utils/localStorage'

const SettingsContext = createContext<SettingsContextType>({
  setSelectedVoiceIndex: () => {},
  ...DEFAULT_SETTINGS_VALUES
})

export function useSettingsContext () {
  return useContext(SettingsContext)
}

export function SettingsProvider ({ children }: { children: React.ReactNode }) {
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0)

  useEffect(() => {
    const settings = getSettingsFromLocalStorage()
    setSelectedVoiceIndex(settings.selectedVoiceIndex)
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        selectedVoiceIndex,
        setSelectedVoiceIndex
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
