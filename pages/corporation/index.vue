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
    <div class="items-center hidden space-x-2 lg:flex lg:w-[1280px] w-full mx-auto lg:pt-10">
      <router-link to="/" class="flex items-center">
        <span
          class="mdi mdi-home-outline text-[#152123] text-base"
          title="Home"
        ></span>
      </router-link>
      <span class="mdi mdi-chevron-right text-[#5E5F61] text-base"></span>
      <span class="text-[#152123] text-sm font-normal"
        >기업전용 상담문의</span
      >
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
