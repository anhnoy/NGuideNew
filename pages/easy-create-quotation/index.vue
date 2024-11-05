<template>
  <!-- Test -->
  <div>
    <div class="relative lg:h-[150vh] sm:h-auto h-auto md:h-auto bg-cover bg-no-repeat "
      :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <navbar class="hidden md:block" />
      <div class="max-w-[1080px] md:mt-14 mx-auto h-screen md:h-auto">
        <div class="flex flex-col md:flex-row p-4 h-[45px] md:hidden">
          <div class="flex justify-between items-center w-full">
            <div>
              <img @click="navigateToIndex" :src="chevronLeftIcon" alt="">
            </div>
            <div class="flex items-center">
              <p class="text-base text-[#152123] leading-[23.17px] font-medium">간편 견적 신청</p>
            </div>
            <div>
            </div>
          </div>
        </div>


        <!-- Mobile dropdown content -->
        <div class=" text-white items-center">
          <!-- Mobile view header -->
          <div class="flex bg-[#95C3DD] flex-col md:flex-row p-4 h-[45px] md:hidden">
            <div class="flex justify-between items-center w-full">
              <div @click="setVisible(1)" class="flex items-center">
                <p class="h3-custom text-white">간편 여행 견적 신청</p>
                <div class="text-2xl mt-[-15px] ml-2">....</div>
              </div>
              <div @click="toggleMobileDropdown">
                <img :src="chevronDownIcon" alt="Toggle Dropdown" :class="{ 'rotate-180': showMobileDropdown }"
                  class="transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div v-if="showMobileDropdown" class="md:hidden bg-[#95C3DD] p-4">
            <div class="flex justify-between w-f items-center ">
              <div class="flex w-full">
                <div v-if="easyQuotationStore.EasyQuotation.selectedDestination" @click="setVisible(2)"
                  class="flex flex-col w-[70px] items-center cursor-pointer">
                  <img :src="easyQuotationStore.EasyQuotation.selectedDestinationIcon" alt="">
                  <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14 mt-2': true }">{{
                    easyQuotationStore.EasyQuotation.selectedDestinationLabel }} </span>
                  <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14': true }">
                    {{ formattedSelectedThemeLabels }}
                  </span>

                </div>
                <img v-if="easyQuotationStore.EasyQuotation.selectedDestination" class="ml-10" :src="nextIconMobile"
                  alt="">
              </div>
              <div class="flex">
                <div v-if="requiredFieldsFilled" @click="setVisible(3)"
                  class="flex flex-col w-[200px] items-center cursor-pointer">
                  <img v-if="isVisible > 2" src="@/assets/icons/friendship.svg" class="text-white" alt="" />
                  <span :class="{ 'font-bold text-white': isVisible === 3, 'text-14 mt-2': true }">

                    {{ easyQuotationStore.EasyQuotation.startDate }} ~ {{
                      easyQuotationStore.EasyQuotation.endDate }} /
                    {{
                      easyQuotationStore.EasyQuotation.selectedDeparture == 1
                        ? '오전 출발'
                        : easyQuotationStore.EasyQuotation.selectedDeparture == 2
                          ? '오후 출발'
                          : '상관없음'
                    }} /
                    {{
                      easyQuotationStore.EasyQuotation.selectedArrival == 1
                        ? '오전 도착'
                        : easyQuotationStore.EasyQuotation.selectedArrival == 2
                          ? '오후 도착'
                          : '상관없음'
                    }} /
                  </span>

                  <span :class="{ 'font-bold text-white': isVisible === 3, 'text-14': true }">
                    <div class="flex ">
                      성인{{ easyQuotationStore.EasyQuotation.selectReq_adults }}명 /
                      <div class="px-1" v-if="easyQuotationStore.EasyQuotation.selectReq_infants > 0">
                        아동{{ easyQuotationStore.EasyQuotation.selectReq_infants }}명 /</div>
                      <div class="px-1" v-if="easyQuotationStore.EasyQuotation.selectReq_kids > 0">
                        유아{{ easyQuotationStore.EasyQuotation.selectReq_kids }}명</div>
                    </div>
                  </span>
                </div>
                <img v-if="easyQuotationStore.EasyQuotation.requiredFieldsFilled" :src="nextIconMobile" alt="">
              </div>
            </div>
            <div class="flex mt-2 items-center ">
              <div class="flex ">
                <div v-if="easyQuotationStore.EasyQuotation.selectedPackageId" @click="setVisible(4)"
                  class="flex flex-col w-[80px] items-center cursor-pointer">
                  <img src="@/assets/icons/map.svg" alt="" />
                  <span :class="{ 'font-bold text-white': isVisible === 4, 'text-14': true }">
                    {{ easyQuotationStore.packages.package_name }}
                  </span>
                </div>
                <img v-if="easyQuotationStore.EasyQuotation.selectedPackageId" class="ml-8" :src="nextIconMobile"
                  alt="">
              </div>

              <div class="flex ">
                <div v-if="easyQuotationStore.EasyQuotation.totalPrice" @click="setVisible(5)"
                  class="flex flex-col w-[160px] items-center cursor-pointer">
                  <img src="@/assets/icons/schedule.svg" alt="" />
                  <span class="w-36 truncate"
                    :class="{ 'font-bold text-white': isVisible === 5, 'text-14 mt-2': true }">
                    1인당 <br>{{ easyQuotationStore.EasyQuotation.totalPrice }}
                  </span>
                </div>
                <img v-if="easyQuotationStore.EasyQuotation.totalPrice" :src="nextIconMobile" alt="">
              </div>
              <div v-if="easyQuotationStore.EasyQuotation.requiredFieldsReservation" @click="setVisible(6)"
                class="flex w-[120px]">
                <div class="flex flex-col w-[100px] items-center cursor-pointer">
                  <img src="@/assets/icons/write.svg" alt="" />
                  <span :class="{ 'font-bold text-white': isVisible === 6, 'text-14 mt-2': true }">{{
                    easyQuotationStore.EasyQuotation.req_group_name }}</span>
                  <span :class="{ 'font-bold text-white': isVisible === 6, 'text-14': true }">{{
                    easyQuotationStore.EasyQuotation.reservationName }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Desktop view header -->
          <div class="hidden md:flex flex-col h-[120px] md:flex-row items-center p-4 rounded-t-lg bg-[#95C3DD]">
            <div class="flex items-center cursor-pointer space-x-8 w-[160px]">
              <div @click="setVisible(1)" class="flex flex-col ml-5">
                <span :class="{ 'font-bold text-white': isVisible === 1, 'text-14 mt-2': true }">간편 여행</span>
                <span :class="{ 'font-bold text-white': isVisible === 1, 'text-14': true }">견적 신청</span>
              </div>
              <div class="text-2xl mt-[-15px]">...</div>
            </div>

            <div v-if="easyQuotationStore.EasyQuotation.selectedDestination" @click="setVisible(2)"
              class="flex flex-col w-[70px] items-center cursor-pointer">
              <img :src="easyQuotationStore.EasyQuotation.selectedDestinationIcon" alt="">
              <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14 mt-2': true }">{{
                easyQuotationStore.EasyQuotation.selectedDestinationLabel }} </span>
              <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14': true }">
                {{ formattedSelectedThemeLabels }}
              </span>

            </div>

            <img v-if="easyQuotationStore.EasyQuotation.selectedDestinationIcon" class="ml-10" :src="nextIcon" alt="">

            <div v-if="requiredFieldsFilled" @click="setVisible(3)"
              class="flex flex-col items-center w-[250px] cursor-pointer">
              <img src="@/assets/icons/friendship.svg" class="text-white" alt="" />
              <span class="w-36 truncate" :class="{ 'font-bold text-white': isVisible === 3, 'text-14 mt-2': true }">
                <span>{{ easyQuotationStore.EasyQuotation.selectedDeparture }} x</span>
                {{ easyQuotationStore.EasyQuotation.startDate }} ~ {{
                  easyQuotationStore.EasyQuotation.endDate
                }} /
                {{
                  easyQuotationStore.EasyQuotation.selectedDeparture == 1
                    ? '오전 출발'
                    : easyQuotationStore.EasyQuotation.selectedDeparture == 2
                      ? '오후 출발'
                      : '상관없음'
                }},
                {{
                  easyQuotationStore.EasyQuotation.selectedArrival == 1
                    ? '오전 도착'
                    : easyQuotationStore.EasyQuotation.selectedArrival == 2
                      ? '오후 도착'
                      : '상관없음'
                }}
              </span>
              <span class="w-44 truncate" :class="{ 'font-bold text-white ': isVisible === 3, 'text-14': true }">
                <div class="flex ">
                  성인{{ easyQuotationStore.EasyQuotation.selectReq_adults }}명 ,
                  <div class="px-1" v-if="easyQuotationStore.EasyQuotation.selectReq_infants > 0">
                    아동{{ easyQuotationStore.EasyQuotation.selectReq_infants }}명 ,</div>
                  <div class="px-1" v-if="easyQuotationStore.EasyQuotation.selectReq_kids > 0">
                    유아{{ easyQuotationStore.EasyQuotation.selectReq_kids }}명</div>
                </div>
              </span>

            </div>
            <img v-if="requiredFieldsFilled" class="ml-5" :src="nextIcon" alt="">

            <div v-if="easyQuotationStore.EasyQuotation.selectedPackageId" @click="setVisible(4)"
              class="flex flex-col  items-center cursor-pointer">
              <img src="@/assets/icons/map.svg" alt="" />
              <span class="w-36 truncate text-center "
                :class="{ 'font-bold text-white': isVisible === 4, 'text-14 mt-2': true }">
                {{ easyQuotationStore.packages.package_name }}
              </span>
            </div>
            <img v-if="easyQuotationStore.EasyQuotation.selectedPackageId" class="ml-5" :src="nextIcon" alt="">

            <div v-if="easyQuotationStore.EasyQuotation.totalPrice" @click="isVisible < 5 ? setVisible(5) : null"
              class="flex flex-col w-[120px] items-center cursor-pointer">
              <img src="@/assets/icons/schedule.svg" alt="" />
              <span class="w-24 truncate" :class="{ 'font-bold text-white': isVisible === 5, 'text-14 mt-2': true }">
                1인당 <br>{{ easyQuotationStore.EasyQuotation.totalPrice }}
              </span>
            </div>
            <img v-if="easyQuotationStore.EasyQuotation.totalPrice" :src="nextIcon" alt="">

            <div v-if="easyQuotationStore.EasyQuotation.reservationName" @click="isVisible < 6 ? setVisible(6) : null"
              class="flex flex-col w-[120px] items-center cursor-pointer">
              <img src="@/assets/icons/write.svg" alt="" />
              <span class="w-36 truncate" :class="{ 'font-bold text-white': isVisible === 6, 'text-14 mt-2': true }">{{
                easyQuotationStore.EasyQuotation.req_group_name }}</span>
              <span class="w-36 truncate" :class="{ 'font-bold text-white': isVisible === 6, 'text-14': true }">{{
                easyQuotationStore.EasyQuotation.reservationName }}</span>
            </div>

          </div>
        </div>

        <customTravel v-if="isVisible === 1" />
        <attraction v-if="isVisible === 2" />
        <placetourism v-if="isVisible === 3" @updateVisibility="handleNext" />
        <quotedetail v-if="isVisible === 4" />
        <reservation @update-error="handleError" :error="error" v-if="isVisible === 5" />
        <completeTravel v-if="isVisible === 6" />

        <div class="flex justify-center items-center max-w-[1080px] bg-white shadow-lg sm:p-10 sm:pb-16 rounded-b-lg ">
          <template v-if="isVisible !== 6">
            <button
              class="w-full  sm:w-[240px] border border-[#2F312A] py-[12px] bg-white text-[#2F312A] text-base font-bold"
              :disabled="!easyQuotationStore.EasyQuotation.selectedDestination && easyQuotationStore.EasyQuotation.selectedThemes.length === 0"
              v-if="isVisible > 1" @click="handleBack">
              이전
            </button>
            <div class="sm:px-2"></div>
            <button v-if="isVisible < 5 && isVisible !== 3" class="custom-next-button"
              :disabled="!easyQuotationStore.EasyQuotation.selectedDestination || easyQuotationStore.EasyQuotation.selectedThemes.length === 0"
              @click="handleNext">
              다음
            </button>
            <button v-if="isVisible === 5"
              class="w-full sm:w-[240px] py-[12px] bg-[#2F312A] border border-btn text-white  text-base font-bold"
              @click="sendData">
              견적 신청하기
            </button>
          </template>

          <button @click="navigateToIndex" class="custom-next-button" v-if="isVisible === 6">
            확인
          </button>
        </div>
        <ModalValidation :isOpen="isModalOpen" @close="isModalOpen = false" :message="modalMessage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import navbar from '~/components/navbar/navbar.vue';
