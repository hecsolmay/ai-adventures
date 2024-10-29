import { createContext, useContext, useState } from 'react'

import { type SettingsContextType } from '@/types/context'

const SettingsContext = createContext<SettingsContextType>({
  selectedVoiceIndex: 0,
  setSelectedVoiceIndex: () => {}
})

export function useSettingsContext () {
  return useContext(SettingsContext)
}

export function SettingsProvider ({ children }: { children: React.ReactNode }) {
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0)

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
