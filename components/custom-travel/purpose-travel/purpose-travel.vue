<template>
  <div class="">
    <div class="relative hidden sm:block w-full h-[180px] bg-black">
      <img
        src="@/assets/images/bgcover.png"
        alt="bgcover"
        class="absolute inset-0 object-cover w-full h-full opacity-70"
      />
      <div
        class="absolute z-10 flex items-center gap-2 text-base text-white top-4 left-[300px]"
      >
        <NuxtLink to="/">
          <img src="@/assets/icons/home.png" alt="home" class="w-4 h-4" />
        </NuxtLink>
        <span>&gt;</span>
        <NuxtLink to="/customized-travel">
          <span>맞춤여행 문의 하기</span>
        </NuxtLink>
        <span>&gt;</span>
        <span>맞춤 견적서 신청</span>
      </div>
      <span
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white text-[36px] font-bold z-10"
      >
        맞춤 견적서 신청
      </span>
    </div>

    <div
      class="h-auto md:w-[1282px] md:h-[2370px] max-w-[360px] md:max-w-[1282px] md:min-w-[800px] rounded-xl md:border md:border-[#E6E6E6] md:shadow-xl mx-auto justify-center md:mt-[50px]"
    >
      <div class="md:h-3 bg-[#0EC0CB] rounded-t-xl sm:block hidden"></div>
      <div
        class="md:max-w-[550px] w-[328px] p-3 ml-3 mt-5 bg-white flex flex-col md:flex-row border rounded-xl border-gray-200 h-[972px] md:h-[965px] md:border-white"
      >
        <div
          class="bg-white md:max-w-[550px] md:ml-[60px] md:mt-[50px] md:gap-[32px]"
        >
          <div class="flex items-center">
            <img
              src="@/assets/icons/Cate_icon.png"
              alt="Cate_icon"
              class="w-[45px] h-[45px]"
            />
            <h2
              class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold ml-4 md:ml-7"
            >
              여행 기본 정보
            </h2>
          </div>
          <div
            class="text-[#152123] text-[16px] sm:text-[16px] lg:text-[16px] mb-5 mt-5 font-medium"
          >
            여행 지역
          </div>

          <!-- Country Section -->
          <div
            v-if="isLoadingCountries"
            class="grid grid-cols-3 gap-4 w-full max-w-[550px] mx-auto"
          >
            <div
              v-for="n in 3"
              :key="n"
              class="animate-pulse rounded-xl border border-[#E6E6E6] bg-gray-100 h-[72px] w-[93.33px] md:w-[170px] md:h-[56px]"
            ></div>
          </div>

          <div
            v-else
            class="grid grid-cols-3 gap-4 w-full max-w-[550px] mx-auto"
          >
            <button
              v-for="country in countryOptions"
              :key="country.cid"
              @click="selectRegion(country.cid)"
              class="items-center justify-center md:gap-3 p-3 transition-all duration-200 border md:flex md:flex-row rounded-xl md:w-[170px] md:h-[56px] flex flex-col w-[93.33px] h-[72px]"
              :class="
                isRegionSelected(country.cid)
                  ? 'border-[#0EC0CB] text-[#0EC0CB]'
                  : 'border-[#E6E6E6] text-[#152123]'
              "
            >
              <!-- Radio -->
              <div
                class="w-[20px] h-[20px] border rounded-full mb-1 sm:block hidden"
                :class="
                  isRegionSelected(country.cid)
                    ? 'border-[#0EC0CB]'
                    : 'border-[#E6E6E6]'
                "
              >
                <div
                  v-if="isRegionSelected(country.cid)"
                  class="w-[12px] h-[12px] bg-[#0EC0CB] rounded-full mx-auto mt-[3px]"
                ></div>
              </div>

              <!-- Flag -->
              <img
                :src="country.icon"
                alt="flag"
                class="w-[24px] h-[24px] my-1"
              />

              <!-- Label -->
              <span class="text-sm md:text-base center">
                {{ country.c_name_kr }}
              </span>
            </button>
          </div>
          <!-- ✅ Validation error text -->
          <p v-if="regionError" class="mt-2 text-sm text-red-500 text-start">
            여행 지역을 먼저 선택해 주세요.
          </p>

          <!-- country selection -->

          <!-- Travel Destination -->
          <h2
            class="text-[#152123] text-[14px] sm:text-[16px] lg:text-[16px] font-medium md:mt-5 mt-5"
          >
            여행 목적
          </h2>
          <div
            class="w-[328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[10px] sm:w-[620.02px] mx-auto mt-3 md:mt-5 md:text-base text-sm"
          >
            <div ref="travelDropdownRef" class="relative w-[300px]">
              <!-- Trigger -->
              <button
                @click="isOpen = !isOpen"
                class="md:w-[550px] w-[304px] h-[48px] md:h-[52px] px-4 py-3 border border-gray-300 rounded-xl bg-white text-left text-[#8E8D8D] flex items-center justify-between"
              >
                <span
                  :class="
                    store.travelCustom.selectedDestinationLabel
                      ? 'text-[#152123]'
                      : 'text-[#8E8D8D]'
                  "
                >
                  {{
                    store.travelCustom.selectedDestinationLabel ||
                    "여행 목적을 선택해 주세요."
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
                class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-[] overflow-auto md:w-[550px] w-[304px]"
              >
                <ul class="divide-y divide-gray-100 text-[#152123]">
                  <li
                    v-for="dest in destinations"
                    :key="dest.gid"
                    @click="selectDestination(dest)"
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    :class="{
                      'bg-gray-100 font-medium':
                        store.travelCustom.selectedDestination === dest.gid,
                    }"
                  >
                    {{ dest.label }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!--Fight Trip Tricket -->
          <h2
            class="sm:mb-5 text-[#152123] text-[14px] sm:text-[16px] lg:text-[16px] font-medium mt-3 md:mt-5"
          >
            항공권 여부
          </h2>
          <div
            class="w-[328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 md:gap-[10px] sm:gap-[20px] md:mb-6 sm:w-[620.02px] mx-auto mt-3 md:mt-5"
          >
            <div ref="fightDropdownRef" class="relative w-[300px]">
              <div class="relative">
                <!-- Trigger -->
                <button
                  @click="isOpenFight = !isOpenFight"
                  class="md:w-[550px] w-[304px] h-[48px] md:h-[52px] px-4 py-3 border border-gray-300 rounded-xl bg-white text-left text-sm text-[#8E8D8D] flex items-center justify-between md:text-base"
                >
                  <span
                    :class="
                      selectedFlightLabel ? 'text-[#152123]' : 'text-[#8E8D8D]'
                    "
                  >
                    {{ selectedFlightLabel || "항공권 여부를 선택해 주세요." }}
                  </span>
                  <img
                    :src="isOpenFight ? chevronUp : chevronDown"
                    class="w-6 h-6 md:w-7 md:h-7"
                  />
                </button>

                <!-- Dropdown -->
                <div
                  v-if="isOpenFight"
                  class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-[250px] overflow-auto w-[304px] md:w-[550px] md:text-base"
                >
                  <ul
                    v-if="flightOptions.length"
                    class="divide-y divide-gray-100 text-[#152123]"
                  >
                    <li
                      v-for="option in flightOptions"
                      :key="option.value"
                      @click="selectFlight(option)"
                      class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {{ option.label }}
                    </li>
                  </ul>
                  <p v-else class="px-4 py-2 text-sm text-gray-400">
                    불러올 항공권 옵션이 없습니다.
                  </p>
                </div>
              </div>
              <!-- </template> -->

              <h2
                class="text-[#5E5F61] text-[10px] sm:text-[10px] lg:text-[14px] mt-2 md:w-[550px] w-[300px]"
              >
                ※ ‘항공권 포함’ 선택 시 항공권 견적도 같이 보내 드려요.
              </h2>
            </div>
          </div>
          <!-- Date picker -->
          <div class="hidden sm:block">
            <h2
              class="sm:mb-2 text-[#152123] text-[14px] sm:text-[16px] lg:text-[16px] font-medium md:mb-5"
            >
              여행 일정
            </h2>
            <datePicker />
          </div>
          <div
            class="md:hidden mt-7 w-[304px] h-[161px] bg-[#E9F5FF] rounded-xl"
          >
            <h2
              class="sm:mb-2 ml-3 text-[#152123] text-[14px] sm:text-[16px] lg:text-[16px] font-medium pt-1"
            >
              여행 일정
            </h2>
            <datePicker />
          </div>
          <!-- Tourism -->
          <div class="hidden sm:block">
            <h2
              class="sm:mb-2 mt-5 text-[#152123] text-[22px] sm:text-[16px] lg:text-[16px] font-medium md:mb-7"
            >
              여행 인원
            </h2>
            <tourism />
          </div>
          <div
            class="md:hidden mt-5 w-[304px] h-[245px] bg-[#E9F5FF] rounded-xl"
          >
            <h2
              class="text-[#152123] text-[16px] sm:text-[16px] lg:text-[16px] font-medium px-4 pt-3"
            >
              여행 인원
            </h2>
            <tourism class="mt-1" />
          </div>

          <!-- Bottom panel -->
          <div class="mt-[4px] hidden sm:block">
            <bottomPanel />
          </div>
          <div class="justify-center hidden md:mt-[30px] sm:block md:flex">
            <button
              @click="handleConfirm"
              class="md:w-[284px] md:h-[56px] bg-[#2F312A] text-white justify-center items-center rounded-[8px] text-[20px] font-medium"
            >
              맞춤 여행 신청하기
            </button>
          </div>
        </div>
        <!-- Right panel -->
        <!-- Wrapper for sticky behavior -->
        <div
          ref="stickyWrapper"
          class="md:w-[540px] md:h-auto md:mt-[30px] md:ml-[60px] mt-[100px] sm:block hidden"
        >
          <div
            ref="stickyPanel"
            class="bg-[#E9F5FF] p-6 rounded-xl shadow-sm transition-all duration-300 ease-in-out"
            :class="{ 'fixed top-[50px] ': isSticky }"
          >
            <div class="flex items-center gap-[32px] mb-4 mt-3">
              <img
                src="@/assets/icons/location_icon.png"
                alt="location"
                class="md:h-[45px] md:w-[45px]"
              />
              <h2 class="text-[#1E3A8A] md:text-[22px] font-bold">
                가고 싶은 관광지
              </h2>
            </div>

            <div class="panel-scrollable-content">
              <rightPanel @change="handleRightPanelChange" />
            </div>
          </div>
        </div>
      </div>
      <!-- ✅ Mobile Layout Only -->
      <div class="flex flex-col gap-6 px-4 py-6 md:hidden">
        <!-- Top Panel -->
        <div
          class="bg-white w-full max-w-[328px] mx-auto rounded-xl border border-[#E6E6E6] shadow-sm"
        >
          <div class="flex items-center gap-4 px-4 pt-4">
            <img
              src="@/assets/icons/location_icon2.png"
              alt="location"
              class="w-[32px] h-[32px] md:w-[45px] md:h-[45px]"
            />
            <h2 class="text-[#152123] text-[16px] md:text-[22px] font-bold">
              가고 싶은 관광지
            </h2>
          </div>
          <div class="px-2 pt-5 pb-4">
            <rightPanel @change="handleRightPanelChange" />
          </div>
        </div>

        <!-- Bottom Panel -->
        <div class="bg-white w-full max-w-[328px] shadow-sm">
          <bottomPanel />
        </div>
      </div>
      <div
        class="sm:hidden fixed bottom-0 left-0 w-full bg-[#2F312A] h-[50px] p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50"
      >
        <button
          @click="handleConfirm"
          class="w-full h-[50px] bg-[#2F312A] text-white flex justify-center rounded-[8px] text-[16px] font-medium px-4"
        >
          맞춤 여행 신청하기
        </button>
      </div>
    </div>
    <div class="h-[50px]"></div>
  </div>
  <!-- Inside <template> of your page -->
  <ValidationModal
    :visible="isValidationVisible"
    :message="validationMessage"
    @close="handleValidationClose"
  />

  <SuccessModal :visible="showSuccess" @close="handleSuccessClose" />
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  onUnmounted,
} from "vue";

import { useDestinationStore } from "@/stores/destination.store";
import trophyIcon from "@/assets/icons/trophy.svg";
import userIcon from "@/assets/icons/users.svg";
import heartIcon from "@/assets/icons/heart.svg";
import pilgrimageIcon from "@/assets/icons/pilgrimage.svg";
import golfIcon from "@/assets/icons/golf.svg";
import businessIcon from "@/assets/icons/business.svg";
import chevronUp from "@/assets/icons/chevron-up.png";
import chevronDown from "@/assets/icons/chevron-down.png";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import moment from "moment";
import dateIcon from "@/assets/icons/calendar.svg";
import rightPanel from "./rightPanel.vue";
import bottomPanel from "./bottomPanel.vue";
import regionService from "../../../services/region.service";
import datePicker from "./date-picker.vue";
import tourism from "../tourism/tourism.vue";
import selectPlace from "../select-place/select-place.vue";
import { right } from "@popperjs/core";
import customTravelService from "@/services/custom-travel.service";
import ValidationModal from "@/components/utils/validationModal.vue";
import SuccessModal from "@/components/utils/SuccessModal.vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["confirm"]);
const router = useRouter();
const isValidationVisible = ref(false);
const validationMessage = ref("");
const isSticky = ref(false);
const stickyWrapper = ref(null);
const triggerOffset = 400; // 👈 Set to the position where you want it to start sticking
const stickyPanel = ref(null);
const initialTopOffset = ref(0);
const showSuccessModal = ref(false);
const successMessage = ref("");

const handleRightPanelChange = () => {
  emit("confirm");
};

const handleScroll = () => {
  if (stickyWrapper.value) {
    const wrapperRect = stickyWrapper.value.getBoundingClientRect();
    // Panel becomes sticky when its wrapper's top edge is 50px from the viewport top.
    isSticky.value = wrapperRect.top <= 50;
  }
};

onMounted(() => {
  if (stickyPanel.value) {
    initialTopOffset.value =
      stickyPanel.value.getBoundingClientRect().top + window.scrollY;
  }
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// const handleScroll = () => {
//   const scrollY = window.scrollY || document.documentElement.scrollTop;
//   const triggerPoint = (stickyWrapper.value?.offsetTop || 0) + triggerOffset;

//   isSticky.value = scrollY >= triggerPoint;
// };

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const regionError = ref(false); // for showing red warning
// Show modal with message
const showValidation = (msg) => {
  validationMessage.value = msg;
  isValidationVisible.value = true;
};
const validateRegion = () => {
  const data = store.travelCustom;
  if (!data.region) {
    regionError.value = "여행 지역을 선택해 주세요."; // ✅ show red warning
    return false;
  }
};

const validateFields = () => {
  const data = store.travelCustom;
  // destination
  if (!data.selectedDestinationLabel) {
    showValidation("여행 목적을 선택해 주세요.");
    return false;
  }
  // Flight validation
  if (!data.selectedFlight) {
    showValidation("항공권 여부를 선택해 주세요.");
    return false;
  }
  // Date validation
  if (!data.startDate || !data.endDate) {
    showValidation("여행 일정을 선택해 주세요.");
    return false;
  }
  // Adults validation
  if (!data.selectReq_adults || Number(data.selectReq_adults) === 0) {
    showValidation("여행 인원을 선택해 주세요.");
    return false;
  }

  // Option validation
  if (!data.selectedOption) {
    showValidation("모든 항목을 선택해 주세요.");
    return false;
  }
  // group name
  if (!data.req_group_name) {
    showValidation(" 관광단체명을 입력해 주세요.");
    return false;
  }
  // resevation name
  if (!data.reservationName) {
    showValidation("예약자 성함을 입력해 주세요.");
    return false;
  }
  // email
  if (!data.email) {
    showValidation("이메일을 입력해 주세요.");
    return false;
  }
  // call time
  if (!data.req_callable_time) {
    showValidation("통화 가능 시간을 입력해 주세요.");
    return false;
  }
  // phone
  if (!data.phone) {
    showValidation("휴대푠 번호와 인증 번호를 입력해 주세요.");
    return false;
  }
  // secret code
  if (!data.OtpChecked) {
    showValidation("휴대푠 번호와 인증 번호를 입력해 주세요.");
    return false;
  }
  // isChecked
  if (!data.isChecked) {
    showValidation("개인정보 수집 및 이용 동의에 체크해 주세요.");
    return false;
  }
  // right panel
  // Accommodation
  if (!data.selectedAccommodations) {
    showValidation("숙소 옵션을 선택해 주세요.");
    return false;
  }
  // bed
  if (!Array.isArray(data.additionList) || data.additionList.length === 0) {
    showValidation("기타 옵션을 선택해 주세요.");
    return false;
  }
  // Food
  if (!data.req_inc_food) {
    showValidation("식사 옵션을 선택해 주세요.");
    return false;
  }
  // Addition
  if (!Array.isArray(data.additionList) || data.additionList.length === 0) {
    showValidation("기타 옵션을 선택해 주세요.");
    return false;
  }
  // Place to visit
  if (typeof data.hasPlaceToVisit !== "boolean") {
    showValidation(
      "가고 싶은 관광지를 선택하거나, 전문가한테 요청하기를 선택하세요."
    );
    return false;
  }
  // Add more as needed...
  return true;
};

// Refs to control calendar visibility
const showStartCalendar = ref(false);
const showEndCalendar = ref(false);
const startCalendarRef = ref(null);
const endCalendarRef = ref(null);

const flightOptions = ref([]);
const selectedFlightLabel = ref("");

const handleClickOutside = (event) => {
  if (
    showEndCalendar.value &&
    endCalendarRef.value &&
    !endCalendarRef.value.contains(event.target)
  ) {
    showEndCalendar.value = false;
  }
};

const handleClickOutsideStart = (event) => {
  if (
    showStartCalendar.value &&
    startCalendarRef.value &&
    !startCalendarRef.value.contains(event.target)
  ) {
    showStartCalendar.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutsideStart);
  document.addEventListener("mousedown", handleClickOutside); // end calendar
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutsideStart);
  document.removeEventListener("mousedown", handleClickOutside);
});

// Model configuration for DatePicker
const modelConfig = {
  type: "string",
  mask: "YYYY-MM-DD",
};

// Masks for input formatting
const masks = {
  input: "YYYY-MM-DD",
};

// Custom locale configuration
const customLocale = {
  id: "EN",
  firstDayOfWeek: 1,
  masks: {
    weekdays: "WW",
  },
};

// Flight List
const fightDropdownRef = ref(null);
const isOpenFight = ref(false);
const handleFlightClickOutside = (event) => {
  if (
    fightDropdownRef.value &&
    !fightDropdownRef.value.contains(event.target)
  ) {
    isOpenFight.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleFlightClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleFlightClickOutside);
});
const getFightlist = async () => {
  try {
    const response = await regionService.getFight();

    console.log("✅ flight raw:", response.data); // double check

    // FIXED: use response.data directly
    flightOptions.value = response.data.map((item) => ({
      value: item.fts_id,
      label: item.fts_name_kr, // use Korean name
    }));
  } catch (e) {
    console.error("🚨 Failed to fetch flight list", e);
  }
};