import customTravel from '~/components/easy-quotation/purpose-quote.vue';
import attraction from '~/components/easy-quotation/date-and-range/main.vue';
import { useEasyQuotationStore } from '~/stores/easy-quotation.store';
import placetourism from '~/components/easy-quotation/place-tourism.vue'
import quotedetail from '~/components/easy-quotation/quote-detail/quote-detail-main.vue'
import reservation from '~/components/easy-quotation/reservation.vue';
import nextIcon from '@/assets/icons/next.svg';
import chevronLeftIcon from '@/assets/icons/chevron-left.svg';
import chevronDownIcon from '@/assets/icons/chevron-down.svg';
import nextIconMobile from '@/assets/icons/next-mobile.svg';
import completeTravel from '~/components/custom-travel/complete-travel/complete.vue';
import informService from '~/services/custom-travel.service';
import ModalValidation from '~/components/utils/modal-validation.vue';
import backgroundImage from '@/assets/images/logo copy.png'; 

const isModalOpen = ref(false);

const easyQuotationStore = useEasyQuotationStore();

const isVisible = ref(1);
const showMobileDropdown = ref(false);
const error = ref(false);
const modalMessage = ref("회원 여부를 선택해주세요.");

const router = useRouter()

const cityLabels = {
  "4": "비엔티엔",
  "5": "방비엔",
  "6": "루앙프라방"
};


