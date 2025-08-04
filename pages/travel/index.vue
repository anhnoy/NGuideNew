<template>
  <div class="flex flex-col min-h-screen">
    <navbar />
    <travel />
    <Footer />
    <scrollTop />
    <kakao />
  </div>
</template>
<script setup>
import navbar from "~/components/navbar/navbar.vue";
import Footer from "~/components/footer/footer.vue";
import travel from "~/components/terms/travel.vue";
import kakao from "@/components/kakao/buttonKAKAO.vue";
import scrollTop from "@/components/scroll-top-button/scroll-top.vue";
</script>
