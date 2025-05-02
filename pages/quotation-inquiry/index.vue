<template>
    <div>
        <div class="relative lg:h-auto lg:min-h-[100vh] bg-cover bg-no-repeat "
            :style="{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundBlendMode: 'overlay',
                backgroundColor: '#00000080' 
            }">
            <kakao />
            <navbar class="hidden sm:block bg-white" />
            <div
                class="flex justify-center items-center md:flex md:justify-center md:items-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                <!-- Desktop version -->
                <div
                    class="bg-[#EDEDF2] shadow-md w-[1080px] h-[617px] mt-[10px] justify-center items-center rounded-[50px] hidden md:flex">
                    <div class="w-[744px] mx-auto">
                        <h2 class="text-[30px] font-bold text-[#152123] -mt-[90px] mb-20 text-center">
                            견적서 조회
                        </h2>
                        <div class="w-[650px] mx-auto mt-12 flex flex-col">
                            <div class="w-full h-[19px] mb-8">
                                <span class="text-[16px] font-medium text-[#152123]">전체 {{totalItems}} 건</span>
                            </div>
                            <div
                              v-for="(item, index) in listItems"
                              :key="index"
                              class="w-[650px] mx-auto flex justify-between rounded-2xl border-[1px] border-[#8E8D8D] bg-[#FFFFFF] mb-4">
                              <div class="w-[650px] h-[126px] text-[12px] mx-auto flex items-center justify-between">
                                <div class="w-full gap-[6px] mx-auto px-4 py-2">
                                  <div class="my-2 flex items-center justify-start">
                                    <label class="text-[#8E8D8D] mr-[18px]">관광단체명</label>
                                    <span class="text-[#152123]">{{ item.req_group_name }}</span>
                                  </div>
                                  <div class="my-2 flex items-center justify-start">
                                    <label class="text-[#8E8D8D] mr-[26px]">여행 일정</label>
                                    <span class="text-[#152123]">{{ item.req_depart }}</span>
                                    <span class="text-[#152123]">~</span>
                                    <span class="text-[#152123]">{{ item.req_arr }}</span>
                                  </div>
                                  <div class="my-2 flex items-center justify-start">
                                    <label class="text-[#8E8D8D] mr-[51px]">인원</label>
                                    <span class="text-[#152123]">
                                      {{ item.req_adults + item.req_kids + item.req_infant }}명 (
                                      성인{{ item.req_adults || 0 }}명 /
                                      아동{{ item.req_kids || 0 }}명 /
                                      유아{{ item.req_infant || 0 }}명 )
                                    </span>
                                  </div>
                                  <div class="my-2 flex items-center justify-start">
                                    <label class="text-[#8E8D8D] mr-[18px]">견적신청일</label>
                                    <span class="text-[#152123]">{{ item.created_at.split(' ')[0] }}</span>
                                  </div>
                                </div>
                                <div class="w-auto mx-auto flex items-center px-4">
                                  <button @click="gotToDetail(item?.quote_mains[0]?.quo_id)" class="w-[98px] h-[38px] bg-[#6EBC30] hover:bg-[#127C3C] rounded-md text-white px-3">
                                    견적서 보기
                                  </button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile version -->
                <div class="w-[100vh] h-[100vh] bg-white md:hidden flex flex-col justify-between">
                    <!-- Mobile header -->
                    <div
                        class="bg-white h-[66px] flex items-center justify-between px-4 md:hidden border-b border-[#E6E6E6]">
                        <div class="flex items-center">
                            <img src="@/assets/icons/chevron-left.svg" @click="clickBack" alt="Back"
                                class="text-black w-[24px] h-[24px]" />
                        </div>
                        <div class="text-center flex-grow text-black">견적서 목록</div>
                        <div></div>
                    </div>

                    <!-- Mobile form -->
                    <div class="px-4 mt-10 flex flex-grow justify-center items-start">
                        <div class="flex flex-col justify-center ml-1">
                            <div class="w-[328px] h-[22px] mx-auto mb-8">
                                <span class="text-[18px] font-medium text-[#152123]">전체 {{totalItems}} 건</span>
                            </div>
                            <div 
                              v-for="(item, index) in listItems" 
                              :key="index" 
                              class="w-[328px] mx-auto flex justify-center rounded-2xl border-[1px] border-[#8E8D8D] bg-[#FFFFFF] mb-4">
                              <div class="w-[328px] h-[176px] text-[12px] mx-auto flex flex-col items-center">
                                <div class="w-full gap-[6px] mx-auto px-4 py-2">
                                  <div class="my-2 flex items-center justify-between ">
                                    <label class="text-[#8E8D8D]">관광단체명</label>
                                    <span class="text-[#152123]">{{ item.req_group_name }}</span>
                                  </div>
                                  <div class="my-2 flex items-center justify-between ">
                                    <label class="text-[#8E8D8D]">여행 일정</label>
                                    <span class="text-[#152123]">{{ item.req_depart }}~{{ item.req_arr }}</span>
                                  </div>
                                  <div class="my-2 flex items-center justify-between">
                                    <label class="text-[#8E8D8D]">인원</label>
                                    <span class="text-[#152123]">
                                      {{ item.req_adults + item.req_kids + item.req_infant }}명 ( 성인{{ item.req_adults || 0 }}명 / 아동{{ item.req_kids || 0 }}명 / 유아{{ item.req_infant || 0 }}명 )
                                    </span>
                                  </div>
                                  <div class="my-2 flex items-center justify-between ">
                                    <label class="text-[#8E8D8D]">견적신청일</label>
                                    <span class="text-[#152123]">{{ item.created_at.split(' ')[0] }}</span>
                                  </div>
                                </div>
                                <div class="w-auto mx-auto flex items-center">
                                  <button @click="gotToDetail(item?.quote_mains[0]?.quo_id)"
                                    class="w-[304px] h-[38px] bg-[#6EBC30] hover:bg-[#127C3C] rounded-md text-white px-3">
                                    견적서 보기
                                  </button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile button fixed at the bottom -->
                    <div class="fixed bottom-0 left-0 right-0 lg:hidden">
                        <button 
                            class="w-full custom-next-button">
                            조회하기
                            <span class="loading loading-spinner loading-md"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import { useQuotationStore } from "~/stores/login.store";

const router = useRouter();
const store = useQuotationStore();

const totalItems = ref(store.totalQuote);
const listItems = ref(store.fecthListItems);

const gotToDetail = async (quotationNumber) =>{
  const quotationPhone = localStorage.getItem('phone');
  if (!quotationPhone) {
      console.error('No quotation phone found in localStorage');
      clickBack()
      return;
  }
  localStorage.setItem("quotationNumber", quotationNumber);
  await router.push("/quotation-detail");
};

const clickBack = () => {
    router.go(-1);
};
</script>