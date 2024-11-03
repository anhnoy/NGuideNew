<template>
  <div class="max-w-[1080px] bg-white py-4">
    <h1 class="text-[#152123] font-bold md:text-3xl text-2xl text-center m-10">
      여행 일정을 선택해 주세요.
    </h1>
    <div class="mx-auto lg:p-2 flex flex-col md:flex-row justify-center md:space-x-20 items-center bg-white max-w-full">
      <div class="md:mr-2">
        <!-- Mobile view: Start Date input -->
        <div class="md:hidden">
          <div class="flex justify-between items-center space-x-2">
            <div class="relative w-full">
              <div class="flex items-center w-[350px] justify-center">
                <label class="text-sm font-medium text-[#152123] w-[500px]">출발일</label>
                <img class="absolute" :src="dateIcon" alt="" />
                <input type="text" :value="formateStartDate" @focus="showStartCalendars = true" readonly
                  class="border bg-[#EDEDF2]  border-[#E6E6E6]  p-2 px-4 ml-25 text-center text-black" />
              </div>
              <Teleport to="body">
                <div v-if="showStartCalendars"
                  class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                  @click.self="showStartCalendars = false">
                  <div class="bg-white p-4">
                    <DatePicker v-model="store.EasyQuotation.startDate" :model-config="modelConfigs" :mask="mask"
                      :attribute="attributes" :color="selectedColors" class="z-10" :locale="customLocale"
                      :min-date="new Date()" :max-date="store.EasyQuotation.endDate"
                      @update:model-value="StartDateSelect" />
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
                <label class="text-sm font-medium text-[#152123] w-[500px]">도착일</label>
                <img class="absolute" :src="dateIcon" alt="" />
                <input type="text" :value="formateEndDate" @focus="showEndCalendars = true" readonly
                  class="border bg-[#EDEDF2]  border-[#E6E6E6] p-2 px-4 ml-25  text-center text-black" />
              </div>
              <Teleport to="body">
                <div v-if="showEndCalendars"
                  class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                  @click.self="showEndCalendars = false">
                  <div class="bg-white p-4 rounded-lg">
                    <DatePicker v-model="store.EasyQuotation.endDate" :model-config="modelConfigs" :mask="mask"
                      :attributes="attributes" :color="selectedColors" class="z-10" :locale="customLocale"
                      :min-date="store.EasyQuotation.startDate ? store.EasyQuotation.startDate : new Date()"
                      @update:model-value="EndDateSelect" />
                  </div>
                </div>
              </Teleport>
            </div>
          </div>
        </div>

        <!-- Desktop view: Start Date input -->
        <div class="hidden md:block ">
          <div class=" flex items-center justify-center w-[362px]">
            <DatePicker v-model="store.EasyQuotation.startDate" :model-config="modelConfigs" :mask="mask"
              :attributes="attributes" :color="selectedColors" class="p-5 m-5 w-full " :locale="customLocale"
              :min-date="new Date()" :max-date="store.EasyQuotation.endDate" @update:model-value="StartDateSelect" />
          </div>
        </div>

        <!-- Show formatted start date on desktop -->
        <div class="hidden md:flex items-center justify-center space-x-2 mt-4">
          <label class="text-[#5E5F61] text-xl font-normal">출발일</label>
          <div
            class="w-[210px] h-[46px] text-[#5E5F61] text-lg font-bold flex items-center justify-center bg-[#E6E6E6]">
            {{ formateStartDate || "선택 안함" }}
          </div>
        </div>
        <div class="md:text-[#152123] md:text-2xl md:font-bold my-6 text-[#2F312A] text-lg font-medium text-center">
          선호하는 출발 시간이 있으신가요?
        </div>
        <!-- Departure buttons -->
        <div class="flex justify-center items-center space-x-2 mb-2 mt-3">
          <button class="px-4 py-2 w-full md:w-[114px] text-sm" :class="[
            store.EasyQuotation.selectedDeparture === '1'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectDepartures('1')">
            오전 출발
          </button>
          <button class="px-4 py-2 w-full md:w-[114px] text-sm" :class="[
            store.EasyQuotation.selectedDeparture === '2'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectDepartures('2')">
            오후 출발
          </button>
          <button class="px-4 py-2 w-full md:w-[114px] text-sm" :class="[
            store.EasyQuotation.selectedDeparture === '3'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectDepartures('3')">
            상관없음
          </button>
        </div>
      </div>

      <div>
        <!-- Desktop view: End Date input -->
        <div class="hidden md:block">
          <div class=" flex items-center justify-center w-[362px]">
            <DatePicker v-model="store.EasyQuotation.endDate" :attributes="attributes" :model-config="modelConfigs"
              :mask="mask" :color="selectedColors" class="p-5 m-5 w-full" :locale="customLocale" :min-date="store.EasyQuotation.startDate
              ? store.EasyQuotation.startDate
              : new Date()
              " @update:model-value="EndDateSelect" />
          </div>
        </div>

        <!-- Show formatted end date on desktop -->
        <div class="hidden md:flex items-center justify-center space-x-2 mt-4">
          <label class="text-[#5E5F61] text-xl font-normal">도착일</label>
          <div
            class="w-[210px] h-[46px] text-[#5E5F61] text-lg font-bold flex items-center justify-center bg-[#E6E6E6]">
            {{ formateEndDate || "선택 안함" }}
          </div>
        </div>
        <div class="md:text-[#152123] md:text-2xl md:font-bold my-6 text-[#2F312A] text-lg font-medium text-center">
          선호하는 도착 시간이 있으신가요?
        </div>

        <!-- Arrival buttons -->
        <div class="flex justify-center items-center space-x-2 mb-2 mt-3">
          <button class="px-4 py-2 w-28 md:w-[114px] text-sm" :class="[
            store.EasyQuotation.selectedArrival === '1'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectArrivals('1')">
            오전 도착
          </button>
          <button class="px-4 py-2 w-28 md:w-[114px] text-sm" :class="[
            store.EasyQuotation.selectedArrival === '2'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectArrivals('2')">
            오후 도착
          </button>
          <button class="px-4 py-2 w-28 md:w-[114px] text-sm" :class="[
            store.EasyQuotation.selectedArrival === '3'
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]" @click="selectArrivals('3')">
            상관없음
          </button>
        </div>
      </div>
    </div>
    <div class="mt-10 hidden sm:block justify-center md:flex">
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
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import dateIcon from "@/assets/icons/calendar.svg";