onMounted(async () => {
  getFightlist();
});
const selectFlight = (option) => {
  selectedFlightLabel.value = option.label;
  store.setSelectedFlight(option.value);
  store.setSelectedFlightLabel(option.label); // ✅ Save to store
  isOpenFight.value = false;
};

const isOpen = ref(false);
// Contry list
const countryIcons = {
  Laos: new URL("@/assets/icons/Flag-map-lao.png", import.meta.url).href,
  Thailand: new URL("@/assets/icons/Flag-map-thailand.png", import.meta.url)
    .href,
  Vietnam: new URL("@/assets/icons/Flag-map-vietnam.png", import.meta.url).href,
};
const countryOptions = ref([]);
const isLoadingCountries = ref(true);
// ✅ Step 1: Fetch country data
const getCountryList = async () => {
  isLoadingCountries.value = true;
  try {
    const response = await regionService.getCountry();
    countryOptions.value = response.data.map((item) => ({
      cid: item.cid,
      c_name: item.c_name,
      c_name_kr: item.c_name_kr,
      icon: item.c_image || "",
    }));
  } catch (e) {
    console.error("❌ Failed to fetch country list", e);
  } finally {
    isLoadingCountries.value = false;
  }
};

// Step 3: Select + Check
const selectRegion = (id) => {
  store.travelCustom.region = id.toString();
  regionError.value = "";
};

