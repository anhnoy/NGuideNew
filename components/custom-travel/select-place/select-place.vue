<template>
  <div class="max-w-[1080px] bg-white md:h-[820px] h-[795px] overflow-y-auto lg:overflow-y-auto">
    <div class="w-full sm:w-[625px] justify-center items-center p-2 mx-auto mt-5">
      <h1 class="m-7 text-center text-[#152123] font-bold lg:text-3xl text-[22px]">지역 별로 방문하고 싶은 곳이 있으신가요?</h1>
      <div class="flex gap-[8px] flex-row justify-center mb-4 ">
        <button
          class="w-[160px] h-[44px] sm:w-[300px] sm:h-[50px] text-[14px]  py-2 px-4 transition-colors duration-200"
          :class="destinationStore.travelCustom.hasPlaceToVisit === true
            ? 'bg-[#0EC0CB] text-white'
            : 'bg-[#EDEDF2] text-[#5E5F61]'
            " @click="handleButtonClick(true)">
          네, 있어요
        </button>
        <button class="w-[160px] h-[44px] sm:w-[300px] sm:h-[50px] text-[14px] py-2 px-4 transition-colors duration-200"
          :class="destinationStore.travelCustom.hasPlaceToVisit === false
            ? 'bg-[#0EC0CB] text-white'
            : 'bg-[#EDEDF2] text-[#5E5F61]'
            " @click="handleButtonClick(false)">
          아니요, 추천해 주세요
        </button>
      </div>
    </div>

    <div v-if="destinationStore.travelCustom.hasPlaceToVisit">
      <!-- Tab Navigation -->
      <div class="flex justify-center w-[300px] sm:w-[620px] mx-auto space-x-2 mb-6">
        <button v-for="tab in tabs" :key="tab.value"
          class="h-[40px] w-[100px] sm:w-[200px] sm:h-[50px] py-2 rounded-full text-sm lg:text-base font-medium transition-colors duration-300"
          :class="activeTab === tab.value
            ? 'bg-[#95C3DD] text-white'
            : 'bg-[#A8A3A3] text-white'
            " @click="changeTab(tab.value)">
          {{ tab.label }}
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="text-center py-4">Loading...</div>

      <!-- Error Message -->
      <div v-if="error" class="text-center py-4 text-red-500">
        {{ error }}
      </div>

      <!-- Tourism Section -->
      <div v-if="!isLoading" class="mb-6 w-full sm:w-[840px] mx-auto">
        <h2 class="font-semibold text-lg mb-4 h-[50px] flex items-center justify-center bg-[#F1F3F6] text-[#152123]">
          관광지
        </h2>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 p-4">
          <div v-for="place in tourismPlaces" :key="place.laid" class="relative">
            <div
              class="card w-full h-[220px] md:h-[263px] border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <figure>
                <img :src="getProfileImage(place.tourism_attr_imgs)" :alt="place.land_name"
                  class="w-[160px] h-[160px] md:w-[270px] md:h-[200px] md:max-h-[200px] object-cover" />
              </figure>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <button class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    @click="toggleSelection({ ...place, type: 'tourism' })">
                    <img :src="isSelected(place) ? check : noncheck" alt="Selection indicator"
                      class="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px]" />
                  </button>
                  <p class="text-[#132D5C] font-medium lg:text-base text-sm">
                    {{ place.land_name }}
                  </p>
                  <img @click="openModal(place.laid)" src="@/assets/icons/buttonRight.svg"
                    class="cursor-pointer w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Section -->
      <div v-if="!isLoading" class="mb-6 w-full sm:w-[840px] mx-auto">
        <h2 class="font-semibold text-lg mb-4 h-[50px] flex items-center justify-center bg-[#F1F3F6] text-[#152123]">
          액티비티
        </h2>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 p-4">
          <div v-for="activity in activityPlaces" :key="activity.laid" class="relative">
            <div
              class="card w-full h-[220px] md:h-[263px] border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <figure>
                <img :src="getProfileImage(activity.tourism_attr_imgs)"
                  class="w-[160px] h-[160px] md:w-[270px] md:h-[200px] object-cover" />
              </figure>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <p class="text-[#132D5C] font-medium text-base">
                    {{ activity.land_name }}
                  </p>
                  <button class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    @click="toggleSelection({ ...activity, type: 'activity' })">
                    <img :src="isSelected(activity) ? check : noncheck" alt="Selection indicator"
                      class="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px]" />
                  </button>
                  <img @click="openModal(activity.laid)" src="@/assets/icons/buttonRight.svg"
                    class="cursor-pointer w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Items Section -->
      <div class="bg-[#F1F3F6] w-[360px] p-4 shadow-md h-[292px] sm:h-[350px] text-center  sm:w-[840px] mx-auto">
        <h2 class="font-semibold sm:text-[20px] text-[16px] text-[#152123] mb-4">선택한 항목</h2>
        <div class="flex flex-nowrap space-x-2 sm:space-x-4 overflow-x-auto pb-2 px-2 justify-start sm:justify-center">
          <div v-for="place in paginatedSelectedPlaces" :key="place.laid" class="flex-shrink-0 relative bg-white">
            <div
              class="card w-[140px] sm:w-[160px] h-[190px] border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <figure>
                <img :src="getProfileImage(place.tourism_attr_imgs)"
                  class="w-full h-[120px] sm:h-[120px] object-cover" />
              </figure>
              <button class="absolute top-1 right-1 bg-white rounded-full p-1 shadow" @click="toggleSelection(place)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="p-2">
                <div class="items-center justify-between">
                  <span class="text-[#5E5F61] text-xs">
                    <p class="text-[#132D5C] font-medium text-sm sm:text-base truncate">
                      {{ place.land_name }}
                    </p>
                    <p class="truncate">{{ place.city?.city_name_kr }}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="hidden md:flex">
            <button v-for="n in totalPages" :key="n" class="mx-1 text-[#152123] w-6 h-6 rounded-full" :class="n === currentPage ? 'text-red-500 font-bold' : 'text-gray-500'
              " @click="changePage(n)">
              {{ n }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isOpen">
      <div class="fixed inset-0 bg-[#00000080] z-40"></div>
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <ModalDetail v-if="selectedLaId != null" :isOpen="isOpen" @update:isOpen="isOpen = $event"
          :laid="selectedLaId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import check from "@/assets/icons/check.svg";
import noncheck from "@/assets/icons/non-check.svg";
import TravelService from "@/services/custom-travel.service.js";
import { useDestinationStore } from "@/stores/destination.store";
import ModalDetail from "~/components/utils/detailintroduction.vue";

const destinationStore = useDestinationStore();
const tabs = [
  { label: "비엔티엔", value: "4" },
  { label: "방비엔", value: "5" },
  { label: "루앙프라방", value: "6" },
];

const selectedLaId = ref(null);
const isOpen = ref(false);
const activeTab = ref("4");
const tourismPlaces = ref([]);
const activityPlaces = ref([]);
const currentPage = ref(1);
const imagesPerPage = 4;
const isLoading = ref(false);
const error = ref(null);

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
  const test = selectedPlaces.map(item => {
    return {
      laid: item.laid,
      placelaid: place.laid
    }
  })
  console.log('testing ', test)
  return selectedPlaces.some((selected) => selected.laid === place.laid) || false;
};

