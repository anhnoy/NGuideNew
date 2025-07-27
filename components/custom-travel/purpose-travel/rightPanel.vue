<template>
  <div>
    <div class="md:w-[492px] md:h-auto bg-white md:border rounded-xl">
      <h1
        class="p-4 text-start text-[#152123] font-bold lg:text-base md:text-[22px] text-[16px]"
      >
        관광지 선택
      </h1>

      <div
        class="flex gap-[8px] flex-col md:flex-row md:justify-center md:mb-2 items-center mb-10"
      >
        <button
          class="flex items-center md:gap-2 md:w-[220px] md:h-[56px] sm:w-[300px] sm:h-[50px] text-[14px] py-2 px-4 transition-colors duration-200 border rounded-lg hover:border-[#0EC0CB] w-[304px] h-[48px] gap-5 md:text-base"
          :class="[
            destinationStore.travelCustom.hasPlaceToVisit === true &&
            Array.isArray(destinationStore.travelCustom.trip_req) &&
            destinationStore.travelCustom.trip_req.length > 0
              ? 'text-[#0EC0CB] border-[#0EC0CB]'
              : 'text-[#152123] border-[#E6E6E6]',
          ]"
          @click="handleButtonClick(true)"
        >
          <!-- Circle Indicator -->
          <div
            class="w-[20px] h-[20px] border rounded-full flex items-center justify-center bg-white"
            :class="
              destinationStore.travelCustom.hasPlaceToVisit === true &&
              Array.isArray(destinationStore.travelCustom.trip_req) &&
              destinationStore.travelCustom.trip_req.length > 0
                ? 'border-[#0EC0CB]'
                : 'border-[#E6E6E6]'
            "
          >
            <div
              v-if="
                destinationStore.travelCustom.hasPlaceToVisit === true &&
                Array.isArray(destinationStore.travelCustom.trip_req) &&
                destinationStore.travelCustom.trip_req.length > 0
              "
              class="w-[10px] h-[10px] rounded-full bg-[#0EC0CB]"
            ></div>
          </div>

          관광지 직접 선택하기
        </button>

        <p
          class="md:text-[12px] text-start text-[10px] md:hidden text-[#152123]"
        >
          ※ 가고 싶은 관광지가 있다면 직접 선택해 주세요.
        </p>

        <button
          class="flex items-center md:w-[220px] md:h-[56px] sm:w-[300px] sm:h-[50px] text-[14px] px-4 transition-colors duration-200 border rounded-lg hover:border-[#0EC0CB] w-[304px] h-[48px] gap-5 md:mt-2 md:text-base"
          :class="
            destinationStore.travelCustom.hasPlaceToVisit === false
              ? 'text-[#0EC0CB] border-[#0EC0CB]'
              : 'text-[#152123] border-[#E6E6E6]'
          "
          @click="handleButtonClick(false)"
        >
          <!-- Circle Indicator -->
          <div
            class="w-[20px] h-[20px] border rounded-full flex items-center justify-center bg-white"
            :class="
              destinationStore.travelCustom.hasPlaceToVisit === false
                ? 'border-[#0EC0CB]'
                : 'border-[#E6E6E6]'
            "
          >
            <div
              v-if="destinationStore.travelCustom.hasPlaceToVisit === false"
              class="w-[10px] h-[10px] rounded-full bg-[#0EC0CB]"
            ></div>
          </div>
          전문가한테 요청하기
        </button>
      </div>
      <p
        class="md:text-[12px] ml-4 text-start text-[14px] sm:block hidden h-[30px] text-[#152123]"
      >
        ※ 가고 싶은 관광지가 있다면 직접 선택해 주세요.
      </p>

      <!-- Card Container -->
      <div
        v-if="paginatedTrips.length"
        class="md:w-[460px] md:h-[283.3px] w-[304px] h-[278px] bg-[#F6F6F6] flex flex-col rounded-[10px] md:mx-4 md:my-4 md:py-3 mx-3 mb-5"
      >
        <div class="flex items-center justify-center mt-2 mr-2">
          <p
            class="md:text-[18px] text-center text-[#152123] font-medium flex-1 md:ml-[58px] text-sm"
          >
            선택한 항목
          </p>
          <button
            v-if="isVisible === 1"
            @click="handleChange"
            class="text-[#6EBC30] md:text-[14px] text-[12px] md:w-[76px] md:h-[29px] w-[68px] h-[26px] border rounded-[100px] bg-white"
          >
            변경하기
          </button>
        </div>
        <!-- Card -->
        <div
          class="flex flex-wrap justify-center gap-3 px-2 py-2 overflow-x-hidden overflow-y-hidden"
        >
          <div
            v-for="place in paginatedTrips[currentPage]"
            :key="place.laid"
            class="bg-white rounded-xl md:w-[134.67px] md:h-[174.31px] w-[137px] h-[174px] shadow hover:shadow-md transition"
          >
            <figure>
              <img
                :src="place.image_path"
                alt="tour image"
                class="rounded-xl md:w-[123px] md:h-[114.31px] w-[121px] h-[114.31px] object-cover justify-center mx-auto mt-2"
              />
            </figure>
            <p
              class="p-1 md:text-[12px] text-[10px] text-[#152123] truncate-text"
            >
              {{ place.land_name }}
            </p>
          </div>
        </div>
        <!-- 페이지네이션 -->
        <div class="flex items-center justify-center gap-2 mt-4">
          <button
            class="text-sm md:text-xl"
            :disabled="currentPage === 0"
            @click="currentPage--"
          >
            ‹
          </button>
          <button
            v-for="(page, index) in paginatedTrips"
            :key="index"
            class="flex items-center justify-center w-6 h-6 text-sm rounded-full md:text-xl"
            :class="{
              ' text-[#0EC0CB]': currentPage === index,
              'text-gray-600': currentPage !== index,
            }"
            @click="currentPage = index"
          >
            {{ index + 1 }}
          </button>
          <button
            class="text-sm md:text-xl"
            :disabled="currentPage === paginatedTrips.length - 1"
            @click="currentPage++"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- ✅ Show only if there is final selection -->

  <div
    class="md:w-[492px] md:h-[478px] md:bg-white border rounded-xl bg-[#E9F5FF] w-[304px] h-[393px] mx-auto md:mt-5"
  >
    <p class="md:text-[22px] md:p-4 p-2 text-start text-[#152123] font-bold">
      희망하는 옵션
    </p>
    <div class="md:w-[460px] md:h-[159px] md:px-4 px-2">
      <p
        class="md:text-[16px] text-start text-[#152123] font-medium mb-2 md:mb-4 text-[14px]"
      >
        숙소 옵션
      </p>
      <!-- Hotel Dropdown -->
      <div ref="hotelDropdownRef" class="relative md:w-[460px] md:h-[52px]">
        <!-- Dropdown Button -->
        <button
          @click="isOpen = !isOpen"
          class="border border-[#E7E9EB] rounded-lg bg-white text-left text-sm text-[#8E8D8D] flex items-center justify-between md:w-[460px] md:h-[52px] px-4 py-2 md:text-[16px] w-[280px] h-[48px]"
        >
          <span :class="selectedLabel ? 'text-[#152123]' : 'text-[#8E8D8D]'">
            {{ selectedLabel || "숙소 옵션을 선택해 주세요." }}
          </span>
          <img
            :src="isOpen ? chevronUp : chevronDown"
            class="w-6 h-6 md:w-7 md:h-7"
          />
        </button>

        <!-- Dropdown List -->
        <div
          v-if="isOpen"
          class="absolute mt-1 bg-white border border-[#E7E9EB] rounded-lg shadow-lg z-10 max-h-[250px] overflow-auto w-full"
        >
          <ul class="divide-y divide-gray-100 text-[16px] text-[#152123]">
            <li
              v-for="accommodation in accommodations"
              :key="accommodation.value"
              @click="selectAccommodation(accommodation)"
              class="px-4 py-2 cursor-pointer hover:bg-[#EDEDF2]"
              :class="{
                'bg-gray-100 font-medium':
                  store.travelCustom.selectedAccommodations ===
                  accommodation.value,
              }"
            >
              {{ accommodation.name }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Room Type Dropdown -->
      <div ref="bedDropdownRef" class="relative md:w-[460px] md:mt-5 mt-2">
        <!-- Dropdown Button -->
        <button
          @click="toggleBedDropdown"
          class="border rounded-md w-full h-[52px] px-4 flex justify-between items-center bg-white"
        >
          <span
            :class="selectedBedLabel ? 'text-[#152123]' : 'text-[#8E8D8D]'"
            >{{ selectedBedLabel || "침대 옵션을 선택해 주세요." }}</span
          >
          <img
            :src="isBedDropdownOpen ? chevronUp : chevronDown"
            class="w-6 h-6 md:w-7 md:h-7"
          />
        </button>

        <!-- Dropdown List -->
        <div
          v-if="isBedDropdownOpen"
          class="absolute z-10 w-full bg-white border rounded-md mt-1 shadow max-h-[240px] overflow-y-auto"
        >
          <ul class="divide-y text-sm text-[#152123]">
            <li
              v-for="bed in beds"
              :key="bed.rid"
              @click="toggleBed(bed)"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
              :class="{ 'bg-gray-100 font-semibold': isBedSelected(bed.rid) }"
            >
              {{ bed.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="md:w-[460px] md:h-[95px] md:px-4 md:mt-4 p-2">
      <p
        class="md:text-[16px] text-start text-[#152123] font-medium md:mb-4 mb-2 text-[14px]"
      >
        식사 옵션
      </p>
      <!-- Food Dropdown -->
      <div ref="includedFoodDropdownRef" class="relative w-full md:w-[460px]">
        <!-- Dropdown Button -->
        <button
          @click="toggleIncludedFoodDropdown"
          class="border rounded-md w-full h-[52px] px-4 flex justify-between items-center bg-white"
        >
          <span
            :class="
              selectedIncludedFoodLabel ? 'text-[#152123]' : 'text-[#8E8D8D]'
            "
          >
            {{ selectedIncludedFoodLabel || "식사 포함 옵션을 선택해 주세요." }}
          </span>
          <img
            :src="isIncludedFoodDropdownOpen ? chevronUp : chevronDown"
            class="w-6 h-6 md:w-7 md:h-7"
          />
        </button>

        <div
          v-if="isIncludedFoodDropdownOpen"
          class="absolute z-10 w-full bg-white border rounded-md mt-1 shadow max-h-[240px] overflow-y-auto"
        >
          <ul class="divide-y text-sm text-[#152123]">
            <li
              v-for="food in includedFoodOptions"
              :key="food.fid"
              @click="toggleIncludedFood(food)"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
              :class="{
                'bg-gray-100 font-semibold': isIncludedFoodSelected(food.fid),
              }"
            >
              {{ food.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="md:w-[460px] md:h-[105px] md:px-4 md:mt-4 p-2">
      <p
        class="md:text-[16px] text-start text-[#152123] font-medium mb-2 text-[14px]"
      >
        기타 옵션 <span class="text-[#5E5F61]">(선택)</span
        ><span class="md:hidden text-[10px]"
          >※ 원하시는 옵션을 모두 선택해 주세요.</span
        >
      </p>
      <div class="flex flex-wrap gap-2 mb-4 md:w-[460px]">
        <label
          v-for="emotion in addittionlist"
          :key="emotion.ado_id"
          class="flex items-center rounded-lg px-2 py-1 cursor-pointer text-[#5E5F61] text-[14px] md:text-[16px] bg-transparent transition-colors duration-150"
          :class="{
            '': isAdditionListItemSelected(emotion.ado_id),
            '': !isAdditionListItemSelected(emotion.ado_id),
          }"
        >
          <button
            type="button"
            @click="toggleAdditionListItem(emotion.ado_id)"
            class="w-[24px] h-[24px] rounded-[8px] flex items-center justify-center mr-3"
            :style="{
              background: isAdditionListItemSelected(emotion.ado_id)
                ? '#12c3d6'
                : '#ffffff',
            }"
          >
            <img
              :src="
                isAdditionListItemSelected(emotion.ado_id) ? check1 : noncheck1
              "
              alt="check"
              class="w-[24px] h-[24px]"
            />
          </button>
          <span>{{ emotion.name }}</span>
        </label>
      </div>

      <p class="text-[#8E8D8D] text-sm sm:block hidden">
        ※ 원하시는 옵션을 모두 선택해 주세요.
      </p>
    </div>
    <ValidationModal
      :visible="showModal"
      :message="modalMessage"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import check from "@/assets/icons/check.svg";
import noncheck from "@/assets/icons/non-check.svg";
import TravelService from "@/services/custom-travel.service.js";
import { useDestinationStore } from "@/stores/destination.store";
import ModalDetail from "~/components/utils/detailintroduction.vue";
import chevronDown from "@/assets/icons/chevron-down.png";
import chevronUp from "@/assets/icons/chevron-up.png";
import ValidationModal from "~/components/utils/validationModal.vue";
import check1 from "@/assets/icons/CheckboxCheck.png";
import noncheck1 from "@/assets/icons/unCheckbox.png";
import regionService from "../../../services/region.service";

const destinationStore = useDestinationStore();
const showModal = ref(false);
const modalMessage = ref("");
const store = useDestinationStore();
const selectedLaId = ref(null);
const isOpen = ref(false);
const activeTab = ref(destinationStore.travelCustom.region === "2" ? "7" : "4");
const tourismPlaces = ref([]);
const activityPlaces = ref([]);
// const currentPage = ref(1);
const imagesPerPage = 4;
const isLoading = ref(false);
const error = ref(null);
const isShowAllPlaces = ref(false);
const isShowAllActivity = ref(false);
const countPlaces = ref(0);
const countActivity = ref(0);
const isOtherOptionsDropdownOpen = ref(false);
const currentPage = ref(0);
const itemsPerPage = 3;
const changingPlace = ref(null);
const isVisible = ref(1);
// Hotels list
const accommodations = ref([]);
const selectedLabel = ref(store.travelCustom.selectedAccommodationLabel || "");
const hotelDropdownRef = ref(null);
const emit = defineEmits(["change"]);
const handleHotelClickOutside = (event) => {
  if (
    hotelDropdownRef.value &&
    !hotelDropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleHotelClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleHotelClickOutside);
});
const getHotelList = async () => {
  try {
    const res = await regionService.getHotelList();
    accommodations.value = res.data
      .filter((h) => h.h_status === "ON")
      .map((h) => ({
        value: h.hid,
        name: h.h_star_kr, // Use Korean name
      }));
  } catch (err) {
    console.error("🚨 Failed to fetch hotels:", err);
  }
};

const selectAccommodation = (option) => {
  store.setSelectedAccommodation(option.value);
  store.setSelectedAccommodationLabel(option.name);
  selectedLabel.value = option.name;
  isOpen.value = false;
};

onMounted(() => {
  getHotelList();
  fetchBeds();
  fetchIncludedFood();
  fetchAdditionOptions();
});

// Room list
const beds = ref([]);
const isBedDropdownOpen = ref(false);
const bedDropdownRef = ref(null);
const handleBedClickOutside = (event) => {
  if (bedDropdownRef.value && !bedDropdownRef.value.contains(event.target)) {
    isBedDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleBedClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleBedClickOutside);
});
const fetchBeds = async () => {
  try {
    const res = await regionService.getRoomType();
    beds.value = res.data.resp.map((item) => ({
      rid: item.rid,
      name: item.r_name_kr,
    }));
  } catch (err) {
    console.error("❌ Error fetching room types", err);
  }
};
const toggleBedDropdown = () => {
  isBedDropdownOpen.value = !isBedDropdownOpen.value;
};

