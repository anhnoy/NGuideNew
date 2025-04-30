<template>
  <div class="sm:w-[840px] w-[328px] mx-auto px-2 sm:px-0">
    <!-- Included/Not Included Section -->
    <div class="flex flex-col sm:flex-row sm:justify-around gap-4 sm:gap-2">
      <!-- Included Section -->
      <div class="px-5 py-4 sm:w-[50%] w-full border border-[#8E8D8D]">
        <p class="text-[#152123]  flex items-center text-[18px] sm:text-[20px] font-bold pb-4">
          <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.20459 10.4399L1.86388 6.2944L0 8.07445L6.20459 14L19 1.78006L17.1361 0L6.20459 10.4399Z"
              fill="#0EC0CB" />
          </svg>
          <span class="ml-2 text-[18px] sm:text-[20px]">포함내역</span>
        </p>
        <div class="text-[#152123] text-xs md:text-sm whitespace-pre-line">
          {{ contentInc || defaultInclude }}
        </div>
      </div>
      <!-- Not Included Section -->
      <div class="px-5 py-4 sm:w-[50%] w-full border border-[#8E8D8D]">
        <p class="text-[#152123] flex items-center text-[18px] sm:text-[20px] font-bold pb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 5.81286L19.1871 4L12 11.1871L4.81286 4L3 5.81286L10.1871 13L3 20.1871L4.81286 22L12 14.8129L19.1871 22L21 20.1871L13.8129 13L21 5.81286Z"
              fill="#E25C5C" />
          </svg>
         <span class="ml-2 text-[18px] sm:text-[20px]">불포함내역</span> 
        </p>
        <div class="text-[#152123] text-xs md:text-sm whitespace-pre-line">
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
        <p class="text-[#152123] text-xs md:text-sm whitespace-pre-line">
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