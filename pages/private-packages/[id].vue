<template>
    <div class="flex flex-col min-h-screen">
      <FloatingButtons />
      <Navbar class="hidden md:block" />
      <nav class="border-b border-[#A8A3A3] md:hidden">
        <div class="flex justify-between h-20 items-center p-4">
          <img @click="backToEvent" src="@/assets/icons/chevron-left.svg" alt="">
          <h3 class="text-[#152123] text-[14px] font-semibold bg-transparent overflow-hidden text-ellipsis whitespace-nowrap">{{ eventDetail?.ev_name }}</h3>
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
              <span class="text-[#152123] text-[30px] font-semibold">{{ eventDetail?.ev_name }}</span>
              <div class="flex justify-center">
                <button @click="backToEvent"
                  class="border border-[#5E5F61] px-[10.7px] py-[5px] text-[#152123] text-[18px] rounded-full font-semibold">
                  단독패키지 전체보기
                  <span class="ml-3">{{ '>' }}</span>
                </button>
              </div>
            </div>
            <div>
          <div v-if="isfetching" class="flex justify-center items-center h-32">
            <p class="text-gray-500">싣고 있는...</p>
          
          </div>
    
            <div v-else class="bg-white md:py-10 p-5 my-5">
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
            class="text-[#ffff] text-[14px] lg:text-[20px] font-bold border-2 w-40 h-[50px] lg:w-60 lg:h-[50px] mb-12 bg-[#6EBC30]">
            단독패키지 예약하기   >
          </button>
        </div>
        <div class="md:flex justify-center lg:bg-[#f5f5f7] bg-white pt-10">
          <button @click="goToKakao"
            class="text-[#ffff] text-[14px] lg:text-[20px] border bg-[#2F312A] w-40 h-[50px] lg:w-60 lg:h-[50px] mb-12">
            카카오톡 문의하기 
            <span class="ml-2">></span>
          </button>
        </div>
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
  import FloatingButtons from "~/components/apply-quotation/FloatingButtons.vue"
  
  
  const route = useRoute();
  const router = useRouter();
  const ev_id = route.params.id;
  const store = useEventStore();
  const eventDetail = ref(null);
  const isOpen = ref(false);
  const isfetching = ref(false);
  const Id1 = ref('https://docs.google.com/forms/d/1b4UKSG0VUoAyUzl05CNisvG72o3IHHvFY81xvJhda5s/edit');
  const Id2 = ref('https://docs.google.com/forms/d/1xxPoYR79o_hFh946XnnsjzMVuUP8XMEaDA2ESIjmVsk/edit');
  const Id3 = ref('https://docs.google.com/forms/d/1muyWC6mz1gQcr91qKR-IkwGlPPNwCRxbxCfJV2hqw2c/edit');
  const Id4 = ref('https://docs.google.com/forms/d/1CvE1JFaJNYutHvwBZOKwAuUFKxlSxxX1NAOPJQ41Jfw/edit');

  const kaId1 = ref('http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%ED%83%9C%EA%B5%AD%20%EB%B0%A9%EC%BD%95%ED%8C%8C%ED%83%80%EC%95%BC%20%EC%83%81%ED%92%88%EB%AC%B8%EC%9D%98');
  const kaId2 = ref('http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%EB%9D%BC%EC%98%A4%EC%8A%A4%20%EA%B3%A8%ED%94%84%EC%97%AC%ED%96%89%203%EB%B0%955%EC%9D%BC%20%EC%83%81%ED%92%88%EB%AC%B8%EC%9D%98');
  const kaId3 = ref('http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%EB%9D%BC%EC%98%A4%EC%8A%A4%20%ED%9E%90%EB%A7%81%EC%97%AC%ED%96%89%203%EB%B0%955%EC%9D%BC%20%EC%83%81%ED%92%88%EB%AC%B8%EC%9D%98%28%EB%B9%84%EC%97%94%ED%8B%B0%EC%95%88%2F%EB%B0%A9%EB%B9%84%EC%97%A5%29');
  const kaId4 = ref('http://pf.kakao.com/_VWDxhn/chat?mode=chat&input=%EB%9D%BC%EC%98%A4%EC%8A%A4%20%ED%95%B5%EC%8B%AC%EC%97%AC%ED%96%89%203%EB%B0%955%EC%9D%BC%20%EC%83%81%ED%92%88%EB%AC%B8%EC%9D%98%28%EB%B9%84%EC%97%94%ED%8B%B0%EC%95%88%2F%EB%A3%A8%EC%95%99%ED%94%84%EB%9D%BC%EB%B0%A9%2F%EB%B0%A9%EB%B9%84%EC%97%A5%29');
  
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
    router.push("/private-packages");
  };
  
  const formLinks = {
  78: Id1.value,
  71: Id2.value,
  70: Id3.value,
  69: Id4.value
};

const kakaoLinks = {
  78: kaId1.value,
  71: kaId2.value,
  70: kaId3.value,
  69: kaId4.value
}; 

  const goToQuotation = () => {
    window.open(formLinks[ev_id]);
    // window.open('https://docs.google.com/forms/d/1xxPoYR79o_hFh946XnnsjzMVuUP8XMEaDA2ESIjmVsk/edit')
    // router.push("/applyQuotation");
  };
  const goToKakao = () => {
    window.open(kakaoLinks[ev_id], "_blank");
    // window.open("https://accounts.kakao.com/login?continue=https%3A%2F%2Fpf.kakao.com%2F_VWDxhn%2Fchat", "_blank");
  };
  
  </script>
  
  <style scoped>
  .card {
    max-width: 1280px;
    margin: 0 auto;
  }
  </style>
  