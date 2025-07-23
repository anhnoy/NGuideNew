<template>
  <div class="bg-white ">
    <h1 class="text-[#152123] font-bold lg:text-[30px] text-[22px] text-center mt-7 sm:m-10">
      여행 일정을 선택해 주세요.
    </h1>
    <div class="flex flex-col items-center justify-center max-w-full p-2 mx-auto mt-5 bg-white md:flex-row lg:space-x-20 md:m-0">
      <div class="mb-4 md:mb-0 md:mr-2 w-[328px] md:w-auto">
        <!-- Mobile view: Start Date input -->
        <div class="md:hidden ">
          <div class="flex items-center justify-between space-x-2">
            <div class="relative w-full">
              <div class="flex items-center w-[350px] justify-center">
                <label class="text-sm font-medium text-[#152123] w-[100px]">출발일</label>
                <img class="absolute" :src="dateIcon" alt="" />
                <input type="text" :value="formattedStartDate || '선택 안함'" @focus="showStartCalendar = true" readonly
                  class="border bg-[#E6E6E6] p-2 ml-25 w-[218px] h-[44px] text-center text-black" />
              </div>
              <Teleport to="body">
                <div v-if="showStartCalendar"
                  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  @click.self="showStartCalendar = false">
                  <div class="p-4 bg-white">
                    <DatePicker v-model="store.travelCustom.startDate" :model-config="modelConfig" :masks="masks"
                      :attributes="attributes" :color="selectedColor" :locale="customLocale" :min-date="new Date()"
                      :max-date="store.travelCustom.endDate" @update:model-value="onStartDateSelect" />
                  </div>
                </div>
              </Teleport>
            </div>
          </div>
        </div>  
        <div class="md:hidden">
          <div class="flex items-center justify-between mt-2 space-x-2">
            <div class="relative w-full">
              <div class="flex items-center w-[350px] justify-center">
                <label class="text-sm font-medium text-[#152123] w-[100px]">도착일</label>
                <img class="absolute" :src="dateIcon" alt="" />
                <input type="text" :value="formattedEndDate || '선택 안함'" @focus="showEndCalendar = true" readonly
                  class="border bg-[#E6E6E6] p-2 ml-25 w-[218px] h-[44px] text-center text-black" />
              </div>
              <Teleport to="body">
                <div v-if="showEndCalendar"
                  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  @click.self="showEndCalendar = false">
                  <div class="p-4 bg-white rounded-lg">
                    <DatePicker v-model="store.travelCustom.endDate" :model-config="modelConfig" :masks="masks"
                      :attributes="attributes" :color="selectedColor" class="z-10" :locale="customLocale"
                      :min-date="store.travelCustom.startDate" @update:model-value="onEndDateSelect" />
                  </div>
                </div>
              </Teleport>
            </div>
          </div>
        </div>

        <!-- Desktop view: Start Date input -->
        <div class="hidden md:block">
          <DatePicker v-model="store.travelCustom.startDate" :model-config="modelConfig" :masks="masks"
            :attributes="attributes" :color="selectedColor" class="p-5 m-5 border-none " :locale="customLocale"
            :min-date="new Date()" :max-date="store.travelCustom.endDate" @update:model-value="onStartDateSelect" />
        </div>

        <!-- Show formatted start date on desktop -->
        <div class="items-center justify-center hidden mt-4 space-x-2 md:flex">
          <label class="text-[#5E5F61] text-xl font-normal">출발일</label>
          <div
            class="w-[210px] h-[46px] text-[#5E5F61] text-lg font-bold flex items-center justify-center bg-[#E6E6E6]">
            {{ formattedStartDate || "선택 안함" }}
          </div>
        </div>
        <div class="lg:text-[#152123] w-[328px] sm:w-[362px] lg:text-2xl lg:font-bold my-6 text-[#2F312A] text-[16px] font-medium text-center">
          선호하는 출발 시간이 있으신가요?
        </div>

        <!-- Departure buttons -->
        <div class="flex justify-center w-[328px] sm:w-[362px] items-center space-x-2 mt-3">
          <button class="w-[104px] h-[50px] md:w-[114px]" :class="[
            store.travelCustom.selectedDeparture === '1'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectDeparture('1')">
            오전 출발
          </button>
          <button class="w-[104px] h-[50px] md:w-[114px]" :class="[
            store.travelCustom.selectedDeparture === '2'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectDeparture('2')">
            오후 출발
          </button>
          <button class="w-[104px] h-[50px] md:w-[114px]" :class="[
            store.travelCustom.selectedDeparture === '3'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectDeparture('3')">
            상관없음
          </button>
        </div>
      </div>
      <div>
        <!-- Desktop view: End Date input -->
        <div class="hidden md:block" >
          <DatePicker v-model="store.travelCustom.endDate" :attributes="attributes" :model-config="modelConfig"
            :masks="masks" :color="selectedColor" class="w-full p-5 m-5 border-none" :locale="customLocale" :min-date="store.travelCustom.startDate
              ? store.travelCustom.startDate
              : new Date()
              " @update:model-value="onEndDateSelect" />
        </div>

        <!-- Show formatted end date on desktop -->
        <div class="items-center justify-center hidden mt-4 space-x-2 md:flex">
          <label class="text-[#5E5F61] text-xl font-normal">도착일</label>
          <div
            class="w-[210px] h-[46px] text-[#5E5F61] text-lg font-bold flex items-center justify-center bg-[#E6E6E6]">
            {{ formattedEndDate || "선택 안함" }}
          </div>
        </div>
        <div class="lg:text-[#152123] lg:text-2xl lg:font-bold my-6 text-[#2F312A] text-[16px] font-medium text-center">
          선호하는 도착 시간이 있으신가요?
        </div>

        <!-- Arrival buttons -->
        <div class="flex justify-center w-[328px] sm:w-[362px]  items-center space-x-2 mb-2 mt-3">
          <button class="w-[104px] h-[50px] md:w-[114px]" :class="[
            store.travelCustom.selectedArrival === '1'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectArrival('1')">
            오전 도착
          </button>
          <button class="w-[104px] h-[50px] md:w-[114px]" :class="[
            store.travelCustom.selectedArrival === '2'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectArrival('2')">
            오후 도착
          </button>
          <button class="w-[104px] h-[50px] md:w-[114px]" :class="[
            store.travelCustom.selectedArrival === '3'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectArrival('3')">
            상관없음
          </button>
        </div>
      </div>
    </div>
    <div class="justify-center hidden mt-10 sm:block lg:flex">
      <svg width="840px" height="1" class="mt-4">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="#8E8D8D" stroke-width="1" stroke-dasharray="8,8" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import moment from "moment";
