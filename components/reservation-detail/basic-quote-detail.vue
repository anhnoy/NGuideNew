<template>
  <div class="sm:w-[840px] w-[360px] mx-auto px-4 sm:px-0">
    <!-- Included/Not Included Section -->
    <div class="flex flex-col sm:flex-row sm:justify-around gap-4 sm:gap-2">
      <!-- Included Section -->
      <div class="px-5 py-4 sm:w-[45%] w-full border border-[#8E8D8D]">
        <p class="text-[#152123] text-[18px] sm:text-[20px] font-bold pb-4">
          ✔️ 포함내역
        </p>
        <div class="text-[#152123] text-[14px] whitespace-pre-line">
          {{ include }}
        </div>
      </div>

      <!-- Not Included Section -->
      <div class="px-5 py-4 sm:w-[45%] w-full border border-[#8E8D8D]">
        <p class="text-[#152123] text-[18px] sm:text-[20px] font-bold pb-4">
          ❌ 불포함내역
        </p>
        <div class="text-[#152123] text-[14px] whitespace-pre-line">
          {{ disinclude }}
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
          {{ remarks }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDownloading = ref(false)
const include = ref(`[해외여행자보험] 과목별 비용\n[화장] 비엔티엔 왕복 항공권, 왕궁 TAX 및 유류할증료\n[숙소] 일정표 상 숙소 (2인 1실)\n[관광] 일정표 상 관광지 입장료\n[교통] 일정표 상 전용 차량비\n[식사] 일정표에 기재된 식사\n[가이드 및 기사 경비] 왕복 인력 및 매너팁`)

const disinclude = ref('[기타 개인경비 및 매너팁]')

const remarks = ref('')
</script>

<style>
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