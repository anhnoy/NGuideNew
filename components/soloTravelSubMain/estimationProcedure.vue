<template>
  <div class="bg-white lg:bg-[#F5F5F7] p-5 rounded-xl border-2 w-[320px] h-[250px] lg:w-[1200px] lg:h-[260px]">
    <div class="grid grid-cols-3 gap-2 lg:gap-4 lg:flex lg:items-center lg:justify-center lg:space-x-8 lg:space-y-0 text-base">
      <!-- Step 1 -->
      <div class="flex justify-center items-center space-x-5 space-y-0">
        <div class="flex flex-col items-center">
          <div class="w-[70px] h-[70px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 1" }}</p> -->
            <img src="../../assets/icons/mouseSquare.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] my-2" />
            <p class="text-[10px] break-words lg:text-[16px]">{{ "상품선택" }}</p>
          </div>
          <p class="font-semibold text-sm lg:text-[24px] mt-2 lg:mt-4">{{ "Step 1" }}</p>
        </div>
      </div>
      <div class="flex justify-center items-center space-x-5 space-y-0 -mt-[20px]">
        <div class="lg:block">
          <stepArrow />
        </div>
      </div>

      <!-- Step 2 -->
      <div class="flex flex-col items-center">
        <div class="w-[70px] h-[70px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
          <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 2" }}</p> -->
          <img src="../../assets/icons/edit-3.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] my-2" />
          <p class="text-[10px] lg:text-[16px] break-words">{{ "설문지 작성" }}</p>
        </div>
        <p class="font-semibold text-sm lg:text-[24px] mt-2 lg:mt-4">{{ "Step 2" }}</p>
      </div>
      <div class="hidden lg:block">
        <stepArrow />
      </div>

      <!-- Step 3 -->
      <div class="flex justify-center items-center space-x-5 space-y-0">
        <div class="flex flex-col items-center">
          <div class="w-[70px] h-[70px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 3" }}</p> -->
            <img src="../../assets/icons/chat-online.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] lg:my-2" />
            <p class="text-xs lg:text-[16px] break-words">{{ "온라인 or" }}</p>
            <p class="text-xs lg:text-[16px] break-words lg:mt-1">{{ "유선 상담" }}</p>
          </div>
          <p class="font-semibold text-sm lg:text-[24px] mt-2 lg:mt-4">{{ "Step 3" }}</p>
        </div>
      </div>
      <div class="flex justify-center items-center space-x-5 space-y-0 -mt-[20px]">
        <div class="lg:block">
          <stepArrow />
        </div>
      </div>
      <!-- Step 4 -->
      <div class="flex flex-col items-center">
        <div class="w-[70px] h-[70px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
          <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 4" }}</p> -->
          <img src="../../assets/icons/credit-card-check.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] my-2" />
          <p class="text-[10px] lg:text-[16px] break-words">{{ "결제" }}</p>
        </div>
        <p class="font-semibold text-sm lg:text-[24px] mt-2 lg:mt-4">{{ "Step 4" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import stepArrow from "./StepArrow.vue";
</script>
