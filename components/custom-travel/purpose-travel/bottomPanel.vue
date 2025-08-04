<template>
  <div
    class="md:w-[550px] md:h-[1165px] mx-auto rounded-xl border border-[#E6E6E6] md:border-0 md:border-transparent"
  >
    <div>
      <div class="flex items-center p-3 md:p-0">
        <img
          src="@/assets/icons/person_icon.png"
          alt="Cate_icon"
          class="w-[45px] h-[45px]"
        />
        <h2
          class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold ml-2 md:ml-7"
        >
          예약자 정보
        </h2>
      </div>
      <div>
        <h2
          class="text-[#152123] text-[14px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0"
        >
          여행 기본 정보
        </h2>
        <!-- Tour Group -->
        <input
          id="req_group_name"
          v-model="req_group_name"
          type="text"
          placeholder="관광 단체명을 입력해 주세요. (없으신 경우 성함 입력)"
          class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm p-2 md:mt-7"
        />
        <h2
          class="text-[#152123] text-[14px] lg:text-[16px] font-medium md:mt-5 md:ml-0 ml-3 mt-3"
        >
          예약자 성함
        </h2>
        <input
          id="reservationName"
          v-model="reservationName"
          type="text"
          placeholder="예약자 성함을 입력해 주세요."
          class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 py-2 border border-[#E6E6E6] w-[304px] h-[48px] ml-3 md:ml-0 text-sm p-2 md:mt-7"
        />
        <h2
          class="text-[#152123] text-sm lg:text-[16px] font-medium md:mt-5 md:ml-0 ml-3 mt-3"
        >
          이메일
        </h2>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-3 bg-white md:px-4 py-2 border border-[#E6E6E6] w-[304px] h-[48px] ml-3 md:ml-0 p-2 text-sm md:mt-7"
        />
        <h2
          class="text-[#152123] md:text-[16px] lg:text-[16px] font-medium md:mt-5 mt-3 text-sm md:ml-0 ml-3"
        >
          통화 가능 시간
        </h2>
        <input
          id="calltime"
          v-model="req_callable_time"
          type="text"
          placeholder="통화 가능 시간을 입력해 주세요. (예시 : 오후 1시 이후)"
          class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-3 bg-white px-4 py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm md:text-base md:mt-7"
        />
        <h2
          class="text-[#152123] text-[14px] lg:text-[16px] font-medium md:mt-7 md:ml-0 ml-3 mt-3"
        >
          휴대폰번호
          <span class="text-[#5E5F61] text-[10px] lg:text-[12px] font-normal"
            >※안전한 서비스 이용을 위하여 본인 인증을 진행 합니다.</span
          >
        </h2>
        <!-- Phone -->
        <!-- Wrapper -->
        <!-- ✅ Correct container -->
        <div class="relative w-full md:w-[550px] md:mt-7 mt-3">
          <img
            src="@/assets/icons/phone.png"
            alt="Phone Icon"
            class="absolute md:left-3 top-1/2 -translate-y-1/2 w-[20px] h-[20px] opacity-70 left-5"
          />
          <input
            v-model="phone"
            type="tel"
            maxlength="13"
            placeholder="휴대폰번호를 입력해 주세요."
            class="md:w-full md:h-[60px] rounded-lg border border-[#E6E6E6] bg-white md:px-4 pr-[120px] text-sm placeholder-[#8E8D8D] text-[#152123] outline-none md:pl-[40px] w-[304px] h-[48px] ml-3 md:ml-0 pl-[35px]"
          />

          <button
            @click="phone.replace(/-/g, '').length === 11 && sendOtpToKaKao()"
            :class="[
              'absolute top-1/2 -translate-y-1/2 md:right-2 md:text-sm md:w-[103px] md:h-[42px] rounded-md text-white w-[100px] h-[32px] text-[12px] right-4',
              phone.replace(/-/g, '').length === 11
                ? 'bg-[#6EBC30] hover:bg-[#127C3C]'
                : 'bg-[#6EBC30] cursor-not-allowed',
            ]"
          >
            {{ firstSendKaokaoCheck ? "인증 번호 재발송" : "인증 번호 발송" }}
          </button>

          <!-- ✅ Positioned absolutely below the input without pushing layout -->
          <div
            v-if="messageSendKaokaoCheck"
            class="absolute top-full text-[10px] lg:text-[14px] text-[#6EBC30] md:h-[14px] ml-4"
          >
            인증 번호가 발송되었습니다.
          </div>
        </div>

        <!-- Secret Code -->
        <div class="relative w-full md:w-[550px] mt-5 md:mt-8">
          <!-- Key Icon -->
          <img
            src="@/assets/icons/key-icon.png"
            alt="Key Icon"
            class="absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] opacity-70 left-5 md:left-3"
          />

          <!-- OTP Input -->
          <input
            id="OtpNumber"
            v-model="OtpNumber"
            type="text"
            maxlength="6"
            :disabled="!isCheckedOTPToKaKao || OtpChecked"
            placeholder="인증번호"
            class="w-[304px] md:w-full h-[48px] md:h-[60px] pl-[35px] md:pl-[40px] pr-[120px] ml-3 md:ml-0 rounded-lg border border-[#E6E6E6] bg-white text-sm placeholder-[#8E8D8D] text-[#152123] outline-none"
          />

          <!-- Timer -->
          <div
            v-if="isCheckedOTPToKaKao && remainingTime > 0 && !OtpChecked"
            class="absolute top-1/2 left-[calc(100%-180px)] -translate-y-1/2 flex items-center gap-1"
          >
            <img
              src="@/assets/icons/TimeCircle.svg"
              alt="Timer"
              class="w-[12px] h-[12px] mt-[5px]"
            />
            <span class="text-[#E25C5C] text-[12px] lg:text-[14px]">
              {{ formattedTime }}
            </span>
          </div>

          <!-- 확인 Button -->
          <button
            @click="
              OtpNumber && remainingTime > 0 && !OtpChecked && sendOtpChecked()
            "
            :class="[
              'absolute top-1/2 -translate-y-1/2 right-4 md:right-2 text-white text-[12px] md:text-sm rounded-md w-[100px] h-[32px] md:w-[103px] md:h-[42px]',
              (OtpNumber && remainingTime > 0) || OtpChecked
                ? 'bg-[#6EBC30] hover:bg-[#127C3C]'
                : 'bg-[#6EBC30] cursor-not-allowed',
            ]"
          >
            확인
          </button>
        </div>

        <!-- Status Messages -->
        <div
          v-if="OtpChecked"
          class="text-[10px] lg:text-[14px] text-[#6EBC30] flex mt-1 lg:mt-2 ml-4"
        >
          인증이 완료되었습니다.
        </div>
        <div
          v-else-if="OtpChecked === false && OtpNumber"
          class="text-[10px] lg:text-[14px] text-[#E25C5C] flex mt-1 lg:mt-2 ml-4"
        >
          인증 번호를 다시 입력해 주세요.
        </div>
        <div
          v-if="timeEndKaokaoCheck"
          class="text-[10px] lg:text-[14px] text-[#E25C5C] flex mt-1 lg:mt-2 ml-4"
        >
          인증 시간이 초과되었습니다. 재발송을 눌러 새 인증번호를 받으세요.
        </div>
        <h2
          class="text-[#152123] text-[14px] lg:text-[16px] font-medium md:mt-5 mt-3 md:ml-0 ml-3"
        >
          여행 희망 사항 <span class="text-[#5E5F61] font-normal">(선택)</span>
        </h2>
        <!-- Tour Group -->
        <textarea
          id="additionalInfo"
          v-model="additionalInfo"
          placeholder="여행 희망 사항이 있다면 입력해 주세요.

