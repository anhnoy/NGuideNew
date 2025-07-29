<template>
  <div class="flex flex-col items-center mt-2 md:flex-row md:ml-0 pl-2">
    <!-- 출발일 -->
    <div class="relative" ref="startCalendarRef">
      <button
        class="flex items-center justify-start gap-2 w-[304px] h-[48px] md:w-[550px] md:h-[52px] px-4 rounded-[8px] border border-[#E6E6E6] bg-white md:text-[16px]"
        @click.stop="showStartCalendar = !showStartCalendar">
        <img src="@/assets/icons/calendar1.png" alt="calendar" class="w-6 h-6" />
        <span class="text-[#8E8D8D]">{{ formattedStartDate || "출발일" }}</span>
      </button>

      <div v-if="showStartCalendar" class="mt-2 bg-white rounded-lg">
        <DatePicker v-model="store.startDate" :model-config="modelConfig" :masks="masks" :locale="customLocale"
          :min-date="new Date()" @update:model-value="onDateSelect" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import moment from "moment";
import { useApplyPrivatePackageStore } from "@/stores/apply-private-package.store";

// Use the store
const store = useApplyPrivatePackageStore();

// Refs to control calendar visibility
const showStartCalendar = ref(false);
const startCalendarRef = ref(null);

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
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutsideStart);
});

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
  id: "EN",
  firstDayOfWeek: 1,
  masks: {
    weekdays: "WW",
  },
};

// Formats start date using Moment.js
const formattedStartDate = computed(() =>
  store.startDate
    ? moment(store.startDate).format("YYYY-MM-DD")
    : null
);

// Handle date selection - hide calendar when date is selected
const onDateSelect = (date) => {
  if (date) {
    showStartCalendar.value = false;
  }
};
</script>

<style scoped></style>