const isRegionSelected = (id) => store.travelCustom.region === id.toString();

onMounted(() => {
  getCountryList();
});
const handleNext = () => {
  if (!store.travelCustom.region) {
    alert("먼저 지역(라오스, 태국, 베트남)을 선택해 주세요.");
    return;
  }

  isVisible.value = 2; // or go to next screen
};

// Computed attributes for highlighting date range
const attributes = computed(() => {
  if (store.travelCustom.startDate && store.travelCustom.endDate) {
    return [
      {
        key: "dateRange",
        highlight: true,
        dates: {
          start: store.travelCustom.startDate,
          end: store.travelCustom.endDate,
        },
      },
    ];
  }
  return [];
});

// Define selectedColor to be orange
// const selectedColor = ref('orange')

// Formats start and end dates using Moment.js
const formattedStartDate = computed(() =>
  store.travelCustom.startDate
    ? moment(store.travelCustom.startDate).format("YYYY-MM-DD")
    : null
);
const formattedEndDate = computed(() =>
  store.travelCustom.endDate
    ? moment(store.travelCustom.endDate).format("YYYY-MM-DD")
    : null
);

// Handle date selection
const onStartDateSelect = (date) => {
  store.travelCustom.startDate = moment(date).format("YYYY-MM-DD");
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showStartCalendar.value = false;
  }
};

