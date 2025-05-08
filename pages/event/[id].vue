<template>
  <div class="flex flex-col min-h-screen">
    <kakao />
    <Navbar class="hidden md:block" />
    <nav class="border-b border-[#A8A3A3] md:hidden">
      <div class="flex justify-between h-20 items-center p-4">
        <img
          @click="backToEvent"
          src="@/assets/icons/chevron-left.svg"
          alt=""
        />
        <h3 class="text-[#152123] text-base font-medium">이벤트 상세</h3>
      </div>
    </nav>
    <main class="flex-1 lg:bg-[#F5F5F7] bg-white">
      <div class="md:my-16"></div>
      <div class="m-10 mx-auto card">
        <div class="hidden md:flex items-center space-x-2">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span>
          </router-link>
          <span class="text-[#152123] text-sm font-normal">이벤트</span>
        </div>
        <div>
          <div v-if="isfetching" class="flex justify-center items-center h-32">
            <p class="text-gray-500">싣고 있는...</p>
          </div>

          <div v-else class="bg-white md:py-10 p-5 my-5">
            <div
              class="md:flex justify-between md:border-b border-[#8E8D8D] md:pb-4 max-w-[1200px]"
            >
              <p class="text-[#152123] text-base font-medium">
                {{ eventDetail?.ev_name }}
              </p>
              <p
                v-show="eventDetail?.ev_start || eventDetail?.ev_end"
                class="text-[#5E5F61] text-sm font-normal"
              >
                {{ formatDate(eventDetail?.ev_start) }} ~
                {{ formatDate(eventDetail?.ev_end) }}
              </p>
            </div>
            <div class="md:mx-5 mt-4 justify-center flex">
              <div class="md:max-w-[960px]">
                <div v-html="eventDetail?.ev_detail"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="md:flex justify-center lg:bg-[#f5f5f7] bg-white hidden pt-10">
      <button
        @click="backToEvent"
        class="text-[#132D5C] text-base font-bold border border-[#132D5C] w-60 h-[50px] mb-12"
      >
        이전
      </button>
    </div>

    <div class="flex justify-center md:hidden">
      <button
        @click="backToEvent"
        class="border border-[#5E5F61] px-[45.7px] py-[8px] mb-10 text-[#152123] text-sm font-light rounded-full"
      >
        이전
      </button>
    </div>
    <Footer />
  </div>
  <div v-if="isOpen">
    <div class="fixed inset-0 bg-[#00000080] z-40"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <Event v-model:isOpen="isOpen" />
    </div>
  </div>
</template>

<script setup>
import Navbar from "~/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import { useRoute, useRouter } from "vue-router";
import { useEventStore } from "~/stores/event.store";
import Event from "~/components/utils/event.vue";
import eventService from "~/services/event.service";
import kakao from "~/components/KaKao/buttonKAKAO.vue";

const route = useRoute();
const router = useRouter();
const ev_id = route.params.id;
const store = useEventStore();
const eventDetail = ref(null);
const isOpen = ref(false);
const isfetching = ref(false);

onMounted(() => {
  router.push("/private-packages");
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const fetchEventDetail = async () => {
  isfetching.value = true;
  try {
    const response = await eventService.eventDetail(ev_id);
    eventDetail.value = response.data;

    if (!eventDetail.value || Object.keys(eventDetail.value).length === 0) {
      isOpen.value = true;
    }
  } catch (error) {
    console.error("Error fetching event details:", error);
    isOpen.value = true;
  }
  isfetching.value = false;
};

fetchEventDetail();

watch(eventDetail, (newValue) => {
  useHead({
    title: newValue?.ev_name || "autontour",
    meta: [
      {
        name: "naver-site-verification",
        content: "8eaa0adf55c96d5b0b83954be26d188fa8aa6866",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content: newValue?.course_desc || "",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph Meta Tags
      {
        property: "og:title",
        content:
          newValue?.ev_name ||
          "라오스 주요 관광지 3색 핵심 일정! 3박 5일 299,000원~",
      },
      {
        property: "og:description",
        content:
          newValue?.course_desc ||
          "비엔티안, 루앙프라방, 방비엥 핵심 관광지를 모두 둘러볼 수 있는 꽉찬 여행. 3박 5일 299,000원~",
      },
      {
        property: "og:image",
        content:
          newValue?.ev_image ||
          "https://autontour.com/assets/images/AutonTour_logo.png",
      },
      {
        property: "og:url",
        content: `https://autontour.com/event/${ev_id}`,
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: `https://autontour.com/event/${ev_id}`,
      },
    ],
  });
});
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
