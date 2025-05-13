<template>
  <div class="p-8 text-black lg:w-[1200px] mx-auto">
    <!-- Wrap both cards in a responsive flex container -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- First Card -->
      <div class="bg-[#EEF9FF] p-6 rounded-md flex-1 flex flex-col gap-4">
        <div class="flex justify-center">
          <img
            src="@/assets/images/create-quote-IconMain.png"
            class="lg:w-[608px] lg:h-[350px] w-[328px] h-[189px] rounded-2xl"
            alt=""
          />
        </div>
        <div>
          <div class="flex flex-col items-start text-left">
            <h2 class="text-[14px] lg:text-[20px] font-bold mb-2">
              {{ "원하는 여행 스타일이 있으신가요?" }}
            </h2>
            <p class="whitespace-pre-line text-[14px] lg:text-[20px]">
              {{ "예산, 일정, 관광지를 직접 선택해 보세요." }}
            </p>
            <p class="text-[14px] lg:text-[20px] mt-2">
              {{ "여행자님에 맞는 1:1 맞춤 플랜을 제공해 드려요" }}
            </p>
            <p class="text-[10px] lg:text-[16px] mt-5 lg:mt-10">
              ✓ 이런 여행에 적합해요
            </p>
            <p class="text-[10px] lg:text-[16px] mt-2 ml-3">
              #기업포상 #기업행사 #성지순례 #봉사활동 #골프 #워크샵 #프리미엄
              여행
            </p>
          </div>
        </div>
        <button
          @click="goToCreate_quote"
          class="bg-[#EEF9FF] text-black flex items-center justify-center py-2 border lg:border-2 border-[#2F312A] rounded-3xl hover:bg-[#95C3DD] transition w-full lg:w-[270px] text-[14px] lg:text-[18px] mt-10 lg:mt-12"
        >
          <span class="ml-2 font-semibold">나만의 맞춤 견적 문의하기</span>
          <div
            class="lg:w-[50px] lg:h-[16px] w-[20px] ml-2 lg:ml-2 flex items-center"
          >
            <img
              src="@/assets/icons/arrow-right-arrow.svg"
              alt="airrow-right"
              class="lg:w-[50px] lg:h-[16px] w-[16px] h-[16px] hidden lg:block"
            />
            <img
              src="@/assets/icons/arrow-right-arrow2.svg"
              alt="airrow-right"
              class="lg:w-[50px] lg:h-[16px] w-[16px] h-[16px] lg:hidden"
            />
          </div>
        </button>
      </div>

      <!-- Second Card -->
      <div class="bg-[#EEF9FF] p-6 rounded-md flex-1 flex flex-col gap-4">
        <div class="flex justify-center">
          <img
            src="@/assets/images/private-image.jpg"
            class="lg:w-[608px] lg:h-[350px] w-[328px] h-[189px] rounded-2xl"
            alt=""
          />
        </div>
        <div>
          <div class="flex flex-col items-start text-left">
            <h2 class="text-[14px] lg:text-[20px] font-bold mb-2">
              {{ "일정 고민이 부담이신가요?" }}
            </h2>
            <p
              class="text-[14px] lg:text-[20px] whitespace-pre-line hidden lg:block"
            >
              {{ "뻔한 패키지 상품이 아닌 우리끼리 즐기는 단독 패키지 여행 !" }}
            </p>
            <p class="text-[14px] lg:text-[20px] whitespace-pre-line lg:hidden">
              {{ "뻔한 패키지 상품이 아닌 우리끼리 즐기는 단독 패키지" }}
            </p>
            <p class="text-[14px] lg:text-[20px] mt-2 hidden lg:block">
              {{ "오토앤투어가 엄선해서 코스를 만들어 보았어요." }}
            </p>
            <p class="text-[14px] lg:text-[20px] mt-2 lg:hidden">
              {{ "여행 ! 오토앤투어가 엄선해서 코스를 만들어 보았어요." }}
            </p>
            <p class="text-[10px] lg:text-[16px] mt-5 lg:mt-10">
              ✓ 이런 여행에 적합해요
            </p>
            <p class="text-[10px] lg:text-[16px] mt-2 ml-3">
              #효도 여행 #가족 여행 #동호회 #친목 #힐링 여행
            </p>
          </div>
        </div>
        <button
          @click="goToPrivate_trip"
          class="bg-[#EEF9FF] text-black py-2 flex items-center justify-center border lg:border-2 border-[#2F312A] rounded-3xl hover:bg-[#95C3DD] transition w-full lg:w-[270px] text-[14px] lg:text-[18px] mt-10 lg:mt-12"
        >
          <span class="ml-2 font-semibold">인기 단독패키지 바로보기</span>
          <div
            class="lg:w-[50px] lg:h-[16px] w-[20px] ml-1 lg:ml-2 flex items-center"
          >
            <img
              src="@/assets/icons/arrow-right-arrow.svg"
              alt="airrow-right"
              class="lg:w-[50px] lg:h-[16px] w-[16px] h-[16px] hidden lg:block"
            />
            <img
              src="@/assets/icons/arrow-right-arrow2.svg"
              alt="airrow-right"
              class="lg:w-[50px] lg:h-[16px] w-[16px] h-[16px] lg:hidden"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToCreate_quote = () => {
  router.push("/customized-travel");
};
const goToPrivate_trip = () => {
  router.push("/private-packages");
};
</script>
