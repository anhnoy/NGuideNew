<template>
  <div class="w-full bg-[#EAEDE9] md:py-10 md:pl-[300px] h-[580px]">
    <!-- Outer container -->
    <div class="flex flex-col w-full mx-auto md:flex-row">
      <!-- 🔵 Left Sidebar: Category selector -->
      <div
        class="md:w-[270px] w-full flex flex-col items-center md:items-start md:mt-10"
      >
        <div class="flex justify-center lg:justify-start">
          <!-- Green Bar -->
          <div
            class="lg:w-[80px] lg:h-[12px] bg-[#3B6333] rounded-full mb-2 w-[40px] h-[6px]"
          ></div>
        </div>
        <span
          class="text-[#152123] font-normal md:text-[30px] mb-6 text-center md:text-left"
        >
          당신만의 특별한<br class="hidden md:block" />여행지는 어디인가요?
        </span>

        <div class="flex flex-col items-center w-full space-y-4 md:items-start">
          <button
            v-for="country in countries"
            :key="country.id"
            @click="selectedCountry = country.name"
            :class="[
              'w-[180px] text-center py-3 rounded-full font-semibold transition',
              selectedCountry === country.name
                ? 'bg-[#2F312A] text-white'
                : 'bg-[#CCC8C8] text-[#2F312A]',
            ]"
          >
            {{ country.label }}
          </button>
        </div>
      </div>

      <!-- 🟢 Right Scrollable Cards -->
      <div
        class="flex-1 mt-10 md:mt-0 overflow-y-auto overflow-x-auto bg-white md:w-full md:h-[480px] md:ml-[100px]"
      >
        <!-- Title -->
        <div
          class="text-[22px] text-[#152123] font-bold mb-6 whitespace-nowrap"
        >
          {{ selectedCountry }} 추천 여행 패키지
        </div>

        <!-- Desktop Cards -->
        <div v-if="!isLoading" class="flex gap-10 w-max">
          <div
            v-for="(item, index) in filteredEvents"
            :key="index"
            class="min-w-[330px] h-[332px] rounded-[10px] border border-[#E6E6E6] hover:shadow cursor-pointer"
            @click="toId(item.ev_id)"
          >
            <div class="h-[180px] w-full rounded-t-[10px] overflow-hidden">
              <img :src="item.ev_image" class="object-cover w-full h-full" />
            </div>
            <div
              class="p-[20px_12px] border-t h-[152px] flex flex-col items-center justify-center gap-2"
            >
              <textarea
                class="w-full text-[18px] font-bold text-[#152123] text-center bg-transparent resize-none focus:outline-none"
                readonly
                >{{ item.ev_name }}</textarea
              >
              <textarea
                class="w-full text-[16px] font-normal text-[#5E5F61] text-center bg-transparent resize-none focus:outline-none"
                readonly
                >{{ item.course_desc }}</textarea
              >
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-else class="flex gap-10 w-max">
          <div
            v-for="n in 3"
            :key="n"
            class="min-w-[330px] h-[332px] rounded-[10px] border animate-pulse bg-gray-200"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEventStore } from "~/stores/event.store";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useEventStore();
const isLoading = ref(true);

// Example countries
const countries = [
  { id: 1, name: "라오스", label: "라오스" },
  { id: 2, name: "태국", label: "태국" },
];

const selectedCountry = ref("라오스");

const fetchEvents = async () => {
  const params = { page: 0, size: 100 };
  try {
    await store.getEvent(params);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
  }
};

const filteredEvents = computed(() =>
  store.events.filter(
    (event) =>
      event.travel_itinerary === true && event.country === selectedCountry.value
  )
);

const toId = async (id) => {
  await router.push(`/event/${id}`);
};

onMounted(fetchEvents);
</script>
