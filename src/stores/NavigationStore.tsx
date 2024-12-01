import { createStore } from 'zustand/vanilla'
import { NavigationElement } from '@/types/NavigationElement'
import { v4 as uuid } from 'uuid'
import { buildTree } from '@/utils/buildTree'
import { persist } from 'zustand/middleware'
export type NavigationActions = {
    addNavigationElement: (element: Omit<NavigationElement, "id">) => void;
    removeNavigationElement: (id: string) => void;
    moveNavigationElement: (id: string, newParentId: string | null) => void;
    getTree: () => NavigationElement[];
}

export type NavigationStore = NavigationActions & {
    elements: NavigationElement[];
}

export const defaultInitState = {
    elements: []
}
export const initNavigationStore = (): {
  elements: NavigationElement[]
} => {
  return { elements: [] }
}
export const createNavigationStore = (
  initState: {
    elements: NavigationElement[]
  } = defaultInitState,
) => {
  return createStore<NavigationStore>()(
    persist(
    (set, get) => ({
    ...initState, 
    addNavigationElement: (element) =>
      set((state) => {
        const newElement: NavigationElement = ({ ...element, id: uuid() });
        return { elements: [...state.elements, newElement]}
      }),
    removeNavigationElement: (id) =>
      set((state) => ({
        elements: state.elements.filter(
          (el) => el.id !== id && el.parentId !== id
        ),
      })),
    moveNavigationElement: (id, newParentId) =>
      set((state) => ({
        elements: state.elements.map((el) =>
          el.id === id ? { ...el, parentId: newParentId } : el
        ),
      })),
    getTree: () => buildTree(get().elements),
    }),
    {
      name: 'navigation-store'
    }
  ))
}
