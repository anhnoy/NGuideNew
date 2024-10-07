<template>
  <div class="my-5">
    <div
      class="relative bg-[url('https://lp-cms-production.imgix.net/2020-10/shutterstockRF_433429591.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-[#ffffff] opacity-80"></div>

      <div class="carousel-container max-w-screen-xl mx-auto relative z-10">
        <div class="flex items-center">
          <span
            style="transform: scaleX(0.7)"
            class="cursor-pointer md:text-9xl text-7xl font-thin"
            @click="changeImage(-1)"
            :class="currentIndex > 0 ? 'text-[#152123]' : 'text-[#8E8D8D]'"
          >
            &lt;
          </span>
          <div class="carousel w-full mx-16 overflow-hidden" ref="carouselRef">
            <div
              class="carousel-item inline-block relative w-full overflow-hidden"
              v-for="(image, index) in images"
              :key="index"
            >
              <img
                :src="image.banner_link"
                class="w-full h-52 md:h-96 object-cover"
              />
            </div>
          </div>
          <span
            style="transform: scaleX(0.7)"
            class="cursor-pointer md:text-9xl text-7xl font-thin"
            @click="changeImage(1)"
            :class="
              currentIndex < images.length - 1
                ? 'text-[#152123]'
                : 'text-[#8E8D8D]'
            "
          >
            &gt;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBannerStore } from '@/stores/banner.store';

const store = useBannerStore();
const carouselRef = ref(null);
const currentIndex = ref(0);
const images = ref([]);
const bc_id = ref(2);

const fetchSubBanner = async () => {
  const params = {
    bc_id: bc_id.value,
  };
  await store.getSubBanner(params);
  images.value = store.banners;
};
fetchSubBanner();

const scrollToIndex = (index) => {
  const carousel = carouselRef.value;
  if (carousel) {
    carousel.scrollTo({
      left: index * carousel.clientWidth,
      behavior: 'smooth',
    });
  }
};

const changeImage = (direction) => {
  const newIndex = currentIndex.value + direction;
  if (newIndex >= 0 && newIndex < images.value.length) {
    currentIndex.value = newIndex;
    scrollToIndex(newIndex);
  }
};

const updateCarouselHeight = () => {
  const carouselImage = carouselRef.value?.querySelector('img');
  if (carouselImage) {
    const height = window.getComputedStyle(carouselImage).height;
  }
};

onMounted(() => {
  updateCarouselHeight();
  window.addEventListener('resize', updateCarouselHeight);
});
</script>

<style scoped>
.carousel-container {
  max-width: 1000px;
}

.carousel {
  overflow: hidden;
  scroll-behavior: smooth;
  white-space: nowrap;
}

.carousel-item {
  display: inline-block;
  width: 100%;
}
</style>
