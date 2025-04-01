<template>
    <div class="fixed bottom-10 right-5 z-50">
        <button class="rounded-full" :style="{ width: buttonSize, height: buttonSize }" @click="goToKakao">
            <img src="../../assets/icons/kakaoButton.svg" alt="iconKakao" class="w-full h-full">
        </button>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const buttonSize = ref('80px');

const updateSize = () => {
  const screenWidth = window.innerWidth;
  const size = Math.max(50, Math.min(100, screenWidth * 0.08)); // 8% of screen width, min 50px, max 100px
  buttonSize.value = `${size}px`;
};

const goToKakao = () => {
  // window.open("http://pf.kakao.com/_VWDxhn/chat");
  window.open("https://accounts.kakao.com/login?continue=https%3A%2F%2Fpf.kakao.com%2F_VWDxhn%2Fchat", "_blank");
};

onMounted(() => {
  updateSize();
  window.addEventListener('resize', updateSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSize);
});
</script>