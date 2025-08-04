<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div>
      <img
        src="../../assets/images/corporationbg.png"
        alt="corporation"
        class="w-full h-[180px] hidden sm:block"
      />
      <img
        src="../../assets/images/corporationbgmb.png"
        alt="corporation"
        class="w-full h-[142px] block sm:hidden"
      />
    </div>
    <introArea class="my-8" />
    <corporationForm />
    <Footer />
  </div>
</template>
<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import introArea from "@/components/introductionArea/introArea.vue";
import corporationForm from "@/components/corporation/corporation-form.vue";
import Footer from "@/components/footer/footer.vue";
</script>
