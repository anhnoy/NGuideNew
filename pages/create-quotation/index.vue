<template>
  <div>
    <div class="relative lg:h-[150vh] bg-cover bg-no-repeat"
      :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <navbar class="hidden bg-white sm:block" />
      <div class="max-w-[1080px] md:mt-14 mx-auto h-screen sm:h-auto">
        <div
          class="flex flex-col bg-white md:flex-row pb-10 pt-5 px-4 h-[45px] md:hidden box-shadow: 0px 2px 2px 0px #00000033;">
          <div class="flex justify-between items-center w-full">
            <div>
              <img @click="navigateToIndex" :src="chevronLeftIcon" alt="" />
            </div>
            <div class="flex items-center">
              <p class="text-base text-[#152123] leading-[23.17px] font-medium">
                맞춤 견적 신청
              </p>
            </div>
            <div></div>
          </div>
        </div>

        <!-- Mobile dropdown content -->
        <div class="text-white items-center">
          <!-- Mobile view header -->
          <div class="flex bg-[#95C3DD] flex-col md:flex-row p-4 h-[45px] md:hidden">
            <div class="flex justify-between items-center w-full">
              <div @click="setVisible(1)" class="flex items-center">
                <p class="h3-custom text-white">맞춤 여행 견적 신청</p>
                <div class="text-2xl mt-[-15px] ml-2">....</div>
              </div>
              <div @click="toggleMobileDropdown">
                <img :src="chevronDownIcon" alt="Toggle Dropdown" :class="{ 'rotate-180': showMobileDropdown }"
                  class="transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div v-if="showMobileDropdown" class="md:hidden bg-[#95C3DD] h-[180px] p-4">
            <div class="flex justify-between w-f items-center">
              <div class="flex w-full">
                <div v-if="destinationStore.travelCustom.selectedDestination" @click="setVisible(2)"
                  class="flex flex-col w-[50px] items-center cursor-pointer">
                  <img :src="destinationStore.travelCustom.selectedDestinationIcon" alt="" />
                  <span :class="{
                    'font-bold text-white': isVisible === 2,
                    'text-[10px] mt-2': true,
                  }">{{
                    destinationStore.travelCustom.selectedDestinationLabel
                  }}
                  </span>
                  <span :class="{
                    'font-bold text-white': isVisible === 2,
                    'text-[10px]': true,
                  }">
                    {{ formattedSelectedThemeLabels }}
                  </span>
                </div>
                <img v-if="destinationStore.travelCustom.selectedDestination" class="ml-10 w-[16px] h-[64px]"
                  :src="nextIconMobile" alt="" />
              </div>
              <div class="flex">
                <div v-if="requiredFieldsFilled" @click="setVisible(3)"
                  class="flex flex-col items-center w-[200px] cursor-pointer">
                  <img v-if="requiredFieldsFilled" src="@/assets/icons/friendship.svg" alt="" />
                  <span class="w-[176px] flex" :class="{
                    'text-white': isVisible === 3,
                    'text-[10px] mt-2': true,
                  }">
                    {{ destinationStore.travelCustom.startDate }} ~
                    {{ destinationStore.travelCustom.endDate }} /
                    {{
                      destinationStore.travelCustom.selectedDeparture == 1
                        ? "오전 출발"
                        : destinationStore.travelCustom.selectedDeparture == 2
                          ? "오후 출발"
                          : "상관없음"
                    }},
                    {{
                      destinationStore.travelCustom.selectedArrival == 1
                        ? "오전 도착"
                        : destinationStore.travelCustom.selectedArrival == 2
                          ? "오후 도착"
                          : "상관없음"
                    }},
                    성인 {{ destinationStore.travelCustom.selectReq_adults }}명
                    <template v-if="destinationStore.travelCustom.selectReq_kids > 0">
                      , {{ destinationStore.travelCustom.selectReq_kids }}유아
                    </template>
                    <template v-if="destinationStore.travelCustom.selectReq_infants > 0">
                      , {{ destinationStore.travelCustom.selectReq_infants }}아동
                    </template>
                    , {{ destinationStore.travelCustom.selectedOption }}0 대
                  </span>
                </div>
                <img v-if="requiredFieldsFilled" :src="nextIconMobile" alt=" w-[16px] h-[64px]" />
              </div>
            </div>
            <div class="flex mt-2 items-center">
              <div class="flex">
                <div v-if="destinationStore.travelCustom.hasPlaceToVisit !== ''" @click="setVisible(4)"
                  class="flex flex-col w-[60px] items-center cursor-pointer">
                  <img :src="mapPinIcon" alt="" />
                  <span :class="{
                    'font-bold text-white': isVisible === 4 && destinationStore.travelCustom.selectedCity,
                    'text-[10px] mt-2': true,
                  }" class="single-line-text">
                    {{ cityLabel }}
                  </span>
                  <div :class="{
                    'font-bold text-white': isVisible === 4,
                    'text-[10px]': true,
                  }" class="truncate-text">
                    {{ selectedLandNamesOrDefault }}
                  </div>
                </div>
                <img v-if="destinationStore.travelCustom.hasPlaceToVisit !== ''" class="ml-8 w-[16px] h-[64px]"
                  :src="nextIconMobile" alt="" />
              </div>

              <div class="flex">
                <div v-if="requiredFieldsSelection" @click="setVisible(5)"
                  class="flex flex-col w-[140px] items-center cursor-pointer">
                  <img :src="starIcon" alt="" />
                  <span :class="{
                    'font-bold text-white': isVisible === 5,
                    'text-[10px] mt-2': true,
                  }">
                    {{ formattedAccommodationDetails }}
                  </span>
                </div>
                <img v-if="requiredFieldsSelection" :src="nextIconMobile" alt="" />
              </div>
              <div v-if="requiredFieldsReservation" @click="setVisible(6)" class="flex w-[120px]">
                <div class="flex flex-col w-[100px] items-center cursor-pointer">
                  <img :src="editIcon" alt="" />
                  <span :class="{
                    'font-bold text-white': isVisible === 6,
                    'text-[10px] mt-2': true,
                  }">{{ destinationStore.travelCustom.req_group_name }}</span>
                  <span :class="{
                    'font-bold text-white': isVisible === 6,
                    'text-[10px]': true,
                  }">{{ destinationStore.travelCustom.reservationName }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Desktop view header -->
          <div class="hidden md:flex flex-col h-[120px] md:flex-row items-center p-4 rounded-t-2xl bg-[#95C3DD]">
            <div class="flex items-center cursor-pointer space-x-8 w-[160px]">
              <div @click="setVisible(1)" class="flex flex-col ml-5">
                <span :class="{
                  ' text-white': isVisible === 1,
                  'text-14 mt-2': true,
                }">맞춤 여행</span>
                <span :class="{
                  ' text-white': isVisible === 1,
                  'text-14': true,
                }">견적 신청</span>
              </div>
              <div class="text-2xl mt-[-15px]">....</div>
            </div>

            <div v-if="destinationStore.travelCustom.selectedDestination" @click="setVisible(2)"
              class="flex flex-col w-[70px] items-center cursor-pointer">
              <img :src="destinationStore.travelCustom.selectedDestinationIcon" alt="" />
              <span :class="{
                'text-white': isVisible === 2,
                'text-14 mt-2': true,
              }">{{ destinationStore.travelCustom.selectedDestinationLabel }}
              </span>
              <span :class="{
                'text-white': isVisible === 2,
                'text-14': true,
              }">
                {{ formattedSelectedThemeLabels }}
              </span>
            </div>

            <img v-if="destinationStore.travelCustom.selectedDestination" class="ml-10" :src="nextIcon" alt="" />

            <div v-if="requiredFieldsFilled" @click="setVisible(3)"
              class="flex flex-col w-[250px] items-center cursor-pointer p-2">
              <img src="@/assets/icons/friendship.svg" class="text-white" alt="" />
              <span class="w-[260px] flex" :class="{
                'text-white': isVisible === 3,
                'text-14 mt-2': true,
              }">
                {{ destinationStore.travelCustom.startDate }} ~
                {{ destinationStore.travelCustom.endDate }} /
                {{
                  destinationStore.travelCustom.selectedDeparture == 1
                    ? "오전 출발"
                    : destinationStore.travelCustom.selectedDeparture == 2
                      ? "오후 출발"
                      : "상관없음"
                }},
                {{
                  destinationStore.travelCustom.selectedArrival == 1
                    ? "오전 도착"
                    : destinationStore.travelCustom.selectedArrival == 2
                      ? "오후 도착"
                      : "상관없음"
                }},
                성인 {{ destinationStore.travelCustom.selectReq_adults }}명
                <template v-if="destinationStore.travelCustom.selectReq_kids > 0">
                  , {{ destinationStore.travelCustom.selectReq_kids }}유아
                </template>
                <template v-if="destinationStore.travelCustom.selectReq_infants > 0">
                  , {{ destinationStore.travelCustom.selectReq_infants }}아동
                </template>
                , {{ destinationStore.travelCustom.selectedOption }}0 대
              </span>
            </div>

            <img v-if="requiredFieldsFilled" :src="nextIcon" alt="" />

            <div v-if="destinationStore.travelCustom.hasPlaceToVisit !== ''" @click="setVisible(4)"
              class="flex flex-col w-[120px] items-center cursor-pointer p-5">
              <img src="@/assets/icons/map.svg" alt="" />
              <span :class="{
                ' text-white':
                  isVisible === 4 &&
                  destinationStore.travelCustom.selectedCity,
                'text-14 mt-2': true,
              }">
                {{ cityLabel }}
              </span>
              <span class="w-32 truncate" :class="{
                ' text-white': isVisible === 4,
                'text-14': true,
              }">
                {{ selectedLandNamesOrDefault }}
              </span>
            </div>
            <img v-if="destinationStore.travelCustom.hasPlaceToVisit !== ''" :src="nextIcon" alt="" />

            <div v-if="requiredFieldsSelection" @click="setVisible(5)"
              class="flex flex-col w-[150px]  items-center cursor-pointer p-5">
              <img src="@/assets/icons/star.svg" alt="" />
              <span :class="{
                ' text-white': isVisible === 5,
                'text-14 mt-2': true,
              }">
                {{ formattedAccommodationDetails }}
              </span>
            </div>
            <img v-if="requiredFieldsSelection" :src="nextIcon" alt="" />

            <div v-if="requiredFieldsReservation" @click="isVisible < 6 ? setVisible(6) : null"
              class="flex flex-col w-[150px] items-center cursor-pointer p-5">
              <img src="@/assets/icons/write.svg" alt="" />
              <span class="w-32 truncate" :class="{
                ' text-white': isVisible === 6,
                'text-14 mt-2': true,
              }">{{ destinationStore.travelCustom.req_group_name }}</span>
              <span class="w-32 truncate" :class="{
                ' text-white': isVisible === 6,
                'text-14': true,
              }">{{ destinationStore.travelCustom.reservationName }}</span>
            </div>
          </div>
        </div>

        <customTravel v-if="isVisible === 1" />
        <attraction v-if="isVisible === 2" />
        <selectPlace v-if="isVisible === 3" />
        <selectCondition v-if="isVisible === 4" />
        <reservation @update-error="handleError" :error="error" v-if="isVisible === 5" />
        <completeTravel v-if="isVisible === 6" />

        <div class="flex justify-center items-center max-w-[1080px] bg-white shadow-lg sm:pb-16 lg:pt-5 rounded-b-2xl fixed bottom-0 left-0 right-0 lg:static">
          <template v-if="isVisible !== 6">
            <button class="custom-back-button" :disabled="!destinationStore.travelCustom.selectedDestination &&
              destinationStore.travelCustom.selectedThemes.length === 0
              " v-if="isVisible > 1" @click="handleBack">
              이전
            </button>
            <div class="sm:px-2"></div>
            
            <button v-if="isVisible < 5" class="custom-next-button" :disabled="!destinationStore.travelCustom.selectedDestination ||
              destinationStore.travelCustom.selectedThemes.length === 0
              " @click="handleNext">
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import navbar from "~/components/navbar/navbar.vue";
import customTravel from "~/components/custom-travel/purpose-travel/purpose-travel.vue";
import selectPlace from "~/components/custom-travel/select-place/select-place.vue";
import attraction from "~/components/custom-travel/tourism/main.vue";
import { useDestinationStore } from "~/stores/destination.store";
import selectCondition from "~/components/custom-travel/select-condition/select-condition.vue";
import reservation from "~/components/custom-travel/reservation-information/reservation.vue";
import nextIcon from "@/assets/icons/next.svg";
import mapPinIcon from "@/assets/icons/map-pin.svg";
import starIcon from "@/assets/icons/star.svg";
import editIcon from "@/assets/icons/edit.svg";
import chevronLeftIcon from "@/assets/icons/chevron-left.svg";
import chevronDownIcon from "@/assets/icons/chevron-down.svg";
import nextIconMobile from "@/assets/icons/next-mobile.svg";
import completeTravel from "~/components/custom-travel/complete-travel/complete.vue";
import informService from "~/services/custom-travel.service";
import ModalValidation from "~/components/utils/modal-validation.vue";
import backgroundImage from "@/assets/images/logo copy.png"; // Import the image

const isModalOpen = ref(false);

const destinationStore = useDestinationStore();
const isVisible = ref(1);
const showMobileDropdown = ref(false);
const error = ref(false);
const modalMessage = ref("회원 여부를 선택해주세요.");

const router = useRouter();

const cityLabels = {
  4: "비엔티엔",
  5: "방비엔",
  6: "루앙프라방",
};

const accommodations = ref([
  { value: "1", name: "5성급" },
  { value: "2", name: "4성급" },
  { value: "3", name: "3성급" },
  { value: "4", name: "상관없음" },
]);

const beds = ref([
  { rid: 1, name: "싱글" },
  { rid: 2, name: "트윈" },
  { rid: 3, name: "트리플" },
  { rid: 4, name: "상관없음" },
]);

const otherOptions = ref([
  { value: "1", name: "조식 포함" },
  { value: "0", name: "조식 미포함" },
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
  { name: "알레르기 보유", value: 1 },
  { name: "채식", value: 2 },
  { name: "식이 제한", value: 3 },
  { name: "중식 포함", value: 4 },
  { name: "석식 포함", value: 5 },
  { name: "과일 세트", value: 6 },
  { name: "간식 제공", value: 7 },
  { name: "해당없음", value: 8 },
]);

const formattedAccommodationDetails = computed(() => {
  const tc = destinationStore.travelCustom;
  const getNameOrDefault = (value, defaultValue) => (value ? value : defaultValue);

  const selectedAccommodation = accommodations.value.find(
    (acc) => acc.value === tc.selectedAccommodations
  );
  const accommodationName = getNameOrDefault(selectedAccommodation?.name, '상관없음');

  const selectedBedId = tc.selectedBeds && tc.selectedBeds.length > 0
    ? tc.selectedBeds[0].rid
    : 4;
  const selectedBed = beds.value.find((bed) => bed.rid === selectedBedId);
  const bedName = getNameOrDefault(selectedBed?.name, '상관없음');

  const selectedFood = otherOptions.value.find(
    (opt) => opt.value === tc.req_inc_food
  );
  const foodName = getNameOrDefault(selectedFood?.name, '조식 미포함');

  const selectedFoods = tc.selectedFoods
    .map((foodId) => {
      const foodItem = foods.value.find((food) => food.fdt_id === foodId);
      return foodItem ? foodItem.name : null;
    })
    .filter((name) => name !== null);

  const foodList = selectedFoods.length > 0 ? selectedFoods.join(', ') : '상관없음';

  const selectedOthersArray = Array.isArray(tc.strictList) ? tc.strictList : [];
  const selectedOthers = others.value
    .filter((other) => selectedOthersArray.includes(other.value))
    .map((other) => other.name);
  const othersList = selectedOthers.length > 0 ? selectedOthers.join(', ') : '해당없음';

  const detailsArray = [accommodationName, bedName, foodName, foodList, othersList];

  const limitLines = (arr, maxItems) => {
    const truncated = arr.slice(0, maxItems);
    return truncated.join(', ') + (arr.length > maxItems ? ', ...' : '');
  };
  return limitLines(detailsArray, 3);
});


