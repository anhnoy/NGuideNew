import logger from '~/services/logger.service'

export default defineNuxtPlugin(() => {
  // Global error handler for unhandled promise rejections
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      logger.error('Unhandled promise rejection:', event.reason)
      // Prevent the default browser behavior
      event.preventDefault()
    })

    // Global error handler for JavaScript errors
    window.addEventListener('error', (event) => {
      logger.error('Global JavaScript error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      })
    })
  }

  // Vue error handler
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    logger.error('Vue error:', {
      error: error.toString(),
      info,
      componentName: instance?.$options.name || 'Unknown'
    })
  }
})
