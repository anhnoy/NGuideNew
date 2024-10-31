<template>
  <div>
    <footer class="bg-[#2F312A] p-8 md:px-10">
      <div class="card lg:h-[309px] flex flex-col md:flex-row justify-between lg:items-center space-y-6 md:space-y-0 ">
        <nav class="divide-y divide-[#5E5F61] md:w-[628px]  lg:w-[628px]">
          <div class="flex flex-col md:flex-row lg:items-center items-start  space-x-0 md:space-x-4">
            <img src="@/assets/icons/logo-footer.svg" alt="AutoN" class="mr-12 mt-2 hidden md:block" />

            <svg class="md:hidden md:block" width="80" height="34" viewBox="0 0 80 34" fill="none"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect width="80" height="34" fill="url(#pattern0_4541_844)" />
              <defs>
                <pattern id="pattern0_4541_844" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_4541_844" transform="matrix(0.00425 0 0 0.01 0.007 0)" />
                </pattern>
                <image id="image0_4541_844" width="232" height="100"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAABkCAYAAACM23zbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDMgNzkuMTY0NTI3LCAyMDIwLzEwLzE1LTE3OjQ4OjMyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTExLTI5VDE1OjEwOjIwKzA5OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0xMS0yOVQxNzowMjo0MyswOTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMS0yOVQxNzowMjo0MyswOTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNDU2NTJlZS0yOTA1LTgx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" />
              </defs>
            </svg>

            <div class="flex flex-wrap mt-3 lg:mt-12 dm:space-y-2 md:space-x-2 text-[#FFFFFF] text-sm">
              <span></span>
              <span class="mr-2 cursor-pointer">이용약관</span>
              <span class="text-[#8E8D8D] mr-2">|</span>
              <span class="font-bold cursor-pointer"> 개인정보 처리방침</span>
              <span class="text-[#8E8D8D] mx-2">|</span>
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                <span class="cursor-pointer">여행약관</span></a>

            </div>
          </div>

          <div class="w-full mt-5">
            <p class="text-xs text-[#8E8D8D] font-normal mt-5 ">
              사업자: 경기 안양시 만안구 전파로 24번길 63 | 상호명: 오토앤 주식회사
            </p>
            <p class="text-xs text-[#8E8D8D] font-normal mt-2">
              대표: 최찬욱 | 사업자등록번호: 138-81-72768 | 통신판매신고번호: 제2017-안양만안-0384호
            </p>
            <p class="text-xs text-[#8E8D8D] font-normal mt-2">
              개인정보보호책임자 : 이재엽 | 호스팅서비스사업자: 메가존클라우드(주)
            </p>

            <p class="text-xs text-[#8E8D8D] font-normal mt-5 ">COPYRIGHT Ⓒ AUTO& INCORPORATION ALL RIGHTS RESERVED.</p>
          </div>
        </nav>

        <nav>
          <h6 class="text-lg font-bold text-[#ffffff]">고객센터</h6>
          <ul class="mt-2 space-y-2">
            <li class="text-[#ffffff] text-2xl font-bold">1644-5053</li>
            <li class="text-[#8E8D8D] text-sm font-normal">운영시간: 평일 09:00~17:00</li>
            <li class="text-[#8E8D8D] text-sm font-normal">점심시간 12:00~13:00</li>
            <li class="text-[#8E8D8D] text-sm font-normal">토,일 및 공휴일 휴무</li>
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

.card {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