const onEndDateSelect = (date) => {
  if (!store.travelCustom.startDate) {
    store.travelCustom.startDate = moment(date).format("YYYY-MM-DD");
  }
  store.travelCustom.endDate = moment(date).format("YYYY-MM-DD");
  // Close the calendar on mobile after selection
  if (window.innerWidth < 768) {
    showEndCalendar.value = false;
  }
};

// Functions to handle selection changes
const selectDeparture = (time) => {
  store.travelCustom.selectedDeparture =
    store.travelCustom.selectedDeparture === time ? null : time;
};

const selectArrival = (time) => {
  store.travelCustom.selectedArrival =
    store.travelCustom.selectedArrival === time ? null : time;
};
const store = useDestinationStore();

const selected = ref(null);

const regions = ref([
  {
    value: "1",
    name: "라오스",
    icon: new URL("~/assets/icons/Flag-map-lao.png", import.meta.url).href,
  },
  {
    value: "2",
    name: "태국​",
    icon: new URL("~/assets/icons/Flag-map-thailand.png", import.meta.url).href,
  },
  {
    value: "3",
    name: "베트남(카카오톡 문의)",
    icon: new URL("~/assets/icons/Flag-map-vietnam.png", import.meta.url).href,
  },
]);

const destinations = ref([
  { gid: 1, icon: trophyIcon, label: "기업포상" },
  { gid: 2, icon: userIcon, label: "친목" },
  { gid: 3, icon: heartIcon, label: "가족/효도" },
  { gid: 4, icon: pilgrimageIcon, label: "성지순례" },
  { gid: 5, icon: businessIcon, label: "비즈니스" },
  { gid: 6, icon: golfIcon, label: "골프" },
  { gid: 7, icon: "", label: "기타" },
]);

