<template>
  <div>
    <div class="relative md:h-screen bg-cover bg-no-repeat "
      :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <navbar class="hidden sm:block bg-white" />
      <div class="max-w-[1080px] md:mt-14 mx-auto h-screen sm:h-auto">
        <div class="flex flex-col md:flex-row p-4 h-[45px] md:hidden">
          <div class="flex justify-between items-center w-full">
            <div>
              <img @click="navigateToIndex" :src="chevronLeftIcon" alt="">
            </div>
            <div class="flex items-center">
              <p class="text-base text-[#152123] leading-[23.17px] font-medium">맞춤 견적 신청</p>
            </div>
            <div>
            </div>
          </div>
        </div>


        <!-- Mobile dropdown content -->
        <div class=" text-white items-center">
          <!-- Mobile view header -->
          <div class="flex bg-[#6592E2] flex-col md:flex-row p-4 h-[45px] md:hidden">
            <div class="flex justify-between items-center w-full">
              <div @click="setVisible(1)" class="flex items-center">
                <p class="h3-custom text-white">맞춤 여행 견적 신청</p>
                <div class="text-2xl mt-[-15px] ml-2">...</div>
              </div>
              <div @click="toggleMobileDropdown">
                <img :src="chevronDownIcon" alt="">
              </div>
            </div>
          </div>

          <div v-if="showMobileDropdown" class="md:hidden bg-[#6592E2] p-4">
            <div class="flex justify-between items-center ">
              <div class="flex w-full">
                <div @click="setVisible(2)"
                  :class="{ 'cursor-not-allowed': !canNavigateTo(2), 'cursor-pointer': canNavigateTo(2) }"
                  class="flex flex-col w-[70px] items-center ">
                  <img :src="destinationStore.travelCustom.selectedDestinationIcon" alt="">
                  <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14 mt-2': true }">기업포상 </span>
                  <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14': true }">명소관광..</span>
                </div>
                <img class="ml-10" :src="nextIconMobile" alt="">
              </div>
              <div class="flex">
                <div @click="setVisible(3)"
                  :class="{ 'cursor-not-allowed': !canNavigateTo(3), 'cursor-pointer': canNavigateTo(3) }"
                  class="flex flex-col items-center w-[300px]">
                  <img :src="usersIcon" alt="">
                  <span :class="{ 'font-bold text-white': isVisible === 3, 'text-14 mt-2': true }">24.08.03~24.08.07 /
                    오전
                    출발, 오후출발 </span>
                  <span :class="{ 'font-bold text-white': isVisible === 3, 'text-14': true }">성인 1명, 아동 1명</span>
                </div>
                <img v-if="isVisible > 2" :src="nextIconMobile" alt="">
              </div>
            </div>
            <div class="flex mt-2 items-center ">
              <div class="flex ">
                <div @click="setVisible(4)"
                  :class="{ 'cursor-not-allowed': !canNavigateTo(4), 'cursor-pointer': canNavigateTo(4) }"
                  class="flex flex-col w-[80px] items-center">
                  <img :src="mapPinIcon" alt="">
                  <span :class="{ 'font-bold text-white': isVisible === 4, 'text-14 mt-2': true }">비엔티엔</span>
                  <span :class="{ 'font-bold text-white': isVisible === 4, 'text-14': true }">관광지</span>
                </div>
                <img class="ml-8" :src="nextIconMobile" alt="">
              </div>
              <div class="flex ">
                <div @click="setVisible(5)"
                  :class="{ 'cursor-not-allowed': !canNavigateTo(5), 'cursor-pointer': canNavigateTo(5) }"
                  class="flex flex-col w-[180px] items-center">
                  <img :src="starIcon" alt="">
                  <span :class="{ 'font-bold text-white': isVisible === 5, 'text-14 mt-2': true }">5성급, 더블, 조식</span>
                  <span :class="{ 'font-bold text-white': isVisible === 5, 'text-14': true }">한식, 알레르기 포함..</span>
                </div>
                <img :src="nextIconMobile" alt="">
              </div>
              <div @click="setVisible(6)"
                :class="{ 'cursor-not-allowed': !canNavigateTo(6), 'cursor-pointer': canNavigateTo(6) }"
                class="flex w-[120px]">
                <div class="flex flex-col w-[120px] items-center">
                  <img :src="editIcon" alt="">
                  <span :class="{ 'font-bold text-white': isVisible === 6, 'text-14 mt-2': true }">오토앤 관광</span>
                  <span :class="{ 'font-bold text-white': isVisible === 6, 'text-14': true }">구지운</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Desktop view header -->
          <div class="hidden md:flex flex-col h-[120px] md:flex-row items-center p-4 rounded-t-lg bg-[#6592E2]">
            <div class="flex items-center cursor-pointer space-x-8 w-[160px]">
              <div  @click="setVisible(1)" class="flex flex-col ml-5">
                <span :class="{ 'font-bold text-white': isVisible === 1, 'text-14 mt-2': true }">맞춤 여행</span>
                <span :class="{ 'font-bold text-white': isVisible === 1, 'text-14': true }">견적 신청</span>
              </div>
              <div class="text-2xl mt-[-15px]">...</div>
            </div>

            <div v-if="isVisible > 1" @click="setVisible(2)"
              :class="{ 'cursor-not-allowed': !canNavigateTo(2), 'cursor-pointer': canNavigateTo(2) }"
              class="flex flex-col w-[70px] items-center">
              <img :src="destinationStore.travelCustom.selectedDestinationIcon" alt="">
              <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14 mt-2': true }">기업포상 </span>
              <span :class="{ 'font-bold text-white': isVisible === 2, 'text-14': true }">명소관광..</span>
            </div>

            <img v-if="isVisible > 1" class="ml-10" :src="nextIcon" alt="">

            <div v-if="isVisible > 2" @click="setVisible(3)"
              :class="{ 'cursor-not-allowed': !canNavigateTo(3), 'cursor-pointer': canNavigateTo(3) }"
              class="flex flex-col items-center w-[250px]">
              <img :src="usersIcon" class="text-white" alt="">
              <span :class="{ 'font-bold text-white': isVisible === 3, 'text-14 mt-2': true }">24.08.03 ~ 24.08.07 / 오전
                출발</span>
              <span :class="{ 'font-bold text-white': isVisible === 3, 'text-14': true }">성인 1명, 아동 1명</span>
            </div>
            <img v-if="isVisible > 2" class="ml-5" :src="nextIcon" alt="">

            <div v-if="isVisible > 3" @click="setVisible(4)"
              :class="{ 'cursor-not-allowed': !canNavigateTo(4), 'cursor-pointer': canNavigateTo(4) }"
              class="flex flex-col w-[120px] items-center">
              <img :src="mapPinIcon" alt="">
              <span :class="{ 'font-bold text-white': isVisible === 4, 'text-14 mt-2': true }">4박5일</span>
              <span :class="{ 'font-bold text-white': isVisible === 4, 'text-14': true }">1인당 600,000만원</span>
            </div>
            <img v-if="isVisible > 3" class="ml-5" :src="nextIcon" alt="">

            <div v-if="isVisible > 4" @click="setVisible(5)"
              :class="{ 'cursor-not-allowed': !canNavigateTo(5), 'cursor-pointer': canNavigateTo(5) }"
              class="flex flex-col w-[120px] items-center">
              <img :src="starIcon" alt="">
              <span :class="{ 'font-bold text-white': isVisible === 5, 'text-14 mt-2': true }">오토앤 관광</span>
              <span :class="{ 'font-bold text-white': isVisible === 5, 'text-14': true }">오토앤 관광</span>
            </div>
            <img v-if="isVisible > 4" :src="nextIcon" alt="">

            <div v-if="isVisible > 5" @click="setVisible(6)"
              :class="{ 'cursor-not-allowed': !canNavigateTo(6), 'cursor-pointer': canNavigateTo(6) }"
              class="flex flex-col w-[120px] items-center">
              <img :src="editIcon" alt="">
              <span :class="{ 'font-bold text-white': isVisible === 6, 'text-14 mt-2': true }">오토앤 관광</span>
              <span :class="{ 'font-bold text-white': isVisible === 6, 'text-14': true }">구지운</span>
            </div>
          </div>
        </div>

        <customTravel v-if="isVisible === 1" />
        <attraction v-if="isVisible === 2" />
        <selectPlace v-if="isVisible === 3" />
        <selectCondition v-if="isVisible === 4" />
        <reservation @update-error="handleError" :error="error" v-if="isVisible === 5" />
        <completeTravel v-if="isVisible === 6" />

        <div class="flex justify-center items-center max-w-[1080px] bg-white shadow-lg sm:p-4 rounded-b-lg mb-10">
          <template v-if="isVisible !== 6">
            <button class="custom-back-button"
              :disabled="!destinationStore.travelCustom.selectedDestination && destinationStore.travelCustom.selectedThemes.length === 0"
              v-if="isVisible > 1" @click="handleBack">
              이전
            </button>
            <div class="sm:px-2"></div>

            <button v-if="isVisible < 5" class="custom-next-button"
              :disabled="!destinationStore.travelCustom.selectedDestination || destinationStore.travelCustom.selectedThemes.length === 0"
              @click="handleNext">
              다음
            </button>

            <button v-if="isVisible === 5" class="custom-next-button" @click="sendData">
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import navbar from '~/components/navbar/navbar.vue';
import customTravel from '~/components/custom-travel/purpose-travel/purpose-travel.vue';
import selectPlace from '~/components/custom-travel/select-place/select-place.vue';
import attraction from '~/components/custom-travel/tourism/main.vue';
import { useDestinationStore } from '~/stores/destination.store';
import selectCondition from '~/components/custom-travel/select-condition/select-condition.vue';
import reservation from '~/components/custom-travel/reservation-information/reservation.vue';
import nextIcon from '@/assets/icons/next.svg';
import trophyIcon from '@/assets/icons/trophy.svg';
import usersIcon from '@/assets/icons/users.svg';
import mapPinIcon from '@/assets/icons/map-pin.svg';
import starIcon from '@/assets/icons/star.svg';
import editIcon from '@/assets/icons/edit.svg';
import chevronLeftIcon from '@/assets/icons/chevron-left.svg';
import chevronDownIcon from '@/assets/icons/chevron-down.svg';
import nextIconMobile from '@/assets/icons/next-mobile.svg';
import completeTravel from '~/components/custom-travel/complete-travel/complete.vue';
import informService from '~/services/custom-travel.service';
import ModalValidation from '~/components/utils/modal-validation.vue';
import backgroundImage from '@/assets/images/logo copy.png'; // Import the image

