<template>
  <div class="sm:w-[840px] w-[360px] mx-auto px-4 sm:px-0">
    <!-- Included/Not Included Section -->
    <div class="flex flex-col sm:flex-row sm:justify-around gap-4 sm:gap-2">
      <!-- Included Section -->
      <div class="px-5 py-4 sm:w-[50%] w-full border border-[#8E8D8D]">
        <p class="text-[#152123] text-[18px] sm:text-[20px] font-bold pb-4">
          ✔️ 포함내역
        </p>
        <div class="text-[#152123] text-[14px] whitespace-pre-line">
          {{ contentInc || defaultInclude }}
        </div>
      </div>
      <!-- Not Included Section -->
      <div class="px-5 py-4 sm:w-[50%] w-full border border-[#8E8D8D]">
        <p class="text-[#152123] text-[18px] sm:text-[20px] font-bold pb-4">
          ❌ 불포함내역
        </p>
        <div class="text-[#152123] text-[14px] whitespace-pre-line">
          {{ contentExc || defaultExclude }}
        </div>
      </div>
    </div>
    <!-- Notes Section -->
    <div class="mt-4 sm:mt-8">
      <div class="px-5 py-4 border border-[#8E8D8D] w-full min-h-[160px]">
        <p class="text-[#152123] text-[18px] sm:text-[20px] font-bold pb-4">
          비고
        </p>
        <p class="whitespace-pre-line">
          {{ noteBasic || defaultRemarks }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  }
});

// Default values
const defaultInclude = '-';
const defaultExclude = '-';
const defaultRemarks = '';

// Computed properties to handle null values
const contentInc = computed(() => props.quoteDetails?.quo?.content_inc || null);
const contentExc = computed(() => props.quoteDetails?.quo?.content_exc || null);
const noteBasic = computed(() => props.quoteDetails?.quo?.note_basic || null);
</script>

<style scoped>
.skeleton-label {
  height: 25px;
  width: 50%;
  background-color: #e0e0e0;
  margin: 0 auto;
  border-radius: 4px;
}

.skeleton-box {
  width: 100%;
  height: 150px;
  background-color: #f1f1f1;
  border-radius: 6px;
}

.skeleton-box,
.skeleton-header,
.skeleton-line,
.skeleton-button,
.skeleton-label {
  background: linear-gradient(90deg, #f1f1f1, #e0e0e0, #f1f1f1);
  background-size: 200% 100%;
  animation: loadingAnimation 1.5s infinite;
}

@keyframes loadingAnimation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>