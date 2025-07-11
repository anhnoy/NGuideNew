<template>
  <div class="hidden w-full flex- sm:block lg:flex ]">
    <!-- ✅ Green Fixed Left Panel (720px) -->

    <div class="w-[720px] h-[900px] bg-[#3B6333] text-white flex flex-col">
      <div
        class="flex items-center justify-end gap-4 px-10 py-12 top-6 right-6"
      >
        <img
          src="@/assets/images/Lao_travel.png"
          alt="Laos Logo"
          class="w-[24px] h-[24px] lg:w-[60px] lg:h-[57.9px] object-contain"
        />
        <img
          src="@/assets/images/Thai_travel.png"
          alt="Company Logo"
          class="w-[24px] h-[24px] lg:w-[50px] lg:h-[50px] object-contain"
        />
      </div>
      <div class="flex items-center justify-end h-screen gap-[60px] pr-20">
        <div class="w-[347px] h-[336px] flex flex-col justify-end">
          <div class="mb-10 text-[50px] w-[288px] h-[132px] font-medium">
            오토앤투어는<span class="font-light"> ‘안전’합니다. </span>
          </div>
          <div class="text-sm leading-7">
            <div
              class="h-[44px] w-[347px] text-[16px] mb-5 font-light text-[#E9F5FF]"
            >
              · 라오스 현지 자회사를 운영하여​ 긴급한 문제 발생 시 현지 직원들의
              <span class="font-bold"> 244시간 케어 </span>
              가 가능합니다.
            </div>
            <div
              class="h-[44px] w-[347px] text-[16px] mb-8 font-light text-[#E9F5FF]"
            >
              · 앤가이드 어플을 통해
              <span class="font-bold"> 실시간으로 가이드 </span>

              와 연락 가능합니다.
            </div>
          </div>
          <div
            href="#"
            class="mt-6 h-[22px] text-[16px] items-start font-light text-[#E9F5FF] cursor-pointer gap-1 flex"
          >
            오토앤 회사소개
            <img
              src="@/assets/icons/arr_right.png"
              alt="arr_right"
              class="w-[16px] h-[16px] object-contain mt-1"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- ✅ Right Panel with Tab Image & Text Switching -->
    <div class="flex-1 relative overflow-hidden h-[360px] lg:h-[900px]">
      <!-- Tab Buttons -->
      <div
        class="absolute left-0 right-0 z-20 flex justify-center w-[800px] top-[160px] mx-auto h-[40px]"
      >
        <button @click="selectedTab = 'custom'" :class="tabClass('custom')">
          맞춤여행
        </button>
        <button @click="selectedTab = 'package'" :class="tabClass('package')">
          단독패키지
        </button>
      </div>

      <!-- Slide Content with v-if -->
      <div
        v-if="selectedTab === 'custom'"
        class="absolute inset-0 transition-all duration-500 bg-center bg-cover lg:w-[1200px]"
        :style="{ backgroundImage: `url(${customImage})` }"
      >
        <div class="absolute inset-0"></div>
        <div
          class="relative z-10 flex flex-col items-center justify-center h-[345px] px-6 text-center text-white top-[339px]"
        >
          <div class="flex items-center mb-8 lg:h-[72px] absolute top-0">
            <img
              src="@/assets/icons/edit-page.png"
              alt="맞춤여행 아이콘"
              class="w-[50px] h-[50px] mr-3"
            />
            <span class="text-[50px] font-medium">맞춤여행</span>
          </div>
          <div class="mt-2 text-[24px] font-medium">
            내 일정에 맞춰 여행을 계획하고,<br />
            오토앤투어의 현지 여행 전문가에게 컨설팅 받으세요.
          </div>
          <div class="mt-8 text-[16px] font-medium">
            ✓ 고객님께서 만족하실 때까지 무제한 설계가 가능해요!
          </div>
          <div class="mt-2 mb-8 text-[16px] font-light">
            #기업포상 #기업행사 #성지순례 #봉사활동 #골프 #워크샵 #프리미엄 여행
          </div>
          <NuxtLink to="/customized-travel">
            <button
              class="mt-[60px] text-[16px] bg-[#3B6333] h-[43px] w-[207px] rounded-[50px] hover:bg-green-700 bottom-0 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2"
            >
              맞춤여행 요청하기
              <img
                src="@/assets/icons/arr_right.png"
                alt="arr_right"
                class="w-[16px] h-[16px] object-contain"
              />
            </button>
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="selectedTab === 'package'"
        class="absolute inset-0 transition-all duration-500 bg-center bg-cover lg:w-[1200px]"
        :style="{ backgroundImage: `url(${packageImage})` }"
      >
        <div class="absolute inset-0"></div>
        <div
          class="relative z-10 flex flex-col items-center justify-center h-[345px] px-6 text-center text-white top-[339px]"
        >
          <div class="flex items-center mb-8 lg:h-[72px] absolute top-0">
            <img
              src="@/assets/icons/flag.png"
              alt="맞춤여행 아이콘"
              class="w-[50px] h-[50px] mr-3"
            />
            <span class="text-[50px] font-medium">단독패키지</span>
          </div>
          <div class="mt-2 text-[24px] font-medium">
            ​현지 전문가가 직접 만든 오토앤투어만의 패키지 상품
          </div>
          <div class="mt-8 text-[16px] font-medium">
            ✓ 단독 가이드와 함께 단독 차량 타고 <br />​ 우리끼리 안전하고
            편안하게 여행해보세요.
          </div>
          <NuxtLink to="/private-packages">
            <div class="flex items-center justify-center">
              <button
                class="mt-[60px] text-[16px] bg-[#3B6333] h-[43px] w-[221px] rounded-[50px] hover:bg-green-700 bottom-0 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2"
              >
                단독패키지 예약하기
                <img
                  src="@/assets/icons/arr_right.png"
                  alt="arr_right"
                  class="w-[16px] h-[16px] object-contain"
                />
              </button>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Version -->
  <div class="block w-full sm:hidden">
    <!-- ✅ Green Fixed Left Panel (720px) -->

    <div
      class="w-full h-[198px] bg-[#3B6333] text-white flex flex-col relative mx-auto"
    >
      <div
        class="absolute top-4 right-4 flex items-center justify-end h-[24px] w-[54px]"
      >
        <img
          src="@/assets/images/Lao_travel.png"
          alt="Laos Logo"
          class="w-[24px] h-[24px] sm:w-[60px] sm:h-[57.9px] object-contain"
        />
        <img
          src="@/assets/images/Thai_travel.png"
          alt="Company Logo"
          class="w-[24px] h-[24px] sm:w-[60px] sm:h-[57.9px] object-contain"
        />
      </div>
      <div class="flex pt-4 pl-4">
        <div class="flex flex-col">
          <div class="mb-2 text-[18px] h-[26px] font-medium">
            오토앤투어는<span class="font-light"> ‘안전’합니다. </span>
          </div>
          <div class="w-[257px] h-[82px] text-[12px] font-light">
            <div class="">
              <div class="h-[36px] w-[257px] mb-2 font-light text-[#E9F5FF]">
                · 라오스 현지자회사를운영하여​긴급한문제발생시 현지 직원들의
                24시간 케어 가 가능합니다.
              </div>
              <div class="h-[36px] w-[194px] font-light text-[#E9F5FF]">
                · 앤가이드 어플을 통해<br />실시간으로 가이드 와 연락
                가능합니다.
              </div>
            </div>
          </div>
          <div
            class="h-[22px] text-[12px] font-medium mt-2 text-[#E9F5FF] flex gap-1"
          >
            오토앤 회사소개
            <img
              src="@/assets/icons/arr_right.png"
              alt="arr_right"
              class="w-[14px] h-[14px] object-contain mt-1"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- ✅ Right Panel with Tab Image & Text Switching -->
    <div class="relative overflow-hidden h-[360px]">
      <!-- Tab Buttons -->
      <div
        class="absolute left-0 right-0 z-10 flex justify-center w-[360px] mx-auto h-[36px]"
      >
        <button @click="selectedTab = 'custom'" :class="tabClass('custom')">
          맞춤여행
        </button>
        <button @click="selectedTab = 'package'" :class="tabClass('package')">
          단독패키지
        </button>
      </div>

      <!-- Slide Content with v-if -->
      <div
        v-if="selectedTab === 'custom'"
        class="absolute inset-0 transition-all duration-500 bg-center bg-cover w-full h-[398px]"
        :style="{ backgroundImage: `url(${customImage})` }"
      >
        <div class="absolute inset-0"></div>
        <div
          class="relative flex-col items-center justify-center h-[210px] text-center text-white pt-[60px]"
        >
          <div class="h-[127px]">
            <div class="flex items-center justify-center mb-3">
              <img
                src="@/assets/icons/edit-page.png"
                alt="맞춤여행 아이콘"
                class="w-[30px] h-[30px]"
              />
              <span class="text-[24px] font-medium">맞춤여행</span>
            </div>
            <div class="text-[16px] font-medium">
              내 일정에 맞춰 여행을 계획하고,<br />
              오토앤투어의 현지 여행 전문가에게<br />컨설팅 받으세요.
            </div>
          </div>
          <div class="mt-2 text-[14px] font-medium">
            ✓ 고객님께서 만족하실 때까지 무제한 설계가 가능해요!
          </div>
          <div class="text-[12px] font-light">
            #기업포상 #기업행사 #성지순례 #봉사활동<br />#골프 #워크샵 #프리미엄
            여행
          </div>
          <NuxtLink to="/customized-travel">
            <div class="flex justify-center">
              <button
                class="mt-[30px] text-[14px] bg-[#3B6333] text-white h-[40px] w-[202px] rounded-full hover:bg-green-700 flex items-center justify-center gap-2"
              >
                맞춤여행 요청하기
                <img
                  src="@/assets/icons/arr_right.png"
                  alt="arr_right"
                  class="w-[14px] h-[14px] object-contain"
                />
              </button>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="selectedTab === 'package'"
        class="absolute inset-0 transition-all duration-500 bg-center bg-cover w-[360px] h-[398px]"
        :style="{ backgroundImage: `url(${packageImage})` }"
      >
        <div class="absolute inset-0"></div>
        <div
          class="relative flex-col items-center justify-center h-[210px] text-center text-white pt-[60px]"
        >
          <div class="h-[127px]">
            <div class="flex items-center justify-center mb-3">
              <img
                src="@/assets/icons/flag.png"
                alt="맞춤여행 아이콘"
                class="w-[30px] h-[30px]"
              />
              <span class="text-[24px] font-medium">단독패키지</span>
            </div>
            <div class="text-[16px] font-medium">
              ​현지 전문가가 직접 만든<br />오토앤투어만의 패키지 상품
            </div>
          </div>
          <div class="text-[14px] font-medium">
            ✓ 단독 가이드와 함께 단독 차량 타고 <br />​ 우리끼리 안전하고
            편안하게 여행해보세요.
          </div>
          <NuxtLink to="/private-packages">
            <div class="flex justify-center">
              <button
                class="mt-[50px] text-[14px] bg-[#3B6333] text-white h-[40px] w-[202px] rounded-full hover:bg-green-700 flex items-center justify-center gap-2"
              >
                맞춤여행 문의하기
                <img
                  src="@/assets/icons/arr_right.png"
                  alt="arr_right"
                  class="w-[14px] h-[14px] object-contain"
                />
              </button>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import customImage from "@/assets/images/topAreaMain3.png";
import packageImage from "@/assets/images/topAreaMain4.png";

const selectedTab = ref("custom");

const tabClass = (tab) =>
  `px-4 py-2 text-[14px] lg:text-[16px] font-medium rounded transition duration-300 lg:w-[400px] w-[180px] ${
    selectedTab.value === tab
      ? "bg-[#E9F5FF] text-[#3B6333] shadow bg-opacity-40 font-light"
      : "bg-[#E9F5FF] text-white bg-opacity-10 font-medium"
  }`;
</script>

<style scoped>
.carousel {
  scroll-behavior: smooth;
}

/* Optional: Adjust nav button styles if used */
@media (max-width: 640px), (min-width: 641px) and (max-width: 1024px) {
  .swiper-button-n,
  .swiper-button-p {
    width: 30px;
    height: 20px;
  }
}

@media (min-width: 1025px) {
  .swiper-button-n,
  .swiper-button-p {
    width: 86px;
    height: 60px;
  }
}
</style>
