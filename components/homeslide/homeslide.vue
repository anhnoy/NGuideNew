<template>
  <div class="my-5">
    <div
      class="relative bg-[url('https://lp-cms-production.imgix.net/2020-10/shutterstockRF_433429591.jpg')] bg-cover bg-center"
      :style="{ height: carouselHeight }"
    >
      <div class="absolute inset-0 bg-[#F5F5F7] opacity-40"></div>

      <div class="carousel-container max-w-screen-xl mx-auto relative z-10">
        
        <div class="flex items-center">
          <span
            style="transform: scaleX(0.7)"
            class="cursor-pointer md:text-9xl text-7xl font-thin"
            @click="changeImage(-1)"
            :class="currentIndex > 0 ? 'text-[#152123]' : 'text-[#8E8D8D]'"
          >
            <
          </span>
          <div class="carousel w-full mx-16" ref="carouselRef">
            <div
              class="carousel-item relative w-full overflow-hidden" 
              v-for="(image, index) in images"
              :key="index"
            >
              <img :src="image" class="w-full h-52 md:h-96 object-cover" />
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
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const carouselRef = ref(null);
const images = [
  "https://vnis.edu.vn/wp-content/uploads/2023/07/vietnam0.jpeg",
  "https://f.ptcdn.info/257/030/000/1428736798-IMG9164-o.jpg",
  "https://career-advice.jobs.ac.uk/wp-content/uploads/An-image-of-Vietnam-scaled-e1691139574867-1170x630.jpg.optimal.jpg",
];

const currentIndex = ref(0);
const carouselHeight = ref("13rem");

const scrollToIndex = (index) => {
  const carousel = carouselRef.value;
  if (carousel) {
    carousel.scrollTo({
      left: index * carousel.clientWidth,
      behavior: "smooth",
    });
  }
};

const changeImage = (direction) => {
  const newIndex = currentIndex.value + direction;
  if (newIndex >= 0 && newIndex < images.length) {
    currentIndex.value = newIndex;
    scrollToIndex(newIndex);
  }
};

const updateCarouselHeight = () => {
  const carouselImage = carouselRef.value?.querySelector("img");
  if (carouselImage) {
    const height = window.getComputedStyle(carouselImage).height;
    carouselHeight.value = height;
  }
};

onMounted(() => {
  updateCarouselHeight();
  window.addEventListener("resize", updateCarouselHeight);
});
</script>

<style scoped>
.carousel-container {
  max-width: 1000px;
}

.carousel {
  overflow: hidden;
  scroll-behavior: smooth;
}
</style>