const isModalOpen = ref(false);

const destinationStore = useDestinationStore();
const isVisible = ref(1);
const showMobileDropdown = ref(false);
const error = ref(false);
const modalMessage = ref("회원 여부를 선택해주세요.");

const router = useRouter()

const navigateToIndex = () => {
  router.push('/');
  destinationStore.clearSelection();
}

const setVisible = (value) => {
  if (value === 1 || canNavigateTo(value)) {
    isVisible.value = value;
  } else {

  }
  console.log('setVisible triggered with value:', value);
  showMobileDropdown.value = false;
};

const canNavigateTo = (value) => {
  const tc = destinationStore.travelCustom;

  if (value === 2) {
    return tc.selectedDestination && tc.selectedThemes.length > 0;
  } else if (value === 3) {
    return isVisible.value >= 2 && requiredFieldsFilled.value;
  } else if (value === 4) {
    return isVisible.value >= 3 && (tc.hasPlaceToVisit ? tc.trip_req.length > 0 : true);
  } else if (value === 5) {
    return isVisible.value >= 4 && requiredFieldsSelection.value;
  } else if (value === 6) {
    return isVisible.value >= 5 && requiredFieldsReservation.value;
  } else {
    return false;
  }
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
  const tc = destinationStore.travelCustom;
  return tc.startDate &&
    tc.endDate &&
    tc.selectedDeparture &&
    tc.selectedArrival &&
    (tc.selectReq_adults === "0" || tc.selectReq_kids === "0" || tc.selectReq_infants === "0") &&
    tc.selectedOption &&
    tc.req_bid &&
    tc.req_bid_end;
});

