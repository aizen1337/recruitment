'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type NavigationStore,
  createNavigationStore,
  initNavigationStore,
} from '@/stores/NavigationStore'

export type NavigationStoreApi = ReturnType<typeof createNavigationStore>

export const NavigationStoreContext = createContext<NavigationStoreApi | undefined>(
  undefined,
)

export interface NavigationStoreProviderProps {
  children: ReactNode
}

export const NavigationStoreProvider = ({
  children,
}: NavigationStoreProviderProps) => {
  const storeRef = useRef<NavigationStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createNavigationStore(initNavigationStore())
  }

  return (
    <NavigationStoreContext.Provider value={storeRef.current}>
      {children}
    </NavigationStoreContext.Provider>
  )
}

export const useNavigationStore = <T,>(
  selector: (store: NavigationStore) => T,
): T => {
  const navigationStoreContext = useContext(NavigationStoreContext)

  if (!NavigationStoreContext) {
    throw new Error(`useNavigationStore must be used within NavigationStoreProvider`)
  }

  return useStore(navigationStoreContext!, selector)
}
