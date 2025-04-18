<template>
  <div class="bg-white lg:bg-[#F5F5F7] p-2 lg:p-8 rounded-xl border-2 w-[327px] h-[246px] lg:w-[1200px] lg:h-[200px]">
    <div class="lg:gap-4 flex flex-col lg:flex-row items-center justify-center lg:space-x-8 -space-x-12 lg:space-y-0 space-y-5">
      <!-- Step 1 -->
      <div class="flex justify-center items-center space-x-5">
        <div class="flex flex-col items-center lg:px-8">
          <div class="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <img src="../../assets/icons/mouseSquare.svg" class="w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] lg:my-2 my-1" />
            <p class="text-[10px] break-words lg:text-[12px] w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "상품선택" }}</p>
          </div>
          <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 1" }}</p>
        </div>
      
        <div class="w-[32px] h-[32px] lg:w-[53px] lg:h-[53px]">
          <stepArrow />
        </div>

        <!-- Step 2 -->
        <div class="flex flex-col items-center lg:px-8">
          <div class="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <img src="../../assets/icons/edit-3.svg" class="w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] my-1" />
            <p class="text-[10px] lg:text-[12px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "설문지 작성" }}</p>
          </div>
          <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 2" }}</p>
        </div>
        <div class="w-[32px] h-[32px] lg:w-[53px] lg:h-[53px]">
          <stepArrow />
        </div>
      </div>
      <div class="flex justify-center items-center space-x-5">
        <!-- Step 3 -->
        <div class="flex flex-col items-center lg:px-5">
          <div class="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <img src="../../assets/icons/chat-online.svg" class="w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] lg:my-1" />
            <p class="text-[10px] lg:text-[12px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px]">{{ "온라인 or" }}</p>
            <p class="text-[10px] lg:text-[12px] break-words -mt-[4px] lg:-mt-[12px] w-[50px] h-[18px] lg:w-[150px] lg:h-[46px]">{{ "유선 상담" }}</p>
          </div>
          <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 3" }}</p>
        </div>
        <div class="w-[32px] h-[32px] lg:w-[53px] lg:h-[53px]">
          <stepArrow />
        </div>
        <!-- Step 4 -->
        <div class="flex flex-col items-center lg:px-8">
          <div class="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
            <img src="../../assets/icons/credit-card-check.svg" class="w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] my-1 lg:my-2" />
            <p class="text-[10px] lg:text-[12px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "결제" }}</p>
          </div>
          <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 4" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import stepArrow from "./StepArrow.vue";
</script>
