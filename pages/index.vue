<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header Section -->
    <Navbar />

    <!-- Main Content Section -->
    <main class="flex-1">
      <BannerMain />

      <GetTravel />

      <BannerSub />

      <IntroductionLao />

      <Journey />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import BannerMain from "@/components/bannermain/bannermain.vue";
import GetTravel from "@/components/gettravel/gettravel.vue";
import BannerSub from "~/components/bannersub/bannersub.vue";
import IntroductionLao from "@/components/introductionlao/introductionlao.vue";
import Journey from "~/components/journey /journey.vue";
import Footer from "@/components/footer/footer.vue";
</script>

<style scoped></style>