import { useDestinationStore } from "@/stores/destination.store";
import dateIcon from "@/assets/icons/calendar.svg";

// Use the store
const store = useDestinationStore();

// Refs to control calendar visibility
const showStartCalendar = ref(false);
const showEndCalendar = ref(false);

// Model configuration for DatePicker
const modelConfig = {
  type: "string",
  mask: "YYYY-MM-DD",
};

// Masks for input formatting
const masks = {
  input: "YYYY-MM-DD",
};

// Custom locale configuration
const customLocale = {
  id: "ko-EN",
  firstDayOfWeek: 1,
  masks: {
    weekdays: "WW",
  },
};

// Computed attributes for highlighting date range
const attributes = computed(() => {
  if (store.travelCustom.startDate && store.travelCustom.endDate) {
    return [
      {
        key: "dateRange",
        highlight: true,
        dates: {
          start: store.travelCustom.startDate,
          end: store.travelCustom.endDate,
        },
      },
    ];
  }
  return [];
});

// Define selectedColor to be orange
// const selectedColor = ref('orange')

// Formats start and end dates using Moment.js
const formattedStartDate = computed(() =>
  store.travelCustom.startDate
    ? moment(store.travelCustom.startDate).format("YYYY-MM-DD")
    : null
);
const formattedEndDate = computed(() =>
  store.travelCustom.endDate
    ? moment(store.travelCustom.endDate).format("YYYY-MM-DD")
    : null
);

// Handle date selection
const onStartDateSelect = (date) => {
  store.travelCustom.startDate = moment(date).format("YYYY-MM-DD");
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showStartCalendar.value = false;
  }
};

const onEndDateSelect = (date) => {
  if (!store.travelCustom.startDate) {
    store.travelCustom.startDate = moment(date).format("YYYY-MM-DD");
  }
  store.travelCustom.endDate = moment(date).format("YYYY-MM-DD");
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showEndCalendar.value = false;
  }
};

// Functions to handle selection changes
const selectDeparture = (time) => {
  store.travelCustom.selectedDeparture =
    store.travelCustom.selectedDeparture === time ? null : time;
};

const selectArrival = (time) => {
  store.travelCustom.selectedArrival =
    store.travelCustom.selectedArrival === time ? null : time;
};
</script>

<style scoped></style>
