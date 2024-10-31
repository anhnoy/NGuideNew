<template>
  <div class="flex justify-center items-center min-h-screen">
    <!-- Desktop version -->
    <div
      class="bg-[#EDEDF2] shadow-md w-[1080px] h-[617px] mt-[10px] justify-center items-center rounded-[50px] hidden md:flex">
      <div class="w-[600px] mx-auto mt-20">
        <h2 class="text-2xl font-bold text-[#152123] mb-6 text-center">
          견적서 조회
        </h2>

        <div class="mb-4 flex items-center">
          <label for="quotationNumber"
            class="block text-xs sm:text-sm w-32 text-center font-medium text-[#132D5C]mb-1">견적번호</label>
          <input id="quotationNumber" v-model="quotationNumber" type="text"
            class="w-full px-3 py-[11px] bg-white border border-[#E6E6E6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="견적번호를 입력해 주세요." />
        </div>

        <div class="mb-4 flex items-center">
          <label for="phone" class="block text-sm font-medium w-32 text-center items-center text-[#132D5C]mb-1">핸드폰
            번호</label>
          <input id="phone" v-model="phone" type="text"
            class="w-full px-3 py-[11px] bg-white border border-[#E6E6E6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="핸드폰 번호를 입력해주세요." />
        </div>

        <div class="mb-4 flex items-center">
          <label for="password" class="block text-sm w-32 text-center font-medium text-[#132D5C]mb-1">비밀번호</label>
          <input id="password" v-model="password" type="password"
            class="w-full px-3 py-[11px] bg-white border border-[#E6E6E6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="숫자 6자리로 입력해 주세요." />
        </div>

        <button @click="handleSubmit"
          class="mt-10  w-full sm:w-[240px] py-[12px] bg-[#2F312A] border text-white mx-auto justify-center flex text-base font-bold">
          견적서 조회하기
        </button>
      </div>
    </div>

    <!-- Mobile version -->
    <div class="w-[100vh] h-[100vh] bg-white md:hidden flex flex-col justify-between">
      <!-- Mobile header -->
      <div class="bg-white h-[66px] flex items-center justify-between px-4 md:hidden border-b border-[#E6E6E6]">
        <div class="flex items-center">
          <img src="@/assets/icons/chevron-left.svg" @click="clickBack" alt="Back" class="text-black w-[24px] h-[24px]" />
        </div>
        <div class="text-center flex-grow text-black">견적서</div>
        <div></div>
      </div>

      <!-- Mobile form -->
      <div class="px-4 flex-grow mt-12">
        <div class="mb-4">
          <label for="mobileQuotationNumber" class="block text-xs font-medium text-[#132D5C]mb-1">견적번호</label>
          <input id="mobileQuotationNumber" v-model="quotationNumber" type="text"
            class="mt-2 w-full text-sm px-3 py-2 h-[44px] bg-white border border-[#E6E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="견적번호를 입력해 주세요." />
        </div>

        <div class="mb-4">
          <label for="mobilePhone" class="block  text-xs font-medium text-[#132D5C]mb-1">핸드폰 번호</label>
          <input id="mobilePhone" v-model="phone" type="text"
            class="mt-2 w-full px-3 h-[44px] text-sm py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="핸드폰 번호를 입력해주세요." />
        </div>

        <div class="mb-4">
          <label for="mobilePassword" class="block  text-xs font-medium text-[#132D5C]mb-1">비밀번호</label>
          <input id="mobilePassword" v-model="password" type="password"
            class="mt-2 w-full h-[44px] text-sm px-3 py-2 border bg-white border-[#E6E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="숫자 6자리로 입력해 주세요." />
        </div>
      </div>

      <!-- Mobile button fixed at the bottom -->
      <div class="pb-10">
        <button @click="handleSubmit" class="w-full custom-next-button">
          견적서 조회하기
        </button>
      </div>
    </div>
    <ModalValidation :isOpen="isModalOpen" @close="isModalOpen = false" :message="modalMessage" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import quotationService from "~/services/quotation.service";
import ModalValidation from "../utils/modal-validation.vue";
const quotationNumber = ref("");
const phone = ref("");
const password = ref("");
const isModalOpen = ref(false);
const modalMessage = ref("정보를 올바르게 입력해 주세요.");

const router = useRouter();

const handleSubmit = async () => {
  if (!quotationNumber.value || !phone.value || !password.value) {
    isModalOpen.value = true; // Open modal for missing fields
    return;
  }

  try {
    const data = {
      quo_id: quotationNumber.value,
      phone: phone.value,
      pass: password.value,
    };
    const response = await quotationService.quotation_login(data);
    localStorage.setItem("quotationNumber", quotationNumber.value);
    console.log("Response:", response);

    // Assuming your response includes accessToken and refreshToken
    const { accessToken, refreshToken } = response.data;

    // Set tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Navigate to the quotation detail page
    router.push("/login-quotation/quotation-detail");
  } catch (error) {
    // Check if error response exists and status code is 400
    if (error.response && error.response.status === 400) {
      isModalOpen.value = true; // Open modal for 400 status code
    } else {
      console.error("Error:", error); // Log other errors
    }
  }
};
</script>
