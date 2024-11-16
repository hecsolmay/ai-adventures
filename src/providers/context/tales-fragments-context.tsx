import { type CoreMessage } from 'ai'
import { createContext, useContext, useRef, useState } from 'react'

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
  changePrevGenre: (_genre: string | null) => {},
  isError: false,
  setIsError: () => {}
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
  const prevGenre = useRef<string | null>(null)
  const [isError, setIsError] = useState(false)

  const changePrevGenre = (genre: string | null) => {
    prevGenre.current = genre
  }

  return (
    <TalesFragmentsContext.Provider
      value={{
        fragments,
        setFragments,
        messages,
        setMessages,
        isLoadingFragment,
        setIsLoadingFragment,
        prevGenre: prevGenre.current,
        changePrevGenre,
        isError,
        setIsError
      }}
    >
      {children}
    </TalesFragmentsContext.Provider>
  )
}
