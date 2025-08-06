import React from 'react'

interface TopAreaCardProps {
  className?: string
}

const TopAreaCard: React.FC<TopAreaCardProps> = ({ className = '' }) => {
  return (
    <div className={`hidden mx-auto lg:w-full sm:block lg:flex ${className}`}>
      {/* Green Fixed Left Panel (720px) */}
      <div className="w-[720px] h-[900px] bg-[#3B6333] text-white flex flex-col">
        <div className="flex items-center justify-end gap-4 px-10 py-12 top-6 right-6">
          <img
            src="/assets/images/Lao_travel.png"
            alt="Laos Logo"
            className="w-[24px] h-[24px] lg:w-[60px] lg:h-[57.9px] object-contain"
          />
          <img
            src="/assets/images/Thai_travel.png"
            alt="Company Logo"
            className="w-[24px] h-[24px] lg:w-[50px] lg:h-[50px] object-contain"
          />
        </div>
        
        <div className="flex items-center justify-end h-screen gap-[60px] pr-20">
          <div className="w-[347px] h-[336px] flex flex-col justify-end">
            <div className="mb-10 text-[50px] w-[288px] h-[132px] font-medium">
              오토앤투어는
              <span className="font-light"> '안전'합니다. </span>
            </div>
            
            <div className="text-sm leading-7">
              <div className="h-[44px] w-[347px] text-[16px] mb-5 font-light text-[#E9F5FF]">
                · 라오스 현지 자회사를 운영하여​ 긴급한 문제 발생 시 현지 직원들의
                <span className="font-bold"> 24시간 케어 </span>
                가 가능합니다.
              </div>
              
              <div className="h-[44px] w-[347px] text-[16px] mb-8 font-light text-[#E9F5FF]">
                · 앤가이드 어플을 통해
                <span className="font-bold"> 실시간으로 가이드</span>와 <br />
                연락 가능합니다.
              </div>
            </div>
            
            <a
              href="https://auton.kr/company/about"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 h-[22px] text-[16px] items-start font-light text-[#E9F5FF] cursor-pointer gap-1 flex"
            >
              오토앤 회사소개
              <img
                src="/assets/icons/arr_right.png"
                alt="arr_right"
                className="w-[8px] h-[12px]"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Right side with swiper/carousel */}
      <div className="flex-1 relative overflow-hidden">
        {/* This would contain the image slider/carousel */}
        <div className="w-full h-[900px] bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">아름다운 라오스 여행</h2>
            <p className="text-xl">당신만의 특별한 여행을 계획하세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopAreaCard
