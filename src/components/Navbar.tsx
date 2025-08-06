import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  className?: string
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const menuItems = [
    { name: '홈', path: '/' },
    { name: '여행 상품', path: '/tours' },
    { name: '맞춤 견적', path: '/quotation' },
    { name: '이벤트', path: '/events' },
    { name: '문의하기', path: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    } ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://autontour.com/assets/images/Logo_AutonTour.png?v2"
              alt="Auto&Tour"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-main hidden sm:block">
              Auto&Tour
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-main ${
                  location.pathname === item.path
                    ? 'text-main border-b-2 border-main'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              to="/quotation"
              className="btn-primary text-sm"
            >
              무료 견적 받기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-6 h-6 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 토글"
          >
            <span className="sr-only">메뉴 열기</span>
            <div className="w-6 h-6 relative">
              <motion.span
                className="absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 8 : 0,
                }}
              />
              <motion.span
                className="absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out translate-y-2"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <motion.span
                className="absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out translate-y-4"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -8 : 0,
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-main bg-main/10'
                        : 'text-gray-700 hover:text-main hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 pt-2">
                  <Link
                    to="/quotation"
                    className="btn-primary w-full text-center block"
                  >
                    무료 견적 받기
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
