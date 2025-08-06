import React from 'react'

interface AppAreaMainProps {
  className?: string
}

const AppAreaMain: React.FC<AppAreaMainProps> = ({ className = '' }) => {
  return (
    <div className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-textmain mb-4">
            모바일 앱으로 더 편리하게
          </h2>
          <p className="text-lg text-gray-600">
            N가이드 모바일 앱을 다운로드하여 언제 어디서나 여행 계획을 세워보세요
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-main rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-textmain mb-2">
                    개인 맞춤 추천
                  </h3>
                  <p className="text-gray-600">
                    당신의 취향에 맞는 여행지와 액티비티를 추천해드립니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-sub rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-textmain mb-2">
                    실시간 예약 확인
                  </h3>
                  <p className="text-gray-600">
                    예약 현황을 실시간으로 확인하고 관리할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-main rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-textmain mb-2">
                    오프라인 지도
                  </h3>
                  <p className="text-gray-600">
                    인터넷 연결 없이도 지도를 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="btn-primary">
                App Store
              </button>
              <button className="btn-secondary">
                Google Play
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="w-64 h-96 mx-auto bg-gray-200 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                  </svg>
                  <p>앱 스크린샷</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppAreaMain
