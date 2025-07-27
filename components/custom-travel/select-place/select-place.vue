<template>
  <div class="justify-center h-full md:h-auto md:mx-auto">
    <div class="justify-center hidden w-full bg-white md:flex sm:block">
      <div
        class="flex items-center gap-2 w-[1282px] h-[64px] px-4 text-sm md:text-base text-[#8E8D8D]"
      >
        <!-- Home Icon -->
        <NuxtLink to="/">
          <img src="@/assets/icons/home2.png" alt="Home" class="w-4 h-4" />
        </NuxtLink>
        <!-- Breadcrumbs -->
        <span>></span>
        <NuxtLink to="/customized-travel">
          <span>맞춤여행 문의 하기 </span>
        </NuxtLink>
        <span>></span>
        <button @click="handleBack" v-if="isVisible === 3">
          <span> 맞춤 견적서 맞춤 견적서 신청</span>
        </button>
        <span>></span>
        <span class="text-[#152123] font-medium">관광지 선택</span>
      </div>
    </div>
    <h1
      v-if="destinationStore.travelCustom.hasPlaceToVisit"
      class="m-4 text-center text-[#152123] font-bold lg:text-3xl text-[22px] md:font-bold"
    >
      관광지 선택
    </h1>

    <div v-if="destinationStore.travelCustom.hasPlaceToVisit">
      <!-- Tab Navigation -->
      <div
        v-if="cities.length"
        class="flex justify-center w-[300px] sm:w-[620px] mx-auto space-x-2 mb-6 gap-3"
      >
        <button
          v-for="city in cities"
          :key="city.city_id"
          @click="changeTab(city.city_id)"
          class="md:h-[43px] md:w-[105px] w-[92px] h-[38px] py-2 rounded-full text-sm lg:text-base font-medium transition-colors duration-300"
          :class="[
            activeTab === city.city_id
              ? 'bg-[#95C3DD] text-white'
              : 'bg-[#EDEDF2] text-[#8E8D8D]',
          ]"
        >
          {{ city.city_name_kr }}
        </button>
      </div>

      <div v-if="isLoading" class="py-4 text-center">로딩중...</div>
      <div v-if="error" class="py-4 text-center text-red-500">
        {{ error }}
      </div>

      <!-- Tourism Section -->
      <TourismGridSection
        :tourismPlaces="tourismPlaces"
        :isLoading="isLoading"
        :isSelected="isSelected"
        :getProfileImage="getProfileImage"
        :cityLabel="cityLabel"
        :isShowAllPlaces="isShowAllPlaces"
        :countPlaces="countPlaces"
        @toggle="toggleSelection"
        @modal="openModal"
        @showMore="showAllPlaces"
      />

      <!-- Activity Section -->
      <ActivityGridSection
        :activityPlaces="activityPlaces"
        :isLoading="isLoading"
        :countActivity="countActivity"
        :isShowAllActivity="isShowAllActivity"
        :isSelected="isSelected"
        :cityLabel="cityLabel"
        @toggle="toggleSelection"
        @modal="openModal"
        @showMore="showAllActivity"
      />

      <!-- Card Section -->
      <CardSection />

      <div
        v-if="destinationStore.travelCustom.trip_req.length > 0"
        class="md:w-[1282px] md:h-[470px] h-[285.31px] w-[328px] bg-[#F6F6F6] md:rounded-tl-[129px] md:rounded-br-[20px] md:rounded-bl-[20px] md:rounded-tr-[20px] mx-auto md:py-10 rounded-xl rounded-tl-[40px]"
      >
        <!-- Finally Items Section -->
        <FinalSelectedSection
          :finalSelectedPlaces="destinationStore.travelCustom.trip_req"
          :getProfileImage="getProfileImage"
          :cityLabel="cityLabel"
          :openModal="openModal"
          :toggleFinalConfirm="toggleSelection"
        />
      </div>
      <div class="h-[100px] md:hidden bg-white"></div>
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
    <div
      class="w-full space-x-4 bg-transparent"
      :class="{
        'fixed bottom-0 left-0 px-4 py-3 z-40 md:border-t shadow md:static md:py-[60px] md:border-none': true,
      }"
    >
      <div class="flex justify-center gap-4 md:justify-center">
        <!-- 이전 -->
        <button
          @click="handleBack"
          v-if="isVisible === 3"
          class="bg-white border text-[#152123] px-6 py-3 rounded-xl md:w-[200px] md:h-[56px] border-[#152123] font-medium md:text-[20px] text-[14px] transition-colors duration-200 w-full"
        >
          이전
        </button>

        <!-- 다음 -->
        <button
          v-if="isVisible === 3"
          @click="handleConfirm"
          class="bg-[#152123] border text-white px-6 py-3 rounded-xl md:w-[200px] md:h-[56px] border-[#152123] font-medium md:text-[20px] text-[14px] transition-colors duration-200 w-full"
        >
          다음
        </button>
      </div>
    </div>
  </div>
  <ValidationModal
    :visible="showValidationModal"
    :message="validationMessage"
    @close="handleModalClose"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import check from "@/assets/icons/check.svg";
import noncheck from "@/assets/icons/non-check.svg";
import TravelService from "@/services/custom-travel.service.js";
import { useDestinationStore } from "@/stores/destination.store";
import ModalDetail from "~/components/utils/detailintroduction.vue";
import regionService from "@/services/region.service";
import ActivityGridSection from "./activity-section.vue";
import TourismGridSection from "./tourism-section.vue";
import FinalSelectedSection from "./final-section.vue";
import CardSection from "./card-section.vue";
import ValidationModal from "@/components/utils/validationModal.vue";
const refreshPage = () => {
  navigateTo(window.location.pathname, { force: true });
};

const destinationStore = useDestinationStore();
const tabs = [
  { label: "비엔티엔", value: "4" },
  { label: "방비엥", value: "5" },
  { label: "루앙프라방", value: "6" },
];
const tabsTH = [
  { label: "방콕​", value: "7" },
  { label: "파타야​", value: "8" },
];

import { useRouter } from "vue-router";
const router = useRouter();
const isVisible = ref(3);
const selectedLaId = ref(null);
const isOpen = ref(false);
// const activeTab = ref(destinationStore.travelCustom.region === "2" ? "7" : "4");
const tourismPlaces = ref([]);
const activityPlaces = ref([]);
const currentFinalPage = ref(1);
const isLoading = ref(false);
const error = ref(null);
const isShowAllPlaces = ref(false);
const isShowAllActivity = ref(false);
const countPlaces = ref(0);
const countActivity = ref(0);
const imagesPerPage = ref(4); // start with default (desktop)

const emit = defineEmits(["confirm"]);
const isSelected = (place) => {
  const tripReq = destinationStore?.travelCustom?.trip_req || [];

  return tripReq.some((p) => String(p.laid) === String(place.laid));
};

// const isSelected = (place) => {
//   return (
//     Array.isArray(finalSelectedPlaces.value) &&
//     finalSelectedPlaces.value.some((p) => String(p.laid) === String(place.laid))
//   );
// };

const updateImagesPerPage = () => {
  if (window.innerWidth < 768) {
    imagesPerPage.value = 2; // mobile
  } else {
    imagesPerPage.value = 4; // desktop
  }
};

onMounted(() => {
  updateImagesPerPage();
  window.addEventListener("resize", updateImagesPerPage);
});
const currentActivityPage = ref(1);
const pageSizeDesktop = 4;
const pageSizeMobile = 2;

const isMobile = ref(false);

// ✅ Detect mobile width
onMounted(() => {
  isMobile.value = window.innerWidth < 768;
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth < 768;
  });
});

const activityPageSize = computed(() =>
  isMobile.value ? pageSizeMobile : pageSizeDesktop
);

const totalActivityPages = computed(() =>
  Math.ceil(activityPlaces.length / activityPageSize.value)
);

const paginatedActivityPlaces = computed(() => {
  const start = (currentActivityPage.value - 1) * activityPageSize.value;
  return activityPlaces.slice(start, start + activityPageSize.value);
});

// Get city
const cities = ref([]);
const activeTab = ref(null);

const fetchCitiesByRegion = async () => {
  try {
    const regionId = destinationStore.travelCustom.region;
    if (!regionId) return;

    const res = await regionService.getCityByRegion(regionId);
    cities.value = res.data.filter((city) => city.cid === Number(regionId));

    // ✅ Set default selected city (first city in the list)
    if (cities.value.length) {
      activeTab.value = cities.value[0].city_id;
    }
  } catch (err) {
    console.error("❌ Failed to fetch cities", err);
  }
};

watch(
  () => destinationStore.travelCustom.region,
  () => {
    fetchCitiesByRegion();
  },
  { immediate: true }
);
const changeTab = (id) => {
  activeTab.value = id;
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateImagesPerPage);
});

const finalSelectedPlaces = ref([]); // stores places user confirmed

const totalFinalPages = computed(() =>
  Math.ceil(finalSelectedPlaces.value.length / imagesPerPage.value)
);

const toggleFinalConfirm = (place) => {
  const index = finalSelectedPlaces.value.findIndex(
    (p) => p.laid === place.laid
  );
  console.log("index", place.tourism_attr_imgs[0].image_path);
  if (index !== -1) {
    // already finalized → unfinalize
    finalSelectedPlaces.value.splice(index, 1);
  } else {
    // mark as finalized
    finalSelectedPlaces.value.push({ ...place });
  }
  destinationStore.setSelectedPlaces([...finalSelectedPlaces.value]);
  destinationStore.toggleTripReq(
    place.laid,
    place.land_name,
    place.tourism_attr_imgs[0].image_path
  );
};

const isFinalized = (place) => {
  return finalSelectedPlaces.value.some((p) => p.laid === place.laid);
};

const handleConfirm = () => {
  // finalSelectedPlaces.value.forEach((place) => {
  //   destinationStore.toggleTripReq(
  //     place.laid,
  //     place.land_name,
  //     place.tourism_attr_imgs?.[0]?.image_path || ""
  //   );
  // });
  const selected = destinationStore.travelCustom.trip_req;

  if (!Array.isArray(selected) || selected.length === 0) {
    showValidation("가고 싶은 관광지를 선택하거나.");
    return false;
  }
  emit("confirm"); // Notify the parent
};
const handleBack = () => {
  emit("confirmback");
  destinationStore.travelCustom.trip_req = [];
  console.log(destinationStore.travelCustom.trip_req);
};

watch(activeTab, () => {
  console.log("[DEBUG] activeTab changed to:", activeTab.value);
});

const cityLabel = computed(() => {
  const currentTab = [...tabs, ...tabsTH].find(
    (t) => String(t.value) === String(activeTab.value)
  );
  return currentTab?.label || "도시 없음";
});

// Add defensive check for selectedPlaces
const getSelectedPlaces = () => {
  return destinationStore?.travelCustom?.selectedPlaces || [];
};

// Updated computed properties with defensive checks
// const paginatedSelectedPlaces = computed(() => {
//   const selectedPlaces = getSelectedPlaces();
//   const start = (currentPage.value - 1) * imagesPerPage;
//   return selectedPlaces.slice(start, start + imagesPerPage);
// });
const paginatedSelectedPlaces = computed(() => {
  const start = (currentFinalPage.value - 1) * imagesPerPage.value;
  return finalSelectedPlaces.value.slice(start, start + imagesPerPage.value);
});

// const totalPages = computed(() =>
//   Math.ceil(finalSelectedPlaces.value.length / imagesPerPage)
// );

// const totalPages = computed(() => {
//   const selectedPlaces = getSelectedPlaces();
//   return Math.ceil(selectedPlaces.length / imagesPerPage);
// });

const getProfileImage = (images) => {
  if (!Array.isArray(images)) return "";
  const profileImage = images.find((img) => img.is_profile === "Y");
  return profileImage ? profileImage.image_path : images[0]?.image_path || "";
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

// const changeTab = async (value) => {
//   activeTab.value = value;
//   destinationStore.setSelectedCity(value);
//   await fetchTourPlaces(value);
// };

// const toggleSelection = (place) => {
//   if (!place) return;
//   const selectedPlaces = getSelectedPlaces();
//   const index = selectedPlaces.findIndex(
//     (selected) => selected.laid === place.laid
//   );

//   if (index > -1) {
//     selectedPlaces.splice(index, 1);
//   } else {
//     selectedPlaces.push({
//       ...place,
//       land_name: place.land_name,
//     });
//   }

//   // Update the store
//   destinationStore.setSelectedPlaces([...selectedPlaces]);
//   destinationStore.toggleTripReq(place.laid, place.land_name);
// };

// const toggleSelection = (place) => {
//   const index = finalSelectedPlaces.value.findIndex(
//     (p) => p.laid === place.laid
//   );

//   if (index !== -1) {
//     finalSelectedPlaces.value.splice(index, 1); // Remove if already selected
//   } else {
//     finalSelectedPlaces.value.push({ ...place }); // Add if not yet selected
//   }
// };
const toggleSelection = (place) => {
  const current = destinationStore.travelCustom.trip_req || [];

  const index = current.findIndex((p) => String(p.laid) === String(place.laid));

  if (index !== -1) {
    current.splice(index, 1);
  } else {
    current.push({
      laid: place.laid,
      land_name: place.land_name,
      image_path: getProfileImage(place.tourism_attr_imgs),
    });
  }

  destinationStore.travelCustom.trip_req = [...current];
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

watch(finalSelectedPlaces, (val) => {
  destinationStore.setSelectedPlaces([...val]);
  destinationStore.travelCustom.trip_req = val.map((place) => ({
    laid: place.laid,
    land_name: place.land_name,
    image_path: getProfileImage(place.tourism_attr_imgs),
  }));
});
// const isValidationVisible = ref(false);
const validationMessage = ref("");
const showValidationModal = ref(false);
const showValidation = (msg) => {
  validationMessage.value = msg;
  // isValidationVisible.value = true;
  showValidationModal.value = true;
};
const handleModalClose = () => {
  showValidationModal.value = false;
};
// const validateFields = () => {
//   const data = store.travelCustom;
//   if (!data.region) {
//     showValidation("여행 지역을 선택해 주세요.");
//     return false;
//   }
// }
</script>
