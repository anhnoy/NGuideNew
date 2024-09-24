<template>
  <div class="my-5">
    <div
      class="relative bg-[url('https://lp-cms-production.imgix.net/2020-10/shutterstockRF_433429591.jpg')] bg-cover bg-center"
      :style="{ height: carouselHeight }"
    >
      <div class="absolute inset-0 bg-[#F5F5F7] opacity-40"></div>

      <div class="carousel-container max-w-screen-xl mx-auto relative">
        <div class="carousel w-full" ref="carouselRef">
          <div
            class="carousel-item relative w-full overflow-hidden"
            v-for="(image, index) in images"
            :key="index"
          >
            <img :src="image" class="w-full h-52 md:h-96 object-cover" />
            <div
              class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
            >
              <span
                style="transform: scaleX(0.7)"
                class="cursor-pointer md:text-9xl text-7xl font-thin"
                @click="changeImage(-1)"
                :class="currentIndex > 0 ? 'text-[#152123]' : 'text-[#8E8D8D]'"
              >
                <
              </span>
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
    </div>
  </div>
</template>

<script setup>
const carouselRef = ref(null);
const images = [
  "https://kikkomania.bg/wp-content/uploads/2023/03/pink-tree-1024x682.jpg",
  "https://f.ptcdn.info/257/030/000/1428736798-IMG9164-o.jpg",
  "https://images.ctfassets.net/2uxxifu5nzlv/img_0328_3/2af5b2b3bfd9b487570ab333ca3a00df/img_0328_Shikishima_Park_Kadokura_Techno_Rose_Garden_Spring_Rose_Garden_Festival_3_PI.jpg",
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
