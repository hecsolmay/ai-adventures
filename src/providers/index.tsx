'use client'
import { NextUIProvider } from '@nextui-org/react'

import { SettingsProvider } from '@/providers/context/settings-context'
import { StepTalesProvider } from '@/providers/context/step-tales-context'
import { TalesFragmentsProvider } from '@/providers/context/tales-fragments-context'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        <StepTalesProvider>
          <TalesFragmentsProvider>
            <SettingsProvider>{children}</SettingsProvider>
          </TalesFragmentsProvider>
        </StepTalesProvider>
      </NextUIProvider>
    </>
  )
}
