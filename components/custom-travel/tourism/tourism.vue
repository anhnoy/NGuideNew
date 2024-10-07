<template>
  <div class="max-w-[1080px] bg-white p-4 sm:p-6 mx-auto">
    <h2 class="h1-custom text-center mb-4">같이 여행하는 인원에 대해 작성해 주세요.</h2>
    <p class="h3-custom text-center text-[#FF7100] mb-4">※ 여행 인원은 총 8명 이상 가능합니다. (골프 여행은 4명 이상)</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Category 1: Adults -->
      <div class="flex flex-col items-center">
        <div class="flex sm:flex-col justify-between items-center w-[300px]">
          <div>
            <p class="text-18 font-bold sm:text-center">성인</p>
            <p class="text-xs text-[#5E5F61] mb-2 text-center">(만 12세 이상)</p>
          </div>
          <div class="flex items-center">
            <button @click="decrement('adults')"
              class="w-8 h-8 bg-[#152123] rounded-full flex items-center justify-center text-white font-bold hover:bg-[#1a242a] transition">
              -
            </button>
            <input :value="travelStore.travelCustom.selectReq_adults" type="number"
              class="w-[60px] sm:w-[80px] h-[40px] text-center text-black mx-2 border border-[#8E8D8D] bg-white" readonly>
            <button @click="increment('adults')"
              class="w-8 h-8 bg-[#152123] text-white font-bold rounded-full flex items-center justify-center hover:bg-[#1a242a] transition">
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Category 2: Kids -->
      <div class="flex flex-col items-center">
        <div class="flex sm:flex-col justify-between items-center w-[300px]">
          <div>
            <p class="text-18 font-bold sm:text-center">어린이</p>
            <p class="text-xs text-[#5E5F61] mb-2 text-center">(만 2세~만 12세 이상)</p>
          </div>
          <div class="flex items-center">
            <button @click="decrement('kids')"
              class="w-8 h-8 bg-[#152123] rounded-full flex items-center justify-center text-white font-bold hover:bg-[#1a242a] transition">
              -
            </button>
            <input :value="travelStore.travelCustom.selectReq_kids" type="number"
              class="w-[60px] sm:w-[80px] h-[40px] text-center text-black mx-2 border border-[#8E8D8D] bg-white" readonly>
            <button @click="increment('kids')"
              class="w-8 h-8 bg-[#152123] text-white font-bold rounded-full flex items-center justify-center hover:bg-[#1a242a] transition">
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Category 3: Infants -->
      <div class="flex flex-col items-center">
        <div class="flex sm:flex-col justify-between items-center w-[300px]">
          <div>
            <p class="text-18 font-bold sm:text-center">유아</p>
            <p class="text-xs text-[#5E5F61] mb-2 text-center">(만 2세 미만)</p>
          </div>
          <div class="flex items-center">
            <button @click="decrement('infants')"
              class="w-8 h-8 bg-[#152123] rounded-full flex items-center justify-center text-white font-bold hover:bg-[#1a242a] transition">
              -
            </button>
            <input :value="travelStore.travelCustom.selectReq_infants" type="number"
              class="w-[60px] sm:w-[80px] h-[40px] text-center bg-white text-black mx-2 border border-[#8E8D8D]" readonly>
            <button @click="increment('infants')"
              class="w-8 h-8 bg-[#152123] text-white font-bold rounded-full flex items-center justify-center hover:bg-[#1a242a] transition">
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Key Age Group Selection -->
      <div class="flex mt-[-5px] flex-col items-center">
        <p class="text-18 font-bold">주요 연령대</p>
        <select v-model="selectedOption" class="border mt-4 sm:mt-7 bg-white rounded-md px-4 py-2 w-[300px] sm:w-[140px] ">
          <option disabled value="">선택</option>
          <option v-for="ageGroup in ageGroups" :key="ageGroup.mg_id" :value="ageGroup.mg_id" >
            {{ ageGroup.mg_age }} 
          </option>
        </select>
      </div>
    </div>

    <div class="mt-16 hidden sm:block">
      <svg width="100%" height="2" class="mt-4">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="#8E8D8D" stroke-width="1" stroke-dasharray="8,8" />
      </svg>
    </div>

    <div class="w-full sm:w-[650px] mx-auto px-4 p-12">
      <h2 class="text-xl text-center text-black font-bold mb-4">1인당 희망 예산을 설정해 주세요.</h2>
      <div class="flex flex-col items-center justify-center">
        <div class="relative w-full h-[4px] bg-[#E6E6E6] rounded-full mb-4">
          <input type="range" v-model="req_bid_end" :min="minBudget" :max="maxBudget" :step="step"
            @input="updateBudgetRange" class="custom-range absolute w-full h-full opacity-0 cursor-pointer z-10" />
          <div class="absolute h-full bg-[#FF9900] rounded-full"
            :style="{ width: `${((req_bid_end - minBudget) / (maxBudget - minBudget)) * 100}%` }"></div>
          <div v-for="(value, index) in budgetOptions" :key="index"
            class="absolute rounded-full transition-all duration-200"
            :class="[index <= activeIndex ? 'bg-[#FF9900] w-4 h-4 mt-[-6px]' : 'bg-[#E6E6E6] w-2 h-2', index <= activeIndex ? 'ml-1' : 'mt-[-2px]']"
            :style="{ left: `${(index / (budgetOptions.length - 1)) * 100}%`, transform: 'translateX(-50%)' }">
          </div>
        </div>
        <div class="flex justify-between items-center w-full mt-4">
          <div class="relative flex items-center flex-1">
            <input type="text" :value="formattedReqBid"
              class="text-[#5E5F61] bg-[#EDEDF2] border-[#E6E6E6] sm:!border-[#8E8D8D] border-[1px] w-full text-center h-[50px] pr-10 pl-2 text-sm sm:text-base"
              readonly />
            <label
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5E5F61] text-xs sm:text-sm">만원</label>
          </div>
          <div class="text-black text-2xl font-bold mx-2 my-2 text-center">~</div>
          <div class="relative flex items-center flex-1">
            <input type="text" :value="formattedReqBidEnd"
              class="text-[#5E5F61] bg-[#EDEDF2] border-[#E6E6E6] sm:!border-[#8E8D8D] border-[1px] w-full text-center h-[50px] pr-10 pl-2 text-sm sm:text-base"
              readonly />
            <label
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5E5F61] text-xs sm:text-sm">만원</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDestinationStore } from '../../../stores/destination.store';
import mainGroup from '@/services/custom-travel.service.js';

