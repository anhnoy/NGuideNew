<template>
    <div class="flex flex-col min-h-screen">
      <kakao />
      <Navbar />
      <main class="flex-1 lg:bg-[#F5F5F7] bg-white ">
        <topArea />
        <div class="relative z-10 flex justify-center -mt-[60px] lg:-mt-[90px]">
          <estimationProcedure />
        </div>
        <div class="my-14">
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