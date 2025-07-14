<template>
  <div class="flex flex-col min-h-screen">
    <kakao />
    <Navbar />
    <main class="flex-1 bg-white">
      <div class="w-full h-[476px] lg:h-[550px] mb-8 lg:mb-16">
        <div class="h-[360px] lg:h-[450px] relative">
          <topArea />
          <div
            class="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 z-20 w-full px-4"
          >
            <div class="max-w-[1200px] mx-auto">
              <estimationProcedure />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-8 lg:mb-[100px]">
        <EventMainAll />
      </div>
      <!-- <IntroductionLao /> -->
    </main>
    <Footer />
  </div>
</template>
<script setup>
useHead({
  title: "라오스 여행·태국 여행 - 단독 패키지로 자유롭게 떠나보세요!",
  meta: [
    {
      property: "og:title",
      content: "라오스 여행·태국 여행 - 단독 패키지로 자유롭게 떠나보세요!",
    },
    {
      property: "og:description",
      content:
        "라오스 여행, 태국 여행을 단독투어로! 원하는 일정만 선택하면 맞춤 견적이 뚝딱. 간편하게 예약하고 특별한 여행을 시작하세요.",
    },
    {
      property: "og:image",
      content: "https://autontour.com/assets/images/AutonTour_logo.png",
    },
    {
      property: "og:url",
      content: "https://autontour.com/private-package",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "description",
      content:
        "라오스 여행, 태국 여행을 단독 패키지로! 원하는 일정만 선택하면 맞춤 견적이 간편하게 완성됩니다. 지금 바로 오토앤투어에서 예약해보세요.",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
});
import topArea from "~/components/soloTravelSubMain/topArea.vue";
import estimationProcedure from "~/components/soloTravelSubMain/estimationProcedure.vue";
import EventMainAll from "~/components/event-main-page/event-main-all.vue";
import kakao from "~/components/kakao/buttonKAKAO.vue";
</script>
