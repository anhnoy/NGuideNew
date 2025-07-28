<template>
    <div class="">
        <div class="relative hidden sm:block w-full h-[180px] bg-black">
            <img src="@/assets/images/bgcover.png" alt="bgcover"
                class="absolute inset-0 object-cover w-full h-full opacity-70" />
            <div class="absolute z-10 flex items-center gap-2 text-base text-white top-4 left-[300px]">
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
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white text-[36px] font-bold z-10">
                맞춤 견적서 신청
            </span>
        </div>

        <div
            class="h-auto md:w-[1282px] md:h-[1650px] rounded-xl md:border md:border-[#E6E6E6] md:shadow-xl mx-auto justify-center md:mt-[50px] mt-[50px]">
            <div class="md:h-3 bg-[#0EC0CB] rounded-t-xl sm:block hidden"></div>
            <div
                class="md:max-w-[550px] w-[328px] p-3 ml-3 mt-3 bg-white flex flex-col md:flex-row border-none md:border rounded-xl border-gray-200 h-[972px] md:h-[965px] md:border-white">
                <div class="bg-white md:max-w-[550px] md:ml-[60px] md:mt-[50px] md:gap-[32px]">
                    <div class="hidden md:flex items-center">
                        <img src="@/assets/icons/person_icon.png" alt="person_icon" class="w-[45px] h-[45px]" />
                        <h2 class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold ml-4 md:ml-7">
                            예약자 정보
                        </h2>
                    </div>
                    <div class="flex flex-col md:hidden gap-4 pl-4 pb-4">
                        <h2 class="text-[#152123] text-[16px] sm:text-[30px] lg:text-[22px] font-bold">
                            단독패키지명
                        </h2>
                        <div class="flex flex-row items-center gap-4 rounded-xl bg-[#F6F6F6] p-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/250px-Ash_Tree_-_geograph.org.uk_-_590710.jpg"
                                alt="Private package"
                                class="w-[70px] h-[70px] min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] rounded-md object-cover" />
                            <span class="text-[#152123] text-[12px] font-NotoSansKR-Regular">태국 방콕&파타야
                                관광과 휴양을 동시에! 3박 5일 499,000원~</span>
                        </div>

                    </div>
                    <div class="flex flex-row">
                        <div>
                            <h2 class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0">
                                예약자 성함
                            </h2>
                            <!-- Tour Group -->
                            <input id="req_group_name" v-model="applyStore.name" type="text"
                                placeholder="예약자 성함을 입력해 주세요."
                                class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm p-2 md:mt-7" />
                            <h2 class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0">
                                휴대폰 번호
                            </h2>
                            <!-- Tour Group -->
                            <input id="req_group_name" v-model="applyStore.phone" type="text"
                                placeholder="휴대폰 번호를 입력해 주세요."
                                class="rounded-lg md:w-[550px] md:h-[52px] md:rounded-lg mt-4 bg-white md:px-4 md:py-2 border border-[#E6E6E6] w-[304px] h-[48px] md:ml-0 ml-3 text-sm p-2 md:mt-7" />
                            <!-- Date picker -->
                            <div>
                                <h2
                                    class="sm:mb-2 text-[#152123] text-[14px] sm:text-[16px] lg:text-[16px] font-medium md:mb-5 ml-5 md:ml-0 mt-3">
                                    여행 출발 날짜
                                </h2>
                                <datePicker />
                            </div>
                            <h2
                                class="bg-[#F6F6F6] md:bg-white rounded-t-xl  sm:mb-2 mt-3 text-[#152123] text-[16px] sm:text-[16px] lg:text-[16px] font-medium md:mb-7 p-4 md:ml-0">
                                여행 인원
                            </h2>
                            <div class="hidden sm:block">
                                <div
                                    class="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:w-[550px] justify-between mx-auto">
                                    <!-- Category 1: Adults -->
                                    <div class="flex flex-col">
                                        <div
                                            class="flex flex-row md:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]">
                                            <div class="flex items-center w-[134px] h-[34px]">
                                                <img class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                                                    @click="
                                                        applyStore.adults > 0 &&
                                                        decrement('adults')
                                                        " :src="applyStore.adults > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />

                                                <p
                                                    class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]">
                                                    {{ applyStore.adults }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('adults')" src="@/assets/icons/plus.svg" />
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
                                            class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]">
                                            <div class="flex items-center w-[134px] h-[34px]">
                                                <img class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                                                    @click="
                                                        applyStore.kids > 0 &&
                                                        decrement('kids')
                                                        " :src="applyStore.kids > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]">
                                                    {{ applyStore.kids }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('kids')" src="@/assets/icons/plus.svg" />
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
                                            class="flex sm:flex-col justify-between items-center w-[300px] md:w-[164px] md:h-[91px]">
                                            <div class="flex items-center w-[134px] h-[34px]">
                                                <img class="w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-[110%]"
                                                    @click="
                                                        applyStore.infants > 0 &&
                                                        decrement('infants')
                                                        " :src="applyStore.infants > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[60px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[16px]">
                                                    {{ applyStore.infants }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('infants')" src="@/assets/icons/plus.svg" />
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
                                    class="w-[328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[10px] md:mb-6 sm:w-[620.02px] mx-auto mt-3 md:mt-7">
                                    <div ref="desktopDropdownRef" class="relative w-[300px] z-30">

                                        <!-- Dropdown List -->
                                        <div v-if="isOpen"
                                            class="absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-40 max-h-[300px] overflow-auto md:w-[550px] w-[304px] md:text-base">
                                            <ul class="text-sm divide-y divide-gray-100 text-[#152123] md:text-base">
                                                <li v-for="ageGroup in ageGroups" :key="ageGroup.mg_id"
                                                    @click="selectAgeOption(ageGroup.mg_id)"
                                                    class="px-4 py-2 cursor-pointer hover:bg-gray-100" :class="{
                                                        'bg-gray-100 font-medium': selectedOption === ageGroup.mg_id,
                                                    }">
                                                    {{ ageGroup.mg_age }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Mobile Version -->
                            <div class="md:hidden">
                                <div
                                    class="bg-[#F6F6F6] rounded-b-xl grid items-center justify-center mx-auto grid-cols- 1 gap- sm:grid-cols-2 md:grid-cols-3 pb-2 pl-2">
                                    <!-- Category 1: Adults -->
                                    <div class="flex flex-col w-[280px]">
                                        <div class="flex flex-row items-center justify-between md:flex-col">
                                            <p class="text-[12px] font-medium text-[#152123] sm:text-center">
                                                성인 <span class="mb-1 text-center"> (만 12세 이상) </span>
                                            </p>

                                            <div class="flex items-center w-[122px] h-[34px]">
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="
                                                        applyStore.adults > 0 &&
                                                        decrement('adults')
                                                        " :src="applyStore.adults > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg">
                                                    {{ applyStore.adults }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('adults')" src="@/assets/icons/plus.svg" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Category 2: Kids -->
                                    <div class="flex flex-col w-[280px] mt-1">
                                        <div
                                            class="flex sm:flex-col justify-between items-center md:w-[164px] md:h-[91px]">
                                            <p class="text-[12px] text-[#5E5F61] font-medium sm:text-center">
                                                아동 (만 2세~만 12세 이상)
                                            </p>

                                            <div class="flex items-center w-[122px] h-[34px]">
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="
                                                        applyStore.kids > 0 &&
                                                        decrement('kids')
                                                        " :src="applyStore.kids > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium md:text-[18px] rounded-lg">
                                                    {{ applyStore.kids }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('kids')" src="@/assets/icons/plus.svg" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Category 3: Infants -->
                                    <div class="flex flex-col w-[280px] mt-1">
                                        <div class="flex items-center justify-between sm:flex-col">
                                            <p class="text-[12px] font-medium text-[#152123] sm:text-center">
                                                유아 (만 2세 미만)
                                            </p>
                                            <div class="flex items-center w-[122px] h-[34px]">
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="
                                                        applyStore.infants > 0 &&
                                                        decrement('infants')
                                                        " :src="applyStore.infants > 0
                                                            ? minusActive
                                                            : minusGray
                                                            " />
                                                <p
                                                    class="w-[50px] lg:w-[50px] lg:max-w-full h-[34px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white font-medium rounded-lg">
                                                    {{ applyStore.infants }}
                                                </p>
                                                <img class="cursor-pointer hover:scale-[110%] w-[24px] h-[24px] md:w-[30px] md:h-[30px]"
                                                    @click="increment('infants')" src="@/assets/icons/plus.svg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <div
                                class="flex rounded-xl flex-col h-[444px] w-[447px] border border-[#CFE8FD] bg-[#E9F5FF] p-4">
                                <div class="flex flex-col gap-4">
                                    <h2
                                        class="text-[#152123] text-[16px] lg:text-[16px] font-medium md:mt-5 ml-4 md:ml-0">
                                        단독패키지명
                                    </h2>
                                    <div class="p-4 rounded-xl bg-white flex flex-row gap-4 items-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/250px-Ash_Tree_-_geograph.org.uk_-_590710.jpg"
                                            alt="Private package"
                                            class="w-[84px] h-[84px] min-w-[84px] min-h-[84px] max-w-[84px] max-h-[84px] rounded-md object-cover" />

                                        <span class="text-[#152123] text-[16px] lg:text-[16px] font-medium">태국 방콕&파타야
                                            관광과 휴양을 동시에! 3박 5일 499,000원~</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom panel -->
                    <div class="mt-2 ">
                        <bottomPanel />
                    </div>
                    <div class="justify-center hidden md:mt-[30px] sm:block md:flex">
                        <button @click="handleConfirm"
                            class="md:w-[284px] md:h-[56px] bg-[#2F312A] text-white justify-center items-center rounded-[8px] text-[20px] font-medium">
                            신청하기
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="sm:hidden fixed bottom-0 left-0 w-full bg-[#2F312A] h-[50px] p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50">
                <button @click="handleConfirm"
                    class="w-full h-[50px] bg-[#2F312A] text-white flex justify-center items-center rounded-[8px] text-[16px] font-medium">
                    신청하기
                </button>
            </div>
        </div>
        <div class="h-[50px]"></div>
    </div>
    <!-- Inside <template> of your page -->
    <ValidationModal :visible="isValidationVisible" :message="validationMessage" @close="handleModalClose" />
    <SuccessModal :visible="showSuccess" @close="showSuccess = false" />
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

import { useApplyPrivatePackageStore } from "@/stores/apply-private-package.store";
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
import bottomPanel from "./bottomPanel.vue";
import regionService from "../../../services/region.service";
import datePicker from "./date-picker.vue";
import tourism from "@/components/custom-travel/tourism/tourism.vue";
// import selectPlace from "../select-place/select-place.vue";
import { right } from "@popperjs/core";
import customTravelService from "@/services/custom-travel.service";
import ValidationModal from "@/components/utils/validationModal.vue";
import SuccessModal from "@/components/utils/SuccessModal.vue";
import mainGroup from "@/services/custom-travel.service.js";
import minusActive from "@/assets/icons/minus2.png";
import minusGray from "@/assets/icons/minus1.png";

const applyStore = useApplyPrivatePackageStore();
const travelStore = useDestinationStore();
const ageGroups = ref([]);

// Budget settings
const minBudget = 100;
const maxBudget = 150;
const step = 10;
const budgetOptions = [100, 110, 120, 130, 140, 150];

const desktopDropdownRef = ref(null);
const mobileDropdownRef = ref(null);
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
        (value) => value >= applyStore.req_bid_end
    );
});

const increment = (category) => {
    const currentValue = Number(applyStore[category]) || 0;
    if (currentValue < 99) {
        applyStore[`set${category.charAt(0).toUpperCase() + category.slice(1)}`](currentValue + 1);
    }
};

const decrement = (category) => {
    const currentValue = Number(applyStore[category]) || 0;
    if (currentValue > 0) {
        applyStore[`set${category.charAt(0).toUpperCase() + category.slice(1)}`](currentValue - 1);
    }
};

const formattedReqBid = computed(() =>
    applyStore.req_bid.toLocaleString()
);
const formattedReqBidEnd = computed(() =>
    applyStore.req_bid_end.toLocaleString()
);

const selectedOption = computed({
    get: () => applyStore.selectedOption,
    set: (value) => (applyStore.selectedOption = value),
});

const req_bid_end = computed({
    get: () => applyStore.req_bid_end,
    set: (value) => (applyStore.req_bid_end = Number(value)),
});

const updateBudgetRange = (event) => {
    applyStore.req_bid_end = Number(event.target.value);
};

// Fetch main age groups on component mount
onMounted(async () => {
    const response = await mainGroup.getMainGroup();
    if (response && response.data && response.data.resp) {
        ageGroups.value = response.data.resp;
    }
});

const isValidationVisible = ref(false);
const validationMessage = ref("");

const isSticky = ref(false);
const stickyWrapper = ref(null);
const triggerOffset = 400; // 👈 Set to the position where you want it to start sticking
const stickyPanel = ref(null);
const initialTopOffset = ref(0);
const showSuccessModal = ref(false);
const successMessage = ref("");

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

// Show modal with message
const showValidation = (msg) => {
    validationMessage.value = msg;
    isValidationVisible.value = true;
};

const validateFields = () => {
    if (!applyStore.name) {
        showValidation("예약자 성함을 입력해 주세요.");
        return false;
    }
    if (!applyStore.phone) {
        showValidation("휴대폰 번호를 입력해 주세요.");
        return false;
    }
    if (!applyStore.startDate) {
        showValidation("여행 출발 날짜를 선택해 주세요.");
        return false;
    }
    if (applyStore.adults + applyStore.kids + applyStore.infants === 0) {
        showValidation("여행 인원을 선택해 주세요.");
        return false;
    }

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

const isDestinationSelected = computed(
    () => (gid) => store.travelCustom.selectedDestination === gid
);

const isThemeSelected = computed(
    () => (th_id) =>
        store.travelCustom.selectedThemes.some((theme) => theme.th_id === th_id)
);
// const isRegionSelected = computed(
//   () => (region) => store.travelCustom.region === region
// );

const submitTravelRequest = () => {
    const data = store.travelCustom;

    // ✅ Step 1: Check Region
    if (!data.region) {
        alert("여행 지역을 선택해 주세요.");
        return;
    }

    // ✅ Step 2: Check Travel Purpose
    if (!data.selectedDestination) {
        alert("여행 목적을 선택해 주세요.");
        return;
    }

    // ✅ Step 3: Check Dates
    if (!data.startDate || !data.endDate) {
        alert("여행 일정을 선택해 주세요.");
        return;
    }

    // ✅ Step 4: Check at least one theme
    if (!data.selectedThemes || data.selectedThemes.length === 0) {
        alert("여행 테마를 하나 이상 선택해 주세요.");
        return;
    }

    // ✅ All passed
    console.log("🎉 All data is valid:", data);
    alert("맞춤 여행 신청이 완료되었습니다!");

    // You can now POST to API, navigate, or reset store
};
const payload = {
    region: store.travelCustom.region,
    selectedDestination: store.travelCustom.selectedDestination,
};

// const handleConfirm = async () => {
//   try {
//     const payload = store.travelCustom;
//     const response = await customTravelService.createInform(payload);
//     console.log("✅ Response5555:", response);

//     if (response?.success) {
//       alert("저장 완료!");
//     } else {
//       alert("서버 응답 없음");
//     }
//   } catch (error) {
//     console.error("❌ 저장 실패:", error);
//     alert("요청 처리 중 오류가 발생했습니다.");
//   }
// };
const clearStoreData = () => {
    applyStore.setName("");
    applyStore.setPhone("");
    applyStore.setStartDate("");
    applyStore.setAdults(0);
    applyStore.setKids(0);
    applyStore.setInfants(0);
    applyStore.setSelectedOption(null);
    applyStore.setInfo("");
};
const showSuccess = ref(false);
const handleConfirm = async () => {
    if (!validateFields()) return;

    try {
        const response = await customTravelService.getToken();
        const token = response.token;

        const storeData = {
            req_book_name: applyStore.name,
            req_book_phone: applyStore.phone,
            req_depart: applyStore.startDate,
            req_adults: applyStore.adults,
            req_kids: applyStore.kids,
            req_infant: applyStore.infants,
            req_main_group: applyStore.selectedOption,
            req_bid: applyStore.req_bid,
            req_bid_end: applyStore.req_bid_end,
            req_opt: applyStore.info,
            token: token,
        };

        const submitResponse = await customTravelService.createInform(storeData);

        if (submitResponse.status === 200) {
            showSuccess.value = true;
        } else if (submitResponse.status === 404) {
            navigateTo("/");
        }
    } catch (error) {
        console.error("❌ 저장 실패:", error);
        showValidation("요청 처리 중 오류가 발생했습니다.");
    }
};

const handleModalClose = () => {
    showSuccess.value = false;
    isValidationVisible.value = false;
    clearStoreData();
    navigateTo("/");
};
</script>

<style scoped>
.panel-scrollable-content {
    max-height: calc(100vh - 250px);
    overflow-y: auto;
    /* Allows content to scroll vertically if it exceeds max-height */

    /* --- Styles to hide the scrollbar --- */
    -ms-overflow-style: none;
    /* For Internet Explorer and Edge */
    scrollbar-width: none;
    /* For Firefox */
}

/* For WebKit browsers (Chrome, Safari, newer Edge) to hide scrollbar */
.panel-scrollable-content::-webkit-scrollbar {
    display: none;
}
</style>