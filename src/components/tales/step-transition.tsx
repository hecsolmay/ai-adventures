'use client'

import { AnimatePresence, motion } from 'framer-motion'

import Introduction from '@/components/tales/introduction'
import SelectCategory from '@/components/tales/select-category'
import TalesCreation from '@/components/tales/tales-creation'
import WriteStart from '@/components/tales/write-start'
import useStepsTales from '@/hooks/useStepsTales'

const steps = [Introduction, SelectCategory, WriteStart, TalesCreation]

export const MAX_STEPS = steps.length - 1 // The last step is the final step

export default function StepTalesTransition () {
  const { currentStep } = useStepsTales()

  const CurrentComponent = getCurrentStep(currentStep)

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <CurrentComponent />
      </motion.div>
    </AnimatePresence>
  )
}

function getCurrentStep (currentStep: number) {
  const currentStepItem = steps[currentStep] ?? steps[0]
  return currentStepItem
}