const toggleBed = (bed) => {
  const selectedId = String(bed.rid);

  if (store.travelCustom.req_bed_types === selectedId) {
    store.travelCustom.req_bed_types = "";
    store.travelCustom.selectedBeds = [];
  } else {
    store.travelCustom.req_bed_types = selectedId;
    store.travelCustom.selectedBeds = [selectedId];
  }

  isBedDropdownOpen.value = false;
};

const isBedSelected = (rid) => {
  return (store.travelCustom.selectedBeds || []).includes(String(rid));
};

const selectedBedLabel = computed(() => {
  const selected = beds.value.find(
    (bed) => String(bed.rid) === String(store.travelCustom.selectedBeds?.[0])
  );
  return selected?.name || "";
});

onMounted(() => {
  if (!store.travelCustom.selectedBeds?.length && beds.value.length > 0) {
    store.travelCustom.selectedBeds = [String(beds.value[0].rid)];
  }
});

watch(
  () => store.travelCustom.req_bed_types,
  (val) => {
    store.travelCustom.selectedBeds = val ? [val] : [];
  }
);

// Food list
const includedFoodOptions = ref([]);
const isIncludedFoodDropdownOpen = ref(false);
const includedFoodDropdownRef = ref(null);
const handleIncludedFoodClickOutside = (event) => {
  if (
    includedFoodDropdownRef.value &&
    !includedFoodDropdownRef.value.contains(event.target)
  ) {
    isIncludedFoodDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleIncludedFoodClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleIncludedFoodClickOutside);
});
// fetch food options
const fetchIncludedFood = async () => {
  try {
    const res = await regionService.getIncludedFood();
    includedFoodOptions.value = res.data.map((item) => ({
      fid: item.rif_id,
      name: item.rif_name_kr,
    }));
  } catch (err) {
    console.error("❌ Error fetching included food options", err);
  }
};

