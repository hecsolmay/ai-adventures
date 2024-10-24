'use client'
import { NextUIProvider } from '@nextui-org/react'

import { StepTalesProvider } from '@/providers/context/step-tales-context'
import { TalesFragmentsProvider } from '@/providers/context/tales-fragments-context'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        <StepTalesProvider>
          <TalesFragmentsProvider>{children}</TalesFragmentsProvider>
        </StepTalesProvider>
      </NextUIProvider>
    </>
  )
}
