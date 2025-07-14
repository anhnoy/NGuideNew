<template>
    <div class="fixed bottom-10 right-5 z-50 flex flex-col items-center space-y-3">
      <!-- Up Button -->
      <button @click="scrollToTop" class="bg-white shadow-md w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center">
        <img src="../../assets/icons/arrow-up.svg" alt="iconUp" class="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]">
      </button>
  
      <!-- Write Button -->
      <!-- <button @click="writeQuote" class="bg-[#6EBC30] w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center">
        <img src="../../assets/icons/edit-3.svg" alt="iconWrite" class="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]">
      </button> -->
  
      <!-- Kakao Button -->
      <button @click="goToKakao" class="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center">
        <img src="../../assets/icons/kakaoButton.svg" alt="iconKakao" class="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full">
      </button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const writeQuote = () => {
    router.push('/applyQuotation');
  };
  
  const goToKakao = () => {
    window.open("https://accounts.kakao.com/login?continue=https%3A%2F%2Fpf.kakao.com%2F_VWDxhn%2Fchat", "_blank");
  };
  </script>
  