<template>
    <div class="flex flex-col min-h-screen">
      <kakao />
      <Navbar />
      <main class="flex-1 bg-white">
        <topArea />
        <div class="relative z-10 flex justify-center -mt-[180px] lg:-mt-[175px] xl:-mt-[160px] 2xl:-mt-[100px]">
          <estimationProcedure />
        </div>
        <div class="my-[64px]">
        <EventMainAll />
      </div>
        <!-- <IntroductionLao /> -->
      </main>
      <Footer />
    </div>
  
</template>
<script setup>
import topArea from "~/components/soloTravelSubMain/topArea.vue";
import estimationProcedure from "~/components/soloTravelSubMain/estimationProcedure.vue";
import EventMainAll from "~/components/event-main-page/event-main-all.vue";
import kakao from "~/components/KaKao/buttonKAKAO.vue";
</script>