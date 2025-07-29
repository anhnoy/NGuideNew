<template>
  <div
    class="w-full bg-[#EAEDE9] lg:py-10 lg:pl-[300px] lg:h-[580px] h-auto max-h-[966px]"
  >
    <!-- Outer container -->
    <div
      class="flex flex-col w-full mx-auto lg:flex-row py-[50px] lg:py-0 sm:flex sm:flex-col"
    >
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
        class="custom-scrollbar flex-1 mt-10 lg:mt-0 overflow-x-auto lg:bg-white lg:w-full lg:h-[480px] lg:ml-[100px] lg:p-[100px] flex items-center"
      >
        <!-- Desktop Cards -->
        <div v-if="!isLoading" class="flex gap-10 w-max">
          <div
            v-for="(item, index) in filteredEvents"
            :key="index"
            class="min-w-[330px] h-[332px] rounded-[10px] border border-[#E6E6E6] hover:shadow cursor-pointer lg:w-[400px] lg:h-[260px]"
            @click="toId(item.ev_id)"
          >
            <img
              :src="item.ev_image"
              class="object-cover w-full h-full lg:max-h-[260px] max-h-[260px]"
            />
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

const events = ref([]);
const router = useRouter();
const store = useEventStore();
const isLoading = ref(true);
const selectedCountry = ref("라오스");

// Example countries
const countries = [
  { id: 1, name: "라오스", label: "라오스" },
  { id: 2, name: "태국", label: "태국" },
];

const mockEventData = [
  {
    ev_id: 1,
    ev_name: "비엔티안 시티 투어",
    ev_image: "https://picsum.photos/id/1011/400/300",
    course_desc: "문화유산과 야시장 탐방",
    travel_itinerary: true,
    country: "라오스",
  },
  {
    ev_id: 2,
    ev_name: "루앙프라방 사원 탐방",
    ev_image: "https://picsum.photos/id/1025/400/300",
    course_desc: "역사적인 사원과 탁발 체험",
    travel_itinerary: true,
    country: "라오스",
  },
  {
    ev_id: 3,
    ev_name: "방콕 시티 투어",
    ev_image: "https://picsum.photos/id/1033/400/300",
    course_desc: "왕궁과 수상 시장 탐방",
    travel_itinerary: true,
    country: "태국",
  },
  {
    ev_id: 4,
    ev_name: "푸켓 섬 여행",
    ev_image: "https://picsum.photos/id/1044/400/300",
    course_desc: "해변에서의 여유로운 하루",
    travel_itinerary: true,
    country: "태국",
  },
  {
    ev_id: 5,
    ev_name: "비엔티안 시티 투어",
    ev_image: "https://picsum.photos/id/1011/400/300",
    course_desc: "문화유산과 야시장 탐방",
    travel_itinerary: true,
    country: "라오스",
  },
  {
    ev_id: 6,
    ev_name: "루앙프라방 사원 탐방",
    ev_image: "https://picsum.photos/id/1025/400/300",
    course_desc: "역사적인 사원과 탁발 체험",
    travel_itinerary: true,
    country: "라오스",
  },
  {
    ev_id: 7,
    ev_name: "방콕 시티 투어",
    ev_image: "https://picsum.photos/id/1033/400/300",
    course_desc: "왕궁과 수상 시장 탐방",
    travel_itinerary: true,
    country: "태국",
  },
  {
    ev_id: 8,
    ev_name: "푸켓 섬 여행",
    ev_image: "https://picsum.photos/id/1044/400/300",
    course_desc: "해변에서의 여유로운 하루",
    travel_itinerary: true,
    country: "태국",
  },
];

// const fetchEvents = async () => {
//   const params = { page: 0, size: 100 };
//   try {
//     await store.getEvent(params);
//     isLoading.value = false;
//   } catch (error) {
//     isLoading.value = false;
//   }
// };

// const filteredEvents = computed(() =>
//   store.events.filter(
//     (event) =>
//       event.travel_itinerary === true && event.country === selectedCountry.value
//   )
// );

const fetchEvents = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
  events.value = mockEventData;
  isLoading.value = false;
};

const filteredEvents = computed(() =>
  events.value.filter(
    (event) =>
      event.travel_itinerary === true && event.country === selectedCountry.value
  )
);

const toId = async (id) => {
  await router.push(`/event/${id}`);
};

onMounted(fetchEvents);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #3b3d3b;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #eef0ec;
}

/* For Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3b3d3b #eef0ec;
}
</style>
