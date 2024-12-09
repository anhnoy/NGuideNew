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
  </div>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import BannerMain from "@/components/bannermain/bannermain.vue";
import GetTravel from "@/components/gettravel/gettravel.vue";
import BannerSub from "~/components/bannersub/bannersub.vue";
import IntroductionLao from "@/components/introductionlao/introductionlao.vue";
import Journey from "@/components/journey/journey.vue"
import Footer from "@/components/footer/footer.vue";
import EventMainPage from "~/components/event-main-page/event-main-page.vue";

</script>

<style scoped></style>
