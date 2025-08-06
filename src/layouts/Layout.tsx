import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import KakaoChat from '../components/KakaoChat'

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <KakaoChat />
    </div>
  )
}

export default Layout
