<template>
    <div class="fixed z-50 bottom-10 right-5">
        <button @click="goToKakao">
            <img src="../../assets/icons/kakaoButton.svg" alt="iconKakao" class="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full">
        </button>
    </div>
</template>
<script setup>
const goToKakao = () => {
  // window.open("http://pf.kakao.com/_VWDxhn/chat");
  window.open("https://accounts.kakao.com/login?continue=https%3A%2F%2Fpf.kakao.com%2F_VWDxhn%2Fchat", "_blank");
};
</script>