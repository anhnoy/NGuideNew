<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:rounded-[50px] lg:mt-[10px]">
      <div class="bg-white rounded-3xl w-[328px] flex flex-col justify-center text-center shadow-lg">
        <div class="mb-4 w-[42px] h-[42px] mx-auto mt-10">
          <img src="@/assets/icons/no-quotation.svg" alt="no-quotation" class="w-[42px] h-[42px]"/>
        </div>
        <p class="text-[#5E5F61] text-[16px] leading-relaxed mb-4">
            등록된 여행 일정이 없습니다.<br />
            성명과 휴대폰 번호를 다시 입력해 주세요.<br />
            고객센터 : 1644-5053
        </p>
        <button class="w-full h-[50px] py-2 mt-2 bg-[#2F312A] text-white font-medium rounded-b-3xl" @click="emit('close')">
          확인
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    show: Boolean
  })
  const emit = defineEmits(['close'])
  </script>
  