import React from 'react'

interface EventMainPageProps {
  className?: string
}

const EventMainPage: React.FC<EventMainPageProps> = ({ className = '' }) => {
  return (
    <div className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-textmain mb-4">
            특별한 이벤트
          </h2>
          <p className="text-lg text-gray-600">
            지금 진행 중인 특별한 이벤트와 할인 혜택을 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-main to-sub"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-textmain mb-2">
                라오스 여행 특가 이벤트
              </h3>
              <p className="text-gray-600 mb-4">
                지금 예약하면 최대 30% 할인 혜택을 받을 수 있습니다.
              </p>
              <button className="btn-primary">자세히 보기</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-textmain mb-2">
                태국 여행 패키지
              </h3>
              <p className="text-gray-600 mb-4">
                태국의 아름다운 관광지를 둘러보는 특별한 패키지
              </p>
              <button className="btn-primary">자세히 보기</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-textmain mb-2">
                신규 회원 혜택
              </h3>
              <p className="text-gray-600 mb-4">
                신규 회원 가입 시 특별한 할인 쿠폰을 드립니다.
              </p>
              <button className="btn-primary">자세히 보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventMainPage
