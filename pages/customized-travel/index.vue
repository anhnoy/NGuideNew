<template>
  <div class="flex flex-col min-h-screen">
    <kakao />
    <Navbar />
    <main class="flex-1 bg-white">
      <topCustomArea />
      <div class="relative z-10 flex justify-center -mt-[180px] lg:-mt-[100px]">
        <stepIntroduction />
      </div>
      <div class="my-14">
        <contentCustomView />
      </div>
    </main>
    <Footer />
  </div>
</template>
<script setup>
useHead({
  title: "라오스 여행 · 태국 여행 – 100% 맞춤형 일정으로 떠나세요!",
  meta: [
    {
      property: "og:title",
      content: "라오스 여행 · 태국 여행 – 100% 맞춤형 일정으로 떠나세요!",
    },
    {
      property: "og:description",
      content:
        "여행객 선호도, 일정, 예산까지 고려한 맞춤 여행! 개인 또는 소규모 그룹을 위한 단독 라오스·태국 여행을 간편하게 신청해보세요.",
    },
    {
      property: "og:image",
      content: "https://autontour.com/assets/images/AutonTour_logo.png",
    },
    {
      property: "og:url",
      content: "https://autontour.com/customized-travel",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "description",
      content:
        "라오스 여행, 태국 여행을 나만의 맞춤 일정으로! 개인·소규모 단독 여행을 지금 바로 쉽고 빠르게 신청해보세요. 오토앤투어 맞춤 여행 서비스.",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
});
import topCustomArea from "~/components/custom-travel/topCustomArea/customAreaTop.vue";
import stepIntroduction from "~/components/custom-travel/stepIntroduction/stepIntro.vue";
import contentCustomView from "~/components/custom-travel/contentCustomView/customView.vue";
import kakao from "~/components/KaKao/buttonKAKAO.vue";
</script>
