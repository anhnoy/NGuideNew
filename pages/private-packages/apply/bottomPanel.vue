<template>
  <div class="md:w-[1100px] w-[328px] mx-auto rounded-xl md:border-transparent pl-2">
    <div>
      <div>
        <!-- 상담 통화 가능 시간 -->
        <h2 class="text-[#152123] text-sm md:text-base font-medium mt-3 md:mt-5">
          상담 통화 가능 시간
        </h2>
        <input id="req_group_name" v-model="req_group_name" type="text" placeholder="통화 가능 시간을 입력해 주세요. (예시 : 오후 1시 이후)"
          class="text-[12px] font-NotoSansKR-Regular rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[328px] h-[48px] md:ml-0 p-2 md:mt-7 lg-text-[16px]" />
        <h2 class="text-[#152123] text-sm md:text-base font-medium mt-5 md:mt-5">
          항공권 예약 여부
        </h2>
        <div class="flex flex-col mt-2 space-y-2 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 md:mt-7">
          <div v-for="option in [
            { fid: 1, name: '예약 전 (항공권 예약 필요)' },
            { fid: 2, name: '예약완료' },
            { fid: 3, name: '예약 전 (직접 별도 예약 예정)' },
          ]" :key="option.fid" class="flex items-center gap-2 cursor-pointer" @click="flight = option.name">
            <!-- Custom radio indicator -->
            <div class="w-[20px] h-[20px] border rounded-full flex items-center justify-center bg-white" :class="flight === option.name ? 'border-[#0EC0CB]' : 'border-[#E6E6E6]'
              ">
              <div v-if="flight === option.name" class="w-[10px] h-[10px] rounded-full bg-[#0EC0CB]"></div>
            </div>

            <!-- Label text -->
            <span class="text-sm md:text-base whitespace-nowrap">{{
              option.name
              }}</span>
          </div>
        </div>

        <!-- 이메일 -->
        <div class="flex flex-col pb-2 sm:flex-row sm:gap-4 sm:items-center">
          <div class="flex flex-row items-center gap-4">
            <div class="flex-1">
              <h2 class="text-[#152123] text-sm md:text-base font-medium mt-5">
                이메일
              </h2>
              <input id="reservationName" v-model="reservationName" type="text"
                class="h-12 md:h-[52px] rounded-lg mt-2 md:mt-5 bg-white px-3 md:px-4 py-2 border border-[#E6E6E6] text-sm w-[180px] md:w-[335px]" />
            </div>
            <div class="flex items-center justify-center h-[52px] mt-10 md:mt-16 sm:mt-11">
              <span class="text-lg font-medium text-[#152123]">@</span>
            </div>
            <div class="flex-1">
              <input id="emailDomain" v-model="email" type="email"
                class="mt-12 h-12 md:h-[52px] rounded-lg md:mt-16 bg-white px-3 md:px-4 py-2 border border-[#E6E6E6] text-sm md:w-[335px] w-[103px]" />
            </div>
          </div>
          <div class="flex-1 sm:flex-col">
            <div ref="mobileDropdownRef" class="relative w-[335px] pt-3 md:pt-16">
              <!-- Trigger -->
              <button @click="isOpen = !isOpen"
                class="md:w-[335px] w-[328px] h-12 md:h-[52px] px-2 py-3 border border-gray-300 rounded-md bg-white text-left text-[14px] text-[#8E8D8D] flex items-center justify-between">
                <span>
                  {{ selectedAgeLabel || "직접 입력" }}
                </span>
                <img :src="isOpen ? chevronUp : chevronDown" alt="Chevron Icon" class="w-6 h-6 md:w-7 md:h-7" />
              </button>

              <!-- Dropdown List -->
              <div v-if="isOpen"
                class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-[300px] overflow-auto md:w-[335px] w-[328px] text-[#7B7B7B]">
                <ul class="text-sm divide-y divide-gray-100 md:text-base">
                  <li v-for="item in [
                    { m_id: 1, m_name: 'naver.com' },
                    { m_id: 2, m_name: 'gmail.com' },
                    { m_id: 3, m_name: 'daum.net' },
                    { m_id: 4, m_name: 'hanmail.net' },
                    { m_id: 5, m_name: 'nate.com' },
                  ]" :key="item" @click="selectAgeOption(item.m_id)"
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100" :class="{
                      'bg-gray-100 font-medium': selectedOption === item.m_id,
                    }">
                    {{ item.m_name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <span class="text-[12px] md:text-[16px] font-NotoSansKR-Regularpt text-[#5E5F61]">※ 이메일로 견적서를 보내 드립니다. 정확하게 기재해
          주세요.</span>

        <!-- 여행 희망 사항 -->
        <h2 class="text-[#152123] text-sm md:text-base font-medium mt-5 md:mt-5">
          추가 요청사항<span class="text-[#5E5F61] font-normal">(선택)</span>
        </h2>
        <textarea id="additionalInfo" v-model="additionalInfo" placeholder="ex) 현지식 추가해 주세요"
          class="w-[328px] h-[200px] md:h-[250px] md:w-[1122px] rounded-lg mt-2 md:mt-7 bg-white px-3 md:px-4 py-2 border border-[#E6E6E6] text-sm resize-none"></textarea>

        <!-- Desktop Privacy Agreement -->
        <div class="items-center justify-between hidden mt-5 mb-3 md:flex">
          <div class="flex items-center">
            <div @click="isChecked = !isChecked"
              class="w-6 h-6 md:w-[26px] md:h-[26px] border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white flex-shrink-0">
              <img v-if="isChecked" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
            </div>
            <label class="ml-2 text-sm md:text-base lg:text-lg font-medium text-[#2F312A] cursor-pointer">
              <span class="text-[#E25C5C] mr-2 text-sm md:text-base">(필수)</span>개인정보 수집 및 이용 동의
            </label>
          </div>
          <div class="flex items-center cursor-pointer" @click="openModal">
            <div class="text-sm md:text-base font-medium text-[#2F312A]">
              내용보기
            </div>
            <img :src="rightIcon" alt="Privacy Policy" class="w-4 h-4 ml-2 cursor-pointer md:w-5 md:h-5" />
          </div>
        </div>
        <!-- Mobile Privacy Agreement -->
        <div class="flex items-center justify-between mt-5 mb-20 md:hidden">
          <div class="flex items-center">
            <div @click="isChecked = !isChecked"
              class="w-6 h-6 border border-[#E6E6E6] rounded-full flex items-center justify-center cursor-pointer bg-white flex-shrink-0">
              <img v-if="isChecked" :src="checkCircleIcon" alt="Checked" class="w-full h-full" />
            </div>
            <label class="ml-2 text-sm font-medium text-[#2F312A] cursor-pointer">
              <span class="text-[#E25C5C] mr-2 text-sm">(필수)</span>개인정보
              수집 및 이용 동의
            </label>
          </div>
          <div class="flex items-center cursor-pointer" @click="openModal">
            <div class="text-sm font-medium text-[#2F312A]">내용보기</div>
            <img :src="rightIcon" alt="Privacy Policy" class="w-4 h-4 ml-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
    <PrivacyModal :isOpen="isPrivacyModalOpen" @close="isPrivacyModalOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useApplyPrivatePackageStore } from "@/stores/apply-private-package.store";
import rightIcon from "@/assets/icons/right-icon.svg";
import PrivacyModal from "~/components/utils/privacy-modal.vue";
import checkCircleIcon from "@/assets/icons/check-circle.svg";
import chevronUp from "@/assets/icons/chevron-up.png";
import chevronDown from "@/assets/icons/chevron-down.png";
const store = useApplyPrivatePackageStore();

// Reference form fields
const req_group_name = ref(store.callTime);
const reservationName = ref(store.email.split("@")[0] || "");
const email = ref(store.email.split("@")[1] || "");
const additionalInfo = ref(store.info);
const flight = ref(store.flight || null);
const isChecked = ref(store.privacy);

// Dropdown related variables
const isOpen = ref(false);
const selectedOption = ref(null);
const selectedAgeLabel = computed(() => {
  const emailDomains = [
    { m_id: 1, m_name: "naver.com" },
    { m_id: 2, m_name: "gmail.com" },
    { m_id: 3, m_name: "daum.net" },
    { m_id: 4, m_name: "hanmail.net" },
    { m_id: 5, m_name: "nate.com" },
  ];
  const selected = emailDomains.find(
    (item) => item.m_id === selectedOption.value
  );
  return selected ? selected.m_name : null;
});

const isPrivacyModalOpen = ref(false);

// Watch form fields and update store
watch(req_group_name, (newValue) => {
  store.setCallTime(newValue);
});

// Combined email watcher to prevent circular dependency
watch([reservationName, email], ([newReservationName, newEmail]) => {
  if (newReservationName && newEmail) {
    const fullEmail = `${newReservationName}@${newEmail}`;
    store.setEmail(fullEmail);
  }
});

watch(additionalInfo, (newValue) => {
  store.setInfo(newValue);
});
watch(flight, (newValue) => {
  store.setFlight(newValue);
});
watch(isChecked, (newValue) => {
  store.setPrivacy(newValue);
});

const openModal = () => {
  isPrivacyModalOpen.value = true;
};

// Method to select email domain option
const selectAgeOption = (optionId) => {
  selectedOption.value = optionId;
  isOpen.value = false;

  // Update the email domain part
  const emailDomains = [
    { m_id: 1, m_name: "naver.com" },
    { m_id: 2, m_name: "gmail.com" },
    { m_id: 3, m_name: "daum.net" },
    { m_id: 4, m_name: "hanmail.net" },
    { m_id: 5, m_name: "nate.com" },
  ];
  const selected = emailDomains.find((item) => item.m_id === optionId);
  if (selected) {
    email.value = selected.m_name;
  }
};
</script>
