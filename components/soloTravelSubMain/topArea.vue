<template>
  <div class="relative w-full">
    <div class="carousel w-full max-h-[600px] overflow-hidden">
      <div class="carousel-item relative w-full">
        <!-- Desktop -->
        <a class="hidden lg:block w-full z-10">
          <img
            src="../../assets/images/solo.png"
            alt="desktop banner"
            class="w-full h-auto object-cover max-h-[450px]"
          />
        </a>

        <!-- Mobile -->
        <a class="block lg:hidden w-full z-10">
          <img
            src="../../assets/images/solo.png"
            alt="mobile banner"
            class="w-full h-auto object-cover"
          />
        </a>
      </div>
    </div>
  </div>
</template>

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
