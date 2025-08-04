<template>
  <div
    class="bg-white p-[10px] lg:px-[129px] lg:rounded-[100px] shadow-md w-[304px] h-[242px] max-w-[1100px] lg:h-[122px] flex flex-col items-center justify-center rounded-[20px] mx-auto lg:w-[1100px]"
  >
    <div
      class="flex flex-col items-center justify-center space-y-5 lg:gap-4 lg:flex-row lg:space-x-8 lg:space-y-0 lg:w-[912px] lg:h-[63px] mt-"
    >
      <!-- Step 1 -->
      <div
        class="flex items-center justify-center lg:space-x-[50px] space-x-[15px]"
      >
        <div class="flex flex-col items-center">
          <div
            class="w-[100px] h-[89px] lg:w-[151px] lg:h-[63px] text-[#111111] flex flex-col justify-center items-center text-center lg:space-y-4"
          >
            <p
              class="lg:w-[56px] lg:h-[17px] w-[56px] h-[17px] bg-[#386333] rounded-[20px] text-white lg:text-[12px] text-[12px]"
            >
              Step 1
            </p>
            <div class="flex flex-col items-center gap-2 lg:flex lg:flex-row">
              <img
                src="@/assets/icons/VectorGreen.png"
                class="w-[30px] h-[30px] mt-3 lg:mt-0"
              />
              <p class="text-[14px] break-words lg:text-[16px]">
                {{ "맞춤 견적서 신청" }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="w-[8px] h-[10px] lg:w-[12px] lg:h-[16px] lg:mt-0 -mt-[12px]"
        >
          <stepArrow class="hidden lg:block" />
          <img
            src="@/assets/icons/Arrow4.png"
            alt="Arrow-down-left"
            class="lg:hidden"
          />
        </div>

        <!-- Step 2 -->
        <div class="flex flex-col items-center">
          <div
            class="w-[100px] h-[89px] lg:w-[151px] lg:h-[63px] text-[#111111] flex flex-col justify-center items-center text-center lg:space-y-4"
          >
            <p
              class="lg:w-[56px] lg:h-[17px] w-[56px] h-[17px] bg-[#386333] rounded-[20px] text-white lg:text-[12px] text-[12px]"
            >
              {{ "Step 2" }}
            </p>
            <div class="flex flex-col items-center gap-2 lg:flex lg:flex-row">
              <img
                src="@/assets/icons/VectorStep2Green.png"
                class="w-[30px] h-[30px] mt-3 lg:mt-0"
              />
              <p class="text-[14px] break-words lg:text-[16px]">
                {{ "최종 견적서 조회" }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="w-[8px] h-[10px] lg:w-[12px] lg:h-[16px] lg:mt-0 -mt-[12px]"
        >
          <stepArrow class="hidden lg:block" />
          <img
            src="@/assets/icons/Arrow4.png"
            alt="Arrow-down-left"
            class="lg:hidden"
          />
        </div>
      </div>

      <div
        class="flex items-center justify-center space-x-[15px] lg:space-x-[50px]"
      >
        <!-- Step 3 -->
        <div class="flex flex-col items-center">
          <div
            class="w-[100px] h-[89px] lg:w-[151px] lg:h-[63px] text-[#111111] flex flex-col justify-center items-center text-center lg:space-y-4"
          >
            <p
              class="lg:w-[56px] lg:h-[17px] w-[56px] h-[17px] bg-[#386333] rounded-[20px] text-white lg:text-[12px] text-[12px]"
            >
              {{ "Step 3" }}
            </p>
            <div class="flex flex-col items-center gap-2 lg:flex lg:flex-row">
              <img
                src="@/assets/icons/VectorStep3Green.png"
                class="w-[30px] h-[30px] mt-3 lg:mt-0"
              />
              <p class="text-[14px] break-words lg:text-[16px]">
                {{ "견적서 확정" }}
              </p>
            </div>
          </div>
        </div>
        <div class="w-[8px] h-[10px] lg:w-[12px] lg:h-[16px] lg:mt-0">
          <stepArrow class="hidden lg:block" />
          <img
            src="@/assets/icons/Arrow4.png"
            alt="Arrow-down-left"
            class="lg:hidden"
          />
        </div>
        <!-- Step 4 -->
        <div class="flex flex-col items-center">
          <div
            class="w-[100px] h-[89px] lg:w-[171px] lg:h-[63px] text-[#111111] flex flex-col justify-center items-center text-center lg:space-y-4"
          >
            <p
              class="lg:w-[56px] lg:h-[17px] w-[56px] h-[17px] bg-[#386333] rounded-[20px] text-white lg:text-[12px] text-[12px]"
            >
              {{ "Step 4" }}
            </p>
            <div class="flex flex-col items-center gap-2 lg:flex lg:flex-row">
              <img
                src="@/assets/icons/VectorStep4Green.png"
                class="w-[30px] h-[30px] mt-3 lg:mt-0"
              />
              <p class="text-[14px] break-words lg:text-[16px]">
                {{ "유선 상담 후 결제" }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="w-[8px] h-[10px] lg:w-[12px] lg:h-[16px] lg:mt-0 lg:hidden"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import stepArrow from "../../soloTravelSubMain/StepArrow.vue";
</script>