const cityLabel = computed(() => {
  return cityLabels[destinationStore.travelCustom.selectedCity]; // Default to empty if not found
});

const selectedLandNamesOrDefault = computed(() => {
  const landNames = destinationStore.travelCustom.trip_req.map(
    (trip) => trip.land_name
  );

  if (landNames.length === 0) {
    return "아니요, 추천해 주세요";
  }

  if (landNames.length > 2) {
    return `${landNames.slice(0, 2).join(", ")}...`;
  }

  return landNames.join(", ");
});

const maxDisplayCount = 2; // Adjust the max display count as needed

const formattedSelectedThemeLabels = computed(() => {
  const selectedLabels = destinationStore.travelCustom.selectedThemeLabel;

  if (selectedLabels.length > maxDisplayCount) {
    const displayedLabels = selectedLabels.slice(0, maxDisplayCount);
    return `${displayedLabels.join(", ")} ...`;
  }
  return selectedLabels.join(", ");
});

const setVisible = (value) => {
  if (isVisible.value === 6) {
    return; // Prevents updating when isVisible is 6
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
  const tc = destinationStore.travelCustom;
  return (
    tc.startDate &&
    tc.endDate &&
    tc.selectedDeparture &&
    tc.selectedArrival &&
    // tc.selectReq_adults !== "0" &&
    // tc.selectReq_kids > "0" ||
    // tc.selectReq_infants > "0" 
    tc.selectedOption &&
    tc.req_bid &&
    tc.req_bid_end
  );
});

