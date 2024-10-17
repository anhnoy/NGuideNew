<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 lg:bg-[#F5F5F7] bg-white">
      <div class="m-10 mx-auto container lg:px-16">
        <div class="hidden lg:flex items-center space-x-2 px-3">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span>
          </router-link>
          <span class="text-[#152123] text-sm font-normal">이벤트</span>
        </div>
        <div class="bg-white lg:p-10 p-5 my-5 mx-4">
          <div class="flex justify-between border-b border-[#8E8D8D] pb-4">
            <p class="text-[#152123] text-base font-medium">
              {{ eventDetail?.ev_name }}
            </p>
            <p class="text-[#5E5F61] text-sm font-normal">
              {{ eventDetail?.ev_start }} ~ {{ eventDetail?.ev_end }}
            </p>
          </div>

          <!-- <div class="flex items-center justify-center m-5">
            <img
              :src="eventDetail?.ev_detail"
              alt=""
              width="960"
              height="1500"
              class="object-cover w-[960px] h-[1334.22px]"
            />
          </div> -->
          <div class="mx-5 lg:mt-4" v-html="eventDetail?.ev_detail"></div>
        </div>
      </div>
    </main>
    <div class="lg:flex justify-center lg:bg-[#f5f5f7] bg-white hidden">
      <button
        @click="backToEvent"
        class="text-[#132D5C] text-base font-bold border border-[#132D5C] w-60 h-12 mb-12"
      >
        이전
      </button>
    </div>

    <div class="flex justify-center lg:hidden">
      <button
        @click="backToEvent"
        class="border border-[#5E5F61] w-28 h-10 m-4 text-[#152123] text-sm font-light rounded-full"
      >
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

</style>