const accommodations = ref([
  { value: '1', name: '5성급' },
  { value: '2', name: '4성급' },
  { value: '3', name: '3성급' },
  { value: '4', name: '상관없음' },
]);

const beds = ref([
  { rid: 1, name: '싱글' },
  { rid: 2, name: '트윈' },
  { rid: 3, name: '트리플' },
  { rid: 4, name: '상관없음' },
]);

const otherOptions = ref([
  { value: '1', name: '조식 포함' },
  { value: '0', name: '조식 미포함' },
]);

// Reactive references for food options
const foods = ref([
  { fdt_id: 1, name: "한식" },
  { fdt_id: 2, name: "양식" },
  { fdt_id: 3, name: "태국식" },
  { fdt_id: 4, name: "중식" },
  { fdt_id: 5, name: "현지식" },
  { fdt_id: 6, name: "상관없음" },
]);

// Reactive references for additional options
const others = ref([
  { name: '알레르기 보유', value: 1 },
  { name: '채식', value: 2 },
  { name: '식이 제한', value: 3 },
  { name: '중식 포함', value: 4 },
  { name: '석식 포함', value: 5 },
  { name: '과일 세트', value: 6 },
  { name: '간식 제공', value: 7 },
  { name: '해당없음', value: 8 },
]);



const cityLabel = computed(() => {
  return cityLabels[easyQuotationStore.EasyQuotation.selectedCity]; // Default to empty if not found
});
const selectedLandNamesOrDefault = computed(() => {
  const landNames = easyQuotationStore.EasyQuotation.trip_req
    .map(trip => trip.land_name);

  if (landNames.length === 0) {
    return "아니요, 추천해 주세요";
  }

  if (landNames.length > 2) {
    return `${landNames.slice(0, 2).join(', ')}...`;
  }

  return landNames.join(', ');
});

