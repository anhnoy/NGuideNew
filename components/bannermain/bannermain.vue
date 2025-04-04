<template>
  <div class="relative">
    <div v-if="loading">
      <div class="skeleton w-full h-[400px] rounded-none"></div>
    </div>
    <div v-else class="carousel w-full items-center max-h-[400px]">
      <div v-for="(slide, index) in slides" :key="index" :id="`slide${index + 1}`" class="carousel-item relative w-full">
        <!-- Desktop Version -->
        <a :href="slide.url_link" target="_blank" rel="noopener noreferrer" class="hidden lg:block relative w-full z-10">
      <template v-if="isVideo(slide.banner_link)">
        <video class="w-full max-h-[400px] object-cover" autoplay muted loop playsinline>
          <source :src="slide.banner_link" :type="getVideoType(slide.banner_link)" />
          Your browser does not support the video tag.
        </video>
      </template>
      <template v-else>
        <img :src="slide.banner_link" class="w-full max-h-[450px]" :title="slide.banner_name" />
      </template>
        </a>
        
         <!-- Mobile Version -->
        <a :href="slide.url_link" target="_blank" rel="noopener noreferrer" class="lg:hidden md:block w-full z-10">
          <template v-if="isVideo(slide.banner_link_mo)">
            <video class="w-full object-cover" autoplay muted loop playsinline>
              <source :src="slide.banner_link_mo" :type="getVideoType(slide.banner_link_mo)" />
              Your browser does not support the video tag.
            </video>
          </template>
          <template v-else>
            <img :src="slide.banner_link_mo" class="w-full" />
          </template>
        </a>
      </div>

      <!-- Navigation Buttons -->
      <div v-show="slides.length > 1" class="absolute inset-0 hidden lg:flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-[50px] xl:px-[100px] 2xl:px-[300px]">
        <!-- Previous Button -->
        <button @click="goToSlide(activeSlide - 1)" class="hover:bg-[#0000001a] text-white p-2 rounded z-20">
          <img src="@/assets/icons/left.svg" alt="Previous" title="이전의" class="w-15 h-15" />
        </button>
        <!-- Next Button -->
        <button @click="goToSlide(activeSlide + 1)" class="hover:bg-[#0000001a] font-bold p-2 rounded z-20">
          <img src="@/assets/icons/right.svg" alt="Next" title="다음" class="w-15 h-15" />
        </button>
      </div>
    </div>

    <!-- Dots Navigation -->
    <div v-show="slides.length > 1" class="flex absolute bottom-4 left-0 right-0  justify-center space-x-2 z-20">
      <button v-for="(slide, index) in slides" :key="index" @click="goToSlide(index + 1)"
        :class="['dot shadow', activeSlide === index + 1 ? 'active' : '']"></button>
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
  loading.value = false;

};

fetchBannerMain();

const goToSlide = (slideNumber) => {
  if (slideNumber < 1) {
    activeSlide.value = slides.value.length;
  } else if (slideNumber > slides.value.length) {
    activeSlide.value = 1;
  } else {
    activeSlide.value = slideNumber;
  }
 
};

const startAutoSlide = () => {
  if(slides.value.length > 1) return
  intervalId = setInterval(() => {
    goToSlide(activeSlide.value + 1);
  }, 5500);
};

const isVideo = (url) => {
  if (!url) return false;
  const videoExtensions = [".mp4", ".webm", ".ogg"];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

// Function to get the video MIME type based on the file extension
const getVideoType = (url) => {
  if (url.endsWith(".mp4")) return "video/mp4";
  if (url.endsWith(".webm")) return "video/webm";
  if (url.endsWith(".ogg")) return "video/ogg";
  return "";
};
onMounted(() => {
  startAutoSlide();
});

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