const themes = ref([
  { th_id: 1, label: "명소관광", value: "sightseeing" },
  { th_id: 2, label: "미식", value: "gourmet" },
  { th_id: 3, label: "문화 체험", value: "cultural_experience" },
  { th_id: 4, label: "쇼핑", value: "shopping" },
  { th_id: 5, label: "역사 체험", value: "historical_experience" },
  { th_id: 6, label: "트레킹", value: "trekking" },
  { th_id: 7, label: "예술", value: "art" },
  { th_id: 8, label: "스포츠", value: "sports" },
  { th_id: 9, label: "전통", value: "tia" },
  { th_id: 10, label: "힐링 여행", value: "healing_trip" },
  { th_id: 11, label: "음주", value: "drinking" },
  { th_id: 12, label: "기타", value: "other" },
]);

const selectTricket = (tricket) => {
  if (store.travelCustom.selectedDestination === tricket.gid) {
    store.clearDestination();
    store.travelCustom.selectedDestinationLabel = "";
  } else {
    store.selectTricket(tricket.gid);
    store.travelCustom.selectedDestinationIcon = tricket.icon;
    store.travelCustom.selectedDestinationLabel = tricket.label;
  }
  isOpen.value = false; // close dropdown
};
const travelDropdownRef = ref(null);
const selectDestination = (destination) => {
  if (store.travelCustom.selectedDestination === destination.gid) {
    store.clearDestination();
    store.travelCustom.selectedDestinationLabel = "";
  } else {
    store.setSelectedDestination(destination.gid);
    store.travelCustom.selectedDestinationIcon = destination.icon;
    store.travelCustom.selectedDestinationLabel = destination.label;
  }
  isOpen.value = false; // close dropdown
};
const handleClickOutsideTravel = (event) => {
  if (
    travelDropdownRef.value &&
    !travelDropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutsideTravel);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideTravel);
});

