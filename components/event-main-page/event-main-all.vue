<template>
  <div>
    <!-- Desktop View -->
    <div v-if="filteredEvents.length > 0" class="hidden lg:block">
      <div class="flex flex-col lg:flex-row items-center justify-center mx-3 mt-5 lg:m-10 space-y-4 lg:space-y-0 lg:space-x-4">
        <span class="flex text-[30px] font-bold text-[#152123] leading-[43px] justify-center">
          오토앤투어가 추천하는 단독패키지
        </span>
      </div>

      <!-- Desktop Skeleton Loader -->
      <div v-if="isLoading" class="mt-8 h-[310px] flex mx-auto justify-between">
        <div v-for="n in 6" :key="n"
          class="w-[384px] h-[310px] rounded-[10px] border-[1px] border-[#E6E6E6] animate-pulse">
          <div class="h-[180px] w-full bg-gray-300 rounded-t-[10px]"></div>
          <div class="w-[384px] h-[60px] p-[20px_12px] flex flex-col items-center justify-center space-y-4">
            <div class="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div class="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Desktop Content -->
      <div v-else class="mt-8 grid grid-cols-3 gap-x-6 gap-y-10 max-w-[1240px] mx-auto">
        <div v-for="(item, index) in paginatedEvents" :key="index"
          class="w-[384px] h-[310px] rounded-[10px] cursor-pointer border-[1px] border-[#E6E6E6] hover:shadow hover:border-[#6969694d]"
          @click="toId(item.ev_id)">
          <div class="relative h-[250px] w-[384px] rounded-t-[10px] overflow-hidden">
            <img :src="item.ev_image" class="h-full w-full object-cover" alt="event image" />
          </div>
          <div class="w-[384px] h-[60px] p-[20px_12px] gap-[12px] border-t">
            <div class="flex items-center gap-2 justify-between">
              <span class="w-[384px] px-2 font-bold text-[16px] text-[#152123] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer" readonly :title="item.ev_name ">{{ item.ev_name }}</span>
              <img src="@/assets/icons/nextClick.svg" alt="" class="w-[20px] h-[20px]">
              <!-- <textarea class="w-[330px] px-2 text-justify font-normal text-[16px] text-[#5E5F61] bg-transparent resize-none  focus:outline-none cursor-pointer" readonly :title="item.course_desc" >{{ item.course_desc }}</textarea> -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isLoading && hasNextPage" class="flex justify-center items-center m-8">
        <button @click="loadMore"
          class="mt-4 font-light text-sm md:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 md:px-[79px] md:py-[10.5px]  rounded-full hover:bg-gray-200">
          더보기
        </button>
      </div>
    </div>

    <!-- Mobile View -->
    <div  class="block lg:hidden">
      <div class="w-[328px] mx-auto">
        <span class="flex text-[18px] font-bold text-[#152123] leading-[16px] justify-start">
          오토앤투어가 추천하는 단독패키지
        </span>
      </div>

      <!-- Mobile Skeleton Loader -->
      <div v-if="isLoading" class="w-[328px] mt-8 space-y-4 mx-auto">
        <div v-for="n in 6" :key="n"
          class="w-[328px] h-auto rounded-[10px] border-[1px] border-[#E6E6E6] animate-pulse">
          <div class="h-[180px] w-full bg-gray-300 rounded-t-[10px]"></div>
          <div class="w-full h-auto p-[20px_12px] flex flex-col items-center justify-center space-y-4">
            <div class="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div class="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Mobile Content -->
      <div v-else class="w-[328px] mt-8 grid grid-cols-2 gap-5 mx-auto ">
          <div v-for="(item, index) in paginatedEvents" :key="index"
            class="w-[160px] h-[226px] rounded-[10px] border-[1px] border-[#E6E6E6] overflow-hidden cursor-pointer"
            @click="toId(item.ev_id)">
            
            <!-- Image Section -->
            <div class="relative h-[160px] w-full">
              <img :src="item.ev_image" class="h-full w-full object-cover rounded-t-[10px]" alt="" />
            </div>
        
            <!-- Content Section -->
            <div class="p-4 space-y-2 border-t">
              <div class="flex items-center justify-between">
                <span 
                  class="flex-1 text-[14px] font-bold text-[#152123] bg-transparent overflow-hidden text-ellipsis whitespace-nowrap resize-none focus:outline-none cursor-pointer leading-tight"
                  readonly 
                  :title="item.ev_name">{{ item.ev_name }}</span>
                <img src="@/assets/icons/nextClick.svg" alt="next" class="w-[20px] h-[20px] ml-2" />
              </div>
            </div>
          </div>
      </div>


      <!-- Mobile Load More Button -->
      <div v-if="!isLoading && hasNextPage" class="flex justify-center items-center m-8">
        <button @click="loadMore"
          class="mt-4 font-light text-sm md:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 md:px-[79px] md:py-[10.5px]  rounded-full hover:bg-gray-200">
          더보기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useEventStore } from "~/stores/event.store";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const toId = async (id) => {
  await router.push(`/private-packages/${id}`);
};

const store = useEventStore();
const isLoading = ref(true);
const itemsPerPage = 6;
const currentPage = ref(0);

const fetchEvents = async () => {
  const params = { page: 0, size: 100 };
  try {
    await store.getEvent(params);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
  }
};

const filteredEvents = computed(() => {
  // return store.events;
  return store.events.filter(event => event.travel_itinerary === true);
});

const paginatedEvents = computed(() => {
  const start = currentPage.value * itemsPerPage;
  return filteredEvents.value.slice(start, start + itemsPerPage);
});

const hasNextPage = computed(() => {
  return (currentPage.value + 1) * itemsPerPage < filteredEvents.value.length;
});

const loadMore = () => {
  if (hasNextPage.value) {
    currentPage.value += 1;
  }
};

onMounted(() => {
  fetchEvents();
});
</script>
