<template>
  <div class="flex flex-col min-h-screen">
    <FloatingButtons :class="{ 'mb-10 md:mb-0': !isAboveFooter }" />
    <Navbar class="hidden md:block" />
    <nav class="border-b border-[#A8A3A3] md:hidden">
      <div class="flex justify-between h-20 items-center p-4">
        <img
          @click="backToEvent"
          src="@/assets/icons/chevron-left.svg"
          alt=""
        />
        <h3
          class="text-[#152123] text-[14px] font-semibold bg-transparent overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ eventDetail?.ev_name }}
        </h3>
      </div>
    </nav>
    <main class="flex-1 bg-white">
      <topArea />
      <div class="relative z-10 flex justify-center -mt-[180px] lg:-mt-[175px] xl:-mt-[160px] 2xl:-mt-[110px]">
        <estimationProcedure />
      </div>
      <div class="md:my-10"></div>
      <div class="m-10 mx-auto card">
        <div class="hidden md:flex items-center justify-between space-x-2">
          <span class="text-[#152123] text-[30px] font-semibold">{{
            eventDetail?.ev_name
          }}</span>
          <div class="flex justify-center">
            <button
              @click="backToEvent"
              class="border border-[#5E5F61] px-[10.7px] py-[5px] w-[238px] h-[42px] text-[#152123] text-[18px] rounded-full font-semibold"
            >
              단독패키지 전체보기
              <span class="ml-3">{{ ">" }}</span>
            </button>
          </div>
        </div>
        <div>
          <div v-if="isfetching" class="flex justify-center items-center h-32">
            <p class="text-gray-500">싣고 있는...</p>
          </div>

          <div v-else class="p-5 my-[10px]">
            <div class="md:mx-5 justify-center flex">
              <div class="md:max-w-[960px]">
                <div v-html="eventDetail?.ev_detail"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div
      class="sticky bottom-0 left-0 right-0 flex justify-center gap-2 p-4 bg-white border-gray-200 z-10"
    >
      <button
        @click="goToQuotation"
        class="text-[#ffff] text-[14px] lg:text-[20px] font-normal border-2 w-40 h-[50px] lg:w-60 lg:h-[50px] mb-2 bg-[#6EBC30]"
      >
        단독패키지 예약하기 >
      </button>
      <button
        @click="goToKakao"
        class="text-[#ffff] text-[14px] lg:text-[20px] font-normal border bg-[#2F312A] w-40 h-[50px] lg:w-60 lg:h-[50px] mb-2"
      >
        카카오톡 문의하기 >
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
import topArea from "~/components/soloTravelSubMain/topArea.vue";
import estimationProcedure from "~/components/soloTravelSubMain/estimationProcedure.vue";
import FloatingButtons from "~/components/apply-quotation/FloatingButtons.vue";

const route = useRoute();
const router = useRouter();
const ev_id = route.params.id;
const store = useEventStore();
const eventDetail = ref(null);
const isOpen = ref(false);
const isfetching = ref(false);
const Id1 = ref("https://url.kr/pcc8em");
const Id2 = ref("https://url.kr/hhsgbw");
const Id3 = ref("https://url.kr/fsjxzm");
const Id4 = ref("https://url.kr/ypsr9k");
const Id5 = ref("https://url.kr/e7m5td");