// toggle dropdown
const toggleIncludedFoodDropdown = () => {
  isIncludedFoodDropdownOpen.value = !isIncludedFoodDropdownOpen.value;
};

// toggle select
const toggleIncludedFood = (food) => {
  const selected = String(store.travelCustom.req_inc_food);
  if (selected === String(food.fid)) {
    store.travelCustom.req_inc_food = ""; // deselect if clicked again
  } else {
    store.travelCustom.req_inc_food = String(food.fid); // select new
  }
  isIncludedFoodDropdownOpen.value = false;
};

// check selected
const isIncludedFoodSelected = (fid) => {
  return String(store.travelCustom.req_inc_food) === String(fid);
};

// computed label
const selectedIncludedFoodLabel = computed(() => {
  const selected = includedFoodOptions.value.find(
    (food) => String(food.fid) === String(store.travelCustom.req_inc_food)
  );
  return selected?.name || "";
});

// Addition options list
const addittionlist = ref([]);
const fetchAdditionOptions = async () => {
  try {
    const res = await regionService.getAdditionOptions();
    console.log(res.data.resp);

    addittionlist.value = res.data.resp
      .filter((item) => item.ado_id !== 4) // ❌ exclude id 4
      .map((item) => ({
        ado_id: item.ado_id,
        name: item.ado_name_kr, // or ado_name_en if needed
      }));
  } catch (err) {
    console.error("❌ Failed to fetch addition options", err);
  }
};

