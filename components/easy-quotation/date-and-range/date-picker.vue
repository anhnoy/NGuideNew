<template>
  <div class="max-w-[1080px] bg-white py-4">
    <div class="mx-auto p-2 flex flex-col md:flex-row justify-between bg-white max-w-full md:max-w-[840px]">
      <div class="flex-1 mb-4 md:mb-0 md:mr-2">
        <!-- Mobile view: Start Date input -->
        <div class="md:hidden">
          <div class="flex justify-between items-center space-x-2">
            <div class="relative w-full">
              <div class="flex items-center w-[350px] justify-center">
                <label class="h3-custom font-bold text-black w-[500px]">출발일</label>
                <img class="absolute" :src="dateIcon" alt="">
                <input type="text" :value="formateStartDate || '선택 안함'" @focus="showStartCalendars = true" readonly
                  class="border bg-[#E6E6E6] p-2 ml-25 w-[200px] text-center text-black">
              </div>
              <Teleport to="body">
                <div v-if="showStartCalendars"
                  class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                  @click.self="showStartCalendars = false">
                  <div class="bg-white p-4 ">
                    <DatePicker v-model="store.EasyQuotation.startDate" :model-config="modelConfigs" :mask="mask"
                      :attribute="attributes" :color="selectedColors" class="z-10" :locale="customLocale"
                      :max-date="store.EasyQuotation.endDate" @update:model-value="StartDateSelect" />
                  </div>
                </div>
              </Teleport>
            </div>
          </div>
        </div>
        <div class="md:hidden">
          <div class="flex justify-between items-center space-x-2 mt-2">
            <div class="relative w-full">
              <div class="flex items-center w-[350px] justify-center">
                <label class="h3-custom font-bold text-black w-[500px]">도착일</label>
                <img class="absolute" :src="dateIcon" alt="">
                <input type="text" :value="formateEndDate || '선택 안함'" @focus="showEndCalendars = true" readonly
                  class="border bg-[#E6E6E6] p-2 ml-25 w-[200px] text-center text-black">
              </div>
              <Teleport to="body">
                <div v-if="showEndCalendars"
                  class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                  @click.self="showEndCalendars = false">
                  <div class="bg-white p-4 rounded-lg">
                    <DatePicker v-model="store.EasyQuotation.endDate" :model-config="modelConfigs" :mask="mask"
                      :attributes="attributes" :color="selectedColors" class="z-10" :locale="customLocale"
                      :min-date="store.EasyQuotation.startDate" @update:model-value="EndDateSelect" />
                  </div>
                </div>
              </Teleport>
            </div>
          </div>
        </div>

        <!-- Desktop view: Start Date input -->
        <div class="hidden md:block">
          <DatePicker v-model="store.EasyQuotation.startDate" :model-config="modelConfigs" :mask="mask"
            :attributes="attributes" :color="selectedColors" class="border rounded-md p-2 w-full" :locale="customLocale"
            :min-date="new Date()" :max-date="store.EasyQuotation.endDate" @update:model-value="StartDateSelect" />
        </div>
        <div class="h2-custom m-4 ">선호하는 출발 시간이 있으신가요?</div>

        <!-- Show formatted start date on desktop -->
        <div class="hidden md:flex text-black items-center space-x-2 mt-4">
          <label>출발일</label>
          <div class="w-[210px] h-[46px] text-black flex items-center justify-center bg-[#f5f5f7]">
            {{ formateStartDate || '선택 안함' }}
          </div>
        </div>

        <!-- Departure buttons -->
        <div class="flex space-x-2 mt-3">
          <button class="px-4 py-2 w-full md:w-auto"
            :class="[store.EasyQuotation.selectedDeparture === '1' ? 'bg-theme-selected' : 'bg-theme-unselected']"
            @click="selectDepartures('1')">
            오전 출발
          </button>
          <button class="px-4 py-2 w-full md:w-auto"
            :class="[store.EasyQuotation.selectedDeparture === '2' ? 'bg-theme-selected' : 'bg-theme-unselected']"
            @click="selectDepartures('2')">
            오후 출발
          </button>
          <button class="px-4 py-2 w-full md:w-auto"
            :class="[store.EasyQuotation.selectedDeparture === '3' ? 'bg-theme-selected' : 'bg-theme-unselected']"
            @click="selectDepartures('3')">
            상관없음
          </button>
        </div>
      </div>

      <div class="px-16"></div>

      <div class="flex-1">
        <!-- Desktop view: End Date input -->
        <div class="hidden md:block">
          <DatePicker v-model="store.EasyQuotation.endDate" :attributes="attributes" :model-config="modelConfigs"
            :mask="mask" :color="selectedColors" class="border rounded-md p-2 w-full" :locale="customLocale"
            :min-date="store.EasyQuotation.startDate ? store.EasyQuotation.startDate : new Date()"
            @update:model-value="EndDateSelect" />
        </div>
        <div class="h2-custom m-4 ">선호하는 도착 시간이 있으신가요?</div>

        <!-- Show formatted end date on desktop -->
        <div class="hidden md:flex items-center space-x-2 mt-4 text-black">
          <label>도착일</label>
          <div class="w-[210px] text-black h-[46px] bg-[#f5f5f7] flex items-center justify-center">
            {{ formateEndDate || '선택 안함' }}
          </div>
        </div>

        <!-- Arrival buttons -->
        <div class="flex space-x-2 mb-2 mt-3">
          <button class="px-4 py-2 w-full md:w-auto"
            :class="[store.EasyQuotation.selectedArrival === '1' ? 'bg-theme-selected' : 'bg-theme-unselected']"
            @click="selectArrivals('1')">
            오전 도착
          </button>
          <button class="px-4 py-2 w-full md:w-auto"
            :class="[store.EasyQuotation.selectedArrival === '2' ? 'bg-theme-selected' : 'bg-theme-unselected']"
            @click="selectArrivals('2')">
            오후 도착
          </button>
          <button class="px-4 py-2 w-full md:w-auto"
            :class="[store.EasyQuotation.selectedArrival === '3' ? 'bg-theme-selected' : 'bg-theme-unselected']"
            @click="selectArrivals('3')">
            상관없음
          </button>
        </div>
      </div>
    </div>
    <div class="mt-16 hidden sm:block">
      <svg width="100%" height="2" class="mt-4">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="#8E8D8D" stroke-width="1" stroke-dasharray="8,8" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import moment from 'moment'