const kaId1 = ref(
  "http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%ED%83%9C%EA%B5%AD%20%EB%B0%A9%EC%BD%95%26%ED%8C%8C%ED%83%80%EC%95%BC%20%EB%8B%A8%EB%8F%85%ED%8C%A8%ED%82%A4%EC%A7%80%20%EB%AC%B8%EC%9D%98"
);
const kaId2 = ref(
  "http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%EB%9D%BC%EC%98%A4%EC%8A%A4%20%EB%B9%84%EC%97%94%ED%8B%B0%EC%95%88%20%EA%B3%A8%ED%94%84%20%EB%AC%B8%EC%9D%98"
);
const kaId3 = ref(
  "http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%EB%9D%BC%EC%98%A4%EC%8A%A4%20%EB%B9%84%EC%97%94%ED%8B%B0%EC%95%88%2F%EB%B0%A9%EB%B9%84%EC%97%A5%20%EB%8B%A8%EB%8F%85%ED%8C%A8%ED%82%A4%EC%A7%80%20%EB%AC%B8%EC%9D%98"
);
const kaId4 = ref(
  "http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%EB%9D%BC%EC%98%A4%EC%8A%A4%20%EB%B9%84%EC%97%94%ED%8B%B0%EC%95%88%2F%EB%A3%A8%EC%95%99%ED%94%84%EB%9D%BC%EB%B0%A9%2F%EB%B0%A9%EB%B9%84%EC%97%A5%20%EB%8B%A8%EB%8F%85%ED%8C%A8%ED%82%A4%EC%A7%80%20%EB%AC%B8%EC%9D%98"
);
const kaId5 = ref(
  "http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%ED%83%9C%EA%B5%AD%20%ED%8C%8C%ED%83%80%EC%95%BC%20%EA%B3%A8%ED%94%84%20%EB%AC%B8%EC%9D%98"
);

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
        content:
          ev_id === "71"
            ? "라오스 골프여행! 3개 골프장을 한 번에 즐기는 3박 5일 비엔티안 골프 라운딩. 399,000원부터!"
            : ev_id === "70"
            ? "방비엥 블루라군 자연 속에서 즐기는 잊지 못할 모험 여행. 3박 5일 259,000원~"
            : ev_id === "69"
            ? "비엔티안, 루앙프라방, 방비엥 핵심 관광지를 모두 둘러볼 수 있는 꽉찬 여행. 3박 5일 299,000원~"
            : ev_id === "78"
            ? "방콕과 파타야를 한번에! 태국 5성급 호텔, 식사 포함, 전신마사지 2시간까지 누리는 프리미엄 단독 패키지 여행. 한국인 가이드와 함께하는 편안한 일정."
            : ev_id === "82"
            ? "태국 골프여행의 정수! 파타야 골프장, 3일간 3개의 골프장에서 54홀 라운딩, 캐디·카트 포함, 조식·석식 제공, 한국인 가이드까지 포함된 프리미엄 단독 골프 패키지."
            : newValue?.course_desc,
      },
      { name: "robots", content: "index, follow" },
      // Open Graph Meta Tags
      {
        property: "og:title",
        content:
          ev_id === "71"
            ? "라오스 골프 여행 3박 5일 399,000원~"
            : ev_id === "70"
            ? "라오스 방비엥에서 즐기는 짜릿한 액티비티 3박 5일 259,000원~"
            : ev_id === "69"
            ? "라오스 주요 관광지 3색 핵심 일정! 3박 5일 299,000원~"
            : ev_id === "78"
            ? "방콕·파타야 프리미엄 단독 여행 – 전 일정 5성급 호텔!"
            : ev_id === "82"
            ? "태국 골프여행 – 3일간 3개의 골프장 라운딩 · 파타야 골프장 54홀 완전 정복!"
            : newValue?.ev_name,
      },
      {
        property: "og:description",
        content:
          ev_id === "71"
            ? "비엔티안 골프 54홀 라운딩! 3개 골프장에서 라오스 골프를 모두 즐기는 특별한 3박 5일 여행을 만나보세요."
            : ev_id === "70"
            ? "방비엥 블루라군 자연 속에서 즐기는 잊지 못할 모험 여행. 3박 5일 259,000원~"
            : ev_id === "69"
            ? "비엔티안, 루앙프라방, 방비엥 핵심 관광지를 모두 둘러볼 수 있는 꽉찬 여행. 3박 5일 299,000원~"
            : ev_id === "78"
            ? "5성급 호텔, 전신마사지 2시간, 한국인 가이드와 함께하는 고품격 태국 여행! 방콕·파타야 인기 관광지를 단독 패키지로 편하게 즐기세요."
            : ev_id === "82"
            ? "매일 다른 태국 파타야 인기 골프장에서 54홀 라운딩! 캐디피, 카트비 포함 · 전 일정 조식·석식 제공 · 한국인 가이드 동행으로 편안한 태국 골프여행을 즐기세요."
            : newValue?.course_desc,
      },
      {
        property: "og:image",
        content: "https://autontour.com/assets/images/AutonTour_logo.png",
      },
      {
        property: "og:url",
        content: `https://autontour.com/private-packages/${ev_id}`,
      },
      { property: "og:type", content: "website" },
    ],
    link: [
      {
        rel: "canonical",
        href: `https://autontour.com/private-packages/${ev_id}`,
      },
    ],
  });
});
const backToEvent = () => {
  router.push("/private-packages");
};

const formLinks = {
  78: Id1.value,
  71: Id2.value,
  70: Id3.value,
  69: Id4.value,
  82: Id5.value,
};

const kakaoLinks = {
  78: kaId1.value,
  71: kaId2.value,
  70: kaId3.value,
  69: kaId4.value,
  82: kaId5.value,
};

// const goToQuotation = () => {
//   window.open(formLinks[ev_id]);
// };
// const goToKakao = () => {
//   window.open(kakaoLinks[ev_id], "_blank");
// };
const goToQuotation = () => {
  if (typeof gtag !== "undefined") {
    gtag("event", "Make a reservation", {
      product_id: ev_id,
    });
  }
  window.open(formLinks[ev_id]);
};

const goToKakao = () => {
  if (typeof gtag !== "undefined") {
    gtag("event", "Kakao Talk Inquiry", {
      product_id: ev_id,
    });
  }
  window.open(kakaoLinks[ev_id], "_blank");
};

const isAboveFooter = ref(false);

watch(
  () => {
    // Check if FloatingButtons is positioned above Footer
    const floatingButtons = document.querySelector(".floating-buttons");
    const footer = document.querySelector("footer");
    if (floatingButtons && footer) {
      const floatingButtonsRect = floatingButtons.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      isAboveFooter.value = floatingButtonsRect.bottom > footerRect.top;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.card {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