const toggleAdditionListItem = (id) => {
  const index = store.travelCustom.additionList.findIndex(
    (item) => item.ado_id === id
  );
  if (index !== -1) {
    store.travelCustom.additionList.splice(index, 1); // Deselect
  } else {
    store.travelCustom.additionList.push({ ado_id: id }); // Select as object
  }
};
const isAdditionListItemSelected = (id) => {
  return store.travelCustom.additionList.some((item) => item.ado_id === id);
};

const handleChange = () => {
  emit("change");
};

const paginatedTrips = computed(() => {
  const trips = destinationStore.travelCustom.trip_req || [];
  const pages = [];
  for (let i = 0; i < trips.length; i += itemsPerPage) {
    pages.push(trips.slice(i, i + itemsPerPage));
  }
  return pages;
});
// Dropdown toggle
const toggleOtherOptionsDropdown = () => {
  isOtherOptionsDropdownOpen.value = !isOtherOptionsDropdownOpen.value;
};

// Option list
const otherOptions = ref([
  { value: "1", name: "전일 식사 포함" },
  { value: "0", name: "전일 식사 불포함" },
  { value: "0", name: "점심 불포함" },
  { value: "0", name: "상관 없음" },
]);

// Set selected
const setReqIncFood = (value) => {
  if (store.travelCustom.req_inc_food === value) {
    store.travelCustom.req_inc_food = ""; // Deselect
  } else {
    store.travelCustom.req_inc_food = value; // Select
  }
  isOtherOptionsDropdownOpen.value = false; // Close dropdown
};

