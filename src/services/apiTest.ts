import api from './api'

// Test API connectivity
export const testApiConnection = async () => {
  try {
    // Test basic API connection with a simple request
    const response = await api.get('/')
    console.log('API Base URL Test:', response)
    return { success: true, data: response }
  } catch (error: any) {
    console.log('API Connection Info:', {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText
    })
    return { success: false, error: error.message }
  }
}

// Test Google Maps API
export const testGoogleMapsApi = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    console.error('Google Maps API Key not found')
    return false
  }
  
  // Check if Google Maps script is loaded
  if (typeof window !== 'undefined' && window.google && window.google.maps) {
    console.log('Google Maps API loaded successfully')
    return true
  } else {
    console.log('Google Maps API not yet loaded')
    return false
  }
}

// Test environment variables
export const testEnvironmentConfig = () => {
  const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    socketUrl: import.meta.env.VITE_SOCKET_URL,
    googleMapsKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'Set' : 'Not Set',
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    kakaoAppKey: import.meta.env.VITE_KAKAO_APP_KEY,
    nodeEnv: import.meta.env.VITE_NODE_ENV,
    appName: import.meta.env.VITE_APP_NAME,
  }
  
  console.log('Environment Configuration:', config)
  return config
}

// Export all test functions
export const apiTests = {
  testApiConnection,
  testGoogleMapsApi,
  testEnvironmentConfig,
}
