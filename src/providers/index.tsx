'use client'
import { NextUIProvider } from '@nextui-org/react'

import { StepTalesProvider } from '@/providers/context/step-tales-context'

export default function Providers ({
  children
}: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        <StepTalesProvider>
          {children}
        </StepTalesProvider>
      </NextUIProvider>
    </>
  )
}
