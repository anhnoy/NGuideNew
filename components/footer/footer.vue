<template>
  <div>
    <footer class="bg-[#2F312A] p-5 md:p-10">
      <div
        class="card lg:h-[309px] lg:max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0"
      >
        <nav
          class="divide-y divide-[#5E5F61] w-[755px] gap-[20px] hidden md:block"
        >
          <div class="flex flex-col items-start gap-[16px]">
            <div class="flex flex-wrap text-[#FFFFFF] text-sm">
              <span></span>
              <a href="https://web.travelover.co.kr/insu/info/abr" target="_blank" rel="noopener noreferrer">
                <span class="mr-2 cursor-pointer">회사소개</span></a
              >
              <span class="text-[#8E8D8D] mr-2">|</span>
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                <span class="mr-2 cursor-pointer">이용약관</span></a
              >
              <span class="text-[#8E8D8D] mr-2">|</span>
              <a href="/policy" target="_blank" rel="noopener noreferrer">
                <span class="cursor-pointer"> 개인정보 처리방침</span></a
              >
              <span class="text-[#8E8D8D] mx-2">|</span>
              <a href="/travel" target="_blank" rel="noopener noreferrer">
                <span class="cursor-pointer">여행약관</span></a
              >
              <span class="text-[#8E8D8D] mx-2">|</span>
              <a href="https://auton.kr/company/about" target="_blank" rel="noopener noreferrer">
                <span class="cursor-pointer">여행자 보험</span></a
              >
              <span class="text-[#8E8D8D] mx-2">|</span>
              <a
                href="/location-based"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="cursor-pointer">위치기반 서비스 이용약관</span></a
              >
            </div>
            <div class="flex items-center gap-3">
              <img src="@/assets/icons/logo-footer.svg" alt="AutoN" class="" />
              <img
                src="@/assets/icons/g11.png"
                alt=""
                class="w-[228px] h-[17px]"
              />
              <img
                src="@/assets/images/Lao-goverment.png"
                alt=""
                class="w-[65px] h-[59px]"
              />
            </div>
          </div>

          <div class="w-full mt-5">
            <p class="text-xs text-[#8E8D8D] font-normal mt-5">
              사업자: 경기 안양시 만안구 전파로 24번길 63 | 상호명: 오토앤
              주식회사
            </p>
            <p class="text-xs text-[#8E8D8D] font-normal mt-2">
              대표: 최찬욱 | 사업자등록번호: 138-81-72768 | 통신판매신고번호:
              제2017-안양만안-0384호
            </p>
            <p class="text-xs text-[#8E8D8D] font-normal mt-2">
              개인정보보호책임자 : 이재엽 | 호스팅서비스사업자 : SU소프트
            </p>

            <p class="text-xs text-[#8E8D8D] font-normal mt-5">
              COPYRIGHT Ⓒ AUTO& INCORPORATION ALL RIGHTS RESERVED.
            </p>
          </div>
        </nav>

        <nav
          class="hidden items-start justify-start h-[159px] w-[465px] md:block"
        >
          <h6 class="text-lg font-bold text-center text-[#ffffff]">
            Follow us
          </h6>
          <div class="flex items-center justify-center gap-3 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=61568555282237"
              target="_blank"
              class="transition-transform duration-300 hover:scale-110"
            >
              <img
                src="@/assets/icons/facebook-footer.svg"
                alt="facebook"
                title="페이스북"
                class="w-[24px] h-[24px]"
              />
            </a>
            <a
              href="https://www.instagram.com/autontour_/"
              target="_blank"
              class="transition-transform duration-300 hover:scale-110"
            >
              <img
                src="@/assets/icons/ig-footer.svg"
                alt="Instagram"
                title="인스타그램"
                class="w-[24px] h-[24px]"
              />
            </a>
          </div>
        </nav>
        <nav class="hidden md:block">
          <h6 class="text-lg font-bold text-[#ffffff]">고객센터</h6>
          <ul class="mt-2 space-y-2">
            <li class="text-[#ffffff] text-2xl font-bold">1644-5053</li>
            <li class="text-[#8E8D8D] text-sm font-normal">
              운영시간: 평일 09:00~17:00
            </li>
            <li class="text-[#8E8D8D] text-sm font-normal">
              점심시간 12:00~13:00
            </li>
            <li class="text-[#8E8D8D] text-sm font-normal">
              토,일 및 공휴일 휴무
            </li>
          </ul>
        </nav>

        <!-- mobile -->
        <nav
          class="divide-y divide-[#5E5F61] md:w-[628px] lg:w-[628px] md:hidden"
        >
          <div class="flex flex-col items-start space-x-0">
            <div class="flex flex-wrap mt-3 text-[#FFFFFF] text-sm">
              <span></span>
              <a href="https://web.travelover.co.kr/insu/info/abr" target="_blank" rel="noopener noreferrer">
                <span class="mr-2 cursor-pointer">회사소개</span></a
              >
              <span class="text-[#8E8D8D] mr-2">|</span>
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                <span class="mr-2 cursor-pointer">이용약관</span></a
              >
              <span class="text-[#8E8D8D] mr-2">|</span>
              <a href="/policy" target="_blank" rel="noopener noreferrer">
                <span class="cursor-pointer"> 개인정보 처리방침</span></a
              >
              <span class="text-[#8E8D8D] mx-2">|</span>
              <a href="/travel" target="_blank" rel="noopener noreferrer" class="mt-2">
                <span class="ursor-pointer ">여행약관</span></a
              >
              <span class="text-[#8E8D8D] mx-2 mt-2">|</span>
              <a href="https://auton.kr/company/about" target="_blank" rel="noopener noreferrer" class="mt-2">
                <span class="cursor-pointer">여행자 보험</span></a
              >
              <span class="text-[#8E8D8D] mx-2 mt-2">|</span>
              <a
                href="/location-based"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-2"
              >
                <span class="cursor-pointer">위치기반 서비스 이용약관</span></a
              >
            </div>
            <div class="flex items-center gap-[10px] mx-auto">
              <img
                src="@/assets/icons/logo-footer.svg"
                alt="AutoN"
                class="mt-5 w-[80px]"
              />
              <img
                src="@/assets/icons/g10.svg"
                alt=""
                class="w-[55px] h-[30px] mt-6"
              />
              <img
                src="@/assets/images/Lao-goverment.png"
                alt=""
                class="w-[37px] h-[34px] mt-7"
              />
              <a
                href="https://www.facebook.com/profile.php?id=61568555282237"
                target="_blank"
              >
                <img
                  src="@/assets/icons/facebook-footer.svg"
                  alt="facebook"
                  class="w-[24px] h-[24px] mt-7"
                />
              </a>
              <a href="https://www.instagram.com/autontour_/" target="_blank">
                <img
                  src="@/assets/icons/ig-footer.svg"
                  alt=""
                  class="w-[24px] h-[24px] mt-7"
                />
              </a>
            </div>
          </div>

          <div class="w-full mt-5">
            <p class="text-xs text-[#8E8D8D] font-normal mt-5">
              사업자: 경기 안양시 만안구 전파로 24번길 63 | 상호명: 오토앤
              주식회사
            </p>
            <p class="text-xs text-[#8E8D8D] font-normal mt-2">
              대표: 최찬욱 | 사업자등록번호: 138-81-72768
            </p>
            <p class="text-xs text-[#8E8D8D] font-normal mt-2">
              통신판매신고번호: 제2017-안양만안-0384호 |
            </p>
            <p class="text-xs text-[#8E8D8D] font-normal mt-2">
              개인정보보호책임자: 이재엽 | 호스팅서비스사업자 : SU소프트
            </p>

            <p class="text-xs text-[#8E8D8D] font-normal mt-5">
              COPYRIGHT Ⓒ AUTO& INCORPORATION ALL RIGHTS RESERVED.
            </p>
          </div>
        </nav>
        <nav class="md:hidden">
          <ul class="mt-2 space-y-2">
            <li class="text-[#ffffff] text-2xl font-bold">1644-5053</li>
            <li class="text-[#8E8D8D] text-sm font-normal">
              <span>운영시간</span>
              <span class="ml-4">평일 10:00~17:00 | 점심시간 12:00~13:00</span>
              <span class="block ml-16">(토,일요일 및 공휴일 휴무)</span>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script></script>

<style scoped>
@media (max-width: 768px) {
  footer nav {
    text-align: left;
  }

  .mdi {
    font-size: 1.5rem;
  }
}

/* .card {
  max-width: 1280px;
  margin: 0 auto;
} */
</style>
