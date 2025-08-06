export default defineNuxtPlugin(() => {
  if (process.client) {
    // Lazy load images when they come into viewport
    const observeImages = () => {
      const images = document.querySelectorAll('img[data-src]')
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.src || ''
              img.classList.remove('lazy')
              imageObserver.unobserve(img)
            }
          })
        })

        images.forEach(img => imageObserver.observe(img))
      } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
          const image = img as HTMLImageElement
          image.src = image.dataset.src || ''
        })
      }
    }

    // Performance monitoring
    const measurePerformance = () => {
      if ('PerformanceObserver' in window) {
        // Measure Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          
          // Send to analytics or logging service
          console.info(`LCP: ${lastEntry.startTime}ms`)
        })
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Measure First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach(entry => {
            const fidEntry = entry as any // Type assertion for FID entry
            console.info(`FID: ${fidEntry.processingStart - fidEntry.startTime}ms`)
          })
        })
        
        fidObserver.observe({ entryTypes: ['first-input'] })
      }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        observeImages()
        measurePerformance()
      })
    } else {
      observeImages()
      measurePerformance()
    }
  }
})
