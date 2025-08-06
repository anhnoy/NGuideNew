import React from 'react'

interface IntroAreaProps {
  className?: string
}

const IntroArea: React.FC<IntroAreaProps> = ({ className = '' }) => {
  return (
    <div className={`container mx-auto px-4 py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-textmain mb-4">
          라오스 맞춤 여행의 새로운 기준
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          100% 맞춤형 라오스 여행! 당신만의 특별한 여행을 계획하세요.
          전문 가이드와 함께하는 안전하고 편안한 여행을 약속드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-main rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-textmain mb-2">100% 맞춤 여행</h3>
          <p className="text-gray-600">
            고객의 취향과 예산에 맞춘 완전 맞춤형 여행 계획을 제공합니다.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-sub rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-textmain mb-2">24시간 현지 케어</h3>
          <p className="text-gray-600">
            라오스 현지 자회사 운영으로 24시간 안전하고 빠른 현지 지원이 가능합니다.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-btn rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-textmain mb-2">실시간 가이드 연결</h3>
          <p className="text-gray-600">
            앤가이드 앱을 통해 실시간으로 전문 가이드와 소통할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default IntroArea
