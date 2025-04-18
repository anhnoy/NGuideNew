<template>
    <div class="mx-auto lg:p-6 text-center text-black lg:mb-40 mb-10">
        <p class="text-[24px] lg:text-[30px] font-bold mb-8 text-center">
          <span class="text-green-700">오토앤투어</span>만의 맞춤여행 혜택
        </p>
        <!-- <p class="text-[24px] font-bold text-center lg:hidden"><span class="text-green-700">오토앤투어</span>만의</p>
        <p class="text-[24px] font-bold text-center lg:hidden">맞춤여행 혜택</p> -->
        <div class="justify-center lg:gap-4 gap-2 lg:mb-6 mb-8 flex-wrap lg:mt-10 mt-10 hidden lg:block">
             <p class="lg:text-[18px]">여행객의 선호도, 일정, 예산 등을 고려하여 개인 또는 ​소규모 그룹을 위한 맞춤형 여행을 계획하여 진행합니다.</p>
             <p class="lg:text-[18px]">
              <span>여행의 모든 요소(항공권, 숙박, 교통, 관광 등)를 </span>
              <span class="text-green-500">​여행객의 필요에 따라 조정</span>
              <span>할 수 있습니다.</span>
             </p>
        </div>
        <div class="flex justify-center lg:gap-4 gap-2 lg:mb-6 mb-8 flex-wrap lg:mt-10 mt-10 lg:hidden">
             <p class="text-[14px]">여행객의 선호도, 일정, 예산 등을 고려하여 개인 또는</p>
             <p class="text-[14px]">소규모 그룹을 위한 맞춤형 여행을 계획하여 진행합니다.</p>
             <p class="text-[14px]">여행의 모든 요소(항공권, 숙박, 교통, 관광 등)를</p>
             <p class="text-[14px]"><span class="text-green-500">여행객의 필요에 따라 조정</span>할 수 있습니다.</p>
        </div>
            <div class="flex justify-center items-center flex-col lg:flex-row gap-8">
              <div class="p-6 rounded-md flex flex-col lg:flex-row items-center justify-center gap-8">
                    <div class="flex justify-center">
                      <img src="@/assets/images/customContentImage.jpg" class="lg:w-[696px] lg:h-[521px] w-[295px] h-[238px] rounded-2xl" alt="" />
                    </div>
                    <div>
                      <div class="flex flex-col items-start text-left lg:ml-5">
                        <p class="text-[14px] lg:text-[16px] mt-5 lg:mt-5 ml-3">✓ 고객 예산에 따라 조율 가능한 다양한 옵션</p>
                        <p class="text-[14px] lg:text-[16px] mt-2 ml-3">✓ 원하는 시간, 원하는 방식으로 즐기는 자유로운 일정</p>
                        <p class="text-[14px] lg:text-[16px] mt-2 ml-3">✓ 쇼핑·관광의 부담과 강요 없는 우리만의 여행</p>
                        <p class="text-[14px] lg:text-[16px] mt-2 ml-3">✓ 현지 전문 가이드가 동행, 안전하고 편안한 여행을 제공</p>
                        <p class="text-[14px] lg:text-[16px] mt-2 ml-3">✓ 추가 비용 없는 정찰제 운영으로 팁 없는 투명한 서비스</p>
                      </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-10 lg:mt-12">
               <button @click="goToCreate_quote"
                 class="bg-[#2F312A] text-white flex items-center justify-center py-2 border lg:border-2 border-[#2F312A] rounded-lg hover:bg-[#95C3DD] transition w-[160px] lg:w-[208px] text-[14px] lg:text-[20px] mt-10 lg:mt-12">
                 <span class="ml-2 font-semibold">맞춤여행 문의하기</span>
                 <span class="ml-3 font-semibold">></span>
               </button>
            </div>
    </div>
  </template>
  
  <script setup>
 import {useRouter} from "vue-router"

const router = useRouter();

const goToCreate_quote = () =>{
    router.push('/create-quotation');
};
  </script>