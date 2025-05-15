<template>
  <div class="relative w-full">
    <div class="carousel w-full h-[360px] lg:h-[450px] overflow-hidden">
      <div class="carousel-item relative w-full">
        <!-- Desktop -->
        <a class="hidden lg:block w-full z-10">
          <img
            src="../../assets/images/solo.png"
            alt="desktop banner"
            class="w-full object-cover h-[450px]"
          />
        </a>

        <!-- Mobile -->
        <a class="block lg:hidden w-full z-10">
          <img
            src="../../assets/images/solo2.jpg"
            alt="mobile banner"
            class="w-full h-[360px] object-cover"
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
