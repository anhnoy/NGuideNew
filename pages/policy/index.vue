<template>
  <div class="flex flex-col min-h-screen">
    <navbar />

    <policy />

    <Footer />
    <scrollTop />
    <kakao />
  </div>
</template>
<script setup>
import navbar from "~/components/navbar/navbar.vue";
import Footer from "~/components/footer/footer.vue";
import policy from "~/components/terms/policy.vue";
import kakao from "@/components/kakao/buttonKAKAO.vue";
import scrollTop from "@/components/scroll-top-button/scroll-top.vue";
</script>
