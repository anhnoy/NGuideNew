<template>
  <div>
    <!-- Desktop View -->
    <div v-if="filteredEvents.length > 0" class="hidden lg:block">
      <div
        class="flex flex-col lg:flex-row items-center justify-center mx-3 mt-5 lg:m-10 space-y-4 lg:space-y-0 lg:space-x-4">
        <span class="flex text-[30px] font-bold text-[#152123] leading-[43px] justify-center">
          오토앤투어가 추천하는 라오스 여행 코스
        </span>
      </div>

      <!-- Desktop Skeleton Loader -->
      <div v-if="isLoading" class="w-[1200px] mt-8 h-[332px] flex mx-auto justify-between">
        <div v-for="n in 3" :key="n"
          class="w-[330px] h-[332px] rounded-[10px] border-[1px] border-[#E6E6E6] animate-pulse">
          <div class="h-[180px] w-full bg-gray-300 rounded-t-[10px]"></div>
          <div class="w-full h-[152px] p-[20px_12px] flex flex-col items-center justify-center space-y-4">
            <div class="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div class="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Desktop Content -->
      <div v-else class="w-[1200px] mt-8 h-[332px] flex mx-auto justify-center space-x-[105px]">
        <div v-for="(item, index) in filteredEvents.slice(0, 3)" :key="index"
          class="w-[330px] h-[332px] rounded-[10px] cursor-pointer border-[1px] border-[#E6E6E6] hover:shadow hover:border-[#6969694d]"
          @click="toId(item.ev_id)">
          <div class="relative h-[180px] w-full rounded-t-[10px] overflow-hidden">
            <img :src="item.ev_image" class="h-full w-full object-cover" alt="event image" />
          </div>
          <div class="w-full h-[152px] p-[20px_12px] gap-[12px] border-t">
            <div class="flex flex-col items-center gap-2">
              <textarea  class="w-[330px] px-2 text-justify font-bold text-[18px] text-[#152123] bg-transparent resize-none  focus:outline-none cursor-pointer" readonly :title="item.ev_name ">{{ item.ev_name }}</textarea>
              <textarea  class="w-[330px] px-2 text-justify font-normal text-[16px] text-[#5E5F61] bg-transparent resize-none  focus:outline-none cursor-pointer" readonly :title="item.course_desc" >{{ item.course_desc }}</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile View -->
    <div  class="block lg:hidden">
      <div class="w-[328px] mx-auto">
        <span class="flex text-[18px] font-bold text-[#152123] leading-[16px] justify-start">
          오토앤투어가 추천하는 라오스 여행 코스
        </span>
      </div>

      <!-- Mobile Skeleton Loader -->
      <div v-if="isLoading" class="w-[328px] mt-8 space-y-4 mx-auto">
        <div v-for="n in 3" :key="n"
          class="w-[328px] h-auto rounded-[10px] border-[1px] border-[#E6E6E6] animate-pulse">
          <div class="h-[180px] w-full bg-gray-300 rounded-t-[10px]"></div>
          <div class="w-full h-auto p-[20px_12px] flex flex-col items-center justify-center space-y-4">
            <div class="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div class="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Mobile Content -->
      <div v-else class="w-[328px] mt-8 space-y-4 mx-auto">
        <div v-for="(item, index) in filteredEvents.slice(0, 3)" :key="index"
          class="w-[328px] h-auto rounded-[10px] border-[1px] border-[#E6E6E6]" @click="toId(item.ev_id)">
          <div class="relative h-[180px] w-full rounded-t-[10px] overflow-hidden">
            <img :src="item.ev_image" class="h-full w-full object-cover" alt="" />
          </div>
          <div class="w-full h-auto p-[20px_12px] gap-[12px] border-t">
            <div class="flex flex-col items-center gap-2">
              <textarea  class="w-[330px] px-2 text-left font-bold text-[16px] text-[#152123] bg-transparent resize-none  focus:outline-none cursor-pointer" readonly :title="item.ev_name ">{{ item.ev_name }}</textarea>
              <textarea  class="w-[330px] px-2 text-left font-normal text-[12px] text-[#5E5F61] bg-transparent resize-none  focus:outline-none cursor-pointer" readonly :title="item.course_desc" >{{ item.course_desc }}</textarea>
            </div>
          </div>
        </div>
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
  // window.location.href = `/event/${id}`;
  await router.push(`/event/${id}`);
};

const store = useEventStore();
const isLoading = ref(true);

const fetchEvents = async () => {
  const params = { page: 0, size: 3 };

  try {
    await store.getEvent(params);
    isLoading.value = false;
  } catch (error) {
    // console.error("Error fetching events:", error);
    isLoading.value = false;
  }
};

// Computed property to filter events where travel_itinerary is true
const filteredEvents = computed(() => {
  return store.events.filter(event => event.travel_itinerary === true);
});

onMounted(() => {
  fetchEvents(); // Fetch the events when the component mounts
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>