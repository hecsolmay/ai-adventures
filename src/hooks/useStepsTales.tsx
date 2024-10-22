import { useStepTalesContext } from '@/providers/context/step-tales-context'

export default function useStepsTales (maxSteps = 1) {
  const { currentStep, setCurrentStep } = useStepTalesContext()

  const goNextStep = () => {
    if (currentStep === maxSteps) return
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
  }

  return {
    currentStep,
    setCurrentStep,
    goNextStep,
    goPrevStep,
    isNextStepAvailable: currentStep < maxSteps,
    isPrevStepAvailable: currentStep > 0,
    reboot
  }
}
