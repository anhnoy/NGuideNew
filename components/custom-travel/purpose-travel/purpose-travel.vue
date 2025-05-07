<template>
  <div>
    <div class="max-w-[1080px] bg-white">
      <div class="mx-auto bg-white max-w-full gap-[60px] md:max-w-[620px] mt-5">
        <h2 class="m-7 text-[#152123] text-[22px] sm:text-[30px] lg:text-3xl font-bold text-center">
          여행지를 선택해 주세요.​
        </h2>
        <div class="grid w-[328px] md:w-[620px] mx-auto grid-cols-2 md:grid-cols-2 gap-[8px] md:gap-[10px] mb-6">
          <button v-for="region in regions" :key="region.value" @click="selectRegion(region.value)" :class="[
            'custom-destination-button md:text-base text-sm w-[160px] h-[43px] mx-auto md:mx-0 md:h-[50px] md:w-auto',
            isRegionSelected(region.value)
              ? 'bg-theme-selected'
              : 'bg-theme-unselected',
          ]">
            {{ region.name }}
          </button>
        </div>
        <h2 class="m-7 text-[#152123] text-[22px] sm:text-[30px] lg:text-3xl font-bold text-center">
          여행하는 목적이 무엇인가요?
        </h2>
        <div
          class="w-[328px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[10px] sm:gap-[20px] mb-6 sm:w-[620.02px] mx-auto">
          <button v-for="(dest, index) in destinations" :key="dest.label" @click="selectDestination(dest)" :class="[
            'custom-destination-button h-[40px] sm:h-[50px] flex items-center justify-center',
            {
              'bg-theme-selected text-white': isDestinationSelected(dest.gid),
              'bg-theme-unselected': !isDestinationSelected(dest.gid),
              'col-span-2 w-[328px] md:w-[620.02px]':
                index === destinations.length - 1,
              'w-[159px] sm:w-[300px]': index !== destinations.length - 1,
            },
          ]">
            <img v-if="dest.icon" :src="dest.icon" alt="" class="w-6 h-6 mr-2" :style="{
              filter: isDestinationSelected(dest.gid)
                ? 'brightness(0) saturate(100%) invert(1)'
                : 'brightness(0) saturate(100%) invert(26%) sepia(0%) saturate(1%) hue-rotate(342deg) brightness(95%) contrast(92%)',
            }" />
            <span :class="{
              'ml-2': index === 1 || index === 5,
              'mr-[-18px]': index === 3,
            }">
              {{ dest.label }}
            </span>
          </button>
        </div>

        <div class="mt-10">
          <h2 class="text-[#152123] text-[22px] md:text-[30px] lg:text-3xl font-bold text-center m-3"
            style="letter-spacing: -0.01em">
            <span class="md:hidden">희망하 는여행 테마가 <br />있으신가요?</span>
            <span class="hidden md:inline">희망하 는여행 테마가 있으신가요?</span>
          </h2>
          <p class="text-[16px] font-normal text-[#95C3DD] mb-6 text-center">
            복수 선택 가능
          </p>
          <div
            class="w-[328px] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-[10px] sm:gap-[20px] mb-6 sm:w-[620.02px] mx-auto">
            <button v-for="theme in themes" :key="theme.th_id" @click="toggleTheme(theme)" :class="[
              'custom-theme-button text-center md:w-[140px] h-[44px] md:h-[50px]',
              {
                'bg-theme-selected': isThemeSelected(theme.th_id),
                'bg-theme-unselected': !isThemeSelected(theme.th_id),
              },
            ]">
              {{ theme.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="sm:hidden mb-40"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDestinationStore } from "@/stores/destination.store";
import trophyIcon from "@/assets/icons/trophy.svg";
import userIcon from "@/assets/icons/users.svg";
import heartIcon from "@/assets/icons/heart.svg";
import pilgrimageIcon from "@/assets/icons/pilgrimage.svg";
import golfIcon from "@/assets/icons/golf.svg";
import businessIcon from "@/assets/icons/business.svg";

const store = useDestinationStore();

const regions = ref([
  { value: "1", name: "라오스" },
  { value: "2", name: "태국​" },
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

const selectDestination = (destination) => {
  if (store.travelCustom.selectedDestination === destination.gid) {
    store.clearDestination();
    store.travelCustom.selectedDestinationLabel = "";
  } else {
    store.setSelectedDestination(destination.gid);
    store.travelCustom.selectedDestinationIcon = destination.icon;
    store.travelCustom.selectedDestinationLabel = destination.label;
  }
};

const selectRegion = (value) => {
  if (store.travelCustom.region === value) {
    store.travelCustom.region = ""; // Deselect if already selected
  } else {
    store.travelCustom.region = value; // Select the new option
    if (value === "1" || value === "2") {
      store.travelCustom.selectedPlaces = [];
      store.travelCustom.trip_req = [];
    }
  }
};

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
const isRegionSelected = computed(
  () => (region) => store.travelCustom.region === region
);
</script>

<style scoped></style>
