<template>
    <div class="flex flex-col min-h-screen">
    <navbar />

    <location />
    <Footer />
    <scrollTop />
    <kakao />
  </div>
</template>
<script setup>
import navbar from "~/components/navbar/navbar.vue";
import Footer from "~/components/footer/footer.vue";
import location from "~/components/terms/location-based.vue";
import kakao from "@/components/kakao/buttonKAKAO.vue";
import scrollTop from "@/components/scroll-top-button/scroll-top.vue";
</script>
