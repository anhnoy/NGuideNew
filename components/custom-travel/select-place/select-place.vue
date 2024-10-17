<template>
  <div
    class="max-w-[1080px] bg-white md:h-[820px] h-[795px] overflow-y-auto lg:overflow-y-auto"
  >
    <div class="w-full sm:w-[620px] justify-center items-center p-2 mx-auto mt-5">
      <h1 class="m-7 text-center text-[#152123] font-bold lg:text-3xl text-2xl">지역 별로 방문하고 싶은 곳이 있으신가요?</h1>
      <div class="flex flex-row justify-center mb-4 space-x-2">
        <button
          class="w-full h-12 py-2 px-4 transition-colors duration-200"
          :class="
            destinationStore.travelCustom.hasPlaceToVisit === true
              ? 'bg-[#0EC0CB] text-white'
              : 'bg-[#EDEDF2] text-[#5E5F61]'
          "
          @click="handleButtonClick(true)"
        >
          네, 있어요
        </button>
        <button
          class="w-full h-12 py-2 px-4 transition-colors duration-200"
          :class="
            destinationStore.travelCustom.hasPlaceToVisit === false
              ? 'bg-[#0EC0CB] text-white'
              : 'bg-[#EDEDF2] text-[#5E5F61]'
          "
          @click="handleButtonClick(false)"
        >
          아니요, 추천해 주세요
        </button>
      </div>
    </div>

    <div v-if="destinationStore.travelCustom.hasPlaceToVisit">
      <!-- Tab Navigation -->
      <div class="flex justify-center space-x-2 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="h-[40px] w-[100px] sm:w-[200px] sm:h-[50px] py-2 rounded-full text-sm lg:text-base font-medium transition-colors duration-300"
          :class="
            activeTab === tab.value
              ? 'bg-[#95C3DD] text-white'
              : 'bg-[#A8A3A3] text-white'
          "
          @click="changeTab(tab.value)"
        >
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
        <h2
          class="font-semibold text-lg mb-4 h-[50px] flex items-center justify-center bg-[#F1F3F6] text-[#152123]"
        >
          관광지
        </h2>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 p-4">
          <div
            v-for="place in tourismPlaces.slice(0, 9)"
            :key="place.laid"
            class="relative"
          >
            <div
              class="card w-full h-56 border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <figure>
                <img
                  :src="getProfileImage(place.tourism_attr_imgs)"
                  :alt="place.land_name"
                  class="w-full h-full object-cover"
                />
              </figure>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <button
                    class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    @click="toggleSelection({ ...place, type: 'tourism' })"
                  >
                    <img
                      :src="isSelected(place) ? check : noncheck"
                      alt="Selection indicator"
                      class="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px]"
                    />
                  </button>
                  <p class="text-[#132D5C] font-medium lg:text-base text-sm">
                    {{ place.land_name }}
                  </p>
                  <img
                    @click="openModal(place.laid)"
                    src="@/assets/icons/buttonRight.svg"
                    class="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Section -->
      <div v-if="!isLoading" class="mb-6 w-full sm:w-[840px] mx-auto">
        <h2
          class="font-semibold text-lg mb-4 h-[50px] flex items-center justify-center bg-[#F1F3F6] text-[#152123]"
        >
          액티비티
        </h2>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 p-4">
          <div
            v-for="activity in activityPlaces.slice(0, 9)"
            :key="activity.laid"
            class="relative"
          >
            <div
              class="card w-full h-56 border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <figure>
                <img
                  :src="getProfileImage(activity.tourism_attr_imgs)"
                  class="w-full h-full object-cover"
                />
              </figure>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <p class="text-[#132D5C] font-medium text-base">
                    {{ activity.land_name }}
                  </p>
                  <button
                    class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    @click="toggleSelection({ ...activity, type: 'activity' })"
                  >
                    <img
                      :src="isSelected(activity) ? check : noncheck"
                      alt="Selection indicator"
                      class="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px]"
                    />
                  </button>
                  <img
                    @click="openModal(activity.laid)"
                    src="@/assets/icons/buttonRight.svg"
                    class="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Items Section -->
      <div
        class="bg-[#F1F3F6] p-4 shadow-md h-[292px] sm:h-[350px] text-center w-full sm:w-[840px] mx-auto"
      >
        <h2 class="font-semibold text-[#152123] mb-4">선택한 항목</h2>
        <div class="flex space-x-4 overflow-x-auto pb-2 justify-center">
          <div
            v-for="place in paginatedSelectedPlaces"
            :key="place.laid"
            class="flex-shrink-0 relative bg-white"
          >
            <div
              class="card w-[160px] h-[190px] border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <figure>
                <img
                  :src="getProfileImage(place.tourism_attr_imgs)"
                  class="w-full h-32 object-cover"
                />
              </figure>
              <button
                class="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                @click="toggleSelection(place)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <div class="items-center justify-between">
                  <p class="text-[#132D5C] font-medium text-base">
                    {{ place.city?.city_name }}
                  </p>
                  <span class="text-[#5E5F61] text-xs">{{
                    place.land_name
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="hidden md:flex">
            <button
              v-for="n in totalPages"
              :key="n"
              class="mx-1 text-[#152123] w-6 h-6 rounded-full"
              :class="
                n === currentPage ? 'text-red-500 font-bold' : 'text-gray-500'
              "
              @click="changePage(n)"
            >
              {{ n }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isOpen">
      <div class="fixed inset-0 bg-[#00000080] z-40"></div>
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <ModalDetail
          v-if="selectedLaId != null"
          :isOpen="isOpen"
          @update:isOpen="isOpen = $event"
          :laid="selectedLaId"
        />
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
import ModalDetail from "@/components/modals/detailintroduction.vue";

const destinationStore = useDestinationStore();
const tabs = [
  { label: "비엔티엔", value: "4" },
  { label: "방비엔", value: "5" },
  { label: "루앙프라방", value: "6" },
];
const openModal = (laid) => {
  selectedLaId.value = laid;
  isOpen.value = true;
};
const selectedLaId = ref(null);
const isOpen = ref(false);
const activeTab = ref("4");
const tourismPlaces = ref([]);
const activityPlaces = ref([]);
const currentPage = ref(1);
const imagesPerPage = 4;
const isLoading = ref(false);
const error = ref(null);

// Helper function to get profile image
const getProfileImage = (images) => {
  const profileImage = images.find((img) => img.is_profile === "Y");
  return profileImage ? profileImage.image_path : images[0]?.image_path;
};

const paginatedSelectedPlaces = computed(() => {
  const start = (currentPage.value - 1) * imagesPerPage;
  return destinationStore.travelCustom.selectedPlaces.slice(
    start,
    start + imagesPerPage
  );
});

const totalPages = computed(() => {
  return Math.ceil(
    destinationStore.travelCustom.selectedPlaces.length / imagesPerPage
  );
});

const isSelected = (place) => {
  return destinationStore.travelCustom.selectedPlaces.some(
    (selected) => selected.laid === place.laid
  );
};

// Function to fetch tour places based on the active tab
const fetchTourPlaces = async (cityId) => {
  isLoading.value = true;
  error.value = null;

  try {
    // Fetch tourism data (type 1)
    const tourismResponse = await TravelService.getTourPlace(cityId, 1);
    tourismPlaces.value = tourismResponse.data.resp.rows;
    // Fetch activity data (type 8)
    const activityResponse = await TravelService.getTourPlace(cityId, 8);
    activityPlaces.value = activityResponse.data.resp.rows;
  } catch (err) {
    console.error("Error fetching tour places:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleButtonClick = (hasPlace) => {
  if (destinationStore.travelCustom.hasPlaceToVisit === hasPlace) {
    // If the clicked button is already selected, set to empty string
    destinationStore.setHasPlaceToVisit("");
  } else {
    // Otherwise, set to the new value
    destinationStore.setHasPlaceToVisit(hasPlace);
  }

  if (hasPlace) {
    fetchTourPlaces(activeTab.value);
  }
};

const changeTab = (value) => {
  activeTab.value = value;
  fetchTourPlaces(value);
  destinationStore.setSelectedCity(value); // Set selected city in store
};

const toggleSelection = (place) => {
  const index = destinationStore.travelCustom.selectedPlaces.findIndex(
    (selected) => selected.laid === place.laid
  );

  if (index > -1) {
    // Remove the place from the selected places
    destinationStore.travelCustom.selectedPlaces.splice(index, 1);
  } else {
    // Add the place to the selected places
    destinationStore.travelCustom.selectedPlaces.push({
      ...place,
      land_name: place.land_name,
    });
  }

  // Call the toggleTripReq action
  destinationStore.toggleTripReq(place.laid, place.land_name);
};

const changePage = (page) => {
  currentPage.value = page;
};

// Fetch initial data
onMounted(() => {
  fetchTourPlaces(activeTab.value);
});

// Watch for changes in the active tab
watch(activeTab, (newValue) => {
  fetchTourPlaces(newValue);
});
</script>
