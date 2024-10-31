<template>
  <div class="sm:w-[840px] w-[360px] mt-5 mx-auto py-5">
   
    <div class="mb-5 text-center sm:w-[840px] w-[360px] h-full bg-[#EDEDF2] rounded-lg overflow-hidden">
      <div class="p-4">
        <textarea v-model="commentData" class="w-full text-xs md:text-sm h-[150px] resize-none p-2 bg-white comment-input"
          placeholder="문의사항이 있다면 의견을 등록해 주세요."></textarea>
      </div>
      <div class="mb-5 mx-auto text-center hidden md:block">
        <button @click="addComment" class="custom-back-button bg-[#EDEDF2]">등록하기</button>
      </div>
      <div class="mb-5 mx-auto text-center block sm:hidden">
        <button @click="addComment"
          class="w-[132px] h-[40px] rounded-[50px] bg-[#EDEDF2] border-[1px] border-[#132D5C]">등록하기</button>
      </div>
    </div>
    <div v-if="comments.length">
      <div v-for="(comment, index) in comments" :key="comment.qcom_id"
        class="bg-white p-4 border-[#E0E2E7] border-b mb-4">
        <div class="flex justify-between items-center cursor-pointer   pb-2" @click="toggleComment(index)">
          <p class="text-custom font-medium leading-custom tracking-custom text-left text-[#132D5C]">
            {{ commentDisplayName(comment) }}
            ({{ formatDate(comment.created_at) || formatDate(comment.updated_at) }})
          </p>
          <img :src="comment.isExpanded ? up : down" alt="Toggle arrow" class="w-4 h-4">
        </div>
        <div v-if="comment.isExpanded" class="mt-2">
          <textarea :value="getQuizOrAnswer(comment)" @input="onInput($event, comment)"
            class="w-full  rounded p-2 text-[#152123] resize-none border-none focus:outline-none">
          </textarea>
        </div>
      </div>
    </div>
    <div v-if="shouldShowConfirmButton" class="hidden md:block mx-auto text-center mb-5 text-[16px] text-[#E25C5C]">
      위의 견적서 내용으로 예약을 원하신다면 견적 확정하기 버튼을 눌러주세요.
    </div>
    <div v-if="shouldShowConfirmButton" class="hidden md:block mb-5 mx-auto text-center">
      <button @click="showConfirmationModal" class="custom-next-button">견적 확정하기</button>
    </div>


    <div v-if="shouldShowConfirmButton" class="block md:hidden mx-auto text-center text-sm mb-6 text-[#E25C5C]">
      위의 견적서 내용으로 예약을 원하신다면 견적 확정하기 버튼을 눌러주세요.
    </div>
    <div v-if="shouldShowConfirmButton" class="block md:hidden mb-5 mx-auto text-center">
      <button @click="showConfirmationModal" class="custom-next-button">견적확정하기</button>
    </div>
    <ConfirmationModal v-if="isModalOpen" :show="isModalOpen" @close="closeModal" @confirm="handleConfirm"
      message="예약을 진행하시겠습니까?" />
    <ModalValidation :isOpen="showModal" @close="showModal = false" :message="modalMessage" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import moment from 'moment';
import up from '~/assets/icons/up.svg';
import down from '~/assets/icons/down.svg';
import quotationService from '~/services/quotation.service';
import ConfirmationModal from '~/components/utils/comfirm-modal.vue';
import ModalValidation from "../utils/modal-validation.vue";

const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  },
  selectedQuote: String,
  fetchQuotationList: {
    type: Function,
    required: true // Ensure it's required
  },
});

const comments = ref([]);
const quoteList = ref([]);
const commentData = ref('');
const isModalOpen = ref(false);
const showModal = ref(false);
const modalMessage = ref('');
const largestQuotationId = ref(null);
const quo = ref(null);