const maxDisplayCount = 2; 

const formattedSelectedThemeLabels = computed(() => {
  const selectedLabels = easyQuotationStore.EasyQuotation.selectedThemeLabel;

  if (selectedLabels.length > maxDisplayCount) {
    const displayedLabels = selectedLabels.slice(0, maxDisplayCount);
    return `${displayedLabels.join(', ')} ...`;
  }
  return selectedLabels.join(', ');
});


const setVisible = (value) => {
  if (isVisible.value === 6) {
    return; 
  }
  showMobileDropdown.value = false;
  isVisible.value = value;
};



const toggleMobileDropdown = () => {
  showMobileDropdown.value = !showMobileDropdown.value;
};

const handleBack = () => {
  if (isVisible.value > 1) {
    isVisible.value--;
  }
};

const requiredFieldsFilled = computed(() => {
  const tc = easyQuotationStore.EasyQuotation;
  return tc.startDate &&
    tc.endDate &&
    tc.selectedDeparture &&
    tc.selectedArrival &&
    (tc.selectReq_adults !== "0" || tc.selectReq_kids > "0" || tc.selectReq_infants > "0") &&
    tc.selectedOption &&
    tc.req_bid &&
    tc.req_bid_end;
});


const requiredFieldsReservation = computed(() => {
  const tc = easyQuotationStore.EasyQuotation;
  return tc.req_group_name &&
    tc.reservationName &&
    tc.email &&
    tc.phone > 0 && tc.secretCode &&
    tc.secretCodeConfirm 
});

