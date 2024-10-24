import { type CoreMessage } from 'ai'
import { createContext, useContext, useState } from 'react'

import { type FragmentTypeWithSelection } from '@/types'
import { type TalesFragmentsContextType } from '@/types/context'

const TalesFragmentsContext = createContext<TalesFragmentsContextType>({
  fragments: [],
  setFragments: () => {},
  messages: [],
  setMessages: () => {},
  isLoadingFragment: false,
  setIsLoadingFragment: () => {},
  prevGenre: null,
  setPrevGenre: () => {}
})

export function useTalesFragmentsContext () {
  return useContext(TalesFragmentsContext)
}

export function TalesFragmentsProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const [fragments, setFragments] = useState<FragmentTypeWithSelection[]>([])
  const [messages, setMessages] = useState<CoreMessage[]>([])
  const [isLoadingFragment, setIsLoadingFragment] = useState(false)
  const [prevGenre, setPrevGenre] = useState<string | null>(null)

  return (
    <TalesFragmentsContext.Provider
      value={{
        fragments,
        setFragments,
        messages,
        setMessages,
        isLoadingFragment,
        setIsLoadingFragment,
        prevGenre,
        setPrevGenre
      }}
    >
      {children}
    </TalesFragmentsContext.Provider>
  )
}
