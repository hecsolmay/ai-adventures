import { useContext, createContext, useState } from 'react'

import { type StepTalesContextType } from '@/types/context'

const StepTalesContext = createContext<StepTalesContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  category: '',
  setCategory: () => {}
})

export function useStepTalesContext () {
  return useContext(StepTalesContext)
}

export function StepTalesProvider ({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [category, setCategory] = useState('')

  return (
    <StepTalesContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        category,
        setCategory
      }}
    >
      {children}
    </StepTalesContext.Provider>
  )
}
