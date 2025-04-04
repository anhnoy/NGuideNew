<template>
  <div class="sm:w-[840px] w-[360px] mt-5 mx-auto py-5">
    <div v-if="quoteDetails?.quo?.tour_status === null"
      class="mb-5 text-center sm:w-[840px] w-[360px] h-full bg-[#EDEDF2] rounded-lg overflow-hidden">
      <div class="p-4">
        <textarea v-model="commentData"
          maxlength="1999"
          class="w-full text-xs md:text-sm h-[150px] resize-none p-2 bg-white comment-input"
          placeholder="문의사항이 있다면 의견을 등록해 주세요."></textarea>
      </div>
      <div class="mb-5 mx-auto text-center hidden md:block">
        <button v-if="!isSending" @click="addComment" class="custom-back-button bg-[#EDEDF2] hover:bg-[#5757573a] ">등록하기</button>
        <span v-else class="loading loading-spinner loading-md"></span>
      </div>
      <div class="mb-5 mx-auto text-center block sm:hidden">
        <button  v-if="!isSending" @click="addComment" class="w-[132px] h-[40px] rounded-[50px] bg-[#EDEDF2] border-[1px] border-[#132D5C]">등록하기</button>
        <span v-else class="loading loading-spinner loading-md"></span>
      </div>
    </div>

    <div v-if="comments.length" class="max-h-[2000px] overflow-y-auto">
      <div v-for="(comment, index) in comments" :key="comment.qcom_id"
        class="bg-white p-2 border-[#E0E2E7] border-b mb-2 hover:border-[#132D5C]">
        <div class="flex justify-between items-center cursor-pointer pb-2" @click="toggleComment(index)">
          <p class="text-custom font-medium leading-custom tracking-custom text-left text-[#132D5C]">
            <span
              :class="{ 'bg-[#6EBC30] rounded text-white ': commentDisplayName(comment) === '관리자' }"
               class="px-2 font-bold"
            >
              {{ commentDisplayName(comment) }}
            </span>
            ({{ formatDate(comment.created_at) || formatDate(comment.updated_at) }})
          </p>
          <img :src="comment.isExpanded ? up : down" alt="Toggle arrow" class="w-4 h-2">
        </div>
        <p @click="toggleComment(index)" v-if="!comment.isExpanded" class="truncate ml-2 cursor-pointer text-[#152123] mr-8 " :title="getQuizOrAnswer(comment)">{{ getQuizOrAnswer(comment) }} </p>
        <div v-if="comment.isExpanded" class="mt-2">
          <textarea :value="getQuizOrAnswer(comment)" @input="onInput($event, comment)"
            class="w-full bg-white rounded p-2 text-[#152123] resize-none border-none focus:outline-none" readonly>
          </textarea>
        </div>
      </div>
    </div>
    <div v-if="shouldShowConfirmButton" class="mt-6 mb-5">
      <h2 class="flex items-center mb-4  bg-[#EDEDF2] h-[50px] md:text-lg md:h-12 ">
        <div @click="toggleSelectAll"
          class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full cursor-pointer flex items-center justify-center mx-2 bg-white">
          <img v-if="allChecked" :src="checkCircleIcon" alt="check" class="w-full h-full" />
        </div>
        <div class="text-base font-medium text-[#152123]">전체 이용 동의</div>
      </h2>
      <div class="w-[360px] md:w-[840px] px-[30px] md:px-[60px]">
        <!-- First agreement item (already provided) -->
        <div class="flex justify-between ">
          <div class="flex ">
            <div @click="toggleCheck1"
              class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white">
              <img v-if="isChecked1" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
            </div>
            <div class="flex text-[#2F312A] md:font-medium md:text-base text-sm font-normal">
              <span class="text-[#E25C5C] mx-2">(필수)</span>
              이용약관 동의
            </div>
          </div>
          <div @click="openPolicyModal(1)"  class="flex items-center cursor-pointer hover:scale-105">
            <span class="text-[#2F312A] font-medium text-base hidden md:inline">내용보기</span>
            <img :src="rightIcon" alt="check"
              class="mx-2 w-[20px] h-[20px]" />
          </div>
        </div>

        <!-- Second agreement item -->
        <div class=" flex justify-between">
          <div class="flex mt-4">
            <div @click="toggleCheck2"
              class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white">
              <img v-if="isChecked2" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
            </div>
            <div class="flex text-[#2F312A] md:font-medium md:text-base text-sm font-normal">
              <span class="text-[#E25C5C] mx-2">(필수)</span>
              개인정보 수집 및 이용 동의
            </div>
          </div>
          <div @click="openPolicyModal(2)" class="flex items-center mt-4 cursor-pointer hover:scale-105">
            <span class="text-[#2F312A] font-medium text-base hidden md:inline">내용보기</span>
            <img :src="rightIcon" alt="check"
              class="mx-2 w-[20px] h-[20px] cursor-pointer" />
          </div>
        </div>

        <!-- Third agreement item -->
        <div class=" flex justify-between">
          <div class="flex mt-4">
            <div @click="toggleCheck3"
              class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white">
              <img v-if="isChecked3" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
            </div>
            <div class="flex text-[#2F312A] md:font-medium md:text-base text-sm font-normal">
              <span class="mx-2">
                <span class="text-[#E25C5C]">(필수)</span> <span class="ml-[5px] ">개인정보 제3자 제공 및 국외이전 동의</span> 
              </span>

            </div>
          </div>
          <div @click="openPolicyModal(3)" class="flex items-center mt-4 cursor-pointer hover:scale-105">
            <span class="text-[#2F312A] font-medium text-base hidden md:inline">내용보기</span>
            <img  :src="rightIcon" alt="check"
              class="mx-2 w-[20px] h-[20px] cursor-pointer" />
          </div>
        </div>

        <!-- Fourth agreement item -->
        <div class=" flex justify-between">
          <div class="flex mt-4">
            <div @click="toggleCheck4"
              class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white">
              <img v-if="isChecked4" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
            </div>
            <div class="flex text-[#2F312A] md:font-medium md:text-base text-sm font-normal">
              <span class="text-[#E25C5C] mx-2">(필수)</span>
              고유식별정보 수집 및 처리 동의
            </div>
          </div>
          <div @click="openPolicyModal(4)" class="flex items-center mt-4 cursor-pointer hover:scale-105">
            <span class="text-[#2F312A] font-medium text-base hidden md:inline">내용보기</span>
            <img  :src="rightIcon" alt="check"
              class="mx-2 w-[20px] h-[20px] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="shouldShowConfirmButton" class="hidden md:block mx-auto text-center mb-5 text-[16px] text-[#E25C5C] ">
      위의 견적서 내용으로 예약을 원하신다면 견적 확정하기 버튼을 눌러주세요.
    </div>
    <div v-if="shouldShowConfirmButton" class="hidden md:block mb-5 mx-auto text-center">
      <button @click="showConfirmationModal" class="custom-next-button hover:bg-black/70 ">견적 확정하기</button>
    </div>
    <div v-if="shouldShowConfirmButton"
      class="block md:hidden mx-auto text-center text-sm mb-10 w-[229px]  md:w-[840px] text-[#E25C5C]">
      위의 견적서 내용으로 예약을 원하신다면 견적 확정하기 버튼을 눌러주세요.
    </div>

    <div v-if="shouldShowConfirmButton" class="fixed bottom-0 left-0 right-0 lg:hidden">
      <button @click="showConfirmationModal" class="custom-next-button">견적확정하기</button>
    </div>

    <ConfirmationModal v-if="isModalOpen" :show="isModalOpen" @close="closeModal" @confirm="handleConfirm"
      message="예약을 진행하시겠습니까?" />
    <ModalValidation :isOpen="showModal" @close="showModal = false" :message="modalMessage" />
    <teamOfUseModal :isOpen="isteamOfUseModal" @close="isteamOfUseModal = false" />
    <teamOfUseModalCollection :isOpen="ModalCollection" @close="ModalCollection = false" />
    <teamOfUseModalPersonal :isOpen="ModalPersonal" @close="ModalPersonal = false" />
    <teamOfUseModalIdentification :isOpen="ModalIdentification" @close="ModalIdentification = false" />
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
import checkCircleIcon from '@/assets/icons/check-circle.svg';
import rightIcon from '@/assets/icons/right-icon.svg'
import teamOfUseModal from '../utils/team-of-use-modal.vue';
import teamOfUseModalCollection from '../utils/team-of-use-modal-collection.vue';
import teamOfUseModalPersonal from '../utils/team-of-use-modal-personal.vue';
import teamOfUseModalIdentification from '../utils/team-of-use-modal-Identification.vue';
import { io } from "socket.io-client";
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
const isChecked1 = ref(false)
const isChecked2 = ref(false)
const isChecked3 = ref(false)
const isChecked4 = ref(false)
const isteamOfUseModal = ref(false);
const ModalCollection = ref(false)
const ModalPersonal = ref(false)
const ModalIdentification = ref(false)
const isSending = ref(false);
const socket = ref(null)
const reqIds = ref([]);

// Toggle functions for each checkbox
const toggleCheck1 = () => isChecked1.value = !isChecked1.value
const toggleCheck2 = () => isChecked2.value = !isChecked2.value
const toggleCheck3 = () => isChecked3.value = !isChecked3.value
const toggleCheck4 = () => isChecked4.value = !isChecked4.value

const allChecked = computed(() =>
  isChecked1.value &&
  isChecked2.value &&
  isChecked3.value &&
  isChecked4.value
)
const toggleSelectAll = () => {
  const newValue = !allChecked.value
  isChecked1.value = newValue
  isChecked2.value = newValue
  isChecked3.value = newValue
  isChecked4.value = newValue
}
const openPolicyModal = (policyId) => {
  // Close all modals first
  isteamOfUseModal.value = false;
  ModalCollection.value = false;
  ModalPersonal.value = false;
  ModalIdentification.value = false;

  // Open the appropriate modal based on policyId
  switch (policyId) {
    case 1:
      isteamOfUseModal.value = true;
      break;
    case 2:
      ModalCollection.value = true;
      break;
    case 3:
      ModalPersonal.value = true;
      break;
    case 4:
      ModalIdentification.value = true;
      break;
    default:
    // console.error('Invalid policy ID');
  }
};


onMounted(() => {
  // ✅ Use import.meta.env instead of process.env
  const socketURL = import.meta.env.VITE_ENV_POINT_SOCKET_URL;
  if (!socketURL) {
    console.error("❌ VITE_APP_API_BASE_URL is not defined!");
    return;
  }
  console.log("Socket Server URL:", socketURL)
  socket.value = io(socketURL, {
    transports: ["websocket"]
  });
  socket.value.on("connect", () => {
    console.log("🔗 Socket connected:", socket.value.id);
  });
  socket.value.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
  fetchQuotationListchild();
});
const shouldShowConfirmButton = computed(() => {
  const currentQuote = quoteList.value.find(quote => quote.qu_num === props.selectedQuote);
  if (!currentQuote) return true; // If no quote is found, show the button by default

  // Hide if quote number ends with -0 or -0-c
  return !currentQuote.qu_num.endsWith('-0') && !currentQuote.qu_num.endsWith('-0-C');
});


watch(
  () => props.quoteDetails,
  (newQuoteDetails) => {
    if (newQuoteDetails && newQuoteDetails.comments) {
      comments.value = newQuoteDetails.comments.map((comment, index) => ({
        ...comment,
        isExpanded: index === 0 // Set first comment to expanded
      }));

      // Ensure textarea is properly sized for the first comment
      nextTick(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
      });
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
      // console.error('No quotation number found in localStorage');
      return;
    }

    const response = await quotationService.getQuotationList({
      quo_id: quotationNumber
    });
    // console.log('Fetched quotation list:', response.data);

    quoteList.value = response.data;
    if (response.data.length > 0) {
      largestQuotationId.value = response.data
        .map(quotation => quotation.qid)
        .reduce((max, current) => (current > max ? current : max), response.data[0].qu_num);
    } else {
      // console.log('No quotations found.');
    }
  } catch (error) {
    // console.error('Failed to fetch quotation list:', error);
  }
};

