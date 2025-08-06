import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

// Import components (these will need to be created/converted)
import Navbar from '../components/navbar/Navbar'
import TopAreaCard from '../components/topArea/TopAreaCard'
import IntroArea from '../components/introductionArea/IntroArea'
import EventMainPage from '../components/event-main-page/EventMainPage'
import AppAreaMain from '../components/appAreaMain/AppAreaMain'
import Footer from '../components/footer/Footer'
import ButtonKAKAO from '../components/kakao/ButtonKAKAO'
import ApiStatus from '../components/debug/ApiStatus'

// Import API tests
import { apiTests } from '../services/apiTest'

const Home: React.FC = () => {
  useEffect(() => {
    // Test API and configuration on component mount
    console.log('🚀 Testing API and Configuration...')
    
    // Test environment variables
    const envConfig = apiTests.testEnvironmentConfig()
    console.log('Environment Config:', envConfig)
    
    // Test Google Maps API
    const googleMapsTest = apiTests.testGoogleMapsApi()
    console.log('Google Maps API Test:', googleMapsTest)
    
    // Test API connection (with timeout)
    const testApiWithTimeout = async () => {
      try {
        const apiTest = await apiTests.testApiConnection()
        console.log('API Connection Test:', apiTest)
      } catch (error) {
        console.log('API Test Error (Expected if API not accessible):', error)
      }
    }
    
    testApiWithTimeout()
  }, [])
  return (
    <>
      <Helmet>
        <title>autontour</title>
        <meta 
          name="naver-site-verification" 
          content="8eaa0adf55c96d5b0b83954be26d188fa8aa6866" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="description" 
          content="견적부터 여행 종료까지 한 번에. 라오스 여행의 모든 순간을 함께하는 오토앤투어" 
        />
        <meta name="robots" content="index, follow" />
        <meta 
          property="og:title" 
          content="라오스 맞춤 여행, 태국 맞춤 여행 - 오토앤투어" 
        />
        <meta 
          property="og:description" 
          content="100% 맞춤형 라오스여행! 태국여행! 당신만의 특별한 여행을 계획하세요" 
        />
        <meta 
          property="og:image" 
          content="https://autontour.com/assets/images/AutonTour_logo.png" 
        />
        <meta property="og:url" content="https://autontour.com/" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {/* <BannerMain /> */}
          <TopAreaCard />

          <div className="my-[40px]">
            {/* <GetTravel /> */}
            <IntroArea />
          </div>
          
          {/* <div className="my-14 flex justify-center bg-[#EEF9FF]"> */}
          <EventMainPage className="mb-10" />
          {/* <quotationIntroArea /> */}
          {/* </div> */}
          
          <AppAreaMain className="mb-10" />
          {/* <BannerSub /> */}

          {/* <IntroductionLao /> */}
          {/* <Journey /> */}
        </main>

        <Footer />
        <ButtonKAKAO />
      </div>

      {/* API Status Debug Component (only in development) */}
      {import.meta.env.VITE_NODE_ENV !== 'production' && <ApiStatus />}
    </>
  )
}

export default Home
