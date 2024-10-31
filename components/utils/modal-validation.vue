<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-[20px] p-6 w-full max-w-xs md:max-w-sm"> <!-- Responsive width -->
            <div class="flex justify-center mb-4">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M23.1282 32.2687C23.1282 33.4444 22.1754 34.3974 21 34.3974C19.8246 34.3974 18.8718 33.4444 18.8718 32.2687C18.8718 31.0931 19.8246 30.14 21 30.14C22.1754 30.14 23.1282 31.0931 23.1282 32.2687Z"
                        fill="#FF7100" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M21 16.1513C21.6717 16.1513 22.2161 16.6959 22.2161 17.3677V25.8826C22.2161 26.5544 21.6717 27.099 21 27.099C20.3283 27.099 19.7839 26.5544 19.7839 25.8826V17.3677C19.7839 16.6959 20.3283 16.1513 21 16.1513Z"
                        fill="#FF7100" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M22.0877 3.10523C21.6396 2.20868 20.3604 2.20868 19.9123 3.10523L2.56537 37.8068C2.16107 38.6156 2.74906 39.5672 3.65312 39.5672H38.3469C39.2509 39.5672 39.8389 38.6156 39.4346 37.8068L22.0877 3.10523ZM17.7368 2.01724C19.0813 -0.672409 22.9187 -0.672419 24.2632 2.01724L41.6101 36.7188C42.823 39.1452 41.059 42 38.3469 42H3.65312C0.940957 42 -0.823036 39.1452 0.38988 36.7188L17.7368 2.01724Z"
                        fill="#FF7100" />
                </svg>
            </div>
            <p class="text-center text-gray-700 mb-4">{{ message || '회원 여부를 선택해주세요.' }}</p>
            <div class="flex justify-center"> <!-- Centering div -->
                <button @click="onClose" class="bg-[#132D5C] text-white py-2 w-full rounded-md">
                    확인
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    isOpen: Boolean,
    message: String
})

const emit = defineEmits(['close'])

const onClose = () => {
    emit('close')
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
