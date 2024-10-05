<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 lg:bg-[#F5F5F7] bg-white">
      <div class="card min-h-screen">
        <div class="hidden lg:flex items-center space-x-2">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span
          ></router-link>
          <span class="text-[#152123] text-sm font-normal">이벤트</span>
        </div>
        <div class="lg:flex lg:justify-center hidden">
          <h1 class="text-[#152123] text-3xl font-bold">이벤트</h1>
        </div>
        <main class="flex-1">
          <div class="mt-6 space-y-6">
            <router-link
              v-for="(event, index) in store.events"
              :key="index"
              class="bg-white flex flex-col lg:flex-row items-center lg:items-center border-b-2 border-dashed lg:p-0 pb-5 lg:border-0 m-7"
              :to="`/event/${event.ev_id}`"
            >
              <img
                :src="event.ev_image"
                alt=""
                class="image-event mb-4 lg:mb-0 lg:mr-6"
              />
              <div class="text-center lg:text-left">
                <p class="text-[#152123] lg:text-xl font-medium text-base">
                  {{ event.ev_name }}
                </p>
                <p class="text-[#5E5F61] font-normal lg:text-sm text-xs">
                  {{ event.ev_start }} - {{ event.ev_end }}
                </p>
              </div>
            </router-link>
          </div>
        </main>

        <div class="hidden lg:flex justify-center mt-6 space-x-4">
          <p
            v-for="(page, index) in totalPages"
            :key="index"
            @click="currentPage = index + 1"
            :class="{
              'text-[#FF9900] text-sm font-medium cursor-pointer':
                currentPage === index + 1,
              'text-[#5E5F61] text-sm font-normal cursor-pointer':
                currentPage !== index + 1,
            }"
          >
            {{ index + 1 }}
          </p>
        </div>

        <div class="flex justify-center mt-5 lg:hidden" v-if="!showAllEvents">
          <button
            @click="showMore"
            class="text-[#152123] font-light text-sm border border-[#5E5F61] px-5 py-1 rounded-full"
          >
            더보기
          </button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import { useEventStore } from "~/stores/event.store";

const store = useEventStore();
const currentPage = ref(0);
const itemsPerPage = 10;
const showAllEvents = ref(false);
const events = ref([]);

const fetchEvents = async () => {
  const params = {
    page: currentPage.value,
    size: itemsPerPage,
  };

  try {
    const response = await store.getEvent(params);
    if (response && response.data) {
      events.value = response.data.resp.rows;
      console.log("====>", events.value);
    }
  } catch (error) {
    console.log("Error fetching events:", error);
  }
};

fetchEvents();

const totalPages = computed(() => {
  return Math.ceil(store.totalEvent / itemsPerPage);
});
// const paginatedEvents = computed(() => {
//   if (showAllEvents.value) {
//     return events.value;
//   }
//   const start = (currentPage.value - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   return events.value.slice(start, end);
// });

const showMore = () => {
  showAllEvents.value = true;
};
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 50px auto;
}

.image-event {
  width: 330px;
  height: 180px;
  object-fit: cover;
}
</style>
