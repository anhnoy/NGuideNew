<template>
  <div class="max-w-[1080px] bg-transparent mx-auto">
    <!-- <h2
      class="text-[#152123] lg:text-[30px] w-[328px] mx-auto md:w-[620px] text-[22px] font-bold text-center mb-4 lg:p-0 px-16"
    >
      같이 여행하는 인원을 선택해 주세요.
    </h2>
    <p
      class="lg:text-[16px] text-[14px] font-normal text-center text-[#95C3DD] mb-4 lg:p-0 px-16"
    >
      ※ 여행 인원은 총 8명 이상 가능합니다. (골프 여행은 4명 이상)
    </p> -->

    <!-- Desktop View -->
    <div class="hidden sm:block">
      <div
        class="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:w-[550px] justify-between mx-auto"
      >
        <!-- Category 1: Adults -->
        <div class="flex flex-col">
          <div
            class="flex flex-row md:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]"
          >
            <div class="flex items-center w-[134px] h-[34px]">
              <img
                class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                @click="
                  travelStore.travelCustom.selectReq_adults > 0 &&
                    decrement('adults')
                "
                :src="
                  travelStore.travelCustom.selectReq_adults > 0
                    ? minusActive
                    : minusGray
                "
              />

              <p
                class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]"
              >
                {{ travelStore.travelCustom.selectReq_adults }}
              </p>
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="increment('adults')"
                src="@/assets/icons/plus.svg"
              />
            </div>
            <div>
              <p class="text-[16px] font-medium text-[#5E5F61] sm:text-center">
                성인
              </p>
              <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                (만 12세 이상)
              </p>
            </div>
          </div>
        </div>

        <!-- Category 2: Kids -->
        <div class="flex flex-col">
          <div
            class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]"
          >
            <div class="flex items-center w-[134px] h-[34px]">
              <img
                class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                @click="
                  travelStore.travelCustom.selectReq_kids > 0 &&
                    decrement('kids')
                "
                :src="
                  travelStore.travelCustom.selectReq_kids > 0
                    ? minusActive
                    : minusGray
                "
              />
              <p
                class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]"
              >
                {{ travelStore.travelCustom.selectReq_kids }}
              </p>
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="increment('kids')"
                src="@/assets/icons/plus.svg"
              />
            </div>
            <div>
              <p class="text-[16px] text-[#5E5F61] font-medium sm:text-center">
                아동
              </p>
              <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                (만 2세~만 12세 이상)
              </p>
            </div>
          </div>
        </div>

        <!-- Category 3: Infants -->
        <div class="flex flex-col">
          <div
            class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]"
          >
            <div class="flex items-center w-[134px] h-[34px]">
              <img
                class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                @click="
                  travelStore.travelCustom.selectReq_infants > 0 &&
                    decrement('infants')
                "
                :src="
                  travelStore.travelCustom.selectReq_infants > 0
                    ? minusActive
                    : minusGray
                "
              />
              <p
                class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]"
              >
                {{ travelStore.travelCustom.selectReq_infants }}
              </p>
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="increment('infants')"
                src="@/assets/icons/plus.svg"
              />
            </div>
            <div>
              <p class="text-[16px] font-medium text-[#5E5F61] sm:text-center">
                유아
              </p>
              <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                (만 2세 미만)
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Age Group Selection -->
      <div
        class="w-[328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[10px] md:mb-6 sm:w-[620.02px] mx-auto mt-3 md:mt-7"
      >
        <div ref="desktopDropdownRef" class="relative w-[300px] z-9">
          <!-- Trigger -->
          <button
            @click="isOpen = !isOpen"
            class="md:w-[550px] w-[304px] h-[48px] md:h-[52px] px-4 py-3 border border-gray-300 rounded-xl bg-white text-left text-sm text-[#8E8D8D] flex items-center justify-between md:text-base"
          >
            <span
              :class="selectedAgeLabel ? 'text-[#152123]' : 'text-[#8E8D8D]'"
            >
              {{
                selectedAgeLabel || "여행 인원의 주요 연령대를 선택해 주세요."
              }}
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
            class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-40 max-h-[300px] overflow-auto md:w-[550px] w-[304px] md:text-base"
          >
            <ul
              class="text-sm divide-y divide-gray-100 text-[#152123] md:text-base"
            >
              <li
                v-for="ageGroup in ageGroups"
                :key="ageGroup.mg_id"
                @click="selectAgeOption(ageGroup.mg_id)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                :class="{
                  'bg-gray-100 font-medium': selectedOption === ageGroup.mg_id,
                }"
              >
                {{ ageGroup.mg_age }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex items-start gap-3 mt-7">
        <!-- Icon -->
        <img
          src="@/assets/icons/pricetag.png"
          alt="pricetag"
          class="w-[48px] h-[48px]"
        />

        <!-- Text Block -->
        <div class="flex flex-col">
          <div class="text-base text-[#152123] font-medium">
            1인당 희망 예산
          </div>
          <div class="text-sm text-[#EE7913] font-medium">
            {{ formattedReqBid }} 만원 ~ {{ formattedReqBidEnd }} 만원
          </div>
        </div>
      </div>

      <div class="w-[328px] sm:w-[550px] mx-auto md:mt-6 mt-5">
        <img />
        <div class="flex flex-col items-center">
          <div
            class="relative w-[292px] sm:w-[550px] h-[40px] flex items-center z-8"
            ref="slider"
            @click="handleTrackClick"
          >
            <!-- Background track -->
            <div
              class="absolute top-1/2 left-0 w-full h-[4px] bg-[#E6E6E6] rounded-full -translate-y-1/2 z-8"
            ></div>

            <!-- Active range -->
            <div
              class="absolute top-1/2 left-0 h-[4px] bg-[#0EC0CB] rounded-full -translate-y-1/2 z-8"
              :style="{
                width: `${
                  ((req_bid_end - minBudget) / (maxBudget - minBudget)) * 100
                }%`,
              }"
            ></div>

            <!-- Invisible range input -->
            <input
              type="range"
              v-model="req_bid_end"
              :min="minBudget"
              :max="maxBudget"
              :step="step"
              @input="updateBudgetRange"
              class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-8"
            />

            <!-- Clickable Dots -->
            <div
              v-for="(value, index) in budgetOptions"
              :key="index"
              class="absolute transition-all duration-200 rounded-full cursor-pointer z-8"
              :class="[
                index <= activeIndex
                  ? 'bg-[#0EC0CB] w-[18.33px] h-[20px]'
                  : 'bg-[#E6E6E6] w-[8px] h-[8px]',
              ]"
              :style="{
                left: `${(index / (budgetOptions.length - 1)) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }"
              @click.stop="req_bid_end = value"
            />
          </div>

          <!-- <div
            class="flex justify-between items-center w-[328px] md:w-[653px] mt-4"
          >
            <div class="relative flex items-center flex-1">
              <p
                class="text-[#5E5F61] sm:text-lg text-[14px] font-bold bg-[#EDEDF2] border-[#E6E6E6] w-[115px] md:w-[279px] flex justify-center items-center h-[50px] pr-10 pl-2"
              >
                {{ formattedReqBid }}
              </p>

              <label
                class="absolute right-2 sm:text-lg text-[14px] top-1/2 transform -translate-y-1/2 text-[#5E5F61] font-normal"
                >만원</label
              >
            </div>
            <div class="mx-10 my-2 text-xl font-normal text-center text-black">
              ~
            </div>
            <div class="relative flex items-center flex-1">
              <p
                class="text-[#5E5F61] sm:text-lg text-[14px] font-bold bg-[#EDEDF2] border-[#E6E6E6] border w-[115px] md:w-[279px] flex justify-center items-center h-[50px] pr-10 pl-2"
              >
                {{ formattedReqBidEnd }}
              </p>
              <label
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5E5F61] sm:text-lg text-[14px] font-normal"
                >만원</label
              >
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- Mobile Version -->
    <div class="md:hidden">
      <div
        class="grid items-center justify-center pl-2 mx-auto grid-cols- 1 gap- sm:grid-cols-2 md:grid-cols-3"
      >
        <!-- Category 1: Adults -->
        <div class="flex flex-col w-[280px]">
          <div class="flex flex-row items-center justify-between md:flex-col">
            <p class="text-[12px] font-medium text-[#152123] sm:text-center">
              성인 <span class="] mb-2 text-center"> (만 12세 이상) </span>
            </p>

            <div class="flex items-center w-[122px] h-[34px]">
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="
                  travelStore.travelCustom.selectReq_adults > 0 &&
                    decrement('adults')
                "
                :src="
                  travelStore.travelCustom.selectReq_adults > 0
                    ? minusActive
                    : minusGray
                "
              />
              <p
                class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg"
              >
                {{ travelStore.travelCustom.selectReq_adults }}
              </p>
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="increment('adults')"
                src="@/assets/icons/plus.svg"
              />
            </div>
          </div>
        </div>

        <!-- Category 2: Kids -->
        <div class="flex flex-col w-[280px] mt-2">
          <div
            class="flex sm:flex-col justify-between items-center md:w-[164px] md:h-[91px]"
          >
            <p class="text-[12px] text-[#5E5F61] font-medium sm:text-center">
              아동 (만 2세~만 12세 이상)
            </p>

            <div class="flex items-center w-[122px] h-[34px]">
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="
                  travelStore.travelCustom.selectReq_kids > 0 &&
                    decrement('kids')
                "
                :src="
                  travelStore.travelCustom.selectReq_kids > 0
                    ? minusActive
                    : minusGray
                "
              />
              <p
                class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg"
              >
                {{ travelStore.travelCustom.selectReq_kids }}
              </p>
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="increment('kids')"
                src="@/assets/icons/plus.svg"
              />
            </div>
          </div>
        </div>

        <!-- Category 3: Infants -->
        <div class="flex flex-col w-[280px] mt-2">
          <div class="flex items-center justify-between sm:flex-col">
            <p class="text-[12px] font-medium text-[#152123] sm:text-center">
              유아 (만 2세 미만)
            </p>
            <div class="flex items-center w-[122px] h-[34px]">
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="
                  travelStore.travelCustom.selectReq_infants > 0 &&
                    decrement('infants')
                "
                :src="
                  travelStore.travelCustom.selectReq_infants > 0
                    ? minusActive
                    : minusGray
                "
              />
              <p
                class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium rounded-lg"
              >
                {{ travelStore.travelCustom.selectReq_infants }}
              </p>
              <img
                class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                @click="increment('infants')"
                src="@/assets/icons/plus.svg"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Key Age Group Selection -->
      <div
        class="w-[280px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[10px] md:mb-6 sm:w-[620.02px] mx-auto mt-3 md:mt-4"
      >
        <div ref="mobileDropdownRef" class="relative w-[280px]">
          <!-- Trigger -->
          <button
            @click="isOpen = !isOpen"
            class="md:w-[550px] w-[280px] h-[48px] px-2 py-3 border border-gray-300 rounded-xl bg-white text-left text-[12px] text-[#7B7B7B] flex items-center justify-between"
          >
            <span>
              {{
                selectedAgeLabel || "여행 인원의 주요 연령대를 선택해 주세요."
              }}
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
            class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-[300px] overflow-auto md:w-[550px] w-[304px] text-[#7B7B7B]"
          >
            <ul class="text-sm divide-y divide-gray-100 md:text-base">
              <li
                v-for="ageGroup in ageGroups"
                :key="ageGroup.mg_id"
                @click="selectAgeOption(ageGroup.mg_id)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                :class="{
                  'bg-gray-100 font-medium': selectedOption === ageGroup.mg_id,
                }"
              >
                {{ ageGroup.mg_age }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-start mt-[40px] gap-3 w-[304px]">
        <!-- Icon -->
        <img
          src="@/assets/icons/pricetag.png"
          alt="pricetag"
          class="w-[48px] h-[48px]"
        />

        <!-- Text Block -->
        <div class="flex flex-col">
          <div class="text-base text-[#152123] font-medium">
            1인당 희망 예산
          </div>
          <div class="text-sm text-[#EE7913] font-medium">
            {{ formattedReqBid }} 만원 ~ {{ formattedReqBidEnd }} 만원
          </div>
        </div>
      </div>

      <div class="w-[328px] mt-5">
        <img />
        <div class="flex flex-col items-start">
          <div
            class="relative w-[301px] sm:w-[550px] h-[4px] bg-[#E6E6E6] rounded-full"
          >
            <input
              type="range"
              v-model="req_bid_end"
              :min="minBudget"
              :max="maxBudget"
              :step="step"
              @input="updateBudgetRange"
              class="absolute z-10 w-full h-full opacity-0 cursor-pointer"
            />
            <!-- Progress bar fill -->
            <div
              class="absolute h-full bg-[#0EC0CB] rounded-full"
              :style="{
                width: `${
                  ((req_bid_end - minBudget) / (maxBudget - minBudget)) * 100
                }%`,
              }"
            ></div>
            <div
              v-for="(value, index) in budgetOptions"
              :key="index"
              class="absolute transition-all duration-200 rounded-full"
              :class="[
                index <= activeIndex
                  ? 'bg-[#0EC0CB] w-5 h-5 mt-[-6px]'
                  : 'bg-[#EDEDF2] w-2 h-2',
                index <= activeIndex ? 'ml-1' : 'mt-[-2px]',
              ]"
              :style="{
                left: `${(index / (budgetOptions.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
              }"
            ></div>
          </div>
          <!-- <div
            class="flex justify-between items-center w-[328px] md:w-[653px] mt-4"
          >
            <div class="relative flex items-center flex-1">
              <p
                class="text-[#5E5F61] sm:text-lg text-[14px] font-bold bg-[#EDEDF2] border-[#E6E6E6] w-[115px] md:w-[279px] flex justify-center items-center h-[50px] pr-10 pl-2"
              >
                {{ formattedReqBid }}
              </p>

              <label
                class="absolute right-2 sm:text-lg text-[14px] top-1/2 transform -translate-y-1/2 text-[#5E5F61] font-normal"
                >만원</label
              >
            </div>
            <div class="mx-10 my-2 text-xl font-normal text-center text-black">
              ~
            </div>
            <div class="relative flex items-center flex-1">
              <p
                class="text-[#5E5F61] sm:text-lg text-[14px] font-bold bg-[#EDEDF2] border-[#E6E6E6] border w-[115px] md:w-[279px] flex justify-center items-center h-[50px] pr-10 pl-2"
              >
                {{ formattedReqBidEnd }}
              </p>
              <label
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5E5F61] sm:text-lg text-[14px] font-normal"
                >만원</label
              >
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDestinationStore } from "../../../stores/destination.store";
import mainGroup from "@/services/custom-travel.service.js";
import minusActive from "@/assets/icons/minus2.png";
import minusGray from "@/assets/icons/minus1.png";

