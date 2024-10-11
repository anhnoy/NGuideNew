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
              class="w-full h-52 md:h-96 object-cover"
              :alt="'Image ' + index"
            />
          </div>
        </div>
        <div class="swiper-navigation-container">
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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

.swiper-navigation-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 20;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #aeaeae;
  /* color: #E6E6E6; */
}

.swiper-button-prev,
.swiper-button-next {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  z-index: 25;
}

@media (max-width: 640px) {
  .swiper-button-next {
    width: 80px;
    height: 40px;
  }
  .swiper-button-prev {
    width: 80px;
    height: 40px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 30px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .swiper-button-next {
    width: 100px;
    height: 50px;
  }
  .swiper-button-prev {
    width: 100px;
    height: 50px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 40px;
  }
}

@media (min-width: 1025px) {
  .swiper-button-next {
    width: 500px;
    height: 60px;
  }
  .swiper-button-prev {
    width: 500px;
    height: 60px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 60px;
  }
}
</style>
