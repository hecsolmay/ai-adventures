export interface StepTalesContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  genre: string | null
  setGenre: (category: string | null) => void
  isLoadingFragment: boolean
  setIsLoadingFragment: (isLoading: boolean) => void
}
