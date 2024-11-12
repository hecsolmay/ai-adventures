import { RestartTaleButton, ReturnStepButton, ScrollButton } from '@/components/tales/actions'
import StepTalesTransition from '@/components/tales/step-transition'

export default function TalesPage () {
  return (
    <main className='relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <ReturnStepButton />
      <StepTalesTransition />
      <ScrollButton />
      <RestartTaleButton />
    </main>
  )
}
