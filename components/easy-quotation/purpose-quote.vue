<template>
  <div>
    <div class="max-w-full overflow-y-auto bg-white shadow-lg   lg:overflow-y-auto">
      <div class="mx-auto p-4 bg-white max-w-full md:max-w-[620px]">
        <h2 class="m-7 text-[#152123] text-2xl lg:ext-3xl font-bold text-center">여행하는 목적이 무엇인가요?</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[20px] mb-6 max-w-[840px] mx-auto">
          <button v-for="(dest, index) in goal_selected" :key="dest.label" @click="selectGoal(dest)" :class="[
            'custom-destination-button',
            {
              'bg-theme-selected text-white': isGoalSelected(dest.gid),
              'bg-theme-unselected': !isGoalSelected(dest.gid),
              'col-span-full sm:col-span-1': index === goal_selected.length - 1
            }
          ]">
            <img v-if="dest.icon" :src="dest.icon" alt="" class="w-6 h-6 inline-block" :style="{
              filter: isGoalSelected(dest.gid)
                ? 'brightness(0) saturate(100%) invert(1)'
                : 'brightness(0) saturate(100%) invert(26%) sepia(0%) saturate(1%) hue-rotate(342deg) brightness(95%) contrast(92%)'
            }" />
            <span :class="{
              'ml-2': index === 1 || index === 5,
              'mr-[-18px]': index === 3
            }">
              {{ dest.label }}
            </span>
          </button>
        </div>

        <h2  class="text-[#152123] text-2xl lg:ext-3xl font-bold text-center m-3">희망하는여행테마가있으신가요?</h2>
        <p class="text-base font-normal text-[#95C3DD] mb-6 text-center">복수 선택 가능</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-[20px] mb-6 max-w-[620px] mx-auto">
          <button v-for="theme in theme_selected" :key="theme.th_id" @click="toggleThemes(theme)" :class="[
           'custom-theme-button text-center md:w-[132px]',
            {
              'bg-theme-selected': isThemeSelect(theme.th_id),
              'bg-theme-unselected': !isThemeSelect(theme.th_id)
            }
          ]">
            {{ theme.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useEasyQuotationStore } from '~/stores/easy-quotation.store';
import trophyIcon from '@/assets/icons/trophy.svg';
import userIcon from '@/assets/icons/users.svg';
import heartIcon from '@/assets/icons/heart.svg';
import pilgrimageIcon from '@/assets/icons/pilgrimage.svg';
import golfIcon from '@/assets/icons/golf.svg';
import businessIcon from '@/assets/icons/business.svg';

const store = useEasyQuotationStore();

const goal_selected = ref([
  { gid: 1, icon: trophyIcon, label: '기업포상' },
  { gid: 2, icon: userIcon, label: '친목' },
  { gid: 3, icon: heartIcon, label: '가족/효도' },
  { gid: 4, icon: pilgrimageIcon, label: '성지순례' },
  { gid: 5, icon: businessIcon, label: '비즈니스' },
  { gid: 6, icon: golfIcon, label: '골프' },
  { gid: 7, icon: '', label: '기타' }
]);

const theme_selected = ref([
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

const selectGoal = (destination) => {
  if (store.EasyQuotation.selectedDestination === destination.gid) {
    store.clearDestination();
    store.EasyQuotation.selectedDestinationLabel = '';
  } else {
    store.setSelectedDestination(destination.gid);
    store.EasyQuotation.selectedDestinationIcon = destination.icon;
    store.EasyQuotation.selectedDestinationLabel = destination.label;
  }
};

const toggleThemes = (theme) => {
  // Toggle the theme selection
  store.toggleSelectedTheme(theme.th_id);

  // Check if the theme is now selected
  const isSelected = store.EasyQuotation.selectedThemes.some(selected => selected.th_id === theme.th_id);

  if (isSelected) {
    // If selected, add the label to the array if not already present
    if (!store.EasyQuotation.selectedThemeLabel.includes(theme.label)) {
      store.EasyQuotation.selectedThemeLabel.push(theme.label);
    }
  } else {
    // If deselected, remove the label from the array
    store.EasyQuotation.selectedThemeLabel = store.EasyQuotation.selectedThemeLabel.filter(label => label !== theme.label);
  }
};

const isGoalSelected = computed(() => (gid) =>
  store.EasyQuotation.selectedDestination === gid
);

const isThemeSelect = computed(() => (th_id) =>
  store.EasyQuotation.selectedThemes.some(theme => theme.th_id === th_id)
);
</script>

<style scoped></style>