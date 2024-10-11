<template>
    <div class="max-w-full md:h-[820px] h-[795px] overflow-y-auto bg-white shadow-lg lg:overflow-y-auto p-4">
        <h1 class="h1-custom p-4">아래 코스를 추천 드려요.</h1>
        <div class="grid w-[840px] mx-auto grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="pkg in packages" :key="pkg.id" class="border rounded-lg overflow-hidden">
                <img :src="pkg.image" :alt="pkg.title" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h2 class="font-bold text-lg">{{ pkg.title }}</h2>
                    <p class="text-sm text-gray-600">{{ pkg.duration }}</p>
                    <p class="text-sm text-gray-600">{{ pkg.description }}</p>
                    <p class="mt-2 font-bold">1인당 약 {{ pkg.price.toLocaleString() }}원 ~</p>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <button
                class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full">
                더보기
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const packages = ref([
    {
        id: 1,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/1e/f8/6d/photo0jpg.jpg?w=1200&h=-1&s=1',
        title: '코스명',
        duration: '3박 4일 일정',
        description: '액티비티와 힐링 타임을 한 번에!',
        price: 600000
    },
    {
        id: 2,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/1e/f8/6d/photo0jpg.jpg?w=1200&h=-1&s=1',
        title: '코스명',
        duration: '3박 4일 일정',
        description: '액티비티와 힐링 타임을 한 번에!',
        price: 600000
    },
    {
        id: 3,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/1e/f8/6d/photo0jpg.jpg?w=1200&h=-1&s=1',
        title: '코스명',
        duration: '3박 4일 일정',
        description: '액티비티와 힐링 타임을 한 번에!',
        price: 600000
    }
])
</script>