// Label for dropdown button
const selectedOtherOptionLabel = computed(() => {
  const selected = otherOptions.value.find(
    (opt) => opt.value === store.travelCustom.req_inc_food
  );
  return selected?.name || "";
});
// Add defensive check for selectedPlaces
const getSelectedPlaces = () => {
  return destinationStore?.travelCustom?.selectedPlaces || [];
};

// Updated computed properties with defensive checks
const paginatedSelectedPlaces = computed(() => {
  const selectedPlaces = getSelectedPlaces();
  const start = (currentPage.value - 1) * imagesPerPage;
  return selectedPlaces.slice(start, start + imagesPerPage);
});

const totalPages = computed(() => {
  const selectedPlaces = getSelectedPlaces();
  return Math.ceil(selectedPlaces.length / imagesPerPage);
});

const isSelected = (place) => {
  const selectedPlaces = getSelectedPlaces();
  selectedPlaces.map((item) => {
    return {
      laid: item.laid,
      placelaid: place.laid,
    };
  });
  return (
    selectedPlaces.some((selected) => selected.laid === place.laid) || false
  );
};
const openModal = (laid) => {
  selectedLaId.value = laid;
  isOpen.value = true;
};

const showSelectPlace = ref(false);
const handleButtonClick = async (hasPlace) => {
  const region = destinationStore.travelCustom.region;

  // 🔴 If region is not selected, show alert
  if (!region) {
    modalMessage.value = "여행 지역을 선택해 주세요.";
    showModal.value = true;
    return;
  }

  if (destinationStore.travelCustom.hasPlaceToVisit === hasPlace) {
    destinationStore.setHasPlaceToVisit("");
  } else {
    destinationStore.setHasPlaceToVisit(hasPlace);
  }

  if (hasPlace) {
    await fetchTourPlaces(region);
  }
};

