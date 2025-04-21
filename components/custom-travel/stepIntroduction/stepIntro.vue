<template>
    <div class="bg-white p-2 lg:p-8 rounded-xl border-2 w-[327px] h-[227px] lg:w-[1200px] lg:h-[200px]">
      <div class="lg:gap-4 flex flex-col lg:flex-row items-center justify-center lg:space-x-8 -space-x-12 lg:space-y-0 space-y-5">
        <!-- Step 1 -->
        <div class="flex justify-center items-center space-x-5">
          <div class="flex flex-col items-center lg:px-8">
            <div class="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
              <img src="@/assets/icons/edit-3.svg" class="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] lg:my-2 my-1" />
              <p class="text-[10px] break-words lg:text-[12px] w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "맞춤 견적서 신청" }}</p>
            </div>
            <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 1" }}</p>
          </div>
        
          <div class="w-[32px] h-[32px] lg:w-[53px] lg:h-[53px] lg:mt-0 -mt-[12px]">
            <stepArrow class="hidden lg:block"/>
            <img src="@/assets/icons/Arrow3.png" alt="Arrow-down-left" class="lg:hidden"/>
          </div>
  
          <!-- Step 2 -->
          <div class="flex flex-col items-center lg:px-8">
            <div class="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
              <img src="@/assets/icons/VectorStep2.png" class="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] my-1" />
              <p class="text-[10px] lg:text-[12px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "최종 견적서 조회" }}</p>
            </div>
            <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 2" }}</p>
          </div>
          <div class="w-[32px] h-[32px] lg:w-[53px] lg:h-[53px] hidden lg:block">
            <stepArrow />
          </div>
        </div>

        <div class="flex justify-center items-center space-x-5 lg:hidden">
          <div class="w-[32px] h-[32px] -mt-[40px] ml-[60px]">
            <img src="@/assets/icons/Arrow-down-left.png" alt="Arrow-down-left"/>
          </div>
        </div>

        <div class="flex justify-center items-center space-x-5">
          <!-- Step 3 -->
          <div class="flex flex-col items-center lg:px-5 lg:ml-0 ml-[44px] lg:mt-0 -mt-[28px]">
            <div class="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
              <img src="@/assets/icons/clipboard-check.png" class="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] lg:my-1" />
              <p class="text-[10px] break-words lg:text-[12px] w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "견적서 확정" }}</p>
            </div>
            <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 3" }}</p>
          </div>
          <div class="w-[32px] h-[32px] lg:w-[53px] lg:h-[53px] lg:mt-0 -mt-[48px]">
            <stepArrow class="hidden lg:block"/>
            <img src="@/assets/icons/Arrow3.png" alt="Arrow-down-left" class="lg:hidden"/>
          </div>
          <!-- Step 4 -->
          <div class="flex flex-col items-center lg:px-8 lg:mt-0 -mt-[28px]">
            <div class="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] bg-[#95C3DD] text-white rounded-full flex flex-col justify-center items-center text-center px-2">
              <img src="@/assets/icons/credit-card-check.svg" class="w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] my-1 lg:my-2" />
              <p class="text-[10px] lg:text-[12px] break-words w-[50px] h-[18px] lg:w-[150px] lg:h-[46px] lg:my-2">{{ "유선 상담 후 결제" }}</p>
            </div>
            <p class="font-semibold text-[14px] lg:text-[20px] mt-1 lg:mt-2">{{ "Step 4" }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import stepArrow from "../../soloTravelSubMain/StepArrow.vue";
  </script>
  