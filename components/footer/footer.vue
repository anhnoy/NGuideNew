<template>
  <div>
    <footer class="bg-[#132D5C] p-8 md:p-10">
      <div
        class="container mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0"
      >
        <nav class="flex-[1.8] divide-y-2 divide-[#5E5F61]">
          <div
            class="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4"
          >
            <img
              src="@/assets/icons/auton.png"
              alt="Auton"
              class="mr-0 md:mr-12 mb-4 md:mb-0 w-20 lg:w-32"
            />
            <div
              class="flex flex-wrap mt-0 lg:mt-7 dm:space-y-2 md:space-x-2 text-[#FFFFFF] text-sm"
            >
              <span></span>
              <span class="mr-2">이용약관</span>
              <span class="text-[#8E8D8D] mr-2">|</span>
              <span>개인정보 수집 및 이용 동의</span>
              <span class="text-[#8E8D8D] mx-2">|</span>
              <span>개인정보 처리방침</span>
            </div>
          </div>

          <div class="w-5/6 mt-5">
            <p class="text-xs text-[#8E8D8D] font-normal mt-5">
              사업자: 경기 안양시 만안구 전파로 24번길 63 | 상호명: 오토앤
              주식회사 대표: 최찬욱 | 사업자등록번호: 138-81-72768 |
              통신판매신고번호: 제2017-안양만안-0384호 개인정보보호책임자:
              전은석 | 호스팅서비스사업자: 메가존클라우드(주)
            </p>
          </div>
        </nav>

        <nav class="flex-1">
          <h6 class="text-lg font-bold text-[#ffffff]">Follow us</h6>
          <ul class="mt-4 flex items-center space-x-4">
            <li>
              <img src="@/assets/icons/instagram.svg" alt="" />
            </li>
            <li>
              <img src="@/assets/icons/youtube.svg" alt="" />
            </li>
            <li>
              <img src="@/assets/icons/blog.png" alt="" />
            </li>
            <li>
              <img src="@/assets/icons/play.png" alt="" />
            </li>
          </ul>
        </nav>

        <nav>
          <h6 class="text-lg font-bold text-[#ffffff]">고객센터</h6>
          <ul class="mt-2 space-y-2">
            <li class="text-[#ffffff] text-xl font-bold">1644-6167</li>
            <li class="text-[#8E8D8D]">운영시간: 평일 09:00~17:00</li>
            <li class="text-[#8E8D8D]">점심시간 12:00~13:00</li>
            <li class="text-[#8E8D8D]">토,일 및 공휴일 휴무</li>
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
</style>
