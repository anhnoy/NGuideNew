<template>
  <div class="max-w-[1080px] bg-white md:h-[820px] h-[795px] overflow-y-auto lg:overflow-y-auto">
    <div class="h1-custom mb-8 pt-5">예약자 정보를 작성해 주세요.</div>
    <div class="w-[full] sm:w-[620px] mx-auto">
      <!-- Tour Group -->
      <div class="mb-4 p-3 sm:flex items-center">
        <label for="req_group_name" class="text-16 w-[150px] text-[#132D5C]">관광 단체명</label>
        <input id="req_group_name" v-model="req_group_name" type="text" placeholder="관광 단체명을 입력해 주세요."
          class="input-custom w-full">
      </div>

      <!-- Reservation Name -->
      <div class="mb-4 p-3 sm:flex items-center">
        <label for="reservationName" class="text-16 w-[150px] text-[#132D5C]">예약자 성함</label>
        <input id="reservationName" v-model="reservationName" type="text" placeholder="예약자 성함을 입력해 주세요."
          class="input-custom w-full">
      </div>

      <!-- Email -->
      <div class="mb-4 p-3 sm:flex items-center">
        <label for="email" class="text-16 w-[150px] text-[#132D5C]">이메일</label>
        <input id="email" v-model="email" type="email" placeholder="이메일을 입력해 주세요." class="input-custom w-full">
      </div>

      <!-- Phone -->
      <div class="mb-4 p-3 sm:flex items-center">
        <label for="phone" class="text-16 w-[150px] text-[#132D5C]">핸드폰 번호</label>
        <input id="phone" v-model="phone" type="tel" placeholder="핸드폰 번호를 입력해 주세요." class="input-custom w-full">
      </div>

      <!-- Secret Code -->
      <div class="mb-4 p-3 sm:flex items-center">
        <label for="secretCode" class="text-16 w-[150px] text-[#132D5C]">비밀번호</label>
        <input id="secretCode" v-model="secretCode" type="password" placeholder="견적서 조회 시 사용할 비밀번호를 숫자 6자리로 입력해 주세요"
          class="input-custom w-full" :class="{ 'border-red-500': error }" @input="checkError"  maxlength="6" />
      </div>

      <!-- Error Message for Secret Code -->
      <div class="text-16 text-red-500 flex mt-[-10px] sm:ml-32" v-if="error">숫자 6자리로 입력해 주세요</div>

      <!-- Confirm Secret Code -->
      <div class="mb-4 p-3 sm:flex items-center">
        <label for="secretCodeConfirm" class="text-16 w-[150px] text-[#132D5C]">비밀번호 확인</label>
        <input id="secretCodeConfirm" v-model="secretCodeConfirm" type="password" placeholder="비밀번호를 한번 더 입력해 주세요."
          class="input-custom w-full" :class="{ 'border-red-500': passwordMismatch }" @input="checkPasswordMatch"  maxlength="6" />
      </div>

      <!-- Error Message for Password Mismatch -->
      <div class="text-16 text-red-500 flex mt-[-10px] sm:ml-32" v-if="passwordMismatch">
        비밀번호가 일치하지 않습니다
      </div>

      <!-- Additional Info -->
      <div class="mb-4 p-3 sm:flex items-center">
        <label for="additionalInfo" class="text-16 sm:w-[150px] text-[#132D5C]">여행 희망 사항 (선택사항)</label>
        <textarea id="additionalInfo" v-model="additionalInfo" placeholder="견적 시 참고할 수 있도록 여행에서 희망하시는 항목이 있다면 기입해주세요."
          class="max-h-[150px] resize-none p-2 gap-2 sm:ml-5 border text-base border-[#E6E6E6] bg-white w-full placeholder-[#8E8D8D]"
          rows="3"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDestinationStore } from '@/stores/destination.store';

const store = useDestinationStore();

// Reference form fields
const req_group_name = ref(store.travelCustom.req_group_name);
const reservationName = ref(store.travelCustom.reservationName);
const email = ref(store.travelCustom.email);
const phone = ref(store.travelCustom.phone);
const secretCode = ref(store.travelCustom.secretCode);
const secretCodeConfirm = ref(store.travelCustom.secretCodeConfirm);
const additionalInfo = ref(store.travelCustom.additionalInfo);
const error = ref(false);
const passwordMismatch = ref(false);

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
  store.setPhone(newValue);
});

watch(secretCode, (newValue) => {
  store.setSecretCode(newValue);
  checkPasswordMatch();
});

watch(secretCodeConfirm, (newValue) => {
  store.setSecretCodeConfirm(newValue);
  checkPasswordMatch();
});

watch(additionalInfo, (newValue) => {
  store.setAdditionalInfo(newValue);
});

// Method to check for errors in the secret code
const checkError = () => {
  error.value = secretCode.value.length > 0 && !/^\d{6,}$/.test(secretCode.value);
  checkPasswordMatch();
};

// Method to check if passwords match
const checkPasswordMatch = () => {
  if (secretCode.value.length >= 6 && secretCodeConfirm.value.length >= 6) {
    passwordMismatch.value = secretCode.value !== secretCodeConfirm.value;
  } else {
    passwordMismatch.value = false;
  }
};
</script>

<style scoped>
/* Your custom styles */
</style>