<template>
  <div class="flex flex-col min-h-screen ">
    <!-- Header Section -->
    <Navbar />

    <!-- Main Content Section -->
    <main class="flex-1">
      <Banner />

      <Gettravel />

      <Homeslide />

      <Introduction />

      <Journey />

    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import Banner from "@/components/banner/banner.vue";
import Gettravel from "@/components/gettravel/gettravel.vue";
import Homeslide from "@/components/homeslide/homeslide.vue"
import Introduction from "@/components/introduction/introduction.vue";
import Journey from "@/components/journey /journey.vue";
import Footer from "@/components/footer/footer.vue";

</script>

<style scoped></style>
