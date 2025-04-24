<template>
    <div class="mx-auto lg:p-6 text-center text-black lg:mb-40 mb-10 lg:my-[64px] my-[30px]">
        <p class="text-[22px] lg:text-[30px] font-bold mb-8 text-center">
          <span class="text-green-700">오토앤투어</span>만의 맞춤여행 혜택
        </p>
        <!-- <p class="text-[24px] font-bold text-center lg:hidden"><span class="text-green-700">오토앤투어</span>만의</p>
        <p class="text-[24px] font-bold text-center lg:hidden">맞춤여행 혜택</p> -->
        <div class="justify-center lg:gap-4 gap-2 lg:mb-6 mb-8 flex-wrap my-[40px] hidden lg:block text-[#5E5F61]">
             <p class="lg:text-[18px]">여행객의 선호도, 일정, 예산 등을 고려하여 개인 또는 ​소규모 그룹을 위한 맞춤형 여행을 계획하여 진행합니다.</p>
             <p class="lg:text-[18px]">
              <span>여행의 모든 요소(항공권, 숙박, 교통, 관광 등)를 </span>
              <span class="text-[#127C3C]">​여행객의 필요에 따라 조정</span>
              <span>할 수 있습니다.</span>
             </p>
        </div>
        <div class="flex justify-center lg:gap-4 gap-2 lg:mb-6 mb-8 flex-wrap my-[20px] lg:hidden text-[#152123]">
             <p class="text-[14px]">여행객의 선호도, 일정, 예산 등을 고려하여 개인 또는</p>
             <p class="text-[14px]">소규모 그룹을 위한 맞춤형 여행을 계획하여 진행합니다.</p>
             <p class="text-[14px]">여행의 모든 요소(항공권, 숙박, 교통, 관광 등)를</p>
             <p class="text-[14px]"><span class="text-[#127C3C]">여행객의 필요에 따라 조정</span>할 수 있습니다.</p>
        </div>
            <div class="flex justify-center items-center flex-col lg:flex-row lg:my-[64px] my-[32px]">
              <div class="p-6 rounded-md flex flex-col lg:flex-row items-center gap-8 justify-between lg:w-[1280px] w-[328px] lg:h-[550px]">
                    <div class="flex justify-start">
                      <img src="@/assets/images/customContentImage.jpg" class="lg:w-[512px] lg:h-[550px] w-[295px] h-[238px] rounded-2xl" alt="" />
                    </div>
                    <div class="bg-white lg:w-[559px] lg:h-[528px]">
                      <div class="flex flex-col items-start text-left lg:ml-1 text-[#5E5F61] font-normal lg:gap-[25px] gap-[15px]">

                        <div class="flex items-start lg:w-full lg:h-[68px] w-[328px] h-[78px]">
                          <div class="lg:mt-[2px]">
                            <img src="@/assets/icons/custList1.svg" class="lg:w-[48px] lg:h-[48px] w-[32px] h-[32px] rounded-sm" alt="" />
                          </div>
                          <div class="ml-3 hidden lg:block">
                            <p class="text-[18px] font-semibold text-[#5E5F61]">고객 예산에 따라 조율 가능한 다양한 옵션</p>
                            <div class="text-[14px] font-normal text-[#8E8D8D]">
                              <p>고객님의 예산에 맞춰 자유롭게 선택할 수 있는 다양한 여행 옵션을 제공합니다.</p>
                              <p>알뜰한 여행부터 프리미엄 여행까지 모두 가능합니다.</p>
                            </div>
                          </div>
                          <div class="ml-2 lg:hidden">
                            <p class="text-[12px] font-semibold text-[#5E5F61]">고객 예산에 따라 조율 가능한 다양한 옵션</p>
                            <div class="text-[12px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>고객님의 예산에 맞춰 자유롭게 선택할 수 있는 다양한 여행.</p>
                              <p>옵션을 제공합니다. 알뜰한 여행부터 프리미엄 여행까지</p>
                              <p>모두 가능합니다.</p>
                            </div>
                          </div>
                        </div>

                        <div class="flex items-start lg:w-full lg:h-[68px] w-[328px] h-[78px]">
                          <div class="lg:mt-[2px]">
                            <img src="@/assets/icons/custList2.svg" class="lg:w-[48px] lg:h-[48px] w-[32px] h-[32px] rounded-sm" alt="" />
                          </div>
                          <div class="ml-3 hidden lg:block">
                            <p class="text-[18px] font-semibold text-[#5E5F61]">원하는 시간, 원하는 방식으로 즐기는 자유로운 일정</p>
                            <div class="text-[14px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>여행 시작 시간부터 일정 구성까지, 고객님의 스타일과 취향에 맞춰 자유롭게 조정할 수</p>
                              <p>있습니다. 정해진 일정에 얽매이지 않고 여행을 즐겨보세요.</p>
                            </div>
                          </div>
                          <div class="ml-2 lg:hidden">
                            <p class="text-[12px] font-semibold text-[#5E5F61]">원하는 시간, 원하는 방식으로 즐기는 자유로운 일정</p>
                            <div class="text-[12px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>여행 시작 시간부터 일정 구성까지, 고객님의 스타일과</p>
                              <p>취향에 맞춰 자유롭게 조정할 수 있습니다. 정해진 일정에</p>
                              <p>얽매이지 않고 여행을 즐겨보세요.</p>
                            </div>
                          </div>
                        </div>

                        <div class="flex items-start lg:w-full lg:h-[68px] w-[328px] h-[78px]">
                          <div class="lg:mt-[2px]">
                            <img src="@/assets/icons/custList3.svg" class="lg:w-[48px] lg:h-[48px] w-[32px] h-[32px] rounded-sm" alt="" />
                          </div>
                          <div class="ml-3 hidden lg:block">
                            <p class="text-[18px] font-semibold text-[#5E5F61]">쇼핑·관광의 부담과 강요 없는 우리만의 여행</p>
                            <div class="text-[14px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>강제 쇼핑이나 원하지 않는 관광 없이, 진짜 원하는 곳만 방문하는 순수한 여행을</p>
                              <p>보장합니다. 오직 우리만을 위한 맞춤 여행을 즐기세요.</p>
                            </div>
                          </div>
                          <div class="ml-2 lg:hidden">
                            <p class="text-[12px] font-semibold text-[#5E5F61]">쇼핑·관광의 부담과 강요 없는 우리만의 여행</p>
                            <div class="text-[12px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>강제 쇼핑이나 원하지 않는 관광 없이, 진짜 원하는</p>
                              <p>곳만 방문하는 순수한 여행을 보장합니다. 오직 우리만을</p>
                              <p>위한 맞춤 여행을 즐기세요.</p>
                            </div>
                          </div>
                        </div>

                        <div class="flex items-start lg:w-full lg:h-[68px] w-[328px] h-[78px]">
                          <div class="lg:mt-[2px]">
                            <img src="@/assets/icons/custList4.svg" class="lg:w-[48px] lg:h-[48px] w-[32px] h-[32px] rounded-sm" alt="" />
                          </div>
                          <div class="ml-3 hidden lg:block">
                            <p class="text-[18px] font-semibold text-[#5E5F61]">현지 전문 가이드가 동행, 안전하고 편안한 여행을 제공</p>
                            <div class="text-[14px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>지역을 잘 아는 현지 전문가 가이드가 함께하여 안전하고 편리한 여행을 도와드립니다.</p>
                              <p>문화와 역사에 대한 깊이 있는 설명도 함께 제공합니다.</p>
                            </div>
                          </div>
                          <div class="ml-2 lg:hidden">
                            <p class="text-[12px] font-semibold text-[#5E5F61]">현지 전문 가이드가 동행, 안전하고 편안한 여행을 제공</p>
                            <div class="text-[12px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>지역을 잘 아는 현지 전문가 가이드가 함께하여 안전하고</p>
                              <p>편리한 여행을 도와드립니다. 문화와 역사에 대한 깊이 있는</p>
                              <p>설명도 함께 제공합니다.</p>
                            </div>
                          </div>
                        </div>

                        <div class="flex items-start lg:w-full lg:h-[68px] w-[328px] h-[78px]">
                          <div class="lg:mt-[2px]">
                            <img src="@/assets/icons/custList5.svg" class="lg:w-[48px] lg:h-[48px] w-[32px] h-[32px] rounded-sm" alt="" />
                          </div>
                          <div class="ml-3 hidden lg:block">
                            <p class="text-[18px] font-semibold text-[#5E5F61]">추가 비용 없는 정찰제 운영으로 팁 없는 투명한 서비스</p>
                            <div class="text-[14px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>숨겨진 비용 없이 명확한 요금제로 운영되며, 별도의 팁 없이도 최고의</p>
                              <p>서비스를 받으실 수 있는 투명한 여행을 보장합니다.</p>
                            </div>
                          </div>
                          <div class="ml-2 lg:hidden">
                            <p class="text-[12px] font-semibold text-[#5E5F61]">추가 비용 없는 정찰제 운영으로 팁 없는 투명한 서비스</p>
                            <div class="text-[12px] font-normal text-[#8E8D8D] whitespace-nowrap">
                              <p>숨겨진 비용 없이 명확한 요금제로 운영되며, 별도의 팁</p>
                              <p>없이도 최고의 서비스를 받으실 수 있는 투명한 여행을</p>
                              <p>보장합니다.</p>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div class="flex lg:justify-start lg:ml-1 justify-center">
                         <button @click="goToCreate_quote"
                           class="bg-[#2F312A] text-white flex items-center justify-center py-2 rounded-lg hover:bg-[#95C3DD] transition w-[250px] h-[50px] lg:w-[192px] lg:h-[52px] text-[14px] lg:text-[20px] mt-10 lg:mt-12">
                           <span class="font-normal">맞춤여행 문의하기</span>
                         </button>
                      </div>
                    </div>
                </div>
            </div>
            <!-- <div class="flex justify-center mt-10 lg:mt-12">
               <button @click="goToCreate_quote"
                 class="bg-[#2F312A] text-white flex items-center justify-center py-2 border lg:border-2 border-[#2F312A] rounded-lg hover:bg-[#95C3DD] transition w-[160px] lg:w-[208px] text-[14px] lg:text-[20px] mt-10 lg:mt-12">
                 <span class="ml-2 font-semibold">맞춤여행 문의하기</span>
               </button>
            </div> -->
    </div>
  </template>
  
  <script setup>
 import {useRouter} from "vue-router"

const router = useRouter();

const goToCreate_quote = () =>{
    router.push('/create-quotation');
};
  </script>