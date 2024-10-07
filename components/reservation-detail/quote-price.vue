<template>
<div class="sm:w-[840px] w-[360px] mx-auto px-4 sm:px-0">
    <div class="mb-6">
      <div class="flex items-center space-x-2 text-xl sm:text-2xl text-gray-800">
        <span>항공</span>
      </div>
    </div>
    <!-- Tickets -->
    <div v-if="sortedFlights.length" class="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
      <div v-for="flight in sortedFlights" :key="flight.flid"
           class="ticket-style p-4 flex flex-col items-center sm:w-1/2">
        <div class="text-center mb-2">
          <p class="text-orange-500 text-xl font-bold">{{ flight.isOutbound ? '출국' : '입국' }}</p>
          <p class="text-sm text-gray-600">({{ flight.flight_number }})</p>
        </div>
        <div class="flex justify-between w-full">
          <div class="text-center">
            <p class="text-xs text-blue-900">{{ flight.depart_date_from }}</p>
            <p class="text-lg text-blue-500 font-bold">{{ flight.flight_time_from }}</p>
            <p class="text-sm">{{ flight.flight_sta_from }}</p>
          </div>
          <div class="flex items-center">
            <span class="text-2xl">→</span>
          </div>
          <div class="text-center">
            <p class="text-xs text-blue-900">{{ flight.depart_date_to }}</p>
            <p class="text-lg text-blue-500 font-bold">{{ flight.flight_time_to }}</p>
            <p class="text-sm">{{ flight.flight_sta_to }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 space-y-4">
      <div class="flex justify-between items-center">
        <p class="text-blue-900 font-bold">항공 견적가</p>
        <p class="font-bold">{{ sumPriceFlight.toLocaleString() }} 원</p>
      </div>
      <div class="border-t-2 border-dashed border-gray-400 my-4"></div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <p class="text-blue-500 font-bold text-lg">총 예상 견적가</p>
        <div class="text-right mt-2 sm:mt-0">
          <p class="font-bold text-lg">{{ sumTotal.toLocaleString() }} 원</p>
          <span class="text-xs text-gray-600">( 1 인당 / {{ priceToPerson.toLocaleString() }}원)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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

const sumPriceTrousers = 200; // Placeholder value
const sumTotal = computed(() => sumPriceFlight.value + sumPriceTrousers);
const priceToPerson = computed(() => Math.round(sumTotal.value / 5));
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
