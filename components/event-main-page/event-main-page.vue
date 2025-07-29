<template>
  <div
    class="w-full bg-[#EAEDE9] lg:py-10 lg:pl-[300px] lg:h-[580px] h-auto max-h-[966px]"
  >
    <!-- Outer container -->
    <div class="flex flex-col w-full mx-auto lg:flex-row py-[50px] lg:py-0 sm:flex sm:flex-col">
      <!-- 🔵 Left Sidebar: Category selector -->
      <div
        class="flex flex-col sm:flex sm:flex-col items-center w-full lg:w-[300px] lg:items-start lg:mt-10"
      >
        <div class="flex justify-center lg:justify-start">
          <!-- Green Bar -->
          <div
            class="lg:w-[80px] lg:h-[12px] bg-[#3B6333] rounded-full mb-2 w-[40px] h-[6px] lg:mb-5"
          ></div>
        </div>
        <span
          class="text-[#152123] font-medium lg:text-[30px] lg:mb-6 text-center lg:text-left text-base lg:font-normal"
        >
          당신만의 특별한
        </span>
        <span
          class="text-[#152123] font-medium lg:text-[30px] mb-6 text-center lg:text-left text-base lg:font-normal"
          >여행지는 어디인가요?
        </span>

        <div
          class="flex items-center gap-2 lg:flex lg:flex-col lg:w-full lg:space-y-4 lg:items-start lg:mt-5"
        >
          <button
            v-for="country in countries"
            :key="country.id"
            @click="selectedCountry = country.name"
            :class="[
              'w-[160px] h-[36px] lg:space-x-5 text-center lg:py-3 rounded-full font-semibold transition text-sm lg:text-base lg:w-[267px] lg:h-[50px]',
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
        class="flex-1 mt-10 lg:mt-0 overflow-y-auto overflow-x-auto lg:bg-white lg:w-full lg:h-[480px] lg:ml-[100px]"
      >
        <!-- Title -->
        <!-- <div
          class="text-[22px] text-[#152123] font-bold mb-6 whitespace-nowrap"
        >
          {{ selectedCountry }} 추천 여행 패키지
        </div> -->

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
