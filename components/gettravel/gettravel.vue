<template>
  <div
    class="flex flex-col md:flex-row items-center justify-center mx-3 mt-5 md:m-10 space-y-4 md:space-y-0 md:space-x-4">
    <!-- Card 1 -->
    <div class="rounded-lg w-full md:w-auto border-0 md:border md:border-[#8E8D8D]">
      <div @click="handleClick" class="md:py-5 lg:pl-16 px-2">
        <div class="flex flex-row md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <img src="@/assets/icons/tune.svg" class="md:w-28 md:h-28 w-20" alt="" />
          <div class="text-left md:text-left lg:w-[22rem] lg:max-w-full ml-3 lg:p-5">
            <p class="text-[#152123] font-normal md:text-base text-sm">
              희망하는 옵션을 모두 선택해서 <br />
              나만의 맞춤 여행 견적을 받아 보세요.
            </p>
            <div class="flex items-center justify-start">
              <button
                class="mt-2 bg-[#6EBC30] px-4 md:py-1 rounded-full text-white text-sm font-medium flex items-center justify-center md:justify-start">
                맞춤 여행 견적 신청
                <span class="mdi mdi-chevron-right ml-1 text-[#FFFFFF] text-2xl"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider for mobile -->
    <hr class="w-full border-t border-[#E6E6E6] md:hidden" />

    <!-- Card 2 -->
    <div class="rounded-lg w-full md:w-auto border-0 md:border md:border-[#8E8D8D]">
      <div class="md:py-5 lg:pl-16 px-2">
        <div class="flex flex-row md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <img src="@/assets/icons/pen.svg" class="md:w-28 md:h-28 w-20" alt="" />
          <div class="text-left ml-3 md:text-left lg:w-[22rem] lg:max-w-full lg:p-5">
            <p class="text-[#152123] font-normal md:text-base text-sm">
              앤가이드가 추천하는 코스에서 <br />
              원하는 옵션만 변경해 보세요.
            </p>
            <div class="flex items-center justify-start">
              <router-link to="/easy-create-quotation">
              <button 
                class="mt-2 bg-[#0EC0CB] px-4 md:py-1 rounded-full text-white text-sm font-medium flex items-center justify-center md:justify-start">
                간편 견적 신청
                <span class="mdi mdi-chevron-right ml-1 text-[#FFFFFF] text-2xl"></span>
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

<style scoped>

</style>