(예시)
현지식은 꼭 먹고 싶어요
갑각류 음식은 제외해 주세요
기업 행사 진행을 위한 공간이 필요해요"
          class="rounded-lg md:w-[550px] md:h-[250px] md:rounded-lg mt-4 bg-white px-4 py-2 border border-[#E6E6E6] w-[304px] h-[200px] md:ml-0 ml-3 text-[14px] md:mt-7"
        ></textarea>
        <div
          class="items-center justify-between hidden mt-5 mb-3 md:flex sm:block"
        >
          <div class="flex">
            <div
              @click="isChecked = !isChecked"
              class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white md:mt-5"
            >
              <img
                v-if="isChecked"
                :src="checkCircleIcon"
                alt="Checked"
                class="w-full h-full"
              />
            </div>
            <label
              class="md:ml-2 lg:text-[20px] lg:font-medium font-normal text-sm text-[#2F312A] ml-3 mt-3 md:mt-5 cursor-pointer"
            >
              <span class="text-[#E25C5C] mr-2 text-[12px] md:text-[20px]"
                >(필수)</span
              >개인정보 수집 및 이용 동의
            </label>
          </div>
          <div class="flex items-center cursor-pointer" @click="openModal">
            <div class="hidden md:block text-base font-medium text-[#2F312A]">
              내용보기
            </div>
            <img
              :src="rightIcon"
              alt="Privacy Policy"
              class="ml-2 cursor-pointer md:w-[20px] md:h-[20px] w-[16px] h-[16px]"
            />
          </div>
        </div>
      </div>
    </div>
    <PrivacyModal
      :isOpen="isPrivacyModalOpen"
      @close="isPrivacyModalOpen = false"
    />
  </div>
  <!-- show on mobile only -->
  <div class="flex items-center justify-between mt-5 md:hidden">
    <div class="flex items-center">
      <div
        @click="isChecked = !isChecked"
        class="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white"
      >
        <img
          v-if="isChecked"
          :src="checkCircleIcon"
          alt="Checked"
          class="w-full h-full"
        />
      </div>
      <label
        class="md:ml-2 lg:text-[20px] lg:font-medium font-normal text-sm text-[#2F312A] ml-3 cursor-pointer flex items-center"
      >
        <span class="text-[#E25C5C] mr-2 text-[14px] md:text-[20px]"
          >(필수)</span
        >
        개인정보 수집 및 이용 동의
      </label>
    </div>
    <div class="flex items-center cursor-pointer" @click="openModal">
      <div class="hidden md:block text-base font-medium text-[#2F312A]">
        내용보기
      </div>
      <img :src="rightIcon" alt="Privacy Policy" class="w-5 h-5 ml-2 cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDestinationStore } from "@/stores/destination.store";
