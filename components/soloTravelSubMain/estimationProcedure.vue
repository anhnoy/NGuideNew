<template>
  <div class="bg-white lg:bg-[#F5F5F7] p-5 rounded-xl border-2 w-[320px] lg:w-[1090px] ">
    <div class="grid grid-cols-2 gap-4 lg:flex lg:items-center lg:justify-center lg:space-x-8 lg:space-y-0 text-base lg:text-[24px]">
      <!-- Step 1 -->
      <div class="flex justify-between items-center space-x-5 space-y-0">
        <div class="flex flex-col items-center">
          <div class="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-white rounded-full border-2 border-gray-300 flex flex-col justify-center items-center text-center px-2">
            <p class="font-semibold text-sm lg:text-base">{{ "Step 1" }}</p>
            <img src="../../assets/icons/mousesquare.svg" class="w-5 h-5 lg:w-6 lg:h-6 my-2" />
            <p class="font-semibold text-xs lg:text-sm break-words">{{ "상품선택" }}</p>
          </div>
        </div>
        <div class="lg:block">
          <stepArrow />
        </div>
      </div>

      <!-- Step 2 -->
      <div class="flex flex-col items-center">
        <div class="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-white rounded-full border-2 border-gray-300 flex flex-col justify-center items-center text-center px-2">
          <p class="font-semibold text-sm lg:text-base">{{ "Step 2" }}</p>
          <img src="../../assets/icons/edit-write-alt.svg" class="w-5 h-5 lg:w-6 lg:h-6 my-2" />
          <p class="font-semibold text-xs lg:text-sm break-words">{{ "설문지 작성" }}</p>
        </div>
      </div>
      <div class="hidden lg:block">
        <stepArrow />
      </div>

      <!-- Step 3 -->
      <div class="flex justify-between items-center space-x-5 space-y-0">
        <div class="flex flex-col items-center">
          <div class="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-white rounded-full border-2 border-gray-300 flex flex-col justify-center items-center text-center px-2">
            <p class="font-semibold text-sm lg:text-base">{{ "Step 3" }}</p>
            <img src="../../assets/icons/chats-dots-bold.svg" class="w-5 h-5 lg:w-6 lg:h-6 my-2" />
            <p class="font-semibold text-xs lg:text-sm break-words">{{ "온라인 or" }}</p>
            <p class="font-semibold text-xs lg:text-sm break-words">{{ "유선 상담" }}</p>
          </div>
        </div>
        <div class="lg:block">
          <stepArrow />
        </div>
      </div>

      <!-- Step 4 -->
      <div class="flex flex-col items-center">
        <div class="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-white rounded-full border-2 border-gray-300 flex flex-col justify-center items-center text-center px-2">
          <p class="font-semibold text-sm lg:text-base">{{ "Step 4" }}</p>
          <img src="../../assets/icons/payment.svg" class="w-5 h-5 lg:w-6 lg:h-6 my-2" />
          <p class="font-semibold text-xs lg:text-sm break-words">{{ "결제" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import stepArrow from "./StepArrow.vue";
</script>
