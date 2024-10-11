<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">옵션 변경</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mb-4">
          <div v-for="option in options" :key="option.value" class="mb-2">
            <label class="flex items-center cursor-pointer">
              <input type="radio" :value="option.value" v-model="selectedOption" class="sr-only" @focus="onFocus(option.value)" @blur="onBlur">
              <span
                class="inline-block w-5 h-5 rounded-full border-2 border-[#6EBC30] relative transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#6EBC30]/30 checked:bg-[#6EBC30]">
                <span v-if="selectedOption === option.value" class="block w-2.5 h-2.5 bg-[#6EBC30] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </span>
              <span class="ml-2 text-gray-700">{{ option.label }}</span>
            </label>
          </div>
        </div>
        <div class="flex justify-center">
          <button @click="handleSubmit" class="bg-[#2F312A] w-60 text-white px-4 py-2 rounded-md">선택</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
      isOpen: Boolean,
      options: Array,
  });
  
  const emit = defineEmits(['close', 'submit']);
  
  const selectedOption = ref('옵션 1');
  const focusedOption = ref(null);
  
  const closeModal = () => {
      emit('close');
  };
  
  const handleSubmit = () => {
      emit('submit', selectedOption.value);
      closeModal();
  };
  
  const onFocus = (value) => {
      focusedOption.value = value;
  };
  
  const onBlur = () => {
      focusedOption.value = null;
  };
  </script>
  
  <style scoped>
  </style>
  