import React from 'react'

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-800 text-white py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">N가이드</h3>
            <p className="text-gray-300 mb-4">
              라오스 전문 여행사로, 고객 맞춤형 여행 서비스를 제공합니다.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>사업자등록번호: 123-45-67890</p>
              <p>관광사업등록번호: 제2023-00001호</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/about" className="hover:text-main transition-colors">
                  회사소개
                </a>
              </li>
              <li>
                <a href="/tours" className="hover:text-main transition-colors">
                  여행상품
                </a>
              </li>
              <li>
                <a href="/custom" className="hover:text-main transition-colors">
                  맞춤여행
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-main transition-colors">
                  자주묻는질문
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">고객센터</h3>
            <div className="space-y-2 text-gray-300">
              <p>전화: 02-1234-5678</p>
              <p>이메일: info@nguide.com</p>
              <p>운영시간: 평일 09:00 - 18:00</p>
              <p>점심시간: 12:00 - 13:00</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">소셜미디어</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-main transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-main transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-main transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.31-.62-.31-1.538c0-1.441.834-2.515 1.871-2.515.883 0 1.309.662 1.309 1.456 0 .887-.565 2.212-.854 3.442-.243 1.026.514 1.862 1.525 1.862 1.833 0 3.24-1.93 3.24-4.716 0-2.467-1.773-4.188-4.305-4.188-2.929 0-4.648 2.195-4.648 4.466 0 .883.341 1.829.766 2.343.084.102.096.19.071.295-.076.31-.245.994-.279 1.133-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.969-.527-2.292-1.155l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 N가이드. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
