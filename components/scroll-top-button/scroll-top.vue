<template>
  <div v-show="showButton" class="fixed z-50 lg:bottom-[120px] bottom-[100px] right-5">
    <button
      @click="scrollToTop"
      class="lg:w-[60px] lg:h-[60px] w-[40px] h-[40px] rounded-full bg-white shadow-2xl flex items-center justify-center hover:shadow-lg transition "
    >
      <img src="@/assets/icons/arrow-up.png" alt="Go to top" class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showButton = ref(false);

const toggleVisibility = () => {
  showButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", toggleVisibility);
});

onUnmounted(() => {
  window.removeEventListener("scroll", toggleVisibility);
});
</script>
