<template>
  <div>
    <div class="max-w-full md:h-[820px] h-[795px] overflow-y-auto bg-white shadow-lg   lg:overflow-y-auto">
      <div class="mx-auto p-4 bg-white max-w-full md:max-w-[620px]">
        <h2 class="h1-custom mb-4">여행하는 목적이 무엇인가요?</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[20px] mb-6 max-w-[620px] mx-auto">
          <button 
            v-for="(dest, index) in destinations" 
            :key="dest.label" 
            @click="selectDestination(dest)" 
            :class="[ 
              'custom-destination-button flex items-center justify-center',
              {
                'bg-theme-selected text-white': isDestinationSelected(dest.gid),
                'bg-theme-unselected': !isDestinationSelected(dest.gid),
                'col-span-full sm:col-span-1': index === destinations.length - 1,
              }
            ]"
          >
            <img 
              v-if="dest.icon" 
              :src="dest.icon" 
              alt="" 
              class="w-6 h-6 mr-2" 
              :style="{
                filter: isDestinationSelected(dest.gid)
                  ? 'brightness(0) saturate(100%) invert(1)'
                  : 'brightness(0) saturate(100%) invert(26%) sepia(0%) saturate(1%) hue-rotate(342deg) brightness(95%) contrast(92%)'
              }" 
            />
            <span :class="{
              'ml-2': index === 1 || index === 5,
              'mr-[-18px]': index === 3
            }">
              {{ dest.label }}
            </span>
          </button>
        </div>

        <h2 class="h1-custom mb-2">희망하는여행테마가있으신가요?</h2>
        <p class="h3-custom text-[#FF7100] mb-6">복수 선택 가능</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-[20px] mb-6 max-w-[620px] mx-auto">
          <button 
            v-for="theme in themes" 
            :key="theme.th_id" 
            @click="toggleTheme(theme)"
            :class="[
              'custom-theme-button text-center md:w-[132px]',
              {
                'bg-theme-selected': isThemeSelected(theme.th_id),
                'bg-theme-unselected': !isThemeSelected(theme.th_id)
              }
            ]"
          >
            {{ theme.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDestinationStore } from '@/stores/destination.store';
import trophyIcon from '@/assets/icons/trophy.svg';
import userIcon from '@/assets/icons/users.svg';
import heartIcon from '@/assets/icons/heart.svg';
import pilgrimageIcon from '@/assets/icons/pilgrimage.svg';
import golfIcon from '@/assets/icons/golf.svg';
import businessIcon from '@/assets/icons/business.svg';

const store = useDestinationStore();

const destinations = ref([
  { gid: 1, icon: trophyIcon, label: '기업포상' },
  { gid: 2, icon: userIcon, label: '친목' },
  { gid: 3, icon: heartIcon, label: '가족/효도' },
  { gid: 4, icon: pilgrimageIcon, label: '성지순례' },
  { gid: 5, icon: businessIcon, label: '비즈니스' },
  { gid: 6, icon: golfIcon, label: '골프' },
  { gid: 7, icon: '', label: '기타' }
]);

const themes = ref([
  { th_id: 1, label: '명소관광', value: 'sightseeing' },
  { th_id: 2, label: '미식', value: 'gourmet' },
  { th_id: 3, label: '문화 체험', value: 'cultural_experience' },
  { th_id: 4, label: '쇼핑', value: 'shopping' },
  { th_id: 5, label: '역사 체험', value: 'historical_experience' },
  { th_id: 6, label: '트레킹', value: 'trekking' },
  { th_id: 7, label: '예술', value: 'art' },
  { th_id: 8, label: '스포츠', value: 'sports' },
  { th_id: 9, label: '전통', value: 'tia' },
  { th_id: 10, label: '힐링 여행', value: 'healing_trip' },
  { th_id: 11, label: '음주', value: 'drinking' },
  { th_id: 12, label: '기타', value: 'other' }
]);

const selectDestination = (destination) => {
  if (store.travelCustom.selectedDestination === destination.gid) {
    store.clearDestination();
    store.travelCustom.selectedDestinationLabel = '';
  } else {
    store.setSelectedDestination(destination.gid);
    store.travelCustom.selectedDestinationIcon = destination.icon;
    store.travelCustom.selectedDestinationLabel = destination.label;
  }
};

const toggleTheme = (theme) => {
  // Toggle the theme selection
  store.toggleSelectedTheme(theme.th_id);

  // Check if the theme is now selected
  const isSelected = store.travelCustom.selectedThemes.some(selected => selected.th_id === theme.th_id);

  if (isSelected) {
    // If selected, add the label to the array if not already present
    if (!store.travelCustom.selectedThemeLabel.includes(theme.label)) {
      store.travelCustom.selectedThemeLabel.push(theme.label);
    }
  } else {
    // If deselected, remove the label from the array
    store.travelCustom.selectedThemeLabel = store.travelCustom.selectedThemeLabel.filter(label => label !== theme.label);
  }
};

const isDestinationSelected = computed(() => (gid) =>
  store.travelCustom.selectedDestination === gid
);

const isThemeSelected = computed(() => (th_id) =>
  store.travelCustom.selectedThemes.some(theme => theme.th_id === th_id)
);
</script>

<style scoped>

</style>