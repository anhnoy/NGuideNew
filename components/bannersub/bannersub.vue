<template>
  <div class="my-5">
    <div v-if="loading">
      <div class="skeleton w-full h-96 rounded-none"></div>
    </div>
    <div v-else class="relative z-10 w-full">
      <div class="swiper swiper-slider">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(image, index) in images"
            :key="index"
          >
            <img
              :src="image.banner_link"
              class="w-[900px] h-52 md:h-[400px] object-cover"
              :alt="'Image ' + index"
            />
          </div>
        </div>
        <div class="container">
          <div class="swiper-navigation-container">
            <div class="swiper-button-p">
              <img src="@/assets/icons/left-b.svg" alt="Previous" />
            </div>
            <div class="swiper-button-n">
              <img src="@/assets/icons/right-b.svg" alt="Next" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { useBannerStore } from "@/stores/banner.store";
import { ref, onMounted } from "vue";

const store = useBannerStore();
const images = ref([]);
const bc_id = ref(2);
const loading = ref(true);

const fetchSubBanner = async () => {
  const params = {
    bc_id: bc_id.value,
  };
  loading.value = true;
  try {
    await store.getSubBanner(params);
    images.value = store.banners;
  } catch (error) {
    console.error("Failed to fetch banners:", error);
  } finally {
    loading.value = false;
  }
};

fetchSubBanner();

onMounted(() => {
  setTimeout(() => {
    const swiper = new Swiper(".swiper-slider", {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      grabCursor: true,
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: ".swiper-button-n",
        prevEl: ".swiper-button-p",
      },
      breakpoints: {
        640: {
          slidesPerView: 1.25,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
        },
      },
      grabCursor: false,
      allowTouchMove: false,
      on: {
        init: function () {
          if (this.slides.length) {
            this.slides[this.activeIndex].classList.add(
              "swiper-slide-active-custom"
            );
            this.slides[this.activeIndex + 1]?.classList.add(
              "swiper-slide-next-custom"
            );
            this.slides[this.activeIndex - 1]?.classList.add(
              "swiper-slide-prev-custom"
            );
          }
        },
        slideChangeTransitionStart: function () {
          const slides = this.slides;
          slides.forEach((slide) => {
            slide.classList.remove(
              "swiper-slide-active-custom",
              "swiper-slide-next-custom",
              "swiper-slide-prev-custom"
            );
          });

          if (slides[this.activeIndex]) {
            slides[this.activeIndex].classList.add(
              "swiper-slide-active-custom"
            );
            slides[this.activeIndex + 1]?.classList.add(
              "swiper-slide-next-custom"
            );
            slides[this.activeIndex - 1]?.classList.add(
              "swiper-slide-prev-custom"
            );
          }
        },
      },
    });
     swiper.slideTo(1);
  }, 100);
});
</script>

<style scoped>
.swiper-slide {
  transition: opacity 0.5s ease;
  opacity: 0.5;
}

.swiper-slide-active-custom {
  opacity: 1;
}

.swiper-slide-next-custom,
.swiper-slide-prev-custom {
  opacity: 0.2;
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
  padding: 0 20px;
  max-width: 1280px;
  margin: 0 auto;
}

.swiper-button-p img,
.swiper-button-n img {
  max-width: 100%;
  height: auto;
}

.swiper-button-n,
.swiper-button-p {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  z-index: 25;
}

.swiper-button-n::after,
.swiper-button-p::after {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 36px;
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
    width: 50px;
    height: 36px;
  }
}
</style>
