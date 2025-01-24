<template>
  <div class="sm:w-[840px] w-[360px] mx-auto px-4 sm:px-0">
    <!-- Header -->
    <div class="mb-6 flex">
      <div class="flex items-center space-x-2 text-xl sm:text-2xl text-gray-800">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 10C21.9902 8.85068 20.4383 8.01571 18.5741 8.01571H14.6406C14.0941 8.01571 13.8891 7.9273 13.567 7.55402L7.00797 0.353634C6.80301 0.117878 6.54924 0 6.25643 0H5.12421C4.87045 0 4.72404 0.225933 4.85093 0.500982L8.22803 8.01571L3.26974 8.58546L1.50311 5.32416C1.37621 5.07858 1.16149 4.97053 0.839393 4.97053H0.419698C0.165927 4.97053 0 5.13752 0 5.39292V14.6071C0 14.8625 0.165927 15.0197 0.419698 15.0197H0.839393C1.16149 15.0197 1.37621 14.9116 1.50311 14.6758L3.26974 11.4145L8.22803 11.9843L4.85093 19.499C4.72404 19.7642 4.87045 20 5.12421 20H6.25643C6.54924 20 6.80301 19.8723 7.00797 19.6463L13.567 12.4361C13.8891 12.0726 14.0941 11.9843 14.6406 11.9843H18.5741C20.4383 11.9843 21.9902 11.1395 22 10Z"
            fill="black" fill-opacity="0.85" />
        </svg>
        <span class="text-[24px] w-[50px] font-medium leading-[24px] tracking-[-0.01em] text-left text-[#152123]">항공</span>
      </div>
      <svg class="mt-2 ml-5" width="720" height="1" viewBox="0 0 747 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.5" y1="0.5" x2="746.5" y2="0.5" stroke="#8E8D8D" stroke-linecap="round" />
      </svg>

    </div>

    <!-- Tickets -->
    <div v-if="sortedFlights.length" class="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
      <div v-for="flight in sortedFlights" :key="flight.flid"
        class="ticket-style p-4 flex flex-col justify-center items-center sm:w-1/2">

        <div class="flex justify-between items-center w-full px-4">
          <div class="text-center space-y-3">
            <p class="text-xs text-[#152123]">{{ flight.depart_date_from }}</p>
            <p class="text-lg text-header font-bold">{{ flight.flight_time_from.slice(0, 5) }}</p>
            <p class="text-sm text-[#152123]">{{ flight.flight_sta_from }}</p>
          </div>
          <div class="text-center space-y-3 mb-2 w-[50%]">
            <p class="text-sub text-[26px] md:text-[30px] ">{{ flight.isOutbound ? '출국' : '입국' }}</p>
            <div class="flex items-center justify-center">
              <img :src="arrow" alt="Arrow">
            </div>
            <div>
              <!-- <p class="text-sm leading-[20px] font-light text-[#2F312A]">제주항공</p> -->
              <p class="text-sm text-[#152123]">{{ flight.flight_number }}</p>
            </div>
          </div>
          <div class="text-center space-y-3">
            <p class="text-xs text-[#152123]">{{ flight.depart_date_to }}</p>
            <p class="text-lg text-header font-bold">{{ flight.flight_time_to.slice(0, 5) }}</p>
            <p class="text-sm text-[#152123]">{{ flight.flight_sta_to }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- No flights available message -->
    <div v-else class="text-center mt-6">
      <p class="text-gray-500 text-lg">현재 이용 가능한 항공편 정보가 없습니다.</p>
      <p class="text-gray-400">나중에 다시 확인해 주세요.</p>
      <div class="mt-2">
        <span class="mdi mdi-airplane-search text-4xl"></span>
      </div>
    </div>

    <div class="quote-summary  bg-white ">
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-[#132D5C] text-sm md:text-lg font-bold">항공 견적가</h2>
          <p class="text-sm md:text-lg font-bold">{{ flightQuote.toLocaleString() }} 원</p>
        </div>
        <div class="flex items-center space-x-2 text-xl mt-10 text-gray-800">
          <div class="flex">
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.7486 4.4C14.9829 4.4 16 5.368 16 6.6V18.7C16 19.943 14.9829 20.9 13.7486 20.9C13.7486 21.538 13.2114 22 12.5714 22C12 22 11.4286 21.538 11.4286 20.9H4.57143C4.57143 21.538 4 22 3.42857 22C2.78857 22 2.25143 21.538 2.25143 20.9C1.01714 20.9 0 19.943 0 18.7V6.6C0 5.368 1.01714 4.4 2.25143 4.4H4.57143V1.1C4.57143 0.462 5.09714 0 5.71429 0H10.2857C10.9029 0 11.4286 0.462 11.4286 1.1V4.4H13.7486ZM9.71429 4.4V1.65H6.28571V4.4H9.71429ZM3.42857 7.7V17.6H5.14286V7.7H3.42857ZM10.8571 7.7V17.6H12.5714V7.7H10.8571ZM7.14286 7.7V17.6H8.85714V7.7H7.14286Z"
                fill="black" />
            </svg>
            <span class="md:text-2xl text-lg ml-3 w-[50px] font-medium leading-6 tracking-tight text-[#152123]">여행</span>
          </div>
          <svg class="mt-2 ml-5" width="720" height="1" viewBox="0 0 747 1" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <line x1="0.5" y1="0.5" x2="746.5" y2="0.5" stroke="#8E8D8D" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      <div class="pt-4 mb-4 sm:hidden">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-[#132D5C] text-sm md:text-lg font-bold ">여행 견적가</h2>
          <p class="text-sm md:text-lg font-bold">{{ travelQuote.toLocaleString() }} 원</p>
        </div>
        <!-- <p class="text-sm md:text-lg  text-gray-600">{{ travelQuoteDescription }}</p> -->
      </div>
      <div class="mb-4 hidden md:block">
        <div class="flex justify-between mt-5 items-center">
          <div class="flex">
            <h2 class="text-[#132D5C] text-sm md:text-lg font-bold">여행 견적가</h2>
            <!-- <p class="text-[14px] text-gray-600 mt-1 ml-5">{{ travelQuoteDescription }}</p> -->
          </div>
          <p class="text-sm md:text-lg font-bold">{{ travelQuote }} 원</p>
        </div>
      </div>

      <div class="border-t-2 border-dashed pt-4">
        <div class="flex justify-between items-center">
          <h3 class="text-[#6592E2] text-sm md:text-lg font-bold">총 예상 견적가</h3>
          <div class="text-right">
            <p class="text-sm md:text-lg font-bold text-[#E25C5C]">{{ totalQuote.toLocaleString() }} 원</p>
            <span class="text-xs md:text-sm text-[#8E8D8D]">(1인 당 {{ dailyQuote.toLocaleString() }} 원)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import arrow from '~/assets/icons/arrowto.svg'
// import moment from 'moment';
const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true,
    default: () => ({
      flight_detail: []
    })
  }
});

