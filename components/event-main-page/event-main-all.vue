<template>
  <div class="container px-4 mx-auto">
    <!-- Desktop View -->
    <div v-if="filteredEvents.length > 0" class="hidden lg:block">
      <div class="flex flex-col items-center justify-center mb-8 space-y-8">
        <span class="text-[30px] font-bold text-[#386333] text-center pt-20">
          오토앤투어가 <span class="text-[#152123]">추천하는 단독패키지</span>
        </span>

        <!-- Country Selection Buttons -->
        <div class="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            v-for="(country, index) in countryOptions"
            :key="country.cid"
            @click="handleSelectCountry(country, $event)"
            :class="[
              'w-[160px] h-[36px] text-center rounded-full font-semibold text-sm',
              'sm:w-[267px] sm:h-[50px] sm:text-base sm:py-3',
              'transition-colors duration-300 ease-in-out transform active:scale-95',
              selectedCountry?.cid === country.cid
                ? 'bg-[#2F312A] text-white'
                : 'bg-[#CCC8C8] text-[#2F312A]',
            ]"
          >
            {{ country.c_name_kr }}
          </button>
        </div>
      </div>

      <!-- Desktop Skeleton Loader -->
      <div v-if="isLoading" class="my-[40px]">
        <div
          class="grid grid-cols-3 gap-x-[24px] gap-y-[24px] max-w-[1200px] mx-auto"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="w-[384px] h-[310px] rounded-[10px] border-[1px] border-[#E6E6E6] animate-pulse"
          >
            <div class="h-[180px] w-full bg-gray-300 rounded-t-[10px]"></div>
            <div
              class="w-[384px] h-[60px] p-[20px_12px] flex flex-col items-center justify-center space-y-4"
            >
              <div class="w-3/4 h-6 bg-gray-300 rounded"></div>
              <div class="w-full h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Content -->
      <div
        v-else
        class="my-[40px] grid grid-cols-3 gap-x-[24px] gap-y-[24px] max-w-[1200px] mx-auto"
      >
        <div
          v-for="(item, index) in paginatedEvents"
          :key="index"
          class="w-[384px] h-[310px] rounded-[10px] cursor-pointer border-[1px] border-[#E6E6E6] hover:shadow hover:border-[#6969694d]"
          @click="toId(item)"
        >
          <div
            class="relative h-[250px] w-[383px] rounded-t-[10px] overflow-hidden"
          >
            <img
              :src="item.ev_image"
              class="object-cover w-full h-full"
              alt="event image"
            />
          </div>
          <div class="w-[384px] h-[60px] p-[16px] gap-[12px] border-t">
            <div class="flex items-center justify-between gap-2">
              <span
                class="w-[384px] px-2 font-bold text-[16px] text-[#152123] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                readonly
                :title="item.ev_name"
                >{{ item.ev_name }}</span
              >
              <img
                src="@/assets/icons/nextClick.svg"
                alt=""
                class="w-[20px] h-[20px] sm:w-[16px] sm:h-[16px]"
              />
              <!-- <textarea class="w-[330px] px-2 text-justify font-normal text-[16px] text-[#5E5F61] bg-transparent resize-none  focus:outline-none cursor-pointer" readonly :title="item.course_desc" >{{ item.course_desc }}</textarea> -->
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!isLoading && hasNextPage"
        class="flex items-center justify-center m-8"
      >
        <button
          @click="loadMore"
          class="mt-4 font-light text-sm md:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 md:px-[79px] md:py-[10.5px] rounded-full hover:bg-gray-200"
        >
          더보기
        </button>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="block lg:hidden">
      <div class="w-[328px] mx-auto space-y-8">
        <span
          class="block text-[18px] font-bold text-[#386333] leading-[16px] text-center pt-8"
        >
          오토앤투어가 <span class="text-[#152123]">추천하는 단독패키지</span>
        </span>

        <!-- Mobile Country Selection Buttons -->
        <div class="grid grid-cols-2 gap-2 mt-4 justify-items-center">
          <button
            type="button"
            v-for="(country, index) in countryOptions"
            :key="country.cid"
            @click="handleSelectCountry(country, $event)"
            :class="[
              'w-[160px] h-[36px] text-center rounded-full font-semibold text-sm',
              'transition-colors duration-300 ease-in-out transform active:scale-95',
              selectedCountry?.cid === country.cid
                ? 'bg-[#2F312A] text-white'
                : 'bg-[#CCC8C8] text-[#2F312A]',
            ]"
          >
            {{ country.c_name_kr }}
          </button>
        </div>
      </div>

      <!-- Mobile Skeleton Loader -->
      <div
        v-if="isLoading"
        class="w-[328px] mt-8 grid grid-cols-2 gap-1 mx-auto"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="w-[160px] h-[226px] rounded-[10px] border-[1px] border-[#E6E6E6] animate-pulse"
        >
          <div class="h-[180px] w-full bg-gray-300 rounded-t-[10px]"></div>
          <div
            class="w-full h-auto p-[20px_12px] flex flex-col items-center justify-center space-y-4"
          >
            <div class="w-3/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-full h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Mobile Content -->
      <div
        v-else
        class="w-[328px] min-h-[243px] mt-8 grid grid-cols-1 gap-x-[8px] gap-y-[20px] mx-auto min-w-[328px]"
      >
        <div
          v-for="(item, index) in paginatedEvents"
          :key="index"
          class="w-[328px] h-[243px] rounded-[10px] border-[1px] border-[#E6E6E6] overflow-hidden cursor-pointer"
          @click="toId(item)"
        >
          <!-- Image Section -->
          <div class="relative h-[177px] w-full">
            <img
              :src="item.ev_image"
              class="h-full min-w-[328px] min-h-[177px] w-full object-cover rounded-t-[10px]"
              alt=""
            />
          </div>

          <!-- Content Section -->
          <div class="border-t h-[49px] py-5 px-3">
            <div class="flex items-center justify-between">
              <span
                class="flex-1 text-[14px] font-bold text-[#2F312A] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap resize-none focus:outline-none cursor-pointer leading-tigh lg:text-base"
                readonly
                :title="item.ev_name"
                >{{ item.ev_name }}</span
              >
              <img
                src="@/assets/icons/nextClick2.png"
                alt="next"
                class="w-[16px] h-[16px] ml-2 sm:w-[20px] sm:h-[20px]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Load More Button -->
      <div
        v-if="!isLoading && hasNextPage"
        class="flex items-center justify-center m-8"
      >
        <button
          @click="loadMore"
          class="mt-4 font-light text-sm md:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 md:px-[79px] md:py-[10.5px] rounded-full hover:bg-gray-200"
        >
          더보기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEventStore } from "~/stores/event.store";
