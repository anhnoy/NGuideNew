import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types
interface User {
  id: string
  email: string
  name: string
}

interface AppState {
  // Loading states
  isLoading: boolean
  setLoading: (loading: boolean) => void

  // User state
  user: User | null
  setUser: (user: User | null) => void

  // UI state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Modal state
  modalOpen: boolean
  modalContent: React.ReactNode | null
  openModal: (content: React.ReactNode) => void
  closeModal: () => void

  // Search state
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Reset all state
  reset: () => void
}

const initialState = {
  isLoading: false,
  user: null,
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  searchQuery: '',
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setLoading: (loading) => set({ isLoading: loading }),

        setUser: (user) => set({ user }),

        setSidebarOpen: (open) => set({ sidebarOpen: open }),

        openModal: (content) => set({ modalOpen: true, modalContent: content }),
        closeModal: () => set({ modalOpen: false, modalContent: null }),

        setSearchQuery: (query) => set({ searchQuery: query }),

        reset: () => set(initialState),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          user: state.user,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
)
