<template>
  <div class="sm:w-[840px] w-[360px] mt-5 mx-auto py-5">
    <div class="hidden md:block mx-auto text-center mb-5 text-[#FF7100]">
      위의 견적서 내용으로 예약을 원하신다면 견적 확정하기 버튼을 눌러주세요.
    </div>
    <div class="hidden md:block mb-5 mx-auto text-center">
      <button class="custom-next-button">견적 확정하기</button>
    </div>
    <div class="mb-5 text-center sm:w-[840px] w-[360px] h-full bg-[#EDEDF2] rounded-lg overflow-hidden">
      <div class="p-4">
        <textarea class="w-full h-[150px] resize-none p-2 bg-white" placeholder="문의사항이 있다면 의견을 등록해 주세요."></textarea>
      </div>
      <div class="mb-5 mx-auto text-center hidden md:block">
        <button class="custom-back-button bg-[#EDEDF2]">등록하기</button>
      </div>
      <div class="mb-5 mx-auto text-center block sm:hidden">
        <button class="w-[132px] h-[40px] rounded-[50px] bg-[#EDEDF2] border-[1px] border-[#132D5C]">등록하기</button>
      </div>
    </div>
    <div class="mt-4">
      <!-- Check if quoteDetails and its comments exist -->
      <div v-if="quoteDetails && quoteDetails.comments && quoteDetails.comments.length">
        <div v-for="(comment, index) in comments" :key="comment.qcom_id" class="bg-white p-4 mb-4">
          <div class="flex justify-between items-center cursor-pointer border-b border-[#E0E2E7] pb-2"
            @click="toggleComment(index)">
            <p>{{ comment.qcom_answer || '' }} {{ formatDate(comment.updated_at) }}</p>
            <img :src="comment.isExpanded ? up : down" alt="Toggle arrow" class="w-4 h-4">
          </div>
          <!-- Show comment content when expanded -->
          <div v-if="comment.isExpanded" class="mt-2">
            <span :class="{ 'text-orange-500': comment.qcom_answer }">
              {{ comment.qcom_quiz }}
              <span class="text-gray-500">({{ comment.qcom_id }})</span>
            </span>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 text-center">
        No comments available.
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
import { ref, watch } from 'vue';
import moment from 'moment'; // Import Moment.js
import up from '~/assets/icons/up.svg';
import down from '~/assets/icons/down.svg';

const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  }
});

// Initialize comments based on quoteDetails.comments
const comments = ref([]);

// Watch for changes in quoteDetails and update comments accordingly
watch(
  () => props.quoteDetails,
  (newQuoteDetails) => {
    if (newQuoteDetails && newQuoteDetails.comments) {
      comments.value = newQuoteDetails.comments.map(comment => ({
        ...comment,
        isExpanded: false // Initialize the isExpanded state
      }));
    }
  },
  { immediate: true }
);

// Toggle function to expand/collapse comments
const toggleComment = (index) => {
  comments.value[index].isExpanded = !comments.value[index].isExpanded;
};

// Format the date using Moment.js
const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD'); // Adjust format as needed
};
</script>

<style scoped>
/* Scoped styles can be added here */
</style>