// Sort flights based on flid and add isOutbound property
const sortedFlights = computed(() => {
  console.log(props.quoteDetails);
  if (!props.quoteDetails?.flight_detail) return [];

  return props.quoteDetails.flight_detail
    .map(flight => ({
      ...flight,
      isOutbound: true
    }))
    .sort((a, b) => a.flid - b.flid)
    .map((flight, index, array) => ({
      ...flight,
      isOutbound: index === 0
    }));
});

const sumPriceFlight = computed(() => {
  if (!props.quoteDetails?.flight_detail) return 0;

  return props.quoteDetails.flight_detail.reduce((total, flight) =>
    total + (flight.flight_price || 0), 0
  );
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
};

// Raw values without formatting
const flightQuoteValue = computed(() => props.quoteDetails?.flight_total);
const travelQuoteValue = computed(() => props.quoteDetails?.tour_total);

// Format the individual quotes
const flightQuote = computed(() => formatCurrency(flightQuoteValue.value));
const travelQuote = computed(() => formatCurrency(travelQuoteValue.value));

// Sum the raw values and format the total
const totalQuote = computed(() => formatCurrency(flightQuoteValue.value + travelQuoteValue.value));

const totalPeople = computed(() => {
  const adults = props.quoteDetails?.quo?.req?.req_adults;
  const kids = props.quoteDetails?.quo?.req?.req_kids;
  const infants = props.quoteDetails?.quo?.req?.req_infant;

  return adults + kids + infants;
});

const dailyQuote = computed(() => {
  const people = totalPeople.value;
  const totalRaw = flightQuoteValue.value + travelQuoteValue.value; // Use raw values
  if (people === 0) return 0; // Handle division by 0 case

  return formatCurrency(totalRaw / people); // Format the result
});

const travelQuoteDescription = "투어, 호텔, 식사, 관광, 가이드, 차량 포함된 가격입니다.";
</script>

<style scoped>
.ticket-style {
  position: relative;
  border: 2px dashed #8e8d8d;
  border-radius: 10px;
  min-height: 160px;
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

.quote-summary {
  margin-top: 20px;
  background-color: white;
}
</style>