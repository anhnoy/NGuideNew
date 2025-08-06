import React, { useState, useEffect } from 'react'
import { apiTests } from '../../services/apiTest'

const ApiStatus: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<any>(null)
  const [envConfig, setEnvConfig] = useState<any>(null)
  const [googleMapsStatus, setGoogleMapsStatus] = useState<boolean>(false)

  useEffect(() => {
    // Test environment configuration
    const config = apiTests.testEnvironmentConfig()
    setEnvConfig(config)

    // Test Google Maps
    const googleTest = apiTests.testGoogleMapsApi()
    setGoogleMapsStatus(googleTest)

    // Test API connection
    const testApi = async () => {
      const result = await apiTests.testApiConnection()
      setApiStatus(result)
    }
    testApi()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm z-50 border">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">🔧 API Status</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>API Base:</span>
          <span className={apiStatus?.success ? 'text-green-600' : 'text-red-600'}>
            {apiStatus?.success ? '✓ Connected' : '✗ Error'}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Google Maps:</span>
          <span className={googleMapsStatus ? 'text-green-600' : 'text-yellow-600'}>
            {googleMapsStatus ? '✓ Loaded' : '⏳ Loading'}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Environment:</span>
          <span className="text-blue-600">
            {envConfig?.nodeEnv || 'dev'}
          </span>
        </div>

        <div className="flex justify-between">
          <span>App Name:</span>
          <span className="text-gray-700">
            {envConfig?.appName || 'N/A'}
          </span>
        </div>
      </div>

      <details className="mt-2">
        <summary className="text-xs text-gray-500 cursor-pointer">Details</summary>
        <div className="mt-2 text-xs bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
          <pre>{JSON.stringify({ envConfig, apiStatus }, null, 2)}</pre>
        </div>
      </details>
    </div>
  )
}

export default ApiStatus