const getProfileImage = (images) => {
  if (!Array.isArray(images)) return '';
  const profileImage = images.find((img) => img.is_profile === "Y");
  return profileImage ? profileImage.image_path : images[0]?.image_path || '';
};

const openModal = (laid) => {
  selectedLaId.value = laid;
  isOpen.value = true;
};

const handleButtonClick = async (hasPlace) => {
  if (destinationStore.travelCustom.hasPlaceToVisit === hasPlace) {
    destinationStore.setHasPlaceToVisit("");
  } else {
    destinationStore.setHasPlaceToVisit(hasPlace);
  }

  if (hasPlace) {
    await fetchTourPlaces(activeTab.value);
  }
};

const fetchTourPlaces = async (cityId) => {
  isLoading.value = true;
  error.value = null;

  try {
    const [tourismResponse, activityResponse] = await Promise.all([
      TravelService.getTourPlace(cityId, 1),
      TravelService.getTourPlace(cityId, 8)
    ]);

    tourismPlaces.value = tourismResponse.data.resp.rows || [];
    activityPlaces.value = activityResponse.data.resp.rows || [];
  } catch (err) {
    console.error("Error fetching tour places:", err);
    error.value = "Failed to load places. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const changeTab = async (value) => {
  activeTab.value = value;
  destinationStore.setSelectedCity(value);
  await fetchTourPlaces(value);
};

const toggleSelection = (place) => {
  if (!place) return;
  console.log('11111');

  const selectedPlaces = getSelectedPlaces();
  const index = selectedPlaces.findIndex(
    (selected) => selected.laid === place.laid
  );

  if (index > -1) {
    selectedPlaces.splice(index, 1);
  } else {
    selectedPlaces.push({
      ...place,
      land_name: place.land_name,
    });
  }
  console.log('22222', destinationStore.travelCustom.trip_req);

  // Update the store
  destinationStore.setSelectedPlaces([...selectedPlaces]);
  destinationStore.toggleTripReq(place.laid, place.land_name);
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Initialize component
onMounted(async () => {
  // Ensure store is initialized with empty arrays
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
