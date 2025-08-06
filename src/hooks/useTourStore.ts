import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Types
interface Tour {
  id: string
  name: string
  description: string
  price: number
  image: string
  attractions: any[]
}

interface TourState {
  tours: Tour[]
  attractions: any[]
  filterCity: any[]
  totalCity: number
  loading: boolean
  error: string | null
  
  // Actions
  getTourAttraction: (laid: string) => Promise<void>
  getDetailTour: (laid: string) => Promise<any>
  getFilterCity: (params: any) => Promise<void>
  clearError: () => void
}

// API functions (will be moved to services)
const api = {
  async getTourAttraction(laid: string) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tour-attraction/${laid}`)
    if (!response.ok) throw new Error('Failed to fetch tour attraction')
    return response.json()
  },
  
  async getDetailTour(laid: string) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tour/${laid}`)
    if (!response.ok) throw new Error('Failed to fetch tour details')
    return response.json()
  },
  
  async getFilterCity(params: any) {
    const queryParams = new URLSearchParams(params)
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/filter-city?${queryParams}`)
    if (!response.ok) throw new Error('Failed to fetch filtered cities')
    return response.json()
  }
}

// Create the store
export const useTourStore = create<TourState>()(
  devtools(
    (set, get) => ({
      tours: [],
      attractions: [],
      filterCity: [],
      totalCity: 0,
      loading: false,
      error: null,

      getTourAttraction: async (laid: string) => {
        set({ loading: true, error: null })
        try {
          const response = await api.getTourAttraction(laid)
          if (response.status === 200 && response.data) {
            set({ attractions: response.data, loading: false })
          } else {
            throw new Error('Failed to fetch tour attraction')
          }
        } catch (error: any) {
          set({ 
            attractions: [], 
            loading: false, 
            error: error.message 
          })
          console.error('Tour Attraction Error:', error.message)
        }
      },

      getDetailTour: async (laid: string) => {
        set({ loading: true, error: null })
        try {
          const response = await api.getDetailTour(laid)
          set({ loading: false })
          if (response.status === 200 && response.data) {
            return response.data
          } else {
            throw new Error('Failed to fetch detail tour')
          }
        } catch (error: any) {
          set({ loading: false, error: error.message })
          console.error('Error fetching tour details:', error)
          throw error
        }
      },

      getFilterCity: async (params: any) => {
        set({ loading: true, error: null })
        try {
          const response = await api.getFilterCity(params)
          if (response.status === 200 && response.data) {
            const data = response.data.rows || []
            set({ 
              totalCity: response.data.count,
              loading: false 
            })

            if (data.length === 0) {
              set({ filterCity: [] })
              console.info('No cities found.')
              return
            }

            // Process image data
            data.forEach((img: any) => {
              if (img.tourism_attr_imgs && img.tourism_attr_imgs.length > 0) {
                let index = img.tourism_attr_imgs.findIndex(
                  (it: any) => it.is_profile === 'Y'
                )
                index = index === -1 ? 0 : index
                img.image = img.tourism_attr_imgs[index].img_url
              } else {
                img.image = '/default-tour-image.jpg'
              }
            })

            set({ filterCity: data })
          } else {
            set({ filterCity: [] })
            throw new Error('Failed to fetch tour filter city')
          }
        } catch (error: any) {
          set({ 
            filterCity: [], 
            loading: false, 
            error: error.message 
          })
          console.error('Tour Filter Error:', error)
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'tour-store',
    }
  )
)