import { useEasyQuotationStore } from '~/stores/easy-quotation.store';
import dateIcon from '@/assets/icons/calendar.svg'

// Use the store
const store = useEasyQuotationStore()

// Refs to control calendar visibility
const showStartCalendars = ref(false)
const showEndCalendars = ref(false)


const modelConfigs = {
  type: 'string',
  mask: 'YYYY-MM-DD',
}


const mask = {
  input: 'YYYY-MM-DD',
}


const customLocale = {
  id: 'ko-EN',
  firstDayOfWeek: 1,
  mask: {
    weekdays: 'WW',
  },
}
const attributes = computed(() => {
  if (store.EasyQuotation.startDate && store.EasyQuotation.endDate) {
    return [
      {
        key: 'dateRange',
        highlight: true,
        dates: {
          start: store.EasyQuotation.startDate,
          end: store.EasyQuotation.endDate,
        },
      },
    ]
  }
  return []
})
const selectedColors = ref('orange')

const formateStartDate = computed(() =>
  store.EasyQuotation.startDate ? moment(store.EasyQuotation.startDate).format('YYYY-MM-DD') : null
)
const formateEndDate = computed(() =>
  store.EasyQuotation.endDate ? moment(store.EasyQuotation.endDate).format('YYYY-MM-DD') : null
)

// Handle date selection
const StartDateSelect = (date) => {
  store.EasyQuotation.startDate = moment(date).format('YYYY-MM-DD')
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showStartCalendars.value = false
  }
}

const EndDateSelect = (date) => {
  store.EasyQuotation.endDate = moment(date).format('YYYY-MM-DD')
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showEndCalendars.value = false
  }
}

// Functions to handle selection changes
const selectDepartures = (time) => {
  store.EasyQuotation.selectedDeparture = store.EasyQuotation.selectedDeparture === time ? null : time
}

const selectArrivals = (time) => {
  store.EasyQuotation.selectedArrival = store.EasyQuotation.selectedArrival === time ? null : time
}
</script>

<style scoped>
/* Add your styles here */
</style>
