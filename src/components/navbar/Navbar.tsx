import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface NavbarProps {
  className?: string
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const getActiveClass = (path: string) => {
    return location.pathname === path 
      ? 'text-[#6EBC30] font-semibold' 
      : 'text-[#2F312A]'
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleHome = () => {
    navigate('/')
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleFetch = (page: number, type: number) => {
    // TODO: Implement fetch logic for tourist attractions
    console.log('Fetching data:', { page, type })
  }

  const fetchFaq = (page: number, category: string) => {
    // TODO: Implement FAQ fetch logic
    console.log('Fetching FAQ:', { page, category })
  }

  return (
    <div>
      <header
        className={`border-b border-[#A8A3A3] lg:h-[91px] ${
          isMobileMenuOpen ? 'no-interaction' : ''
        } ${className}`}
      >
        <div className="card">
          <div className="flex justify-between h-[80px] items-center">
            {/* Logo */}
            <div
              onClick={handleHome}
              className="flex items-center p-4 transition-transform duration-300 md:p-0 hover:scale-110"
            >
              <img
                src="/assets/images/auton_new_logo.png"
                title="Home"
                className="w-[84px] h-[30px] cursor-pointer md:w-36 lg:w-[117px] lg:h-[43px]"
                alt="Auto&Tour Logo"
              />
            </div>

            <div className="hidden lg:block">
              <ul
                onMouseEnter={handleMouseEnter}
                className="flex items-center space-x-12 text-base text-[#2F312A] cursor-pointer"
              >
                <Link
                  to="/"
                  className={`${getActiveClass('/')} hover:text-[#6EBC30]`}
                >
                  {/* Home */}
                </Link>
                
                <Link
                  to="/customized-travel"
                  className={`${getActiveClass('/customized-travel')} hover:text-[#6EBC30]`}
                >
                  <li className="hover:text-[#6EBC30]">맞춤여행 문의하기</li>
                </Link>
                
                <Link
                  to="/private-packages"
                  className={`${getActiveClass('/private-packages')} hover:text-[#6EBC30]`}
                >
                  <li className="hover:text-[#6EBC30]">단독패키지 예약하기</li>
                </Link>
                
                <Link
                  to="/introduction"
                  className={`${getActiveClass('/introduction')} hover:text-[#6EBC30]`}
                  onClick={() => handleFetch(1, 1)}
                >
                  <li className="hover:text-[#6EBC30]">관광지 소개</li>
                </Link>
                
                <Link
                  to="/faq"
                  className={`${getActiveClass('/faq')} hover:text-[#6EBC30]`}
                  onClick={() => fetchFaq(1, '자주 묻는 질문')}
                >
                  <li className="hover:text-[#6EBC30]">여행 정보</li>
                </Link>
                
                <Link
                  to="/login-quotation"
                  className={`${getActiveClass('/login-quotation')} hover:text-[#6EBC30]`}
                >
                  <button className="text-[#6EBC30] border border-[#6EBC30] text-sm font-normal rounded-full px-3 py-1 flex items-center hover:bg-[#00000010]">
                    <img
                      src="/assets/icons/paper.svg"
                      className="w-3.5 mx-2"
                      alt=""
                    />
                    견적서 조회
                  </button>
                </Link>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="block lg:hidden btn btn-square btn-ghost"
              onClick={toggleMobileMenu}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5.33333C3 4.59695 3.59695 4 4.33333 4H19.6667C20.403 4 21 4.59695 21 5.33333C21 6.06971 20.403 6.66667 19.6667 6.66667H4.33333C3.59695 6.66667 3 6.06971 3 5.33333ZM3 12C3 11.2636 3.59695 10.6667 4.33333 10.6667H19.6667C20.403 10.6667 21 11.2636 21 12C21 12.7364 20.403 13.3333 19.6667 13.3333H4.33333C3.59695 13.3333 3 12.7364 3 12ZM3 18.6667C3 17.9303 3.59695 17.3333 4.33333 17.3333H19.6667C20.403 17.3333 21 17.9303 21 18.6667C21 19.403 20.403 20 19.6667 20H4.33333C3.59695 20 3 19.403 3 18.6667Z"
                  fill="#132D5C"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hover Menu */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`bg-[#2F312A] h-36 hidden md:block smooth-transition absolute top-18 right-0 left-0 z-50 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="mx-auto card">
            <div className="flex justify-end">
              <ul className="flex mt-5 space-x-16 text-[#FFFFFF] font-normal text-sm text-center cursor-pointer">
                <Link to="/">
                  {/* Home */}
                </Link>
                
                <Link to="/customized-travel">
                  <li className="hover:text-[#6EBC30]">맞춤여행 문의하기</li>
                </Link>
                
                <Link to="/private-packages">
                  <li className="hover:text-[#6EBC30]">단독패키지 예약하기</li>
                </Link>
                
                <Link to="/introduction">
                  <li className="hover:text-[#6EBC30]">관광지 소개</li>
                </Link>
                
                <Link to="/faq">
                  <li className="hover:text-[#6EBC30]">여행 정보</li>
                </Link>
                
                <Link to="/login-quotation">
                  <li className="hover:text-[#6EBC30]">견적서 조회</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#A8A3A3] shadow-lg">
          <div className="px-4 py-2">
            <div className="flex flex-col space-y-2">
              <Link
                to="/customized-travel"
                className="block px-3 py-2 text-[#2F312A] hover:text-[#6EBC30] hover:bg-gray-50 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                맞춤여행 문의하기
              </Link>
              
              <Link
                to="/private-packages"
                className="block px-3 py-2 text-[#2F312A] hover:text-[#6EBC30] hover:bg-gray-50 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                단독패키지 예약하기
              </Link>
              
              <Link
                to="/introduction"
                className="block px-3 py-2 text-[#2F312A] hover:text-[#6EBC30] hover:bg-gray-50 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                관광지 소개
              </Link>
              
              <Link
                to="/faq"
                className="block px-3 py-2 text-[#2F312A] hover:text-[#6EBC30] hover:bg-gray-50 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                여행 정보
              </Link>
              
              <Link
                to="/login-quotation"
                className="block px-3 py-2 text-[#6EBC30] border border-[#6EBC30] rounded-full text-center mx-3 mt-4 hover:bg-[#00000010]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                견적서 조회
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
