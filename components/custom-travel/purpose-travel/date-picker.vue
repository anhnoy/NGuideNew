<template>
  <div class="flex flex-col items-center mt-2 md:flex-row">
    <!-- 출발일 -->
    <div class="relative" ref="startCalendarRef">
      <button
        class="flex items-center justify-start gap-2 w-[280px] h-[48px] md:w-[239.5px] md:h-[52px] px-4 rounded-[8px] border border-[#E6E6E6] bg-white md:text-[16px]"
        @click.stop="showStartCalendar = !showStartCalendar"
      >
        <img
          src="@/assets/icons/calendar1.png"
          alt="calendar"
          class="w-6 h-6"
        />
        <span class="text-[#8E8D8D]">{{ formattedStartDate || "출발일" }}</span>
      </button>

      <div
        v-if="showStartCalendar"
        class="absolute mt-2 bg-white border rounded-lg shadow z-[99]"
      >
        <DatePicker
          v-model="store.travelCustom.startDate"
          :model-config="modelConfig"
          :masks="masks"
          :attributes="attributes"
          :color="selectedColor"
          :locale="customLocale"
          :min-date="new Date()"
          :max-date="store.travelCustom.endDate"
          @update:model-value="onStartDateSelect"
        />
      </div>
    </div>
    <h1 class="md:text-[16px] md:ml-5 sm:block hidden">~</h1>
    <div class="relative md:ml-5" ref="endCalendarRef">
      <button
        class="flex items-center justify-start md:mt-0 mt-5 gap-2 w-[280px] h-[48px] md:w-[239.5px] md:h-[52px] px-4 rounded-[8px] border border-[#E6E6E6] bg-white text-white md:text-[16px]"
        @click="showEndCalendar = !showEndCalendar"
      >
        <img
          src="@/assets/icons/calendar1.png"
          alt="calendar"
          class="w-6 h-6"
        />
        <span class="text-[#8E8D8D]">{{ formattedEndDate || "도착일" }}</span>
      </button>

      <div
        v-if="showEndCalendar"
        class="absolute mt-2 bg-white border rounded-lg shadow z-[99]"
      >
        <DatePicker
          v-model="store.travelCustom.endDate"
          :model-config="modelConfig"
          :masks="masks"
          :attributes="attributes"
          :color="selectedColor"
          :locale="customLocale"
          :min-date="store.travelCustom.startDate || new Date()"
          @update:model-value="onEndDateSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
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
const startCalendarRef = ref(null);
const endCalendarRef = ref(null);

const handleClickOutside = (event) => {
  if (
    showEndCalendar.value &&
    endCalendarRef.value &&
    !endCalendarRef.value.contains(event.target)
  ) {
    showEndCalendar.value = false;
  }
};

const handleClickOutsideStart = (event) => {
  if (
    showStartCalendar.value &&
    startCalendarRef.value &&
    !startCalendarRef.value.contains(event.target)
  ) {
    showStartCalendar.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutsideStart);
  document.addEventListener("mousedown", handleClickOutside); // end calendar
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutsideStart);
  document.removeEventListener("mousedown", handleClickOutside);
});

// Model configuration for DatePicker
const modelConfig = {
  type: "string",
  mask: "YYYY-MM-DD",
};
const selected = ref(null);

// Masks for input formatting
const masks = {
  input: "YYYY-MM-DD",
};

// Custom locale configuration
const customLocale = {
  id: "EN",
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
</script>

<style scoped>
:global(.custom-popover) {
  @apply w-[300px] rounded-xl shadow-lg bg-white;
}
</style>

