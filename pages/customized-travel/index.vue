<template>
  <div class="flex flex-col min-h-screen">
    <kakao />
    <Navbar />
    <main class="flex-1 bg-white">
      <topCustomArea />
      <div class="relative z-10 flex justify-center -mt-[180px] sm:-mt-[160px] md:-mt-[140px] 
            lg:-mt-[100px] xl:-mt-[250px] 2xl:-mt-[100px]">
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
import topCustomArea from "~/components/custom-travel/topCustomArea/customAreaTop.vue";
import stepIntroduction from "~/components/custom-travel/stepIntroduction/stepIntro.vue";
import contentCustomView from "~/components/custom-travel/contentCustomView/customView.vue";
import kakao from "~/components/KaKao/buttonKAKAO.vue";
</script>
