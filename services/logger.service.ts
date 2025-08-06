/**
 * Logger Service
 * Centralized logging service for the application
 */

class LoggerService {
  private isDevelopment = process.env.NODE_ENV === 'development'

  info(message: string, data?: any) {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data || '')
    }
    // In production, send to monitoring service
    this.sendToMonitoring('info', message, data)
  }

  warn(message: string, data?: any) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data || '')
    }
    this.sendToMonitoring('warn', message, data)
  }

  error(message: string, error?: any) {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error || '')
    }
    this.sendToMonitoring('error', message, error)
  }

  debug(message: string, data?: any) {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data || '')
    }
  }

  private sendToMonitoring(level: string, message: string, data?: any) {
    // TODO: Implement monitoring service integration
    // Example: Send to Sentry, LogRocket, or custom monitoring
    if (typeof window !== 'undefined' && level === 'error') {
      // Could send to error tracking service here
    }
  }
}

export const logger = new LoggerService()
export default logger
