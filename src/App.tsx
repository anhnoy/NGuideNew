import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AutonTour - 라오스 맞춤 여행</title>
        <meta name="description" content="견적부터 여행 종료까지 한 번에. 라오스 여행의 모든 순간을 함께하는 오토앤투어" />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
