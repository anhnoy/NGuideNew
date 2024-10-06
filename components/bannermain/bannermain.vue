<template>
  <div class="relative">
    <div class="carousel w-full">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :id="`slide${index + 1}`"
        class="carousel-item relative w-full"
      >
        <img :src="slide.banner_link" class="w-full" />
      </div>
      <div
        class="absolute bottom-40 lg:left-40 lg:right-40 left-5 right-5 flex justify-between items-center"
      >
        <span
          style="transform: scaleX(0.8)"
          class="cursor-pointer md:text-9xl text-7xl font-thin"
          @click="goToSlide(activeSlide - 1)"
          :class="activeSlide > 1 ? 'text-[#8E8D8D]' : 'text-[#E6E6E6]'"
        >
          <
        </span>
        <!-- <div class="flex flex-col text-center">
          <p class="text-black text-3xl font-bold">
            {{ store.banners[0]?.banner_name }}
          </p>
        </div> -->
        <span
          style="transform: scaleX(0.7)"
          class="cursor-pointer md:text-9xl text-7xl font-thin"
          @click="goToSlide(activeSlide + 1)"
          :class="
            activeSlide < slides.length ? 'text-[#8E8D8D]' : 'text-[#E6E6E6]'
          "
        >
          >
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

const store = useBannerStore();
const slides = ref([]);
const activeSlide = ref(1);
const bc_id = ref(1);
let intervalId = null;

const fetchBannerMain = async () => {
  const params = {
    bc_id: bc_id.value,
  };
  await store.getBannerMain(params);
  slides.value = store.banners;
};

fetchBannerMain();

const goToSlide = (slideNumber) => {
  activeSlide.value = slideNumber;
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
</style>
