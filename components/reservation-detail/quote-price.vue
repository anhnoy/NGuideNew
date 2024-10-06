<template>
  <div class="max-w-7xl sm:w-[840px] w-[360px] mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-6">
      <div class="flex items-center space-x-2 text-xl sm:text-2xl text-gray-800">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 12C22.9902 10.8507 21.4383 10.0157 19.5741 10.0157H15.6406C15.0941 10.0157 14.8891 9.9273 14.567 9.55402L8.00797 2.35363C7.80301 2.11788 7.54924 2 7.25643 2H6.12421C5.87045 2 5.72404 2.22593 5.85093 2.50098L9.22803 10.0157L4.26974 10.5855L2.50311 7.32416C2.37621 7.07858 2.16149 6.97053 1.83939 6.97053H1.4197C1.16593 6.97053 1 7.13752 1 7.39292V16.6071C1 16.8625 1.16593 17.0197 1.4197 17.0197H1.83939C2.16149 17.0197 2.37621 16.9116 2.50311 16.6758L4.26974 13.4145L9.22803 13.9843L5.85093 21.499C5.72404 21.7642 5.87045 22 6.12421 22H7.25643C7.54924 22 7.80301 21.8723 8.00797 21.6463L14.567 14.4361C14.8891 14.0726 15.0941 13.9843 15.6406 13.9843H19.5741C21.4383 13.9843 22.9902 13.1395 23 12Z" fill="black" fill-opacity="0.85" />
        </svg>
        <span>항공</span>
      </div>
    </div>

    <!-- Tickets -->
    <div class="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
      <div v-for="type in ['departure', 'arrival']" :key="type" class="ticket-style p-4 flex flex-col items-center sm:w-1/2">
        <div class="text-center mb-2">
          <p class="text-orange-500 text-xl font-bold">{{ type === 'departure' ? 'Departure' : 'Arrival' }}</p>
          <p class="text-sm text-gray-600">({{ quoteDetails?.flight_detail?.flight_number }})</p>
        </div>
        <div class="flex justify-between w-full">
          <div class="text-center">
            <p class="text-xs text-blue-900">{{ quoteDetails?.flight_detail?.depart_date_from }}</p>
            <p class="text-lg text-blue-500 font-bold">{{ quoteDetails?.flight_detail?.flight_time_from }}</p>
            <p class="text-sm">{{ quoteDetails?.flight_detail?.flight_sta_from }}</p>
          </div>
          <div class="flex items-center">
            <span class="text-2xl">→</span>
          </div>
          <div class="text-center">
            <p class="text-xs text-blue-900">{{ quoteDetails?.flight_detail?.depart_date_to }}</p>
            <p class="text-lg text-blue-500 font-bold">{{ quoteDetails?.flight_detail?.flight_time_to }}</p>
            <p class="text-sm">{{ quoteDetails?.flight_detail?.flight_sta_to }}</p>
          </div>
        </div>
      </div>
    </div>
    

    <div class="mt-6 space-y-4">
      <div class="flex justify-between items-center">
        <p class="text-blue-900 font-bold">항공 견적가</p>
        <p class="font-bold">{{ sumPriceFlight.toLocaleString() }} KRW</p>
      </div>

      <div>
        <div class="flex items-center space-x-2 text-xl sm:text-2xl text-gray-800 mb-2">
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7486 4.4C14.9829 4.4 16 5.368 16 6.6V18.7C16 19.943 14.9829 20.9 13.7486 20.9C13.7486 21.538 13.2114 22 12.5714 22C12 22 11.4286 21.538 11.4286 20.9H4.57143C4.57143 21.538 4 22 3.42857 22C2.78857 22 2.25143 21.538 2.25143 20.9C1.01714 20.9 0 19.943 0 18.7V6.6C0 5.368 1.01714 4.4 2.25143 4.4H4.57143V1.1C4.57143 0.462 5.09714 0 5.71429 0H10.2857C10.9029 0 11.4286 0.462 11.4286 1.1V4.4H13.7486ZM9.71429 4.4V1.65H6.28571V4.4H9.71429ZM3.42857 7.7V17.6H5.14286V7.7H3.42857ZM10.8571 7.7V17.6H12.5714V7.7H10.8571ZM7.14286 7.7V17.6H8.85714V7.7H7.14286Z" fill="black" />
          </svg>
          <span>여행</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <p class="text-blue-900 font-bold">여행 견적가</p>
          <span class="text-xs text-gray-600">(투어 : 호텔, 식사, 관광, 가이드, 차량 포함된 가격입니다.)</span>
        </div>
        <p class="font-bold mt-2 sm:mt-0">{{ sumPriceTrousers.toLocaleString() }} KRW</p>
      </div>

      <div class="border-t-2 border-dashed border-gray-400 my-4"></div>

      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <p class="text-blue-500 font-bold text-lg">총 예상 견적가</p>
        <div class="text-right mt-2 sm:mt-0">
          <p class="font-bold text-lg">{{ sumTotal.toLocaleString() }} KRW</p>
          <span class="text-xs text-gray-600">({{ priceToPerson.toLocaleString() }} KRW / per person)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  }
});


const sumPriceFlight = 200000
const sumPriceTrousers = 500000
const sumTotal = computed(() => sumPriceFlight + sumPriceTrousers)
const priceToPerson = computed(() => Math.round(sumTotal.value / 5))
</script>

<style scoped>
.ticket-style {
  position: relative;
  border: 2px dashed #8e8d8d;
  border-radius: 10px;
}

.ticket-style::before,
.ticket-style::after {
  content: '';
  position: absolute;
  width: 35px;
  height: 20px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  z-index: 1;
  border: 2px dashed #8e8d8d;
  border-left: none;
  border-right: none;
  border-bottom: none;
}

.ticket-style::before {
  top: 50%;
  left: -12px;
  transform: translateY(-50%) rotate(90deg);
}

.ticket-style::after {
  top: 50%;
  right: -12px;
  transform: translateY(-50%) rotate(-90deg);
}
</style>