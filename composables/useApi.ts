import logger from '~/services/logger.service'

// Simple wrapper for API calls with better error handling
export const useApiCall = async <T>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    headers?: Record<string, string>
  } = {}
) => {
  const config = useRuntimeConfig()
  const { method = 'GET', body, headers = {} } = options
  
  // Add auth token if available
  if (process.client && localStorage.getItem('accessToken')) {
    headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
  }

  try {
    const response = await $fetch<T>(url, {
      baseURL: config.public.apiBaseUrl,
      method,
      body,
      headers,
      onRequest({ request, options }) {
        logger.debug('API Request:', { url: request, method, headers })
      },
      onRequestError({ request, error }) {
        logger.error('API Request Error:', { url: request, error })
      },
      onResponse({ request, response }) {
        logger.debug('API Response:', { 
          url: request, 
          status: response.status,
          statusText: response.statusText 
        })
      },
      onResponseError({ request, response }) {
        logger.error('API Response Error:', { 
          url: request, 
          status: response.status,
          statusText: response.statusText
        })
      }
    })

    return { data: response, error: null }
  } catch (error: any) {
    logger.error('API Call failed:', { url, error })
    return { data: null, error }
  }
}

// Specific methods for common API patterns
export const useApiGet = <T>(url: string, headers?: Record<string, string>) => {
  return useApiCall<T>(url, { method: 'GET', headers })
}

export const useApiPost = <T>(url: string, body?: any, headers?: Record<string, string>) => {
  return useApiCall<T>(url, { method: 'POST', body, headers })
}

export const useApiPut = <T>(url: string, body?: any, headers?: Record<string, string>) => {
  return useApiCall<T>(url, { method: 'PUT', body, headers })
}

export const useApiDelete = <T>(url: string, headers?: Record<string, string>) => {
  return useApiCall<T>(url, { method: 'DELETE', headers })
}
