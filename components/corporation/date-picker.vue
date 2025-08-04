<template>
  <div class="flex flex-col items-center mt-2 md:flex-row md:ml-0">
    <!-- 출발일 -->
    <div class="relative" ref="startCalendarRef">
      <!-- Trigger Button -->
      <button
        type="button"
        class="flex items-center justify-start gap-2 w-[328px] h-[48px] md:w-[545px] md:h-[52px] px-4 rounded-[8px] border border-[#E6E6E6] bg-white text-left text-[16px]"
        @click.stop="showStartCalendar = !showStartCalendar"
      >
        <img src="@/assets/icons/calendar3.png" alt="calendar" class="w-6 h-6" />
        <span
          class="text-base"
          :class="store.startDate ? 'text-[#152123]' : 'text-[#8E8D8D]'"
        >
          {{ formattedStartDate || "출발일" }}
        </span>
      </button>

      <!-- Calendar Popover -->
      <div
        v-if="showStartCalendar"
        class="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        <DatePicker
          v-model="store.startDate"
          :model-config="modelConfig"
          :masks="masks"
          :locale="customLocale"
          :min-date="new Date()"
          @update:model-value="onDateSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import moment from "moment";
import { useApplyCorporationStore } from "@/stores/apply-corporation.store";

// Store setup
const store = useApplyCorporationStore();

// Calendar visibility
const showStartCalendar = ref(false);
const startCalendarRef = ref(null);

// Click-outside to close
const handleClickOutside = (event) => {
  if (
    showStartCalendar.value &&
    startCalendarRef.value &&
    !startCalendarRef.value.contains(event.target)
  ) {
    showStartCalendar.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

// v-calendar config
const modelConfig = {
  type: "string",
  mask: "YYYY-MM-DD",
};
const masks = {
  input: "YYYY-MM-DD",
};
const customLocale = {
  id: "KR",
  firstDayOfWeek: 0,
  masks: {
    weekdays: "WW",
  },
};

// Format for showing
const formattedStartDate = computed(() =>
  store.startDate ? moment(store.startDate).format("YYYY-MM-DD") : null
);

// Close on selection
const onDateSelect = () => {
  showStartCalendar.value = false;
};
</script>
