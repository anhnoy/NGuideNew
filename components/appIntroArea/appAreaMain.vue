<template>
    <div class="mx-auto p-6 text-center text-black">
      <p class="font-bold text-[18px] lg:text-[30px]">더욱 안전한 여행을 위한 nGuide APP</p>
      <!-- Buttons -->
      <div class="flex justify-center gap-4 mb-6 flex-wrap mt-10">
        <button
          v-for="(label, index) in buttons"
          :key="index"
          @click="selected = index + 1"
          :class="[
            'px-4 py-2 rounded-3xl border text-[10px] lg:text-[16px]',
            selected === index + 1
              ? 'bg-[#95C3DD] text-white '
              : 'bg-[#8E8D8D] text-white border-gray-300',
          ]"
        >
          {{ label }}
        </button>
      </div>
  
      <!-- Images -->
      <div class="mx-auto flex justify-center lg:mt-10">
        <img
          v-if="selected === 1"
          src="../../assets/images/app-area1.png"
          alt="위치와 거리 확인"
          class="lg:w-[1280px] lg:h-[800px] w-[328px] h-[205px]"
        />
        <img
          v-if="selected === 2"
          src="../../assets/images/app-area2.png"
          alt="여행 일정 확인"
          class="lg:w-[1280px] lg:h-[800px] w-[328px] h-[205px]"
        />
        <img
          v-if="selected === 3"
          src="../../assets/images/app-area3.png"
          alt="가이드와 실시간 소통"
          class="lg:w-[1280px] lg:h-[800px] w-[328px] h-[205px]"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const selected = ref(1)
  const buttons = [
    '위치와 거리 확인',
    '여행 일정 확인',
    '가이드와 실시간 소통',
  ]
  </script>
  