import { useApplyPrivatePackageStore } from "~/stores/apply-private-package.store";
import { useRoute, useRouter } from "vue-router";
import regionService from "~/services/region.service";

const route = useRoute();
const router = useRouter();
const applyStore = useApplyPrivatePackageStore();

const toId = async (item) => {
  // Set the package image and title in the store
  applyStore.setPackage(item.ev_image, item.ev_name);
  await router.push(`/private-packages/${item.ev_id}`);
};

const store = useEventStore();
const isLoading = ref(true);
const itemsPerPage = 18;
const currentPage = ref(0);
const countryOptions = ref([]);
const selectedCountry = ref(null);

const handleSelectCountry = async (country, e) => {
  e?.target?.blur?.();
  const scrollY = window.scrollY;
  selectedCountry.value = country;
  currentPage.value = 0; // Reset pagination when switching countries
  await fetchEvents(country.cid);

  // Prevent scroll jump
  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY });
  });
};

const getCountryList = async () => {
  try {
    const response = await regionService.getCountry();
    if (response && response.data && Array.isArray(response.data)) {
      countryOptions.value = response.data.map((item) => ({
        cid: item.cid,
        c_name_kr: item.c_name_kr,
        icon: item.c_image || "",
      }));
    }
  } catch (e) {
    console.error("❌ Failed to fetch country list", e);
  }
};

const fetchEvents = async (cid = null) => {
  isLoading.value = true;
  try {
    if (cid) {
      // Use the specific country endpoint for better filtering
      const response = await regionService.getEventByCountry(cid);
      if (response.status === 200 && response.data) {
        // Manually update the store with the filtered events
        store.events = Array.isArray(response.data)
          ? response.data
          : response.data.rows || [];
      }
    } else {
      // Use the general endpoint when no country is selected
      const params = { page: 0, size: 100 };
      await store.getEvent(params);
    }
    isLoading.value = false;
  } catch (error) {
    console.error("❌ Failed to fetch events", error);
    isLoading.value = false;
  }
};

const filteredEvents = computed(() => {
  // return store.events;
  return store.events.filter((event) => event.travel_itinerary === true);
});

const paginatedEvents = computed(() => {
  const end = (currentPage.value + 1) * itemsPerPage;
  return filteredEvents.value.slice(0, end);
});

const hasNextPage = computed(() => {
  return (currentPage.value + 1) * itemsPerPage < filteredEvents.value.length;
});

const loadMore = () => {
  if (hasNextPage.value) {
    currentPage.value += 1;
  }
};

onMounted(async () => {
  await getCountryList();
  if (countryOptions.value.length > 0) {
    const first = countryOptions.value[0];
    selectedCountry.value = first;
    await fetchEvents(first.cid);
  }
});
</script>
