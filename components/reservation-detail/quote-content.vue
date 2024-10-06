<template>
  <div class="sm:w-[840px] w-full px-4 sm:px-0 mx-auto" v-if="quoteDetails?.quo?.req">
    <!-- Budget Section -->
    <div class="grid grid-cols-1 py-2">
      <div class="flex flex-col sm:flex-row sm:items-center">
        <label class="text-[16px] text-[#132d5c] sm:w-[15%] w-full mb-2 sm:mb-0 sm:mr-2">
          1인당 희망 예산
        </label>
        <p class="text-[16px] text-[#7C7D82]">
          {{ holderInfo.budgetPerson }} KRW ~ 
          {{ holderInfo.budgetPerson_end }} KRW
        </p>
      </div>
    </div>

    <!-- Tourist Destination Section -->
    <div class="grid grid-cols-1 py-2">
      <div class="flex flex-col sm:flex-row">
        <label class="text-[16px] text-[#132d5c] sm:w-[15%] w-full mb-2 sm:mb-0 sm:mr-2">
          희망 관광지
        </label>
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <input 
              disabled 
              type="radio" 
              name="attraction" 
              class="mr-2 radio" 
              :checked="holderInfo.touristDestination === '선택'" 
            />
            <label class="text-[16px] text-[#7C7D82]">선택</label>
          </div>
          <div class="flex items-center">
            <input 
              disabled 
              type="radio" 
              name="attraction" 
              class="mr-2 radio" 
              :checked="holderInfo.touristDestination === '미선택'" 
            />
            <label class="text-[16px] text-[#7C7D82]">미선택</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Tourist Details Section -->
    <div class="grid grid-cols-1 py-2">
      <div class="flex flex-col sm:flex-row">
        <label class="text-[16px] text-[#132d5c] sm:w-[15%] w-full sm:mr-2"></label>
        <p class="text-[16px] text-[#020202] bg-[#D8D8D8] px-4 py-4 rounded w-full sm:w-[85%]">
          {{ holderInfo.touristDestination_detail }}
        </p>
      </div>
    </div>

    <!-- Accommodation Section -->
    <div class="grid grid-cols-1 py-2">
      <div class="flex flex-col sm:flex-row">
        <label class="text-[16px] text-[#132d5c] sm:w-[15%] w-full mb-2 sm:mb-0 sm:mr-2">
          희망 숙소
        </label>
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-[16px] text-[#6592E2] sm:w-auto w-full">숙소 형태</label>
            <label class="text-[16px] text-[#7C7D82]">{{ holderInfo.hotelType }}</label>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-[16px] text-[#6592E2] sm:w-auto w-full">침대 옵션</label>
            <label class="text-[16px] text-[#7C7D82]">{{ holderInfo.bedOption }}</label>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-[16px] text-[#6592E2] sm:w-auto w-full">추가 옵션</label>
            <label class="text-[16px] text-[#7C7D82]">{{ holderInfo.moreOption }}</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Food Section -->
    <div class="grid grid-cols-1 py-2">
      <div class="flex flex-col sm:flex-row">
        <label class="text-[16px] text-[#132d5c] sm:w-[15%] w-full mb-2 sm:mb-0 sm:mr-2">
          희망 음식
        </label>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex flex-col sm:flex-row gap-2">
            <label class="text-[16px] text-[#6592E2] sm:w-20 w-full">음식 종류</label>
            <label class="text-[16px] text-[#7C7D82]">{{ holderInfo.foodType }}</label>
          </div>
          <div class="flex flex-col sm:flex-row gap-2">
            <label class="text-[16px] text-[#6592E2] sm:w-20 w-full">선택사항</label>
            <label class="text-[16px] text-[#7C7D82]">{{ holderInfo.foodOption }}</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Vehicle Section -->
    <div class="grid grid-cols-1 py-2">
      <div class="flex flex-col sm:flex-row">
        <label class="text-[16px] text-[#132d5c] sm:w-[15%] w-full mb-2 sm:mb-0 sm:mr-2">
          희망 차량
        </label>
        <p class="text-[16px] text-[#7C7D82]">{{ holderInfo.vehicle }}</p>
      </div>
    </div>

    <!-- Optional Section -->
    <div class="grid grid-cols-1 py-2">
      <div class="flex flex-col sm:flex-row">
        <label class="text-[16px] text-[#132d5c] sm:w-[15%] w-full mb-2 sm:mb-0 sm:mr-2">
          옵션 사항
        </label>
        <p class="text-[16px] text-[#7C7D82]">{{ holderInfo.option }}</p>
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
};

watch(() => props.quoteDetails?.quo?.req, (newValue) => {
  updateHolderInfo(newValue);
}, { immediate: true, deep: true });
</script>