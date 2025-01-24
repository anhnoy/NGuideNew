<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
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
      <div class=" flex justify-center lg:m-0 mt-6">
        <h1 class="text-[#152123] lg:text-3xl lg:font-bold text-base font-medium">이벤트</h1>
      </div>
      <div class="card min-h-screen md:py-7">
        <main class="flex-1">
          <div class="mt-6 space-y-6 cursor-pointer">
            <div v-for="(event, index) in paginatedEvents" :key="index">
              <div @click="toId(event.ev_id)"
                class="bg-white flex flex-col lg:flex-row items-center border-b-2 border-dashed lg:p-0 pb-5 lg:border-0 my-7 lg:*: transition-transform duration-300 hover:scale-105">
                <img :src="event.ev_image" alt="event" class="image-event mb-4 md:mb-0 md:mr-6" />
                <div class="text-justify px-[70px] lg:px-0 w-full lg:w-auto">
                  <p class="text-[#152123] lg:text-xl font-medium">
                    {{ event.ev_name }}
                  </p>
                  <p v-if="event.ev_start || event.ev_end" class="text-[#5E5F61] font-normal lg:text-sm text-xs pt-4">
                    {{ formatDate(event.ev_start) }} ~ {{ formatDate(event.ev_end) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div v-if="totalPages > 1" class="hidden lg:flex justify-center mb-10 space-x-10 overflow-auto">
          <p v-for="(page, index) in totalPages" :key="index" @click="fetchEventWithPage(index)" :class="{
            'text-[#0EC0CB] text-sm font-medium cursor-pointer':
              currentPage === index + 1,
            'text-[#5E5F61] text-sm font-normal cursor-pointer hover:text-[#0EC0CB] hover:font-bold':
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
import { useRoute, useRouter } from "vue-router";
import Event from "~/components/utils/event.vue";

const route = useRoute();
const router = useRouter();
const store = useEventStore();
const currentPage = ref(1);
const size = ref(4);
const showAllEvents = ref(false);

const toId = async (id) => {
  sessionStorage.setItem("size", size.value);
  sessionStorage.setItem("currentPage", currentPage.value);
  // window.location.href = `/event/${id}`;
  await router.push(`/event/${id}`);
};

const fetchEvents = async () => {
  size.value = sessionStorage.getItem("size") || 4;
  const storedPage = sessionStorage.getItem("currentPage");
  currentPage.value = storedPage ? Math.max(storedPage - 1, 0) : 0;
  sessionStorage.clear();

  const params = {
    page: currentPage.value,
    size: 4,
  };
  currentPage.value += 1;
  try {
    await store.getEvent(params);
  } catch (error) {
    console.log("Error fetching events:", error);
  }
};

fetchEvents();

const fetchEventWithPage = async (page) => {
  const params = {
    page: page,
    size: 4,
  };
  currentPage.value = page + 1;
  window.scrollTo({ top: 0, behavior: 'smooth'});

  try {
    await store.getEvent(params);
  } catch (error) {
    console.log("Error fetching events:", error);
  }
};

const totalPages = computed(() => {
  const totalEvents = store.totalEvent || 0;
  return Math.ceil(totalEvents / size.value);
});

const paginatedEvents = computed(() => {
  // const start = (currentPage.value - 1) * size.value;
  return store.events;
});

const showMore = async() => {
  const params = {
    page: 0,
    size: 999,
  };
  
  try {
    await store.getEvent(params);
    showAllEvents.value = true;
  } catch (error) {
    showAllEvents.value = false;
    console.log("Error fetching events:", error);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";  
  const d = new Date(dateString); 
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
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