const requiredFieldsSelection = computed(() => {
  const tc = destinationStore.travelCustom;
  return (
    tc.selectedAccommodations &&
    tc.selectedBeds.length > 0 &&
    tc.selectedFoods.length > 0 &&
    tc.selectedVehicles &&
    tc.strictList.length > 0 &&
    tc.req_inc_food &&
    tc.additionList.length > 0
  );
});

const requiredFieldsReservation = computed(() => {
  const tc = destinationStore.travelCustom;
  return (
    tc.req_group_name &&
    tc.reservationName &&
    tc.email &&
    tc.phone > 0 &&
    tc.secretCode &&
    tc.secretCodeConfirm
  );
});

const handleNext = () => {
  if (isVisible.value === 2 && !requiredFieldsFilled.value) {
    modalMessage.value = "모든 항목을 선택해 주세요.";
    isModalOpen.value = true;
    return;
  }
  if (isVisible.value === 2 && destinationStore.travelCustom.selectReq_adults === "0") {
    modalMessage.value = "여행 인원을 확인해 주세요.";
    isModalOpen.value = true;
    return;
  }


  if (
    isVisible.value === 3 &&
    destinationStore.travelCustom.hasPlaceToVisit === "" &&
    destinationStore.travelCustom.trip_req.length === 0
  ) {
    modalMessage.value = "방문하고 싶은 곳을 선택해 주세요";
    isModalOpen.value = true;
    return;
  } else if (
    isVisible.value === 3 &&
    destinationStore.travelCustom.hasPlaceToVisit === false // Check for false
  ) {
    // Set selectedCity to "" in the store
    destinationStore.travelCustom.selectedCity = "";
    // Set trip_req to null when hasPlaceToVisit is false
    destinationStore.travelCustom.trip_req = [];
    destinationStore.travelCustom.selectedPlaces = [];
    isVisible.value = 4;
    return;
  } else if (
    isVisible.value === 3 &&
    destinationStore.travelCustom.hasPlaceToVisit &&
    destinationStore.travelCustom.trip_req.length === 0
  ) {
    modalMessage.value = "방문하고 싶은 곳을 선택해 주세요";
    isModalOpen.value = true;
    return;
  }

  if (isVisible.value === 4 && !requiredFieldsSelection.value) {
    isModalOpen.value = true;
    modalMessage.value = "모든 항목을 선택해 주세요.";
    return;
  }

  if (isVisible.value < 5) {
    isVisible.value++;
  }
};

