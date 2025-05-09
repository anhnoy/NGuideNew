<template>
    <div class="max-w-[1080px] bg-white ">
    <div class="h1-custom mb-8 pt-5">예약자 정보를 작성해 주세요.</div>
    <div class="w-[328px] sm:w-[600px] mx-auto">
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
        <input id="phone" v-model="phone" type="tel" maxlength="13" placeholder="핸드폰 번호를 입력해 주세요."
          class="input-custom w-full lg:rounded-none rounded hidden lg:block">
          
        <div class="input-custom w-full lg:rounded-none rounded lg:hidden flex items-center p-2">
          <div class="w-full flex items-center justify-between gap-2">
            <input id="phone" v-model="phone" type="tel" maxlength="13" placeholder="핸드폰 번호를 입력해 주세요." 
            class="text-[#8E8D8D] text-[14px] placeholder-[#8E8D8D] outline-none bg-white w-[206px] ml-2">
            <button v-if="!firstSendKaokaoCheck" @click="phone.replace(/-/g, '').length === 11 && sendOtpToKaKao()" 
              class="text-[12px] w-[88px] h-[26px] bg-[#6EBC30] rounded-md text-white px-1"
              :class="phone.replace(/-/g, '').length === 11? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">인증 번호 발송
            </button>
            <button v-else @click="phone.replace(/-/g, '').length === 11 && sendOtpToKaKao()" 
              class="text-[12px] w-[98px] h-[26px] bg-[#6EBC30] rounded-md text-white px-1"
              :class="phone.replace(/-/g, '').length === 11? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">인증 번호 재발송
            </button>
          </div>
        </div>
      </div>
      <button v-if="!firstSendKaokaoCheck" @click="phone.replace(/-/g, '').length === 11 && sendOtpToKaKao()"
        class="lg:ml-[610px] lg:-mt-[45px] lg:text-[12px] lg:w-[112px] lg:h-[40px] bg-[#6EBC30] rounded-md text-white px-3 hidden lg:block"
        :class="phone.replace(/-/g, '').length === 11 ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">인증 번호 발송
      </button>
      <button v-else @click="phone.replace(/-/g, '').length === 11 && sendOtpToKaKao()"
        class="lg:ml-[610px] lg:-mt-[45px] lg:text-[12px] lg:w-[112px] lg:h-[40px] bg-[#6EBC30] rounded-md text-white px-3 hidden lg:block"
        :class="phone.replace(/-/g, '').length === 11 ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">인증 번호 재발송
      </button>

      <!-- Error Message for Secret Code -->
      <div class="text-[10px] lg:text-[13px] text-[#6EBC30] flex  sm:ml-32 px-3 mt-1 lg:mt-2" v-if="messageSendKaokaoCheck">인증 번호가 발송되었습니다.</div>

      <!-- Confirm Secret Code -->
      <div class="mt-5 sm:flex items-center lg:my-6">
        <label for="secretCodeConfirm"
          class="lg:text-base lg:font-medium w-[145px] text-[#2F312A] text-xs font-normal">인증 번호 입력</label>
            
        <div class="input-custom w-full lg:rounded-none rounded hidden lg:flex items-center justify-between p-2">
          <input :disabled="!isCheckedOTPToKaKao || OtpChecked" id="OtpNumber" v-model="OtpNumber" type="text" maxlength="6" placeholder="숫자 6자리를 입력해 주세요."
            class="text-[#8E8D8D] bg-white text-[16px] placeholder-[#8E8D8D] outline-none w-[273px] ml-2">
            <div v-if="isCheckedOTPToKaKao && remainingTime > 0 && !OtpChecked" class="w-auto h-[18px] gap-1 flex items-center ml-2">
              <img src="@/assets/icons/TimeCircle.svg" alt="TimeCircle" class="w-[12px] h-[12px] mt-[5px]">
              <span class="w-[30px] h-[18px] text-[#E25C5C] text-[12px]">{{ formattedTime }}</span>
            </div>
          </div>
        </div>

        <div class="input-custom w-full lg:rounded-none rounded lg:hidden flex items-center p-2">
          <div class="w-full flex items-center justify-between gap-2">
            <input :disabled="!isCheckedOTPToKaKao || OtpChecked" id="OtpNumber" v-model="OtpNumber" type="text" maxlength="6" placeholder="숫자 6자리를 입력해 주세요." 
            class="text-[#8E8D8D] text-[14px] placeholder-[#8E8D8D] outline-none bg-white w-[206px] ml-2">
            <div class="w-auto flex items-center justify-end ">
              <img v-if="isCheckedOTPToKaKao && remainingTime > 0 && !OtpChecked" src="@/assets/icons/TimeCircle.svg" alt="TimeCircle" class="w-[12px] h-[12px] mt-[5.5px]">
              <span v-if="isCheckedOTPToKaKao && remainingTime > 0 && !OtpChecked" type="time" class="text-[12px] w-[46px] h-[18px] text-[#E25C5C] ml-[2px]">{{ formattedTime }}</span>
              <button @click="OtpNumber && remainingTime > 0 && !OtpChecked && sendOtpChecked()"
                class="text-[12px] w-[55px] h-[26px] rounded-md text-white px-1" 
                :class="OtpNumber && remainingTime > 0 || OtpChecked ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">확인
              </button>
            </div>
        </div>
      </div>
      <button @click="OtpNumber && remainingTime > 0 && !OtpChecked && sendOtpChecked()"
       class="lg:ml-[610px] lg:-mt-[70px] lg:text-[12px] lg:w-[112px] lg:h-[40px] rounded-md text-white px-3 hidden lg:block"
       :class="OtpNumber && remainingTime > 0 || OtpChecked ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">확인
      </button>

      <!-- Error Message for Password Mismatch -->
      <div class="text-[10px] lg:text-[13px] text-[#6EBC30] flex  sm:ml-32 px-3 mt-1 lg:mt-2" v-if="OtpChecked">
        인증이 완료되었습니다.
      </div>
      <div class="text-[10px] lg:text-[13px] text-[#E25C5C] flex  sm:ml-32 px-3 mt-1 lg:mt-2" v-if="OtpChecked === false">
        인증 번호를 다시 입력해 주세요.
      </div>
      <div class="text-[10px] lg:text-[13px] text-[#E25C5C] flex  sm:ml-32 px-3 mt-1 lg:mt-2" v-if="timeEndKaokaoCheck === true">
        인증 시간이 초과되었습니다. 재발송을 눌러 새 인증번호를 받으세요.
      </div>

      <!-- Additional Info -->
      <div class="mt-5 sm:flex items-center lg:my-10">
        <label for="additionalInfo" class="lg:text-base lg:font-medium font-normal text-xs w-[145px] text-[#2F312A] ">여행
          희망 사항 (선택사항)</label>
        <textarea id="additionalInfo" v-model="additionalInfo" placeholder="견적 시 참고할 수 있도록 여행에서 희망하시는 항목이 있다면 기입해주세요."
          class="h-[124px] sm:h-[150px] resize-none p-2 gap-2 sm:ml-5 border text-base border-[#E6E6E6] bg-white w-full placeholder-[#8E8D8D] outline-none"
          rows="3"></textarea>
      </div>
      <div class="mt-5 flex justify-between items-center mb-3">
        <div class="flex">
          <div @click="isChecked = !isChecked"
            class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white">
            <img v-if="isChecked" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
          </div>
          <label class="ml-2 lg:text-base lg:font-medium font-normal text-xs text-[#2F312A]">
            <span class="text-[#E25C5C] mr-2">(필수)</span>개인정보 수집 및 이용 동의
          </label>
        </div>
        <div class="flex items-center cursor-pointer" @click="openModal">
          <div class="hidden md:block text-base font-medium text-[#2F312A]">내용보기</div>
          <img :src="rightIcon" alt="Privacy Policy" class="cursor-pointer ml-2" />
        </div>
      </div>
    </div>
    <div class="sm:hidden mb-40"></div>
    <PrivacyModal :isOpen="isPrivacyModalOpen" @close="isPrivacyModalOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDestinationStore } from '@/stores/destination.store'
