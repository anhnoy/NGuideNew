<template>
  <div class="relative">
    <div v-if="loading"> 
      <div class="skeleton w-full h-72 rounded-none"></div>
    </div>
    <div v-else class="carousel w-full">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :id="`slide${index + 1}`"
        class="carousel-item relative w-full"
      >
        <img :src="slide.banner_link" class="w-full" />
      </div>
      <div
        class="absolute lg:left-40 lg:right-40 left-5 right-5 flex justify-between items-center"
        style="top: 11.25rem"
      >
        <span
          class="cursor-pointer md:text-9xl text-7xl font-thin"
          @click="goToSlide(activeSlide - 1)"
          :class="activeSlide > 1 ? 'text-[#8E8D8D]' : 'text-[#E6E6E6]'"
        >
          <div class="swiper-button-prev"></div>
        </span>
        <span
          class="cursor-pointer md:text-9xl text-7xl font-thin"
          @click="goToSlide(activeSlide + 1)"
          :class="
            activeSlide < slides.length ? 'text-[#8E8D8D]' : 'text-[#E6E6E6]'
          "
        >
          <div class="swiper-button-next"></div>
        </span>
      </div>
    </div>

    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index + 1)"
        :class="['dot', activeSlide === index + 1 ? 'active' : '']"
      ></button>
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
  }, 2000);
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
  background-color: #ff9900;
}
.swiper-button-prev,
.swiper-button-next {
  color: #e6e6e6;
}
@media (max-width: 640px) {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 30px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 40px;
  }
}

@media (min-width: 1025px) {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 60px;
  }
}
</style>