onMounted(() => {
  fetchQuotationListchild();
});
const shouldShowConfirmButton = computed(() => {
  // Check if quote number ends with -0
  const currentQuote = quoteList.value.find(quote => quote.qu_num === props.selectedQuote);
  if (!currentQuote) return true; // If no quote is found, show the button by default

  // Hide if quote number ends with -0
  return !currentQuote.qu_num.endsWith('-0');
});

watch(
  () => props.quoteDetails,
  (newQuoteDetails) => {
    if (newQuoteDetails && newQuoteDetails.comments) {
      comments.value = newQuoteDetails.comments.map(comment => ({
        ...comment,
        isExpanded: false
      }));
    }
    if (newQuoteDetails && newQuoteDetails.quo) {
      quo.value = newQuoteDetails.quo;
    }
  },
  { immediate: true }
);

const toggleComment = (index) => {
  comments.value[index].isExpanded = !comments.value[index].isExpanded;

  // If expanding, wait for DOM update then resize
  if (comments.value[index].isExpanded) {
    nextTick(() => {
      const textareas = document.querySelectorAll('textarea');
      textareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });
  }
};

const fetchQuotationListchild = async () => {
  try {
    const quotationNumber = localStorage.getItem('quotationNumber');
    if (!quotationNumber) {
      console.error('No quotation number found in localStorage');
      return;
    }

    const response = await quotationService.getQuotationList({
      quo_id: quotationNumber
    });
    console.log('Fetched quotation list:', response.data);

    quoteList.value = response.data;
    if (response.data.length > 0) {
      largestQuotationId.value = response.data
        .map(quotation => quotation.qid)
        .reduce((max, current) => (current > max ? current : max), response.data[0].qu_num);
    } else {
      console.log('No quotations found.');
    }
  } catch (error) {
    console.error('Failed to fetch quotation list:', error);
  }
};

const confirmQuotation = async () => {

  try {
    const response = await quotationService.confirmQuotation(largestQuotationId.value);
    await props.fetchQuotationList();
    return response.data;
  } catch (error) {
    console.error("Error confirming quotation:", error);
    throw error;
  }
};

const showConfirmationModal = () => {
  isModalOpen.value = true;
};

const handleConfirm = async () => {
  closeModal();
  if (props.quoteDetails?.quo?.req?.qu_sta === 4) {
    modalMessage.value = '견적이 확정되었습니다.';
  } else {
    try {
      await confirmQuotation();
      modalMessage.value = '견적이 확정되었습니다.';
    } catch (error) {
      modalMessage.value = '견적 확정 중 오류가 발생했습니다. 다시 시도해 주세요.';
    }
  }

  showModal.value = true;
};

const addComment = async () => {
  try {
    const data = {
      quo_id: props.selectedQuote,
      qcom_quiz: commentData.value,
      qcom_answer: "",
    };

    const resp = await quotationService.addComment(data);


    commentData.value = '';

    // Call fetchQuotationList after adding the comment
    await props.fetchQuotationList();
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm');
};

watch(comments, () => {
  nextTick(() => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });
}, { deep: true });
const closeModal = () => {
  isModalOpen.value = false;
};
const getQuizOrAnswer = (comment) => {
  return comment.qcom_quiz !== null ? comment.qcom_quiz : comment.qcom_answer;
};
const commentDisplayName = (comment) => {
  if (comment.qcom_quiz) {
    return '고객';
  } else if (comment.qcom_answer) {
    return '관리자';
  } else {
    return quo?.req?.req_book_name || 'Unknown';
  }
};
// Function to handle input changes and update qcom_quiz
const onInput = (event, comment) => {
  comment.qcom_quiz = event.target.value;
  autoResize(event);
};

const autoResize = (event) => {
  const textarea = event.target;
  if (!textarea.classList.contains('comment-input')) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
};
</script>

<style scoped>
textarea:not(.comment-input) {
  min-height: 50px;
  transition: height 0.1s ease-in-out;
}

/* Ensure fixed heights are maintained */
.comment-input {
  height: 132px !important; /* Mobile default */
}

@media (min-width: 640px) { /* sm breakpoint */
  .comment-input {
    height: 150px !important; /* Desktop */
  }
}
</style>