const requiredFieldsSelection = computed(() => {
  const tc = destinationStore.travelCustom;
  return tc.selectedAccommodations &&
    tc.selectedBeds.length > 0 &&
    tc.selectedFoods.length > 0 &&
    tc.selectedVehicles &&
    tc.strictList.length > 0 &&
    tc.req_inc_food &&
    tc.additionList.length > 0;
});

const requiredFieldsReservation = computed(() => {
  const tc = destinationStore.travelCustom;
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

  if (isVisible.value === 3 && destinationStore.travelCustom.hasPlaceToVisit && destinationStore.travelCustom.trip_req.length === 0) {
    modalMessage.value = "방문하고 싶은 곳을 선택해 주세요";
    isModalOpen.value = true;
    return;
  }

  if (isVisible.value === 4 && !requiredFieldsSelection.value) {
    isModalOpen.value = true;
    return;
  }

  if (isVisible.value < 5) {
    isVisible.value++;
  }
};

const sendData = async () => {
  console.log("sendData triggered", requiredFieldsReservation);
  if (!requiredFieldsReservation.value) {
    isModalOpen.value = true;  // Trigger the modal to open
    return;
  }
  const tc = destinationStore.travelCustom;
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
    addition_list: tc.additionList
  };

  console.log(JSON.stringify(storeData, null, 2));

  try {
    const response = await informService.createInform(storeData);
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
</script>