const sendData = async () => {
  // console.log("sendData triggered", requiredFieldsReservation);
  if (!requiredFieldsReservation.value) {
    isModalOpen.value = true;
    modalMessage.value = "예약자 정보를 모두 작성해 주세요";
    return;
  } else if (!destinationStore.travelCustom.isChecked) {
    isModalOpen.value = true;
    modalMessage.value = "개인정보 수집 및 이용 동의에 체크해 주세요.";
    return;
  }
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]*)(?=.*[./@$!%*?&]*).{8,}$/;
  const { secretCode, secretCodeConfirm } = destinationStore.travelCustom;

  // Check if secretCode and secretCodeConfirm meet the pattern
  if (!passwordPattern.test(secretCode) || !passwordPattern.test(secretCodeConfirm)) {
    isModalOpen.value = true;
    modalMessage.value = "예약자 정보를 모두 작성해 주세요";
    return;
  }

  // Check if secretCode and secretCodeConfirm match
  if (secretCode !== secretCodeConfirm) {
    isModalOpen.value = true;
    modalMessage.value = "예약자 정보를 모두 작성해 주세요";
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
    addition_list: tc.additionList,
  };

  // console.log(JSON.stringify(storeData, null, 2));

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
const clearStoreData = () => {
  destinationStore.clearSelection();
};

const handlePopState = () => {
  // console.log("Browser back button was clicked!");
  clearStoreData();
};

onBeforeRouteLeave((to, from, next) => {
  destinationStore.clearSelection();
  next();
});

// For manual navigation
const navigateToIndex = () => {
  destinationStore.clearSelection();
  router.push("/");
};

onMounted(() => {
  window.addEventListener("popstate", handlePopState);
});

onBeforeUnmount(() => {
  window.removeEventListener("popstate", handlePopState);
});
</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Limits to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>