// const selectRegion = (value) => {
//   if (store.travelCustom.region === value) {
//     store.travelCustom.region = ""; // Deselect if already selected
//   } else {
//     store.travelCustom.region = value; // Select the new option
//     if (value === "1" || value === "2") {
//       store.travelCustom.selectedPlaces = [];
//       store.travelCustom.trip_req = [];
//     }
//   }
// };

const toggleTheme = (theme) => {
  // Toggle the theme selection
  store.toggleSelectedTheme(theme.th_id);

  // Check if the theme is now selected
  const isSelected = store.travelCustom.selectedThemes.some(
    (selected) => selected.th_id === theme.th_id
  );

  if (isSelected) {
    // If selected, add the label to the array if not already present
    if (!store.travelCustom.selectedThemeLabel.includes(theme.label)) {
      store.travelCustom.selectedThemeLabel.push(theme.label);
    }
  } else {
    // If deselected, remove the label from the array
    store.travelCustom.selectedThemeLabel =
      store.travelCustom.selectedThemeLabel.filter(
        (label) => label !== theme.label
      );
  }
};
const clearStoreData = () => {
  store.clearSelection();
};
const showSuccess = ref(false);
const handleConfirm = async () => {
  if (!validateFields()) return;

  try {
    const respone = await customTravelService.getToken();
    const token = respone.token;
    const tc = store.travelCustom;

    const storeData = {
      fts_id: tc.selectedFlight,
      req_callable_time: tc.req_callable_time,
      req_group_name: tc.req_group_name || "",
      req_book_name: tc.reservationName,
      req_book_email: tc.email,
      req_book_phone: tc.phone,
      req_book_pass: "autonlao@1108",
      req_book_pass_confirm: "autonlao@1108",
      req_hotel: tc.selectedAccommodations,
      req_depart: tc.startDate,
      req_arr: tc.endDate,
      req_adults: tc.selectReq_adults,
      req_kids: tc.selectReq_kids,
      req_infant: tc.selectReq_infants,
      req_main_group: tc.selectedOption,
      req_inc_food: tc.req_inc_food,
      req_bid: tc.req_bid,
      req_bid_end: tc.req_bid_end,
      req_depart_period: tc.selectedDeparture,
      req_arr_period: tc.selectedArrival,
      req_vehicle: tc.selectedVehicles,
      req_opt: tc.additionalInfo,
      trip_req: tc.trip_req,
      goal_selected: tc.selectedDestination,
      theme_selected: tc.selectedThemes,
      room_selected: tc.selectedBeds,
      rif_id: tc.req_inc_food,
      strict_list: tc.strictList,
      addition_list: tc.additionList,
      countrys: Array.isArray(tc.region)
        ? tc.region.map((c) => ({ cid: c }))
        : [{ cid: tc.region }],
      token: token,
    };

    const response = await customTravelService.createInform(storeData);

    if (response.status === 200) {
      showSuccess.value = true; // ✅ Show success modal here
    } else if (response.status === 404) {
      router.push("/");
    }
  } catch (error) {
    console.error("❌ 저장 실패:", error);
  } finally {
    clearStoreData();
  }
};

const handleValidationClose = () => {
  isValidationVisible.value = false; // Just close modal — no reset
};

const handleSuccessClose = () => {
  showSuccess.value = false;
  store.travelCustom = {}; // ✅ Reset only after successful submission
  router.push("/");
};
</script>

<style scoped>
.panel-scrollable-content {
  max-height: calc(100vh - 250px);
  overflow-y: auto; /* Allows content to scroll vertically if it exceeds max-height */

  /* --- Styles to hide the scrollbar --- */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  scrollbar-width: none; /* For Firefox */
}

/* For WebKit browsers (Chrome, Safari, newer Edge) to hide scrollbar */
.panel-scrollable-content::-webkit-scrollbar {
  display: none;
}
</style>
