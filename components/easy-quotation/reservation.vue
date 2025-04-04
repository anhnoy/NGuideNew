<template>
  <div class="max-w-[1080px] bg-white overflow-x-hidden lg:p-4">
    <div class="h1-custom mb-8 pt-5">예약자 정보를 작성해 주세요.</div>
    <div class=" sm:w-[600px] sm:mx-auto mx-4">
      <!-- Tour Group -->
      <div class="mt-5 sm:flex items-center">
        <label for="req_group_name" class="lg:text-base lg:font-medium w-[145px] text-[#2F312A] text-xs font-normal">관광
          단체명</label>
        <input id="req_group_name" v-model="req_group_name" type="text" placeholder="관광 단체명을 입력해 주세요."
          class="input-custom w-full lg:rounded-none rounded ">
      </div>

      <!-- Reservation Name -->
      <div class="mt-5 sm:flex items-center">
        <label for="reservationName"
          class="lg:text-base lg:font-medium text-xs font-normal w-[145px] text-[#2F312A] ">예약자 성함</label>
        <input id="reservationName" v-model="reservationName" type="text" placeholder="예약자 성함을 입력해 주세요."
          class="input-custom w-full lg:rounded-none rounded">
      </div>

      <!-- Email -->
      <div class="mt-5 sm:flex items-center">
        <label for="email" class="lg:text-base lg:font-medium font-normal text-xs w-[145px] text-[#2F312A] ">이메일</label>
        <input id="email" v-model="email" type="email" placeholder="이메일을 입력해 주세요."
          class="input-custom w-full lg:rounded-none rounded">
      </div>

      <!-- Phone -->
      <div class="mt-5 sm:flex items-center">
        <label for="phone" class="lg:text-base lg:font-medium w-[145px] text-[#2F312A] text-xs font-normal">핸드폰
          번호</label>
        <input id="phone" v-model="phone" type="tel" placeholder="핸드폰 번호를 입력해 주세요."
          class="input-custom w-full lg:rounded-none rounded">
      </div>

      <!-- Secret Code -->
      <div class="mt-5 sm:flex items-center">
        <label for="secretCode"
          class="lg:text-base lg:font-medium w-[145px] text-[#2F312A] text-xs font-normal">비밀번호</label>
        <input id="secretCode" v-model="secretCode" type="password" placeholder="영문,숫자,특수문자를 모두 조합해 주세요. (8자 이상) "
          class="input-custom w-full lg:rounded-none rounded hidden sm:block" :class="{ 'border-[#E25C5C]': error }"
          @input="checkError" />
        <input id="secretCode" v-model="secretCode" type="password" placeholder="영문,숫자,특수문자를 모두 조합해 주세요. (8자 이상) "
          class="input-custom w-full lg:rounded-none rounded  sm:hidden sm:block" :class="{ 'border-[#E25C5C]': error }"
          @input="checkError" />
      </div>

      <!-- Error Message for Secret Code -->
      <div class="text-16 text-[#E25C5C] flex  sm:ml-32" v-if="error">영문,숫자,특수문자를 모두 조합해 주세요. (8자 이상)</div>

      <!-- Confirm Secret Code -->
      <div class="mt-5 sm:flex items-center">
        <label for="secretCodeConfirm"
          class="lg:text-base lg:font-medium w-[145px] text-[#2F312A] text-xs font-normal">비밀번호 확인</label>
        <input id="secretCodeConfirm" v-model="secretCodeConfirm" type="password" placeholder="비밀번호를 한번 더 입력해 주세요."
          class="input-custom w-full lg:rounded-none rounded" :class="{ 'border-[#E25C5C]': passwordMismatch }"
          @input="checkPasswordMatch" />
      </div>

      <!-- Error Message for Password Mismatch -->
      <div class="text-16 text-[#E25C5C] flex  sm:ml-32 " v-if="passwordMismatch">
        비밀번호가 일치하지 않습니다
      </div>
      <div class="text-16 text-[#E25C5C] flex  sm:ml-32 px-3" v-if="passwordMismatchPattern">
        영문,숫자,특수문자를 모두 조합해 주세요. (8자 이상)
      </div>

      <!-- Additional Info -->
      <div class="mt-5 sm:flex items-center ">
        <label for="additionalInfo" class="lg:text-base lg:font-medium font-normal text-xs w-[145px] text-[#2F312A] ">여행
          희망 사항 (선택사항)</label>
        <textarea id="additionalInfo" v-model="additionalInfo" placeholder="견적 시 참고할 수 있도록 여행에서 희망하시는 항목이 있다면 기입해주세요."
          class="h-[124px] sm:h-[150px] resize-none p-2 gap-2 sm:ml-5 border text-base border-[#E6E6E6] bg-white w-full placeholder-[#8E8D8D] outline-none"
          rows="3"></textarea>
      </div>
      <div class="my-5 flex justify-between items-center">
        <div class="flex">
          <div @click="isChecked = !isChecked"
            class="w-[26px] h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white">
            <img v-if="isChecked" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
          </div>
          <label class="ml-2 lg:text-base lg:font-medium font-normal text-xs text-[#2F312A]">
            <span class="text-[#E25C5C] mr-2">(필수)</span>개인정보 수집 및 이용 동의
          </label>
        </div>
        <div class="flex items-center cursor-pointer" @click="openModal">
          <div class="hidden md:block text-base font-medium text-[#2F312A]">내용보기</div>
          <img :src="rightIcon" alt="Privacy Policy" class="cursor-pointer ml-2 w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
    <div class="sm:hidden mb-16"></div>
    <PrivacyModal :isOpen="isPrivacyModalOpen" @close="isPrivacyModalOpen = false" />
  </div>