const confirmQuotation = async () => {

  try {
    const response = await quotationService.confirmQuotation(largestQuotationId.value);
    reqIds.value = response.data.quote.req_id ? [response.data.quote.req_id] : [];
    await EmitUpdateStatus();
    await props.fetchQuotationList();
    return response.data;
  } catch (error) {
    // console.error("Error confirming quotation:", error);
    throw error;
  }

};
const EmitUpdateStatus = async () => {
  try{
    if(!reqIds.value || reqIds.value.length === 0){
      console.warn("⚠️ reqIds.value is empty!");
      return;
    }
     const quote_status = 4;
     const dataToEmit = {
      reqIds: reqIds.value,
      quote_status,
    };
    await socket.value.emit("updateQuoteStatus", dataToEmit);
  }catch{
    console.error("❌ Error in EmitUpdateStatus:", error);
    throw error;
  }
};

const showConfirmationModal = () => {
  if (!allChecked.value) {
    modalMessage.value = '필수 약관에 모두 동의해 주세요.';
    showModal.value = true;  // Show the modal with the message
    return;  // Exit early, don't proceed with confirmation
  }

  // Proceed with the confirmation if newValue is true
  closeModal();
  isModalOpen.value = true;
};

const handleConfirm = async () => {
  if (props.quoteDetails?.quo?.req?.qu_sta === 4) {
    modalMessage.value = '견적이 확정되었습니다.';
    isModalOpen.value = false;
  } else {
    try {
      await confirmQuotation();
      modalMessage.value = '견적이 확정되었습니다.';
    } catch (error) {
      modalMessage.value = '견적 확정 중 오류가 발생했습니다. 다시 시도해 주세요.';
    }
  }
  isModalOpen.value = false;

  showModal.value = true;
};


const addComment = async () => {
  try {
    if (!commentData.value.trim()) {
      alert('댓글을 입력해 주세요.');
      return; 
    }
    isSending.value = true;
    const data = {
      quo_id: props.selectedQuote,
      qcom_quiz: commentData.value.trim(),
      qcom_answer: "",
    };

    await quotationService.addComment(data);


    commentData.value = '';

    // Call fetchQuotationList after adding the comment
    await props.fetchQuotationList();
    isSending.value = false;
  } catch (error) {
    isSending.value = false;
    // console.error("Error adding comment:", error);
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

.comment-input {
  height: 132px !important;
}

@media (min-width: 640px) {
  .comment-input {
    height: 150px !important;
  }
}
</style>