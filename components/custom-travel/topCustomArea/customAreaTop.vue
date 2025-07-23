<template>
    <div class="relative w-full">
      <div class="carousel w-full h-[504px] lg:h-[600px] overflow-hidden">
        <div class="relative w-full carousel-item">
          <!-- Desktop -->
          <a class="z-10 hidden w-full lg:block">
            <img
              src="@/assets/images/customAreaImg.png"
              alt="desktop banner"
              class="w-full object-cover h-[600px]"
            />
            <customAreaTextTop class="relative z-10 flex justify-center -mt-[500px]"/>
          </a>
  
          <!-- Mobile -->
          <a class="z-10 block w-full lg:hidden">
            <img
              src="@/assets/images/Travel-plans-maps3.png"
              alt="mobile banner"
              class="w-full h-[504px] object-cover"
            />
            <customAreaTextTop class="relative z-10 flex justify-center -mt-[470px]"/>
          </a>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import customAreaTextTop from "./customAreaTextTop.vue"
 </script>
  
  <style scoped>
  .carousel {
    scroll-behavior: smooth;
  }
  
  /* Optional: Adjust nav button styles if used */
  @media (max-width: 640px),
         (min-width: 641px) and (max-width: 1024px) {
    .swiper-button-n,
    .swiper-button-p {
      width: 30px;
      height: 20px;
    }
  }
  
  @media (min-width: 1025px) {
    .swiper-button-n,
    .swiper-button-p {
      width: 86px;
      height: 60px;
    }
  }
  </style>
  