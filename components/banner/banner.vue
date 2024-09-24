<template>
  <div class="relative">
    <div class="carousel w-full">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :id="`slide${index + 1}`"
        class="carousel-item relative w-full"
      >
        <img :src="slide.image" class="w-full" />
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
import { ref, watch } from "vue";

const slides = [
  { image: "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/depositphotos151685520xl-1717551544792.jpg" },
  { image: "https://images.adsttc.com/media/images/5f73/76e0/63c0/17bc/c900/04e8/large_jpg/HK_1_N3.jpg?1601402564" },
  { image: "https://vientiane.crowneplaza.com/uploads/cities_to_visit_in_laos/vientiane.jpg" },
  { image: "https://static.wanderon.in/wp-content/uploads/2024/04/vietnam-in-summer.jpg" }
];

const activeSlide = ref(1);

const goToSlide = (slideNumber) => {
  activeSlide.value = slideNumber;
};

watch(activeSlide, (newSlide) => {
  const carousel = document.querySelector('.carousel');
  const itemWidth = carousel.clientWidth; // Total width of the carousel
  carousel.scrollLeft = itemWidth * (newSlide - 1); // Scroll to the new slide
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