const fetchTourPlaces = async (cityId) => {
  isLoading.value = true;
  error.value = null;

  try {
    const [tourismResponse, activityResponse] = await Promise.all([
      TravelService.getTourPlace(cityId, 1),
      TravelService.getTourPlace(cityId, 8),
    ]);

    countPlaces.value = tourismResponse.data.resp.count || 0;
    countActivity.value = activityResponse.data.resp.count || 0;

    tourismPlaces.value = tourismResponse.data.resp.rows || [];
    activityPlaces.value = activityResponse.data.resp.rows || [];
  } catch (err) {
    // console.error("Error fetching tour places:", err);
    // error.value = "Failed to load places. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
const showAllPlaces = async () => {
  let cityId = activeTab.value;
  const limit = !isShowAllPlaces.value ? 999 : 9;

  try {
    const response = await TravelService.getTourPlace(cityId, 1, limit);
    tourismPlaces.value = response.data.resp.rows || [];
    isShowAllPlaces.value = !isShowAllPlaces.value;
  } catch (error) {
    console.error("Error fetching tourism places:", error);
  }
};
const showAllActivity = async () => {
  let cityId = activeTab.value;
  const limit = !isShowAllActivity.value ? 999 : 9;

  try {
    const response = await TravelService.getTourPlace(cityId, 8, limit);
    activityPlaces.value = response.data.resp.rows || [];
    isShowAllActivity.value = !isShowAllActivity.value;
  } catch (error) {
    console.error("Error fetching tourism places:", error);
  }
};

const changeTab = async (value) => {
  activeTab.value = value;
  destinationStore.setSelectedCity(value);
  await fetchTourPlaces(value);
};

const toggleSelection = (place) => {
  if (!place) return;

  const selectedPlaces = getSelectedPlaces();

  if (changingPlace.value) {
    // Replace existing place
    const index = selectedPlaces.findIndex(
      (selected) => selected.laid === changingPlace.value.laid
    );
    if (index !== -1) {
      selectedPlaces[index] = {
        ...place,
        land_name: place.land_name,
        image_path: place.tourism_attr_imgs?.[0]?.image_path || "",
      };
    }

    changingPlace.value = null; // ✅ Clear state after change
    isVisible.value = 3; // ✅ Go to next screen (or use your flow)
  } else {
    // Normal add/remove toggle
    const index = selectedPlaces.findIndex(
      (selected) => selected.laid === place.laid
    );
    if (index > -1) {
      selectedPlaces.splice(index, 1);
    } else {
      selectedPlaces.push({
        ...place,
        land_name: place.land_name,
        image_path: place.tourism_attr_imgs?.[0]?.image_path || "",
      });
    }
  }

  // Update store
  destinationStore.setSelectedPlaces([...selectedPlaces]);
  destinationStore.setTripReq([...selectedPlaces]); // Optional if you sync both
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Initialize component
onMounted(async () => {
  if (!destinationStore.travelCustom.selectedPlaces) {
    destinationStore.setSelectedPlaces([]);
  }
  await fetchTourPlaces(activeTab.value);
});

// Watch for tab changes
watch(activeTab, async (newValue) => {
  await fetchTourPlaces(newValue);
});
</script>
<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
