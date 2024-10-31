<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(image, index) in images" :key="index">
                <img :src="image.src" :alt="image.alt" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

// Define images using ref
const images = ref([
    { src: 'https://picsum.photos/500/300?random=1', alt: 'Image 1' },
    { src: 'https://picsum.photos/500/300?random=2', alt: 'Image 2' },
    { src: 'https://picsum.photos/500/300?random=3', alt: 'Image 3' },
    { src: 'https://picsum.photos/500/300?random=4', alt: 'Image 4' },
    { src: 'https://picsum.photos/500/300?random=5', alt: 'Image 5' },
    // Repeat the images if needed
    { src: 'https://picsum.photos/500/300?random=1', alt: 'Image 1' },
    { src: 'https://picsum.photos/500/300?random=2', alt: 'Image 2' },
    { src: 'https://picsum.photos/500/300?random=3', alt: 'Image 3' },
    { src: 'https://picsum.photos/500/300?random=4', alt: 'Image 4' },
    { src: 'https://picsum.photos/500/300?random=5', alt: 'Image 5' },
]);

onMounted(() => {
    new Swiper('.swiper-container', {
        slidesPerView: 4.5,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 1.25,
            },
            1024: {
                slidesPerView: 2,
            },
        },
    });
});



</script>

<style scoped>
body {
    background: #f7e9dc;
    min-height: 100vh;
    align-items: center;
    padding-top: 100px;
}

.swiper-slide img {
    width: 100%;
    transition: transform 0.5s ease;
    border-radius: 20px;
    opacity: 0.4;
    min-height: 350px;
    object-fit: cover;
}

.swiper-slide-active img {
    transform: scale(1);
    opacity: 1;
}

.swiper-container {
    overflow: hidden;
}
</style>
