<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <!-- <nav class="border-b border-[#A8A3A3] lg:hidden">
      <div class="flex justify-between h-20 items-center p-4">
        <div class="flex items-center">
          <router-link to="/">
            <img src="@/assets/icons/auto.svg" class="w-24 h-8 md:w-36" />
          </router-link>
          <h1 class="text-[#152123] lg:text-3xl lg:font-bold text-base font-medium ml-4">여행 정보</h1>
        </div>
        <div>
          <button @click="toggleMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 5.33333C3 4.59695 3.59695 4 4.33333 4H19.6667C20.403 4 21 4.59695 21 5.33333C21 6.06971 20.403 6.66667 19.6667 6.66667H4.33333C3.59695 6.66667 3 6.06971 3 5.33333ZM3 12C3 11.2636 3.59695 10.6667 4.33333 10.6667H19.6667C20.403 10.6667 21 11.2636 21 12C21 12.7364 20.403 13.3333 19.6667 13.3333H4.33333C3.59695 13.3333 3 12.7364 3 12ZM3 18.6667C3 17.9303 3.59695 17.3333 4.33333 17.3333H19.6667C20.403 17.3333 21 17.9303 21 18.6667C21 19.403 20.403 20 19.6667 20H4.33333C3.59695 20 3 19.403 3 18.6667Z"
                fill="#132D5C" />
            </svg>
          </button>
        </div>
      </div>
    </nav> -->
    <main class="flex-1 lg:bg-[#F5F5F7] bg-white ">
      <div class="md:my-5"></div>
      <div class="m-10 mx-auto cards">
        <div class="hidden lg:flex items-center space-x-2">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span>
          </router-link>
          <span class="text-[#152123] text-sm font-normal py-5">이벤트</span>
        </div>
      </div>
      <div class="lg:flex lg:justify-center hidden">
        <h1 class="text-[#152123] text-3xl font-bold">이벤트</h1>
      </div>
      <div class="card min-h-screen md:py-7">
        <main class="flex-1">
          <div class="mt-6 space-y-6 cursor-pointer">
            <div v-for="(event, index) in paginatedEvents" :key="index">
              <div @click="toId(event.ev_id)"
                class="bg-white flex flex-col lg:flex-row items-center lg:items-center border-b-2 border-dashed lg:p-0 pb-5 lg:border-0 my-7">
                <img :src="event.ev_image" alt="event" class="image-event mb-4 md:mb-0 md:mr-6" />
                <div class="text-center lg:text-left">
                  <p class="text-[#152123] lg:text-xl font-medium text-base">
                    {{ event.ev_name }}
                  </p>
                  <p class="text-[#5E5F61] font-normal lg:text-sm text-xs">
                    {{ event.ev_start }} - {{ event.ev_end }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div class="hidden lg:flex justify-center mb-10 space-x-10">
          <p v-for="(page, index) in totalPages" :key="index" @click="currentPage = index + 1" :class="{
            'text-[#0EC0CB] text-sm font-medium cursor-pointer':
              currentPage === index + 1,
            'text-[#5E5F61] text-sm font-normal cursor-pointer':
              currentPage !== index + 1,
          }">
            {{ index + 1 }}
          </p>
        </div>

        <div class="flex justify-center mb-7 lg:hidden" v-if="!showAllEvents">
          <button @click="showMore"
            class="text-[#152123] font-light text-sm border border-[#5E5F61] px-[39.2px] py-[9px] rounded-full">
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
import { useRoute } from "vue-router";

const route = useRoute();
const store = useEventStore();
const currentPage = ref(1);
const size = ref(4);
const showAllEvents = ref(false);

const toId = async (id) => {
  window.location.href = `/event/${id}`;
};

const fetchEvents = async () => {
  const params = {
    page: 0,
    size: 1000,
  };

  try {
    const response = await store.getEvent(params);
    if (response && response.data) {
      store.events = response.data.resp.rows;
      store.totalEvent = response.data.resp.total;
    }
  } catch (error) {
    console.log("Error fetching events:", error);
  }
};

fetchEvents();

const totalPages = computed(() => {
  const totalEvents = store.totalEvent || 0;
  return Math.ceil(totalEvents / size.value);
});

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * size.value;
  return store.events.slice(start, start + size.value);
});

const showMore = () => {
  if (!showAllEvents.value) {
    size.value += 4;
    if (size.value >= store.totalEvent) {
      showAllEvents.value = true;
    }
  }
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchEvents();
    }
  }
);
</script>

<style scoped>
.cards {
  max-width: 1280px;
  margin: 0 auto;
}

.card {
  max-width: 1200px;
  margin: 0 auto;
}

.image-event {
  width: 330px;
  height: 180px;
  object-fit: cover;
}
</style>
