import api from './api'

// Tour Services
const tourService = {
  // Get all tours
  getAllTours: async () => {
    return await api.get('/tours')
  },

  // Get tour by ID
  getTourById: async (id: string) => {
    return await api.get(`/tours/${id}`)
  },

  // Search tours
  searchTours: async (params: {
    destination?: string
    duration?: string
    priceRange?: string
    category?: string
  }) => {
    return await api.get('/tours/search', { params })
  },
}

// Quotation Services
const quotationService = {
  // Create new quotation
  createQuotation: async (data: any) => {
    return await api.post('/quotations', data)
  },

  // Get quotation by ID
  getQuotation: async (id: string) => {
    return await api.get(`/quotations/${id}`)
  },

  // Update quotation
  updateQuotation: async (id: string, data: any) => {
    return await api.put(`/quotations/${id}`, data)
  },
}

// Region Services
const regionService = {
  // Get all regions
  getAllRegions: async () => {
    return await api.get('/regions')
  },

  // Get attractions by region
  getAttractionsByRegion: async (regionId: string) => {
    return await api.get(`/regions/${regionId}/attractions`)
  },
}

// FAQ Services  
const faqService = {
  // Get all FAQs
  getAllFaqs: async () => {
    return await api.get('/faqs')
  },

  // Get FAQ by category
  getFaqsByCategory: async (category: string) => {
    return await api.get(`/faqs/category/${category}`)
  },
}

// Event Services
const eventService = {
  // Get all events
  getAllEvents: async () => {
    return await api.get('/events')
  },

  // Get active events
  getActiveEvents: async () => {
    return await api.get('/events/active')
  },
}

// Export all services
export {
  tourService,
  quotationService,
  regionService,
  faqService,
  eventService,
}