const travelStore = useDestinationStore();
const ageGroups = ref([]);

// Budget settings
const minBudget = 100;
const maxBudget = 150;
const step = 10;
const budgetOptions = [100, 110, 120, 130, 140, 150];
import chevronUp from "@/assets/icons/chevron-up.png";
import chevronDown from "@/assets/icons/chevron-down.png";

const isOpen = ref(false);
const desktopDropdownRef = ref(null);
const mobileDropdownRef = ref(null);
const handleClickOutside = (event) => {
  const desktopEl = desktopDropdownRef.value;
  const mobileEl = mobileDropdownRef.value;

  // If the click is outside BOTH elements
  if (
    (!desktopEl || !desktopEl.contains(event.target)) &&
    (!mobileEl || !mobileEl.contains(event.target))
  ) {
    isOpen.value = false;
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
// Get label from selected ID
const selectedAgeLabel = computed(() => {
  const selected = ageGroups.value.find(
    (group) => group.mg_id === selectedOption.value
  );
  return selected?.mg_age || "";
});

// This sets value to the store
const selectAgeOption = (id) => {
  selectedOption.value = id;
  isOpen.value = false;
};

const activeIndex = computed(() => {
  return budgetOptions.findIndex(
    (value) => value >= travelStore.travelCustom.req_bid_end
  );
});

const increment = (category) => {
  const currentValue =
    Number(travelStore.travelCustom[`selectReq_${category}`]) || 0;
  if (currentValue < 99) {
    travelStore.travelCustom[`selectReq_${category}`] = String(
      currentValue + 1
    );
  }
};

const decrement = (category) => {
  const currentValue =
    Number(travelStore.travelCustom[`selectReq_${category}`]) || 0;
  if (currentValue > 0) {
    travelStore.travelCustom[`selectReq_${category}`] = String(
      currentValue - 1
    );
  }
};

const formattedReqBid = computed(() =>
  travelStore.travelCustom.req_bid.toLocaleString()
);
const formattedReqBidEnd = computed(() =>
  travelStore.travelCustom.req_bid_end.toLocaleString()
);

const selectedOption = computed({
  get: () => travelStore.travelCustom.selectedOption,
  set: (value) => (travelStore.travelCustom.selectedOption = value),
});

const req_bid_end = computed({
  get: () => travelStore.travelCustom.req_bid_end,
  set: (value) => (travelStore.travelCustom.req_bid_end = Number(value)),
});

const updateBudgetRange = (event) => {
  travelStore.travelCustom.req_bid_end = Number(event.target.value);
};

// Fetch main age groups on component mount
onMounted(async () => {
  const response = await mainGroup.getMainGroup();
  if (response && response.data && response.data.resp) {
    ageGroups.value = response.data.resp;
  }
});
</script>
