<template>
  <div class="flex flex-col min-h-screen">
    <Navbar class="hidden md:block" />
    <nav class="border-b border-[#A8A3A3] md:hidden">
      <div class="flex justify-between h-20 items-center p-4">
        <img @click="backToEvent" src="@/assets/icons/chevron-left.svg" alt="">
        <h3 class="text-[#152123] text-base font-medium">이벤트 상세</h3>
      </div>
    </nav>
    <main class="flex-1 lg:bg-[#F5F5F7] bg-white">
      <div class="md:my-16"></div>
      <div class="m-10 mx-auto card">
        <div class="hidden md:flex items-center space-x-2 ">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span>
          </router-link>
          <span class="text-[#152123] text-sm font-normal">이벤트</span>
        </div>
        <div class="bg-white md:py-10 p-5 my-5 ">
          <div class="md:flex justify-between md:border-b border-[#8E8D8D] md:pb-4 max-w-[1200px]">
            <p class="text-[#152123] text-base font-medium">
              {{ eventDetail?.ev_name }}
            </p>
            <p class="text-[#5E5F61] text-sm font-normal">
              {{ eventDetail?.ev_start }} ~ {{ eventDetail?.ev_end }}
            </p>
          </div>
          <div class="md:mx-5 mt-4 justify-center flex ">
            <div class=" md:max-w-[960px]">
              <h1 class="text-[#152123] text-sm font-medium" v-html="eventDetail?.ev_detail"></h1>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="md:flex justify-center lg:bg-[#f5f5f7] bg-white hidden pt-10">
      <button @click="backToEvent"
        class="text-[#132D5C] text-base font-bold border border-[#132D5C] w-60 h-[50px] mb-12">
        이전
      </button>
    </div>

    <div class="flex justify-center md:hidden">
      <button @click="backToEvent"
        class="border border-[#5E5F61] px-[45.7px] py-[8px]  mb-10 text-[#152123] text-sm font-light rounded-full">
        이전
      </button>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import { useRoute, useRouter } from "vue-router";
import { useEventStore } from "~/stores/event.store";

const route = useRoute();
const router = useRouter();
const ev_id = route.params.id;
const store = useEventStore();
const eventDetail = ref(null);

const fetchEventDetail = async () => {
  try {
    await store.eventDetail(ev_id);
    eventDetail.value = store.eventDetail;
  } catch (error) {
    console.error("Error fetching event details:", error);
  }
};
fetchEventDetail();
const backToEvent = () => {
  router.push("/event");
};
</script>

<style scoped>
.card {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
