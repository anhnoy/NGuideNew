<template>
    <div>
        <div class="relative lg:h-auto lg:min-h-[100vh] bg-cover bg-no-repeat "
        :style="{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundBlendMode: 'overlay',
            backgroundColor: '#00000080' 
        }">
            <kakao />
            <navbar class="hidden sm:block bg-white" />
            <div
                class="flex justify-center items-center md:flex md:justify-center md:items-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                <!-- Desktop version -->
                <div
                    class="bg-[#EDEDF2] shadow-md w-[1080px] h-[617px] mt-[10px] justify-center items-center rounded-[50px] hidden md:flex">
                    <div class="w-[744px] mx-auto">
                        <h2 class="text-2xl font-bold text-[#152123] mb-10 text-center">
                            견적서 조회
                        </h2>
                        <div class="w-[744px] mx-auto mt-12 flex justify-between">
                            <div class="w-[600px] mx-auto p-2 text-[16px]">
                                <div class="mb-4 flex items-center">
                                    <label for="quotationName"
                                        class="block text-xs sm:text-sm w-32 text-left font-medium text-[#2F312A] mb-1 ">성함</label>
                                    <input id="quotationName" v-model="quotationName" type="text"
                                        class="w-full px-3 py-[11px] bg-white text-[#152123] border border-[#E6E6E6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="성함을 입력해 주세요." required />
                                </div>
        
                                <div class="mb-4 flex items-center">
                                    <label for="phone"
                                        class="block text-sm font-medium w-32 text-left items-center text-[#2F312A] mb-1">휴대폰 번호</label>
                                    <input id="phone" v-model="phone" type="text" maxlength="13"
                                        class="w-full px-3 py-[11px] bg-white text-[#152123] border border-[#E6E6E6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="핸드폰 번호를 입력해 주세요." required />
                                </div>
                                <div v-if="isCheckedOTPToKaKao" class="text-[10px] text-[#6EBC30] mb-4 -my-3.5 ml-[105px]" >인증 번호가 발송되었습니다.</div>
        
                                <div class="flex items-center">
                                    <label for="password"
                                        class="block text-sm w-32 text-left font-medium text-[#2F312A] mb-1">인증 번호 입력</label>
                                    <div class="flex items-center justify-between w-full px-3 py-[11px] bg-white text-[#152123] border border-[#E6E6E6] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <input :disabled="!isCheckedOTPToKaKao || OtpChecked" id="mobilePassword" v-model="OtpNumber" type="text" maxlength="6" class="w-[400px] focus:outline-none bg-transparent" placeholder="숫자 6자리를 입력해 주세요." />
                                        <div v-if="isCheckedOTPToKaKao && remainingTime > 0 && !OtpChecked" class="w-auto flex items-center justify-end">
                                          <img src="@/assets/icons/TimeCircle.svg" alt="TimeCircle" class="w-[12px] h-[12px] mt-0.5">
                                          <span type="time" class="text-[12px] w-[46px] h-[18px] text-[#E25C5C] ml-[2px]">{{ formattedTime }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="OtpChecked" class="text-[10px] text-[#6EBC30] ml-[105px]" >인증이 완료되었습니다.</div>
                                <div v-if="OtpChecked === false" class="text-[10px] text-[#E25C5C] ml-[105px]" >인증 번호를 다시 입력해 주세요.</div>
                            </div>
                            <div class="flex flex-col items-center justify-end" :class="isCheckedOTPToKaKao ? 'gap-[40px]' : 'gap-[24px] mb-[12px]',
                                isCheckedOTPToKaKao && OtpChecked=== true || OtpChecked === false ? 'gap-[40px] mb-[26px]' : 'gap-[24px] mb-[12px]'">
                                <button v-if="!isCheckedOTPToKaKao" @click="phone && sendOtpToKaKao()"
                                  class="text-[12px] w-[112px] h-[40px] bg-[#6EBC30] rounded-md text-white "
                                  :class="phone ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">
                                  인증 번호 발송
                                </button>
                                <button v-else @click="phone && sendOtpToKaKao()"
                                  class="text-[12px] w-[112px] h-[40px] bg-[#6EBC30] rounded-md text-white "
                                  :class="phone ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">
                                  인증 번호 재발송
                                </button>
                                <button @click="OtpNumber && remainingTime > 0 && !OtpChecked && sendOtpChecked()"
                                  class="text-[12px] w-[112px] h-[40px] bg-[#6EBC30] hover:bg-[#127C3C] rounded-md text-white"
                                  :class="OtpNumber && remainingTime > 0 || OtpChecked ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'"
                                  >확인
                                </button>
                            </div>
                        </div>
                        

                        <!-- <button @click="handleSubmit()"
                            :disabled="isLoading"
                            class="mt-12 w-full sm:w-[240px] py-[12px] border text-white mx-auto justify-center flex text-base font-bold"
                            :class="quotationName && isCheckedOTPToKaKao && OtpChecked ? 'bg-[#2F312A] hover:bg-[#717573]' : 'bg-[#8E8D8D]'"> -->
                        <button @click="quotationName && isCheckedOTPToKaKao && OtpChecked && handleSubmit()"
                            :disabled="isLoading"
                            class="mt-12 w-full sm:w-[240px] py-[12px] border text-white mx-auto justify-center flex text-base font-bold"
                            :class="quotationName && isCheckedOTPToKaKao && OtpChecked ? 'bg-[#2F312A] hover:bg-[#717573]' : 'bg-[#8E8D8D]'">
                            조회하기
                            <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
                        </button>
                      </div>
                </div>

                <!-- Mobile version -->
                <div class="w-[100vh] h-[100vh] bg-white md:hidden flex flex-col justify-between">
                    <!-- Mobile header -->
                    <div
                        class="bg-white h-[66px] flex items-center justify-between px-4 md:hidden border-b border-[#E6E6E6]">
                        <div class="flex items-center">
                            <img src="@/assets/icons/chevron-left.svg" @click="clickBack" alt="Back"
                                class="text-black w-[24px] h-[24px]" />
                        </div>
                        <div class="text-center flex-grow text-black">견적서 조회</div>
                        <div></div>
                    </div>

                    <!-- Mobile form -->
                    <div class="px-4 flex-grow mt-12">
                        <div class="mb-4">
                            <label for="mobileQuotationNumber"
                                class="block text-xs font-medium text-[#2F312A]mb-1">성함</label>
                            <input id="mobileQuotationNumber" v-model="quotationNumber" type="text"
                                class="mt-2 w-full text-[14px] text-[#152123] px-3 py-2 h-[44px] bg-white border border-[#E6E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="성함을 입력해 주세요." />
                        </div>

                        <div class="mb-4">
                            <label for="mobilePhone" class="block  text-xs font-medium text-[#2F312A]mb-1">휴대폰 번호</label>
                            <input id="mobilePhone" v-model="phone" type="text" maxlength="13"
                                class="mt-2 w-full px-3 h-[44px] text-[14px] text-[#152123] py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="핸드폰 번호를 입력해 주세요." />
                            <div v-if="isCheckedOTPToKaKao" class="text-[10px] text-[#6EBC30] flex  sm:ml-32 px-3 mt-1" >인증 번호가 발송되었습니다.</div>
                        </div>

                        <div class="mb-4">
                          <button v-if="!isCheckedOTPToKaKao" @click="phone && sendOtpToKaKao()"
                            class="text-[12px] w-[328px] h-[46px] bg-[#6EBC30] rounded-md text-white px-1"
                            :class="phone ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">인증 번호 발송</button>
                          <button v-else @click="phone && sendOtpToKaKao()"
                            class="text-[12px] w-[328px] h-[46px] bg-[#6EBC30] rounded-md text-white px-1"
                            :class="phone ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'">인증 번호 재발송</button>
                        </div>

                        <div class="mb-4 my-[30px]">
                            <label for="mobilePassword"
                                class="block  text-xs font-medium text-[#2F312A]mb-1">인증 번호 입력</label>
                            <div class="flex items-center justify-between mt-2 w-full h-[44px] text-[14px] px-3 py-2 border text-[#152123] bg-white border-[#E6E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <input :disabled="!isCheckedOTPToKaKao || OtpChecked" id="mobilePassword" v-model="OtpNumber" type="password" maxlength="6" class="w-[183px] focus:outline-none bg-transparent" placeholder="숫자 6자리를 입력해 주세요." />
                                <div class="w-auto flex items-center justify-end">
                                  <div  v-if="isCheckedOTPToKaKao && remainingTime > 0 && !OtpChecked" class="flex items-center justify-end -mr-2">
                                    <img src="@/assets/icons/TimeCircle.svg" alt="TimeCircle" class="w-[12px] h-[12px]">
                                    <span type="time" class="text-[12px] w-[46px] h-[18px] text-[#E25C5C] ml-[2px]">{{ formattedTime }}</span>
                                  </div>
                                  <button @click="OtpNumber && remainingTime > 0 && !OtpChecked && sendOtpChecked()"
                                    class="text-[12px] w-[55px] h-[26px] rounded-md text-white"
                                    :class="OtpNumber && remainingTime > 0 || OtpChecked ? 'bg-[#6EBC30] hover:bg-[#127C3C]' : 'bg-[#8E8D8D]'"
                                    >확인
                                  </button>
                                </div>
                            </div>
                            <div v-if="OtpChecked" class="text-[10px] text-[#6EBC30] sm:ml-32 px-3 mt-1" >인증이 완료되었습니다.</div>
                            <div v-if="OtpChecked === false" class="text-[10px] text-[#E25C5C] sm:ml-32 px-3 mt-1" >인증 번호를 다시 입력해 주세요.</div>
                        </div>
                    </div>

                    <!-- Mobile button fixed at the bottom -->
                    <div class="fixed bottom-0 left-0 right-0 lg:hidden">
                        <button @click="quotationName && isCheckedOTPToKaKao && OtpChecked && handleSubmit()"
                            :disabled="isLoading"
                            class="w-full custom-next-button">
                            조회하기
                            <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
                        </button>
                    </div>
                </div>
                <ModalValidation :isOpen="isModalOpen" @close="isModalOpen = false" :message="modalMessage" />
                <TravelAlertModal :show="modalOpen" @close="modalOpen = false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import quotationService from "~/services/quotation.service";
import ModalValidation from "~/components/utils/modal-validation.vue";
import navbar from '~/components/navbar/navbar.vue';
import backgroundImage from '@/assets/images/logo copy.png'; // Import the image
import kakao from "@/components/kakao/buttonKAKAO.vue";
import sendOtpKakao from "@/services/kakaoOTP.service";
import TravelAlertModal from '~/components/login-quotation/TravelAlertModal.vue';
import { useQuotationStore } from "~/stores/login.store";

const quotationNumber = ref("");
const phone = ref("");
const password = ref("");
const isModalOpen = ref(false);
const modalMessage = ref("정보를 올바르게 입력해 주세요.");
const router = useRouter();
const store = useQuotationStore();

const quotationName = ref("");
const isCheckedOTPToKaKao = ref(false);
const OtpNumber = ref(null);
const OtpChecked = ref(null);
const messagekey = ref(null);
const remainingTime = ref(0);
const countdownInterval = ref(null);

const isLoading = ref(false);
const modalOpen = ref(false)

watch(phone, (newValue) => {
  const numericPhone = newValue.replace(/\D/g, '');
  let formatted = numericPhone;
  if (numericPhone.length <= 3) {
    formatted = numericPhone;
  } else if (numericPhone.length <= 7) {
    formatted = numericPhone.replace(/(\d{3})(\d+)/, '$1-$2');
  } else if (numericPhone.length === 8) {
    formatted = numericPhone.replace(/(\d{4})(\d{4})/, '$1-$2');
  }else if (numericPhone.length <= 11) {
    formatted = numericPhone.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  }

  phone.value = formatted.slice(0, 13); // max length: 13 including dashes
  if (!numericPhone && isCheckedOTPToKaKao.value){
    isCheckedOTPToKaKao.value = false;
    OtpNumber.value = null;
    OtpChecked.value = null;
  }
});

const handleSubmit = async () => {
    try {
        const numericPhone = phone.value.replace(/\D/g, '');
        const response = await store.getAllQuotationByPhone( quotationName.value, numericPhone );
        if (response.data.rows.length > 0) {
            router.push("/quotation-inquiry");
        }else{
          modalOpen.value = true
        }
    } catch (error) {
      modalOpen.value = true;
      console.error("Error:", error);
    }
};

const login = async () => {
    try {
        const numericPhone = phone.value.replace(/\D/g, '');
        const data = { phone: numericPhone };
        const response = await quotationService.quotation_login(data);

        if (response.status === 200) {
            const { accessToken, refreshToken } = response.data;

            if (accessToken && refreshToken) {
                localStorage.setItem("phone", numericPhone);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            }
        }
    } catch (error) {
      console.error("Error:", error); // Log other errors
    }
};

const clickBack = () => {
    router.go(-1);
};

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
      }
    }, 1000);

  } catch (err) {
    console.log(err);
  }
};
const sendOTP = async() =>{
  try {
    if (!phone.value) return;
    const data = {
      recipient: phone.value.replace(/\D/g, ''), // remove all non-digit characters
      countryCode: "",
    }
    OtpChecked.value = null;
    OtpNumber.value = null;

    const response = await sendOtpKakao.sendOTP(data);
    if (response.status === 200) {
      isCheckedOTPToKaKao.value = true;
      await OtpTimeCountDown();
      messagekey.value = response.data.messagekey;
    } else {
      isCheckedOTPToKaKao.value = false;
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
    const response = await sendOtpKakao.verifyOTP(data);
    if (response.status === 200) {
      OtpChecked.value = true;
      login();
    } else{
      OtpChecked.value = false;
    } 
  } catch (error) {
    console.log(error);
    OtpChecked.value = false;
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
/* Additional styles if needed */
</style>
