<template>
  <div class="relative">
    <div v-if="loading">
      <div class="skeleton w-full h-72 rounded-none"></div>
    </div>
    <div v-else class="carousel w-full">
      <div v-for="(slide, index) in slides" :key="index" :id="`slide${index + 1}`" class="carousel-item relative w-full">
        <a :href="slide.url_link" target="_blank" rel="noopener noreferrer" class="hidden lg:block relative w-full z-10">
          <img :src="slide.banner_link" class="w-full" :title="slide.banner_name"/>
        </a>
        <a :href="slide.url_link" target="_blank" rel="noopener noreferrer" class="lg:hidden md:block w-full z-10">
          <img :src="slide.banner_link_mo" class="w-full" />
        </a>
      </div>

      <!-- Navigation Buttons -->
      <div class="absolute inset-0 hidden lg:flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-[50px] xl:px-[100px] 2xl:px-[300px]">
        <!-- Previous Button -->
        <button @click="goToSlide(activeSlide - 1)" class="hover:bg-[#0000001a] text-white p-2 rounded z-20">
          <img src="@/assets/icons/left.svg" alt="Previous" title="이전의" class="w-15 h-15" />
        </button>
        <!-- Next Button -->
        <button @click="goToSlide(activeSlide + 1)" class="hover:bg-[#0000001a] font-bold p-2 rounded z-20">
          <img src="@/assets/icons/right.svg" alt="Next" title="다음 분" class="w-15 h-15" />
        </button>
      </div>
    </div>

    <!-- Dots Navigation -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
      <button v-for="(slide, index) in slides" :key="index" @click="goToSlide(index + 1)"
        :class="['dot', activeSlide === index + 1 ? 'active' : '']"></button>
    </div>
  </div>
</template>

<script setup>
import { useBannerStore } from "@/stores/banner.store";

const loading = ref(true);
const store = useBannerStore();
const slides = ref([]);
const activeSlide = ref(1);
const bc_id = ref(1);
let intervalId = null;

const fetchBannerMain = async () => {
  const params = {
    bc_id: bc_id.value,
  };
  loading.value = true;
  await store.getBannerMain(params);
  slides.value = store.banners;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

fetchBannerMain();

const goToSlide = (slideNumber) => {
  if (slideNumber < 1) {
    activeSlide.value = 1;
  } else if (slideNumber > slides.value.length) {
    activeSlide.value = slides.value.length;
  } else {
    activeSlide.value = slideNumber;
  }
};

watch(activeSlide, (newSlide) => {
  const carousel = document.querySelector(".carousel");
  const itemWidth = carousel.clientWidth;
  carousel.scrollLeft = itemWidth * (newSlide - 1);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.carousel {
  overflow-x: auto;
  scroll-behavior: smooth;
}

.carousel-item img {
  object-fit: cover;
  height: 400px;
}

.dot {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.dot.active {
  background-color: #6EBC30;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.swiper-navigation-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.swiper-button-p img,
.swiper-button-n img {
  max-width: 100%;
  height: auto;
}

.swiper-button-p,
.swiper-button-n {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 25;
}

.swiper-button-n::after,
.swiper-button-p::after {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86px;
  height: 60px;
}

@media (max-width: 640px) {

  .swiper-button-n,
  .swiper-button-p {
    width: 30px;
    height: 20px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {

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