import rightIcon from '@/assets/icons/right-icon.svg'
import PrivacyModal from '~/components/utils/privacy-modal.vue';
import checkCircleIcon from '@/assets/icons/check-circle.svg';
import otpKakao from "@/services/kakaoOTP.service";
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
const passwordMismatchPattern = ref(false);
const isChecked = ref(store.travelCustom.isChecked);

const isCheckedOTPToKaKao = ref(false);
const OtpNumber = ref(store.travelCustom.OtpNumber);
const OtpChecked = ref(store.travelCustom.OtpChecked);
const messagekey = ref(null);
const remainingTime = ref(0);
const countdownInterval = ref(null);

const messageSendKaokaoCheck = ref(false);
const firstSendKaokaoCheck = ref(false);
const timeEndKaokaoCheck = ref(false);

watch(isChecked, (newValue) => {
  store.setIsChecked(newValue);
});
watch(OtpNumber, (newValue) => {
  store.setOtpNumber(newValue);
  if(!newValue){
    store.setOtpChecked(OtpChecked.value = null);
  }
});
watch(OtpChecked, (newValue) => {
  store.setOtpChecked(newValue);
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
  let formatted = numericPhone;
  if (numericPhone.length <= 3) {
    formatted = numericPhone;
  } else if (numericPhone.length <= 7) {
    formatted = numericPhone.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (numericPhone.length === 8) {
    formatted = numericPhone.replace(/(\d{4})(\d{4})/, '$1-$2');
  }else if (numericPhone.length === 9) {
    formatted = numericPhone.replace(/(\d{1})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (numericPhone.length === 10) {
    formatted = numericPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }else if (numericPhone.length <= 11) {
    formatted = numericPhone.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  }

  phone.value = formatted.slice(0, 13); // max length: 13 including dashes
  store.setPhone(numericPhone);
  if (!numericPhone){
    isCheckedOTPToKaKao.value = false;
    messageSendKaokaoCheck.value = false;
    firstSendKaokaoCheck.value = false;
    store.setOtpNumber(OtpNumber.value = null);
  }
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

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const OtpTimeCountDown = async() => {
  try {
    remainingTime.value = 300; // 5 minutes in seconds

    // Clear any existing interval to avoid duplicates
    if (countdownInterval.value) {
      clearInterval(countdownInterval.value);
    }

    countdownInterval.value = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--;
      } else {
        clearInterval(countdownInterval.value);
        isCheckedOTPToKaKao.value = false;
        messageSendKaokaoCheck.value = false;
        timeEndKaokaoCheck.value = true;
        store.setOtpChecked(OtpChecked.value = null);
        store.setOtpNumber(OtpNumber.value = null);
      }
    }, 1000);

  } catch (err) {
    console.log(err);
  }
};
const sendOTP = async() =>{
  try {
    if (!phone.value) return; // ⛔ Avoid if phone is empty
    const data = {
      recipient: phone.value.replace(/\D/g, ''), // remove all non-digit characters
      countryCode: "",
      isapp: false
    }
    store.setOtpChecked(OtpChecked.value = null);
    store.setOtpNumber(OtpNumber.value = null);

    const response = await otpKakao.sendOTP(data);
    if (response.status === 200) {
      isCheckedOTPToKaKao.value = true;
      messageSendKaokaoCheck.value = true;
      firstSendKaokaoCheck.value = true;
      timeEndKaokaoCheck.value = false;
      await OtpTimeCountDown();
      messagekey.value = response.data.messagekey;
    } else {
      isCheckedOTPToKaKao.value = false;
      messageSendKaokaoCheck.value = false;
      firstSendKaokaoCheck.value = false;
    } 
  } catch (error) {
    console.log(error);
  }
};
const verifyOTP = async() =>{
  try {
    const data = {
      recipient: phone.value.replace(/\D/g, ''), // remove all non-digit characters
      code: OtpNumber.value,
      messagekey: messagekey.value,
    }
    const response = await otpKakao.verifyOTP(data);
    if (response.status === 200) {
      clearInterval(countdownInterval.value); // Stop the countdown
      store.setOtpChecked(OtpChecked.value = true);
    } else{
      store.setOtpChecked(OtpChecked.value = false);
    } 
  } catch (error) {
    console.log(error);
    store.setOtpChecked(OtpChecked.value = false);
  }
};
const sendOtpToKaKao = async() => {
  await sendOTP()
};
const sendOtpChecked = () => {
  verifyOTP();
};

</script>

<style scoped>
/* Your custom styles */
</style>