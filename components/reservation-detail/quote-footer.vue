<template>
  <div class="sm:w-[840px] w-[360px] mt-5 mx-auto py-5">
    <div class="hidden md:block mx-auto text-center mb-5 text-[#FF7100]">
      위의 견적서 내용으로 예약을 원하신다면 견적 확정하기 버튼을 눌러주세요.
    </div>
    <div class="hidden md:block mb-5 mx-auto text-center">
      <button class="custom-next-button">견적 확정하기</button>
    </div>

    <div class="mb-5 text-center  sm:w-[840px] w-[360px] h-full bg-[#EDEDF2] rounded-lg overflow-hidden">
      <div class="p-4">
        <textarea class="w-full h-[150px] resize-none p-2 bg-white" placeholder="Your message here..."></textarea>
      </div>
      <div class="mb-5 mx-auto text-center hidden md:block">
        <button class="custom-back-button bg-[#EDEDF2]">등록하기</button>
      </div>
      <div class="mb-5 mx-auto text-center block sm:hidden">
        <button class="w-[132px] h-[40px] rounded-[50px] bg-[#EDEDF2] border-[1px] border-[#132D5C]">등록하기</button>
      </div>

    </div>
    <div class="mt-4">
      <div v-for="(comment, index) in comments" :key="index" class="bg-white p-4 mb-4">
        <div class="flex justify-between items-center cursor-pointer border-b border-[#E0E2E7] pb-2"
          @click="toggleComment(index)">
          <span :class="{ 'text-orange-500': comment.isAdmin }">
            {{ comment.isAdmin ? '관리자 ' : '' }}{{ comment.name }} ({{ comment.date }})
          </span>
          <img :src="comment.isExpanded ? up : down" alt="Toggle arrow" class="w-4 h-4">
        </div>
        <p v-if="comment.isExpanded" class="mt-2">{{ comment.content }}</p>
      </div>
    </div>
    <div class="block md:hidden mx-auto text-center mb-6 text-[#FF7100]">
      위의 견적서 내용으로 예약을 원하신다면 견적 확정하기 버튼을 눌러주세요.
    </div>
    <div class="block md:hidden mb-5 mx-auto text-center">
      <button class="custom-next-button">견적 확정하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import up from '~/assets/icons/up.svg'
import down from '~/assets/icons/down.svg'

const comments = ref([
  {
    name: '홍길동',
    date: '2024-08-01 15:00',
    content: '식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..',
    isAdmin: false,
    isExpanded: false
  },
  {
    name: '홍길동',
    date: '2024-08-01 15:00',
    content: '식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..',
    isAdmin: true,
    isExpanded: false
  },
  {
    name: '홍길동',
    date: '2024-08-01 15:00',
    content: '식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..',
    isAdmin: false,
    isExpanded: false
  },
  {
    name: '홍길동',
    date: '2024-08-01 15:00',
    content: '식사 메뉴 중 현지식을 더 추가해도 되나요? 그리고 3일차에 자유 일정을 추가 가능한지 문의 드려요.식사 메뉴 중 현지식을 더 추가..',
    isAdmin: true,
    isExpanded: false
  }
])

const toggleComment = (index) => {
  comments.value[index].isExpanded = !comments.value[index].isExpanded
}
</script>

<style scoped>
/* Scoped styles can be added here */
</style>