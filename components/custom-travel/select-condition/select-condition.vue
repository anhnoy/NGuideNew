<template>
  <div class="max-w-full  bg-white shadow-lg md:h-[820px] h-[795px] overflow-y-auto lg:overflow-y-auto ">
    <div class="mx-auto mt-5 w-[328px] bg-white max-w-full md:max-w-[620px] lg:w-[840px]">
      <h1 class="h1-custom mb-4">희망하는 숙소 형태가 있으신가요?</h1>
      <div class="flex gap-[8px] flex-row justify-center ">
        <h2 class="h2-custom mb-4 text-[#2F312A]">숙소 형태 </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-[8px] md:gap-[10px] mb-6">
        <button v-for="accommodation in accommodations" :key="accommodation.value"
          @click="store.setAccommodations(accommodation.value)" :class="[
            'custom-destination-button text-sm w-[160px] h-[44px] md:h-[40px] md:w-auto',
            store.travelCustom.selectedAccommodations === accommodation.value ? 'bg-theme-selected' : 'bg-theme-unselected'
          ]">
          {{ accommodation.name }}
        </button>
      </div>

      <div class="flex gap-[8px] flex-row justify-center ">
        <h2 class="h2-custom mb-4 text-[#2F312A]">침대 옵션 (복수 선택 가능)</h2>

      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-[8px] md:gap-[10px] mb-6">
        <button v-for="bed in beds" :key="bed.rid" @click="toggleBed(bed.rid)"
          :class="['custom-destination-button text-sm w-[160px] h-[44px] md:h-[40px] md:w-auto', isBedSelected(bed.rid) ? 'bg-theme-selected' : 'bg-theme-unselected']">
          {{ bed.name }}
        </button>
      </div>

      <h2 class="h2-custom mb-4 text-[#2F312A]">기타 옵션</h2>
      <div class="grid grid-cols-2 md:grid-cols-2 gap-[8px] md:gap-[10px] mb-6">
        <button v-for="option in otherOptions" :key="option.value" @click="setReqIncFood(option.value)"
          :class="['custom-destination-button text-sm w-[160px] h-[44px] md:h-[40px] md:w-auto', store.travelCustom.req_inc_food === option.value ? 'bg-theme-selected' : 'bg-theme-unselected']">
          {{ option.name }}
        </button>
      </div>

      <h1 class="h1-custom mb-4 w-[328px]">희망하는 음식 종류가 있으신가요?</h1>
      <h2 class="h2-custom mb-4">음식 종류 (복수 선택 가능)</h2>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-[10px] md:gap-[4px] mb-6">
        <button v-for="food in foods" :key="food.fdt_id" @click="toggleFood(food.fdt_id)"
          :class="['custom-destination-button text-sm w-[101px] h-[44px] md:h-[40px] md:w-auto', isSelected(food.fdt_id) ? 'bg-theme-selected' : 'bg-theme-unselected']">
          {{ food.name }}
        </button>
      </div>

      <h2 class="h2-custom mb-4">기타 사항 (복수 선택 가능)</h2>
      <h3 class="h3-custom text-[#8E8D8D] text-xs md:text-sm mb-4">※주의해야 할 사항이나 필요한 사항이 있다면 체크해 주세요.</h3>
      <div class="grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 gap-[10px] md:gap-[10px] mb-6">
        <button v-for="(other, index) in others" :key="other.value" @click="toggleStrictListItem(other.value)" :class="[
          'custom-destination-button text-sm w-[160px] h-[44px] md:h-[40px] md:w-auto',
          isStrictListItemSelected(other.value) ? 'bg-theme-selected' : 'bg-theme-unselected',
          { 'mt-[3px]': index >= 4 && index <= 7 }
        ]">
          {{ other.name }}
        </button>
      </div>
      

      <h1 class="h1-custom mb-4">단체로 이동 시 희망하는 차량이 있으신가요?</h1>
      <h2 class="h2-custom mb-4">차량 종류</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-[10px] md:gap-[10px] mb-6">
        <button v-for="vehicle in vehicles" :key="vehicle.value" @click="store.setVehicles(vehicle.value)"
          :class="['custom-destination-button text-sm w-[160px] h-[44px] md:h-[40px] md:w-auto', store.travelCustom.selectedVehicles === vehicle.value ? 'bg-theme-selected' : 'bg-theme-unselected']">
          {{ vehicle.name }}
        </button>
      </div>

      <h1 class="h1-custom mb-4">원하는 옵션 사항이 있으신가요?</h1>
      <h2 class="h2-custom mb-4">옵션 사항 (복수 선택 가능)</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 mb-10 gap-[8px] md:gap-[10px]">
        <button v-for="emotion in addittionlist" :key="emotion.ado_id" @click="toggleAdditionListItem(emotion.ado_id)"
          :class="['custom-destination-button text-sm w-[160px] h-[44px] md:h-[40px] md:w-auto', isAdditionListItemSelected(emotion.ado_id) ? 'bg-theme-selected' : 'bg-theme-unselected']">
          {{ emotion.name }}
        </button>
      </div>
      <div class="sm:hidden mb-16"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDestinationStore } from '@/stores/destination.store';

const store = useDestinationStore();

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

const foods = ref([
  { fdt_id: 1, name: "한식" },
  { fdt_id: 2, name: "양식" },
  { fdt_id: 3, name: "태국식" },
  { fdt_id: 4, name: "중식" },
  { fdt_id: 5, name: "현지식" },
  { fdt_id: 6, name: "상관없음" },
]);

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

const vehicles = ref([
  { name: '15인승 벤', value: 1 },
  { name: '25인승 버스', value: 2 },
  { name: '45인승 버스', value: 3 },
  { name: '상관없음', value: 4 },
]);

const addittionlist = ref([
  { ado_id: 1, name: '쇼핑 불포함' },
  { ado_id: 2, name: '관광 옵션 불포함' },
  { ado_id: 3, name: '자유 일정 포함' },
  { ado_id: 4, name: '해당없음' },
]);

const toggleBed = (rid) => {
  store.toggleBed(rid);
};

const isBedSelected = (rid) => {
  return store.travelCustom.selectedBeds.some(bed => bed.rid === rid);
};

const setReqIncFood = (value) => {
  if (store.travelCustom.req_inc_food === value) {
    store.travelCustom.req_inc_food = ""; // Deselect if already selected
  } else {
    store.travelCustom.req_inc_food = value; // Select the new option
  }
};

const toggleFood = (fdt_id) => {
  store.toggleFood(fdt_id);
};

const isSelected = (fdt_id) => {
  return store.travelCustom.selectedFoods.some(food => food.fdt_id === fdt_id);
};

const toggleStrictListItem = (sc_id) => {
  store.toggleStrictListItem(sc_id);
};

const isStrictListItemSelected = (sc_id) => {
  return store.travelCustom.strictList.some(item => item.sc_id === sc_id);
};

const toggleAdditionListItem = (ado_id) => {
  store.toggleAdditionListItem(ado_id);
};

const isAdditionListItemSelected = (ado_id) => {
  return store.travelCustom.additionList.some(item => item.ado_id === ado_id);
};

</script>