import rightIcon from "@/assets/icons/right-icon.svg";
import PrivacyModal from "~/components/utils/privacy-modal.vue";
import checkCircleIcon from "@/assets/icons/check-circle.svg";
import otpKakao from "@/services/kakaoOTP.service";
const store = useDestinationStore();

// Reference form fields
const req_group_name = ref(store.travelCustom.req_group_name);
const reservationName = ref(store.travelCustom.reservationName);
const email = ref(store.travelCustom.email);
const req_callable_time = ref(store.travelCustom.req_callable_time);
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
  if (!newValue) {
    store.setOtpChecked((OtpChecked.value = null));
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
watch(req_callable_time, (newValue) => {
  store.setCalltime(newValue);
});

watch(phone, (newValue) => {
  const numericPhone = newValue.replace(/\D/g, "");
  let formatted = numericPhone;
  if (numericPhone.length <= 3) {
    formatted = numericPhone;
  } else if (numericPhone.length <= 7) {
    formatted = numericPhone.replace(/(\d{3})(\d+)/, "$1-$2");
  } else if (numericPhone.length === 8) {
    formatted = numericPhone.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else if (numericPhone.length === 9) {
    formatted = numericPhone.replace(/(\d{1})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (numericPhone.length === 10) {
    formatted = numericPhone.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (numericPhone.length <= 11) {
    formatted = numericPhone.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
  }

  phone.value = formatted.slice(0, 13); // max length: 13 including dashes
  store.setPhone(numericPhone);
  if (!numericPhone) {
    isCheckedOTPToKaKao.value = false;
    messageSendKaokaoCheck.value = false;
    firstSendKaokaoCheck.value = false;
    store.setOtpNumber((OtpNumber.value = null));
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

  error.value =
    secretCode.value.length > 0 && !passwordPattern.test(secretCode.value);
  // checkPasswordMatch();
};

// Method to check if passwords match
const checkPasswordMatch = () => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  // Reset values
  passwordMismatch.value = false;
  passwordMismatchPattern.value = false;

  // First, check if the new password meets the pattern
  if (
    secretCodeConfirm.value.length > 0 &&
    !passwordPattern.test(secretCodeConfirm.value)
  ) {
    passwordMismatchPattern.value = true;
    return; // Stop further validation
  }

  // Then, check if passwords match
  if (
    secretCodeConfirm.value.length >= 8 &&
    secretCodeConfirm.value.length >= 8
  ) {
    passwordMismatch.value = secretCode.value !== secretCodeConfirm.value;
  }
};

const openModal = () => {
  isPrivacyModalOpen.value = true;
};

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
});

const OtpTimeCountDown = async () => {
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
        store.setOtpChecked((OtpChecked.value = null));
        store.setOtpNumber((OtpNumber.value = null));
      }
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};
const sendOTP = async () => {
  try {
    if (!phone.value) return; // ⛔ Avoid if phone is empty
    const data = {
      recipient: phone.value.replace(/\D/g, ""), // remove all non-digit characters
      countryCode: "",
      isapp: false,
    };
    store.setOtpChecked((OtpChecked.value = null));
    store.setOtpNumber((OtpNumber.value = null));

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
const verifyOTP = async () => {
  try {
    const data = {
      recipient: phone.value.replace(/\D/g, ""), // remove all non-digit characters
      code: OtpNumber.value,
      messagekey: messagekey.value,
    };
    const response = await otpKakao.verifyOTP(data);
    if (response.status === 200) {
      clearInterval(countdownInterval.value); // Stop the countdown
      store.setOtpChecked((OtpChecked.value = true));
    } else {
      store.setOtpChecked((OtpChecked.value = false));
    }
  } catch (error) {
    console.log(error);
    store.setOtpChecked((OtpChecked.value = false));
  }
};
const sendOtpToKaKao = async () => {
  await sendOTP();
};
const sendOtpChecked = () => {
  verifyOTP();
};
</script>

<style scoped>
/* Your custom styles */
</style>
