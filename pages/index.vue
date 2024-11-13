<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header Section -->
    <Navbar />

    <!-- Main Content Section -->
    <main class="flex-1">
      <BannerMain />

      <div class="my-10">
        <GetTravel />
      </div>

      <BannerSub />

      <IntroductionLao />
    </main>
    <Footer />
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
  ],
})
import Navbar from "@/components/navbar/navbar.vue";
import BannerMain from "@/components/bannermain/bannermain.vue";
import GetTravel from "@/components/gettravel/gettravel.vue";
import BannerSub from "~/components/bannersub/bannersub.vue";
import IntroductionLao from "@/components/introductionlao/introductionlao.vue";
import Footer from "@/components/footer/footer.vue";

</script>

<style scoped></style>
