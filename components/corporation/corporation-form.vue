<template>
  <div class="min-h-screen mx-auto bg-white">
    <div class="max-w-[1282px] mx-auto lg:h-[1054px]">
      <div class="lg:bg-[#F6F6F6] w-full lg:h-[869px] p-4 lg:p-[64px]">
        <form class="space-y-4 text-[#152123]">
          <!-- Grid Form -->
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- Left Side -->
            <div class="space-y-4">
              <h2 class="lg:text-base text-sm text-[#152123] font-semibold">
                예약자 성함
              </h2>
              <input
                v-model="store.reservationName"
                type="text"
                placeholder="예약자 성함을 입력해 주세요"
                class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[545px] placeholder-[#8E8D8D] w-[328px] h-[48px] text-base"
              />
              <h2 class="lg:text-base text-sm text-[#152123] font-semibold">
                직급
              </h2>
              <input
                v-model="store.position"
                type="text"
                placeholder="직급을 입력해 주세요"
                class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[545px] placeholder-[#8E8D8D] w-[328px] h-[48px] text-base"
              />
              <h2 class="lg:text-base text-sm text-[#152123] font-semibold">
                여행 출발 날짜
              </h2>
              <datePicker placeholder="출발일" />

              <!-- Email -->
              <h2
                class="lg:text-base text-sm text-[#152123] font-semibold hidden lg:block"
              >
                이메일
              </h2>
              <div
                class="flex-col hidden w-full gap-2 space-x-0 space-y-4 lg:flex lg:space-x-8 lg:space-y-0 lg:flex-row"
              >
                <div
                  class="items-center hidden gap-2 space-x-1 lg:flex lg:gap-2 lg:space-x-5"
                >
                  <input
                    v-model="store.emailId"
                    type="text"
                    placeholder=""
                    class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[345.67px] placeholder-[#8E8D8D] lg:min-w-[345.67px] w-[180px] h-[48px] text-base"
                  />
                  <span class="pt-2 text-xl font-semibold">@</span>
                  <input
                    disabled
                    v-model="store.emailDomain"
                    type="text"
                    placeholder=""
                    class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[345.67px] placeholder-[#8E8D8D] lg:min-w-[345.67px] w-[103px] h-[48px] text-base"
                  />
                </div>
                <!-- Dropdown (direct input optional) -->
                <div class="relative w-full">
                  <!-- Trigger -->
                  <button
                    type="button"
                    @click="isOpen = !isOpen"
                    class="md:w-[345.67px] w-[328px] h-12 md:h-[52px] px-4 py-3 border border-[#E6E6E6] rounded-md bg-white text-left text-[14px] text-[#152123] flex items-center justify-between text-base"
                  >
                    <span class="truncate">
                      {{ selectedLabel }}
                    </span>
                    <img
                      :src="isOpen ? chevronUp : chevronDown"
                      alt="Chevron Icon"
                      class="w-6 h-6 md:w-7 md:h-7"
                    />
                  </button>

                  <!-- Dropdown List -->
                  <div
                    v-if="isOpen"
                    class="absolute mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg z-10 max-h-[300px] overflow-auto md:w-[345.67px] w-[328px] text-[#7B7B7B] text-base"
                  >
                    <ul class="text-sm divide-y divide-gray-100 md:text-base">
                      <li
                        v-for="item in emailOptions"
                        :key="item.id"
                        @click="selectEmailOption(item)"
                        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        :class="{
                          'bg-gray-100 font-medium': selectedOption === item.id,
                        }"
                      >
                        {{ item.label }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p class="text-[12px] md:text-sm text-[#5E5F61]">
                ※ 이메일로 견적서를 보내 드립니다. 정확하게 기재해 주세요.
              </p>
            </div>

            <!-- Right Side -->
            <div class="space-y-4 lg:pl-6">
              <h2 class="text-base text-[#152123] font-semibold">회사명</h2>
              <input
                v-model="store.company"
                type="text"
                placeholder="회사명을 입력해 주세요"
                class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[545px] placeholder-[#8E8D8D] w-[328px] h-[48px] text-base"
              />
              <h2 class="lg:text-base text-sm text-[#152123] font-semibold">
                휴대폰 번호
              </h2>
              <input
                v-model="rawPhone"
                type="text"
                placeholder="휴대폰 번호를 입력해 주세요"
                class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[545px] placeholder-[#8E8D8D] w-[328px] h-[48px] text-base"
              />
              <h2 class="lg:text-base text-sm text-[#152123] font-semibold">
                상담 통화 가능 시간
              </h2>
              <input
                v-model="store.callableTime"
                type="text"
                placeholder="통화 가능 시간을 입력해 주세요. (예시 : 오후 1시 이후)"
                class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[545px] placeholder-[#8E8D8D] w-[328px] h-[48px] text-base"
              />
            </div>
            <!-- Email mobile -->
            <h2
              class="lg:text-base text-sm text-[#152123] font-semibold lg:hidden"
            >
              이메일
            </h2>
            <div
              class="flex flex-col w-full gap-2 space-x-0 space-y-4 lg:space-x-8 lg:space-y-0 lg:flex-row lg:hidden"
            >
              <div
                class="flex items-center gap-2 space-x-1 lg:gap-2 lg:space-x-5"
              >
                <input
                  v-model="store.emailId"
                  type="text"
                  placeholder=""
                  class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[345.67px] placeholder-[#8E8D8D] lg:min-w-[345.67px] w-[180px] h-[48px] text-base"
                />
                <span class="pt-2 text-xl font-semibold">@</span>
                <input
                  disabled
                  v-model="store.emailDomain"
                  type="text"
                  placeholder=""
                  class="border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:h-[52px] lg:w-[345.67px] placeholder-[#8E8D8D] lg:min-w-[345.67px] w-[103px] h-[48px] text-base"
                />
              </div>
              <!-- Dropdown (direct input optional) -->
              <div class="relative w-full">
                <!-- Trigger -->
                <button
                  type="button"
                  @click="isOpen = !isOpen"
                  class="md:w-[345.67px] w-[328px] h-12 md:h-[52px] px-4 py-3 border border-[#E6E6E6] rounded-md bg-white text-left text-[14px] text-[#152123] flex items-center justify-between text-base"
                >
                  <span class="truncate">
                    {{ selectedLabel }}
                  </span>
                  <img
                    :src="isOpen ? chevronUp : chevronDown"
                    alt="Chevron Icon"
                    class="w-6 h-6 md:w-7 md:h-7"
                  />
                </button>

                <!-- Dropdown List -->
                <div
                  v-if="isOpen"
                  class="absolute mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg z-10 max-h-[300px] overflow-auto md:w-[345.67px] w-[328px] text-[#7B7B7B] text-base"
                >
                  <ul class="text-sm divide-y divide-gray-100 md:text-base">
                    <li
                      v-for="item in emailOptions"
                      :key="item.id"
                      @click="selectEmailOption(item)"
                      class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      :class="{
                        'bg-gray-100 font-medium': selectedOption === item.id,
                      }"
                    >
                      {{ item.label }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p class="text-[12px] md:text-sm text-[#5E5F61] lg:hidden">
              ※ 이메일로 견적서를 보내 드립니다. 정확하게 기재해 주세요.
            </p>
          </div>

          <!-- Optional Textarea -->
          <h2 class="lg:text-base text-sm text-[#152123] font-semibold">
            추가 요청사항 (선택)
          </h2>
          <textarea
            v-model="store.additionalRequests"
            rows="4"
            placeholder="ex) 현지식 추가해 주세요"
            class="w-[328px] h-[200px] lg:h-[250px] border border-[#E6E6E6] rounded px-4 py-3 bg-white lg:w-full placeholder-[#8E8D8D] text-base"
          ></textarea>

          <!-- 개인정보 동의 -->
        </form>
      </div>
      <div
        class="flex items-center justify-between px-4 lg:mb-3 lg:mt-5 md:flex"
      >
        <div class="flex items-center">
          <input
            id="privacyCheckbox"
            type="checkbox"
            v-model="isChecked"
            class="hidden"
          />
          <label
            for="privacyCheckbox"
            class="w-6 h-6 md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white flex-shrink-0"
          >
            <img
              v-if="isChecked"
              :src="checkCircleIcon"
              alt="Checked"
              class="w-full h-full"
            />
          </label>
          <label
            class="ml-2 text-sm md:text-base lg:text-lg font-medium text-[#2F312A] cursor-pointer"
          >
            <span class="text-[#E25C5C] mr-2 text-sm md:text-base">(필수)</span>
            개인정보 수집 및 이용 동의
          </label>
        </div>
        <div class="flex items-center cursor-pointer" @click="openModal">
          <div class="text-sm md:text-base font-medium text-[#2F312A]">
            내용보기
          </div>
          <img
            :src="rightIcon"
            alt="Privacy Policy"
            class="w-4 h-4 ml-2 cursor-pointer md:w-5 md:h-5"
          />
        </div>
      </div>

      <!-- Submit -->
      <div class="pt-6">
        <button
          @click="handleSubmit"
          type="submit"
          class="w-[250px] md:w-[200px] h-[50px] md:h-[48px] bg-[#3B6333] text-white font-semibold lg:rounded-lg hover:bg-[#2e4d28] rounded-[50px] transition-colors duration-300 ease-in-out transform active:scale-95 flex items-center justify-center mx-auto mb-6 lg:mb-0"
        >
          신청하기
        </button>
      </div>
    </div>
  </div>
  <PrivacyModal
    :isOpen="isPrivacyModalOpen"
    @close="isPrivacyModalOpen = false"
  />
  <ValidationModal
    :visible="showModal"
    :message="modalMessage"
    @close="showModal = false"
  />
  <SuccessModal :visible="showSuccessModal" @close="showSuccessModal = false" />
</template>
<script setup>
import { ref, computed } from "vue";
import datePicker from "./date-picker.vue";
import rightIcon from "@/assets/icons/right-icon.svg";
import { useApplyCorporationStore } from "@/stores/apply-corporation.store";
import ValidationModal from "@/components/utils/validationModal.vue";
import chevronDown from "@/assets/icons/chevron-down.png";
import chevronUp from "@/assets/icons/chevron-up.png";
import PrivacyModal from "~/components/utils/privacy-modal.vue";
import checkCircleIcon from "@/assets/icons/check-circle.svg";
import SuccessModal from "../utils/SuccessModal.vue";
import { useRouter } from "vue-router";
import corporationService from "@/services/corporation.service";


const router = useRouter();
const isPrivacyModalOpen = ref(false);
const store = useApplyCorporationStore();
const showModal = ref(false);
const modalMessage = ref("");
const isOpen = ref(false);
const selectedOption = ref(null);
const showSuccessModal = ref(false);
const emailOptions = [
  { id: 1, label: "직접 입력", value: "" },
  { id: 2, label: "naver.com", value: "naver.com" },
  { id: 3, label: "gmail.com", value: "gmail.com" },
  { id: 4, label: "daum.net", value: "daum.net" },
  { id: 5, label: "hanmail.net", value: "hanmail.net" },
  { id: 6, label: "nate.com", value: "nate.com" },
];
const selectedLabel = computed(() => {
  const found = emailOptions.find((o) => o.value === store.emailDomain);
  return found?.label || "직접 입력";
});
const isChecked = computed({
  get: () => store.privacy,
  set: (val) => {
    store.privacy = val;
  },
});
// Use a local `rawPhone` for formatting while syncing with store.phone
const rawPhone = ref(store.phone || "");

watch(rawPhone, (newValue) => {
  const numericPhone = newValue.replace(/\D/g, ""); // remove non-numbers
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

  rawPhone.value = formatted.slice(0, 13);
  store.phone = numericPhone; // Save raw numeric to store
});

const selectEmailOption = (option) => {
  isOpen.value = false;
  selectedOption.value = option.id;
  store.emailDomain = option.value;
};
const openModal = () => {
  isPrivacyModalOpen.value = true;
};
// Validate required fields
const validateForm = () => {
  if (!store.reservationName) {
    modalMessage.value = "예약자 성함을 입력해 주세요.";
    showModal.value = true;
    return false;
  }

  if (!store.position) {
    modalMessage.value = "직급을 입력해 주세요.";
    showModal.value = true;
    return false;
  }

  if (!store.startDate) {
    modalMessage.value = "여행 출발 날짜를 선택해 주세요.";
    showModal.value = true;
    return false;
  }

  if (!store.emailId || !store.emailDomain) {
    modalMessage.value = "이메일을 입력해 주세요.";
    showModal.value = true;
    return false;
  }

  if (!store.phone) {
    modalMessage.value = "휴대폰 번호를 입력해주세요.";
    showModal.value = true;
    return false;
  }
  if (!store.callableTime) {
    modalMessage.value = "상담 통화 가능 시간을 입력해 주세요";
    showModal.value = true;
    return false;
  }
  if (!store.company) {
    modalMessage.value = "회사명을 입력해 주세요.";
    showModal.value = true;
    return false;
  }
  if (!store.privacy) {
    modalMessage.value = "개인정보 처리방침에 동의해 주세요.";
    showModal.value = true;
    return false;
  }

  return true;
};

// Submit button handler
const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const response = await corporationService.applyCorporation(store);

    if (response.status === 200) {
      showSuccessModal.value = true;
      store.resetForm(); // ✅ Clear form after success

      setTimeout(() => {
        router.push("/"); // Or wherever you want
      }, 1500);
    }
  } catch (error) {
    console.error("❌ 저장 실패:", error);
    modalMessage.value = "요청 처리 중 오류가 발생했습니다.";
    showModal.value = true;
  }
};

</script>