const handleNext = () => {
  if (isVisible.value === 2 && !requiredFieldsFilled.value) {
    modalMessage.value = "모든 항목을 선택해 주세요.";
    isModalOpen.value = true;
    return;
  }

  if (isVisible.value < 5) {
    modalMessage.value = "예약자 정보를 모두 작성해 주세요";
    isVisible.value++;
  }
};

const sendData = async () => {
  console.log("sendData triggered", requiredFieldsReservation);
  if (!requiredFieldsReservation.value) {
    isModalOpen.value = true;
    return;
  } else if (!easyQuotationStore.EasyQuotation.isChecked) {
    isModalOpen.value = true;
    modalMessage.value = "개인정보 수집 및 이용 동의에 체크해 주세요.";
    return;
  }
  const tc = easyQuotationStore.EasyQuotation;
  const storeData = {
    req_group_name: tc.req_group_name || "",
    req_book_name: tc.reservationName,
    req_book_email: tc.email,
    req_book_phone: tc.phone,
    req_book_pass: tc.secretCode,
    req_book_pass_confirm: tc.secretCodeConfirm,
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
    favor_food: tc.selectedFoods,
    strict_list: tc.strictList,
    addition_list: tc.additionList,
    tourism_detail: easyQuotationStore.packages.courses,
  };

  console.log(JSON.stringify(storeData, null, 2));

  try {
    const response = await informService.createEasyReq(storeData);
    if (response.status === 200) {
      isVisible.value = 6;
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Error creating Inform:", error);
  }
};

const handleError = (errorState) => {
  error.value = errorState;
};
const clearStoreData = () => {
  easyQuotationStore.clearSelection();
};

const handlePopState = () => {
  console.log("Browser back button was clicked!")
  clearStoreData();
}

onBeforeRouteLeave((to, from, next) => {
  easyQuotationStore.clearSelection()
  next()
})

// For manual navigation
const navigateToIndex = () => {
  easyQuotationStore.clearSelection()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('popstate', handlePopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>
