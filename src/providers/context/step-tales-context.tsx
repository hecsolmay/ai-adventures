import { useContext, createContext, useState } from 'react'

import { type StepTalesContextType } from '@/types/context'

const StepTalesContext = createContext<StepTalesContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  genre: null,
  setGenre: () => {},
  isLoadingFragment: false,
  setIsLoadingFragment: () => {}
})

export function useStepTalesContext () {
  return useContext(StepTalesContext)
}

export function StepTalesProvider ({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [genre, setGenre] = useState<string | null>(null)
  const [isLoadingFragment, setIsLoadingFragment] = useState(false)

  return (
    <StepTalesContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        genre,
        setGenre,
        isLoadingFragment,
        setIsLoadingFragment
      }}
    >
      {children}
    </StepTalesContext.Provider>
  )
}
