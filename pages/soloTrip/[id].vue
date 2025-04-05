<template>
    <div class="flex flex-col min-h-screen">
      <FloatingButtons />
      <Navbar class="hidden md:block" />
      <nav class="border-b border-[#A8A3A3] md:hidden">
        <div class="flex justify-between h-20 items-center p-4">
          <img @click="backToEvent" src="@/assets/icons/chevron-left.svg" alt="">
          <h3 class="text-[#152123] text-base font-semibold">라오스 대표 골프장을 다채롭게 즐기자!</h3>
        </div>
      </nav>
      <main class="flex-1 lg:bg-[#F5F5F7] bg-white">
        <topArea />
        <div class="relative z-10 flex justify-center -mt-[30px] lg:-mt-[60px]">
          <estimationProcedure />
        </div>
        <div class="md:my-16"></div>
        <div class="m-10 mx-auto card">
          <div class="hidden md:flex items-center justify-between space-x-2 ">
              <!-- <router-link to="/">
                <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
                <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span>
              </router-link> -->
              <span class="text-[#152123] text-sm font-semibold">라오스 대표 골프장을 다채롭게 즐기자!</span>
              <div class="flex justify-center">
                <button @click="backToEvent"
                  class="border border-[#5E5F61] px-[10.7px] py-[5px] text-[#152123] text-sm rounded-full font-semibold">
                  단독여행 전체보기
                  <span class="ml-3">{{ '>' }}</span>
                </button>
              </div>
            </div>
            <div>
          <div v-if="isfetching" class="flex justify-center items-center h-32">
            <p class="text-gray-500">싣고 있는...</p>
          
          </div>
    
            <div v-else class="bg-white md:py-10 p-5 my-5">
              <div class="md:flex justify-between md:border-b border-[#8E8D8D] md:pb-4 max-w-[1200px]">
                <p class="text-[#152123] text-base font-medium">
                  {{ eventDetail?.ev_name }}
                </p>
                <p v-show="eventDetail.ev_start || eventDetail.ev_end" class="text-[#5E5F61] text-sm font-normal">
                  {{formatDate(eventDetail?.ev_start) }} ~ {{ formatDate(eventDetail?.ev_end) }}
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
      <div class="flex justify-center lg:bg-[#f5f5f7] bg-white pt-10">
        <div class="md:flex justify-center lg:bg-[#f5f5f7] bg-white pt-10 mr-2">
          <button @click="goToQuotation"
            class="text-[#ffff] text-base font-bold border-2 w-40 h-[50px] lg:w-60 lg:h-[50px] mb-12 bg-[#6EBC30]">
            견적 신청하기   >
          </button>
        </div>
        <div class="md:flex justify-center lg:bg-[#f5f5f7] bg-white pt-10">
          <button @click="goToKakao"
            class="text-[#ffff] text-base font-bold border bg-[#2F312A] w-40 h-[50px] lg:w-60 lg:h-[50px] mb-12">
            카카오톡 문의하기 >
          </button>
        </div>
      </div>
  
      <!-- <div class="flex justify-center md:hidden">
        <button @click="backToEvent"
          class="border border-[#5E5F61] px-[45.7px] py-[8px]  mb-10 text-[#152123] text-sm font-light rounded-full">
          이전
        </button>
      </div> -->
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
  import FloatingButtons from "~/components/apply-quotation/FloatingButtons.vue"
  
  
  const route = useRoute();
  const router = useRouter();
  const ev_id = route.params.id;
  const store = useEventStore();
  const eventDetail = ref(null);
  const isOpen = ref(false);
  const isfetching = ref(false);
  
  const formatDate = (dateString) => {
    if (!dateString) return "";  
    const d = new Date(dateString); 
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
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
     title: 'autontour', // Optional, you can set a custom title for the event page
      meta: [
       {
         name: 'naver-site-verification',
         content: '8eaa0adf55c96d5b0b83954be26d188fa8aa6866',
       },
       {
         name: 'viewport',
         content: 'width=device-width, initial-scale=1',
       },
       {
         name: 'description',
         content: `${newValue?.course_desc}`,
       },
       {name: 'robots', content: 'index, follow'},
       // Open Graph Meta Tags 
       { property: 'og:title', content: `${newValue?.ev_name}` },
       { property: 'og:description', content: `${newValue?.course_desc}` },
       { property: 'og:image', content: 'https://autontour.com/assets/images/AutonTour_logo.png' }, // Replace with your image URL
       { property: 'og:url', content: `https://autontour.com/event/${ev_id}` },
       { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: "canonical", href: `https://autontour.com/event/${ev_id}` } // Avoid duplicate content issues
      ]
    });
  });
  const backToEvent = () => {
    router.push("/soloTrip");
  };
  const goToQuotation = () => {
    router.push("/applyQuotation");
  };
  const goToKakao = () => {
    window.open("https://accounts.kakao.com/login?continue=https%3A%2F%2Fpf.kakao.com%2F_VWDxhn%2Fchat", "_blank");
  };
  
  </script>
  
  <style scoped>
  .card {
    max-width: 1280px;
    margin: 0 auto;
  }
  </style>
  