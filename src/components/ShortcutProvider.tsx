import { createContext, useContext, useState } from 'react'

interface ShortcutContextType {
  searchOpen: boolean
  setSearchOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  helpOpen: boolean
  setHelpOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

const ShortcutContext = createContext<ShortcutContextType>({
  searchOpen: false,
  setSearchOpen: () => {},
  helpOpen: false,
  setHelpOpen: () => {},
})

export function ShortcutProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <ShortcutContext.Provider
      value={{
        searchOpen,
        setSearchOpen,
        helpOpen,
        setHelpOpen,
      }}
    >
      {children}
    </ShortcutContext.Provider>
  )
}

export function useShortcutContext() {
  return useContext(ShortcutContext)
}