</template>

<script setup>
import { useEasyQuotationStore } from '@/stores/easy-quotation.store'
import rightIcon from '@/assets/icons/right-icon.svg'
import PrivacyModal from '~/components/utils/privacy-modal.vue';
import checkCircleIcon from '@/assets/icons/check-circle.svg';



const store = useEasyQuotationStore();
// Reference form fields
const req_group_name = ref(store.EasyQuotation.req_group_name);
const reservationName = ref(store.EasyQuotation.reservationName);
const email = ref(store.EasyQuotation.email);
const phone = ref(store.EasyQuotation.phone);
const secretCode = ref(store.EasyQuotation.secretCode);
const secretCodeConfirm = ref(store.EasyQuotation.secretCodeConfirm);
const additionalInfo = ref(store.EasyQuotation.additionalInfo);
const error = ref(false);
const passwordMismatch = ref(false);
const passwordMismatchPattern = ref(false);
const isChecked = ref(store.EasyQuotation.isChecked);

watch(isChecked, (newValue) => {
  store.setIsChecked(newValue);
});



const isPrivacyModalOpen = ref(false);


// Watch form fields and call store actions to save changes
watch(req_group_name, (newValue) => {
  store.setReq_group_name(newValue);
});

watch(reservationName, (newValue) => {
  store.setReservationName(newValue);
});

watch(email, (newValue) => {
  store.setEmail(newValue);
});

watch(phone, (newValue) => {
  const numericPhone = newValue.replace(/\D/g, '');
  store.setPhone(numericPhone);
});

watch(secretCode, (newValue) => {
  store.setSecretCode(newValue);
  // checkPasswordMatch();
});

watch(secretCodeConfirm, (newValue) => {
  store.setSecretCodeConfirm(newValue);
  // checkPasswordMatch();
});

watch(additionalInfo, (newValue) => {
  store.setAdditionalInfo(newValue);
});

// Method to check for errors in the secret code
const checkError = () => {
  // Updated regex to require at least one digit, one lowercase letter, and allow . as a special character
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  error.value = secretCode.value.length > 0 && !passwordPattern.test(secretCode.value);
  // checkPasswordMatch();
};

// Method to check if passwords match
const checkPasswordMatch = () => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  // Reset values
  passwordMismatch.value = false;
  passwordMismatchPattern.value = false;

  // First, check if the new password meets the pattern
  if (secretCodeConfirm.value.length > 0 && !passwordPattern.test(secretCodeConfirm.value)) {
    passwordMismatchPattern.value = true;
    return; // Stop further validation
  }

  // Then, check if passwords match
  if (secretCodeConfirm.value.length >= 8 && secretCodeConfirm.value.length >= 8) {
    passwordMismatch.value = secretCode.value !== secretCodeConfirm.value;
  }
};

const openModal = () => {
  isPrivacyModalOpen.value = true
}

</script>

<style scoped>
/* Your custom styles */
</style>