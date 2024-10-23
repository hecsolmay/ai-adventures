import { MAX_STEPS } from '@/components/tales/step-transition'
import { useStepTalesContext } from '@/providers/context/step-tales-context'

export default function useStepsTales () {
  const { currentStep, setCurrentStep, genre, setGenre } = useStepTalesContext()

  const goNextStep = () => {
    if (currentStep === MAX_STEPS) return
    const newStep = currentStep + 1
    setCurrentStep(newStep)
  }

  const goPrevStep = () => {
    const newStep = currentStep - 1
    if (newStep < 0) return
    setCurrentStep(newStep)
  }

  const reboot = () => {
    setCurrentStep(0)
    setGenre(null)
  }

  return {
    currentStep,
    setCurrentStep,
    goNextStep,
    goPrevStep,
    isNextStepAvailable: currentStep < MAX_STEPS,
    isPrevStepAvailable: currentStep > 0,
    reboot,
    genre,
    setGenre
  }
}