// Use the store
const store = useEasyQuotationStore();

// Refs to control calendar visibility
const showStartCalendars = ref(false);
const showEndCalendars = ref(false);

const modelConfigs = {
  type: "string",
  mask: "YYYY-MM-DD",
};

const mask = {
  input: "YYYY-MM-DD",
};

const customLocale = {
  id: "ko-EN",
  firstDayOfWeek: 1,
  mask: {
    weekdays: "WW",
  },
};
const attributes = computed(() => {
  if (store.EasyQuotation.startDate && store.EasyQuotation.endDate) {
    return [
      {
        key: "dateRange",
        highlight: true,
        dates: {
          start: store.EasyQuotation.startDate,
          end: store.EasyQuotation.endDate,
        },
      },
    ];
  }
  return [];
});

const formateStartDate = computed(() =>
  store.EasyQuotation.startDate
    ? moment(store.EasyQuotation.startDate).format("YYYY-MM-DD")
    : null
);
const formateEndDate = computed(() =>
  store.EasyQuotation.endDate
    ? moment(store.EasyQuotation.endDate).format("YYYY-MM-DD")
    : null
);

// Handle date selection
const StartDateSelect = (date) => {
  store.EasyQuotation.startDate = moment(date).format("YYYY-MM-DD");
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showStartCalendars.value = false;
  }
};

const EndDateSelect = (date) => {
  store.EasyQuotation.endDate = moment(date).format("YYYY-MM-DD");
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showEndCalendars.value = false;
  }
};

// Functions to handle selection changes
const selectDepartures = (time) => {
  store.EasyQuotation.selectedDeparture =
    store.EasyQuotation.selectedDeparture === time ? null : time;
};

const selectArrivals = (time) => {
  store.EasyQuotation.selectedArrival =
    store.EasyQuotation.selectedArrival === time ? null : time;
};
</script>

<style scoped>
/* Add your styles here */
</style>
