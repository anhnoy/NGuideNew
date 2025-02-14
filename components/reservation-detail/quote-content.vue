<template>
  <div class="sm:w-[840px] w-[328px] mx-auto px-4 sm:px-0">
    <!-- Budget Section -->
    <div class="flex flex-row sm:flex-row sm:items-center py-2">
      <label class="text-[14px] md:text-[14px] text-[#132d5c] w-[50%] sm:w-[30%] mb-2 sm:mb-0">
        1인당 희망 예산
      </label>
      <p class="text-[14px] md:text-[16px] text-[#7C7D82] w-full sm:w-[70%]">
        {{ holderInfo.budgetPerson }} 만 원 ~ {{ holderInfo.budgetPerson_end }} 만 원
      </p>
    </div>

    <!-- Tourist Destination Section -->
    <div class="flex flex-row sm:flex-row py-2">
      <label class="text-[14px] md:text-[16px] text-[#132d5c] w-[50%] sm:w-[30%] mb-2 sm:mb-0">
        희망 관광지
      </label>
      <div class="w-full sm:w-[70%]">
        <div class="flex items-center gap-4 mb-2">
          <div class="flex items-center">
            <input disabled type="radio" name="attraction" class="mr-2 radio w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
              :checked="holderInfo.touristDestination === '선택'" />
            <label class="text-[14px] md:text-[16px] text-[#7C7D82]">선택</label>
          </div>
          <div class="flex items-center">
            <input disabled type="radio" name="attraction" class="mr-2 radio"
              :checked="holderInfo.touristDestination === '미선택'" />
            <label class="text-[14px] md:text-[16px] text-[#7C7D82]">미선택</label>
          </div>
        </div>
        <p class="text-[14px] md:text-[16px] text-[#020202] bg-[#D8D8D8] px-4 py-4 rounded">
          {{ holderInfo.touristDestination_detail }}
        </p>
      </div>
    </div>

    <!-- Accommodation Section -->
    <div class="flex flex-row sm:flex-row py-2">
      <label class="text-[14px] md:text-[16px] text-[#132d5c] w-[50%] sm:w-[30%] mb-2 sm:mb-0">
        희망 숙소
      </label>
      <div class="w-full sm:w-[70%] flex flex-col gap-2">
        <div class="flex flex-row items-center">
          <span class="text-[14px] md:text-[16px] text-[#6592E2] w-24">숙소 형태:</span>
          <span class="text-[14px] md:text-[16px] text-[#7C7D82]">{{ holderInfo.hotelType }}</span>
        </div>
        <div class="flex flex-row items-center">
          <span class="text-[14px] md:text-[16px] text-[#6592E2] w-24">침대 옵션:</span>
          <span class="text-[14px] md:text-[16px] text-[#7C7D82]">{{ holderInfo.bedOption }}</span>
        </div>
        <div class="flex flex-row items-center">
          <span class="text-[14px] md:text-[16px] text-[#6592E2] w-24">추가 옵션:</span>
          <span class="text-[14px] md:text-[16px] text-[#7C7D82]">{{ holderInfo.moreOption }}</span>
        </div>
      </div>
    </div>

    <!-- Food Section -->
    <div class="flex flex-row sm:flex-row py-2">
      <label class="text-[14px] md:text-[16px] text-[#132d5c] w-[50%] sm:w-[30%] mb-2 sm:mb-0">
        희망 음식
      </label>
      <div class="w-full sm:w-[70%] flex flex-col gap-2">
        <div class="flex items-center">
          <span class="text-[14px] md:text-[16px] text-[#6592E2] w-24">음식 종류:</span>
          <span class="text-[14px] md:text-[16px] text-[#7C7D82]">{{ holderInfo.foodType }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-[14px] md:text-[16px] text-[#6592E2] w-24">선택사항:</span>
          <span class="text-[14px] md:text-[16px] text-[#7C7D82]">{{ holderInfo.foodOption }}</span>
        </div>
      </div>
    </div>

    <!-- Vehicle Section -->
    <div class="flex flex-row sm:flex-row py-2">
      <label class="text-[14px] md:text-[16px] text-[#132d5c] w-[50%] sm:w-[30%] mb-2 sm:mb-0">
        희망 차량
      </label>
      <p class="text-[14px] md:text-[16px] text-[#7C7D82] w-full sm:w-[70%]">{{ holderInfo.vehicle }}</p>
    </div>

    <!-- Optional Section -->
    <div class="flex flex-row sm:flex-row py-2">
      <label class="text-[14px] md:text-[16px] text-[#132d5c] w-[50%] sm:w-[30%] mb-2 sm:mb-0">
        옵션 사항
      </label>
      <!-- <p class="text-[14px] md:text-[16px] text-[#7C7D82] w-full sm:w-[70%]">{{ holderInfo.option }}</p> -->
       <div class="flex flex-row gap-2 ">
        <div  class="flex items-center gap-2" v-for="ado_option in AllAddition_option" :key="ado_option.ado_id">
          <input :id="ado_option.ado_id" type="checkbox" class="checkbox" disabled :value="ado_option.ado_id" v-model="selected_Addition_options" />
          <label :for="ado_option.ado_id" class="text-[14px] md:text-[16px] text-[#7C7D82]">{{ ado_option.ado_name_kr }}</label>
        </div>
        </div>
    
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  }
});

const holderInfo = ref({});
const selected_Addition_options = ref([]);
const AllAddition_option = [
  {ado_id: 1, ado_name_kr: '쇼핑 불포함'},
  {ado_id: 2, ado_name_kr: '관광 옵션 불포함​'},
  {ado_id: 3, ado_name_kr: '자유 일정 포함'},
  {ado_id: 4, ado_name_kr: '상관없음'},
]


const updateHolderInfo = (result) => {
  if (!result) return;

  holderInfo.value = {
    budgetPerson: result.req_b?.criteria || '0',
    budgetPerson_end: result.req_b_end?.criteria || '0',
    touristDestination_detail: result.trip_reqs
      ? result.trip_reqs
        .map((tripReq) => {
          const cityName = tripReq?.la?.city?.city_name_kr || '-'
          const atName = tripReq?.la?.at?.at_name_kr || '-'
          const landName = tripReq?.la?.land_name || '-'
          return `${cityName} > ${atName} ( ${landName} )`
        })
        .join(' | ')
      : 'N/A',
    touristDestination: computed(() => holderInfo.value.touristDestination_detail !== 'N/A' ? '선택' : '미선택'),
    hotelType: result.req_hotel_hotel?.h_star_kr || '-',
    bedOption: result.room_selecteds?.[0]?.rid_room_type?.r_name_kr || '-',
    moreOption: result.req_inc_food === 1 ? '조식 포함' : '조식 미포함',
    foodType: result.favor_foods?.length > 0 ? result.favor_foods.map(food => food.fdt?.food_type_name_kr).join(', ') : '-',
    foodOption: result.strict_lists?.length > 0 ? result.strict_lists.map(strict => strict.sc?.strict_con_name_kr).join(', ') : '-',
    vehicle: result.req_vehicle_vehicle_type?.v_type_name_kr || '-',
    option: result.addition_lists?.length > 0 ? result.addition_lists.map(addition => addition.ado?.ado_name_kr).join(', ') : '-'
  };
  selected_Addition_options.value =  result.addition_lists.map(item => item.ado.ado_id);

};

watch(() => props.quoteDetails?.quo?.req, (newValue) => {
  if (newValue) {
    updateHolderInfo(newValue);
  }
}, { immediate: true, deep: true });
</script>
