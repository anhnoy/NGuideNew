<template>
  <div
    class="flex flex-col lg:flex-row items-center justify-center mx-3 mt-5 lg:m-10 space-y-4 lg:space-y-0 lg:space-x-4">
    <!-- Card 1 -->
    <div class="rounded-lg w-full lg:w-auto border-0 lg:border lg:border-[#8E8D8D]">
      <div @click="handleClick" class="lg:py-[26.5px] lg:px-[51px] px-2 ">
        <div class="flex flex-row lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <img src="@/assets/icons/tune.svg" class="lg:w-[120px]  w-[80px]" alt="" />
          <div class="text-left lg:text-left lg:w-[22rem] lg:max-w-full ml-3 lg:p-5">
            <p class="text-[#152123] font-normal lg:text-xl text-sm">
              희망하는 옵션을 모두 선택해서 <br />
              나만의 맞춤 여행 견적을 받아 보세요.
            </p>
            <div class="flex items-center justify-start">
              <button
                class="mt-2 bg-[#6EBC30] lg:px-[34.5px] lg:py-[11.5px] px-[15px] py-[8px] rounded-full text-white text-sm font-medium flex items-center justify-center lg:justify-start transition-transform duration-300 hover:scale-105">
                맞춤여행  문의하기
                <img src="@/assets/icons/nextLink.svg" alt="" class="ml-4 w-[16px] h-[16px]">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider for mobile -->
    <hr class="w-full border-t border-[#E6E6E6] lg:hidden" />

    <!-- Card 2 -->
    <div class="rounded-lg w-full lg:w-auto border-0 lg:border lg:border-[#8E8D8D]">
      <div class="lg:py-[26.5px] lg:px-[51px] px-2 ">
        <div class="flex flex-row lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <img src="@/assets/icons/pen.svg" class="lg:w-[120px]  w-[80px]" alt="" />
          <div class=" text-left ml-3 lg:text-left lg:w-[22rem] lg:max-w-full lg:p-5">
            <p class="text-[#152123] font-normal lg:text-xl text-sm">
              앤가이드가 추천하는 코스에서 <br />
              원하는 옵션만 변경해 보세요.
            </p>
            <div class="flex items-center justify-start">
              <router-link to="/easy-create-quotation">
                <button
                  class="mt-2 bg-[#0EC0CB] lg:px-[33px] lg:py-[11.5px] px-[15px] py-[8px] rounded-full text-white text-sm font-medium flex items-center justify-center lg:justify-start transition-transform duration-300 hover:scale-105">
                  단독패키지
                  <img src="@/assets/icons/nextLink.svg" alt="" class="ml-4 w-[16px] h-[16px]">
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = () => {
  router.push("/create-quotation");
};
</script>

<style scoped></style>
