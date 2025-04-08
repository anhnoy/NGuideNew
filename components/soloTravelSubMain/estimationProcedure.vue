<template>
  <div class="bg-white lg:bg-[#F5F5F7] p-2 lg:p-5 rounded-xl border-2 w-[329px] h-[93px] lg:w-[1200px] lg:h-[260px]">
    <div class="lg:gap-4 flex items-center justify-center lg:space-x-8 lg:space-y-0 text-base">
      <!-- Step 1 -->
      <!-- <div class="flex justify-center items-center space-x-5 space-y-0"> -->
        <div class="flex flex-col items-center">
          <div class="w-[55px] h-[55px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 1" }}</p> -->
            <img src="../../assets/icons/mouseSquare.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] my-1" />
            <p class="text-[8px] break-words lg:text-[16px] w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "상품선택" }}</p>
          </div>
          <p class="font-semibold text-sm lg:text-[24px] mt-1 lg:mt-4">{{ "Step 1" }}</p>
        </div>
      <!-- </div> -->
      <!-- <div class="flex justify-center items-center space-x-5 space-y-0 -mt-[20px]"> -->
        <div class="w-[25px] h-[25px] lg:w-[70px] lg:h-[70px] -mt-[25px]">
          <stepArrow />
        </div>
      <!-- </div> -->

      <!-- Step 2 -->
      <div class="flex flex-col items-center">
        <div class="w-[55px] h-[55px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
          <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 2" }}</p> -->
          <img src="../../assets/icons/edit-3.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] my-1" />
          <p class="text-[8px] lg:text-[16px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "설문지 작성" }}</p>
        </div>
        <p class="font-semibold text-sm lg:text-[24px] mt-1 lg:mt-4">{{ "Step 2" }}</p>
      </div>
      <div class=" w-[25px] h-[25px] lg:w-[70px] lg:h-[70px] -mt-[25px]">
        <stepArrow />
      </div>

      <!-- Step 3 -->
      <!-- <div class="flex justify-center items-center space-x- space-y-0"> -->
        <div class="flex flex-col items-center">
          <div class="w-[55px] h-[55px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 3" }}</p> -->
            <img src="../../assets/icons/chat-online.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] lg:my-2 " />
            <p class="text-[8px] lg:text-[16px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "온라인 or" }}</p>
            <p class="text-[8px] lg:text-[16px] break-words -mt-[8px] lg:-mt-[25px] w-[50px] h-[18px] lg:w-[150px] lg:h-[46px]">{{ "유선 상담" }}</p>
          </div>
          <p class="font-semibold text-sm lg:text-[24px] mt-1 lg:mt-4">{{ "Step 3" }}</p>
        </div>
      <!-- </div> -->
      <!-- <div class="flex justify-center items-center space-x-5 space-y-0 -mt-[20px]"> -->
        <div class="-mt-[25px] w-[25px] h-[25px] lg:w-[70px] lg:h-[70px]">
          <stepArrow />
        </div>
      <!-- </div> -->
      <!-- Step 4 -->
      <div class="flex flex-col items-center">
        <div class="w-[55px] h-[55px] lg:w-[150px] lg:h-[150px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
          <!-- <p class="font-semibold text-sm lg:text-base">{{ "Step 4" }}</p> -->
          <img src="../../assets/icons/credit-card-check.svg" class="w-[18px] h-[18px] lg:w-[46px] lg:h-[46px] my-1 lg:my-2" />
          <p class="text-[8px] lg:text-[16px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "결제" }}</p>
        </div>
        <p class="font-semibold text-sm lg:text-[24px] mt-1 lg:mt-4">{{ "Step 4" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import stepArrow from "./StepArrow.vue";
</script>
