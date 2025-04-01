<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <BannerMain />

      <div class="my-10">
        <GetTravel />
      </div>
      <div class="my-14">
        <EventMainPage />
      </div>
      <BannerSub />

      <IntroductionLao />

      <Journey />

    </main>

    <Footer />
    <kakao />
  </div>
</template>

<script setup>
useHead({
  title: 'autontour', // Optional, you can set a custom title for the homepage
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
      content: '견적부터 여행 종료까지 한 번에. 라오스 여행의 모든 순간을 함께하는 오토앤투어',
    },
    {name: 'robots', content: 'index, follow'},
    { property: 'og:title', content: '라오스 맞춤 여행 - 오토앤투어' },
    { property: 'og:description', content: '100% 맞춤형 라오스 여행! 당신만의 특별한 여행을 계획하세요' },
    { property: 'og:image', content: 'https://autontour.com/assets/images/AutonTour_logo.png' }, // Replace with your image URL
    { property: 'og:url', content: 'https://autontour.com/' }
  ],
})
import Navbar from "@/components/navbar/navbar.vue";
import BannerMain from "@/components/bannermain/bannermain.vue";
import GetTravel from "@/components/gettravel/gettravel.vue";
import BannerSub from "~/components/bannersub/bannersub.vue";
import IntroductionLao from "@/components/introductionlao/introductionlao.vue";
import Journey from "@/components/journey/journey.vue"
import Footer from "@/components/footer/footer.vue";
import EventMainPage from "~/components/event-main-page/event-main-page.vue";
import kakao from "@/components/kakao/buttonKAKAO.vue";
</script>