const travelStore = useDestinationStore();
const ageGroups = ref([]);

// Budget settings
const minBudget = 100;
const maxBudget = 160;
const step = 10;
const budgetOptions = [100, 110, 120, 130, 140, 150, 160,];

const activeIndex = computed(() => {
  return budgetOptions.findIndex(value => value >= travelStore.travelCustom.req_bid_end);
});

const increment = (category) => {
  const currentValue = Number(travelStore.travelCustom[`selectReq_${category}`]) || 0;
  if (currentValue < 99) {
    travelStore.travelCustom[`selectReq_${category}`] = String(currentValue + 1);
  }
};

const decrement = (category) => {
  const currentValue = Number(travelStore.travelCustom[`selectReq_${category}`]) || 0;
  if (currentValue > 0) {
    travelStore.travelCustom[`selectReq_${category}`] = String(currentValue - 1);
  }
};

const formattedReqBid = computed(() => travelStore.travelCustom.req_bid.toLocaleString());
const formattedReqBidEnd = computed(() => travelStore.travelCustom.req_bid_end.toLocaleString());

const selectedOption = computed({
  get: () => travelStore.travelCustom.selectedOption,
  set: (value) => travelStore.travelCustom.selectedOption = value,
});

const req_bid_end = computed({
  get: () => travelStore.travelCustom.req_bid_end,
  set: (value) => travelStore.travelCustom.req_bid_end = Number(value),
});

const updateBudgetRange = (event) => {
  travelStore.travelCustom.req_bid_end = Number(event.target.value);
};

// Fetch main age groups on component mount
onMounted(async () => {
  const response = await mainGroup.getMainGroup();
  if (response && response.data && response.data.resp) {
    ageGroups.value = response.data.resp;
  }
});
</script>
