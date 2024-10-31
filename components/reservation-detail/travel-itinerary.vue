<template>
  <div>
    <!-- Desktop view -->
    <div class="table p-1 mx-auto sm:w-[840px] w-[360px] hidden sm:block" style="font-weight: 410">
      <div class="px-3 mb-6 items-center">
        <table>
          <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex" class="text-[14px]">
            <tr>
              <td :rowspan="getTotalRowSpan(day)"
                class="w-[108px] bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
                <div class="justify-center items-center font-bold">
                  <span>{{ `${dayIndex + 1} 일차` }}</span>
                </div>
              </td>
              <td :rowspan="getTotalRowSpan(day)" class="w-30 bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
                <span class="w-full p-4 text-center block text-[#5E5F61]">
                  {{ day.tourismLocation }}
                </span>
              </td>
            </tr>

            <!-- Attractions and Activities -->
            <template v-if="day.details">
              <tr v-for="(detail, detailIndex) in filterDetailsByTypes(day.details, [1, 5, 6, 8, 9])"
                :key="`attraction-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-[120px] bg-[#F3F4F7]"
                  :rowspan="getTypesRowCount(day.details, [1, 5, 6, 8, 9])">
                  일정
                </th>
                <td colspan="2" class="p-2 w-100">
                  <span class="w-full p-2 text-left block" :title="detail.tourism_name">
                    {{ detail.tourism_name || 'No data' }}
                  </span>
                </td>
              </tr>

              <!-- Lodging -->
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`lodging-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-30 bg-[#F3F4F7]" :rowspan="getTypeRowCount(day.details, 3)">
                  숙소
                </th>
                <td colspan="2" class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ detail.tourism_name || 'No data' }}
                  </span>
                </td>
              </tr>

              <!-- Meals -->
              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]" rowspan="4">식사</th>
              </tr>
              <tr v-for="meal in ['조식', '중식', '석식']" :key="meal">
                <td class="p-2 w-[114px]">{{ meal }}</td>
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ getMealByType(day.details, mealTypeMap[meal]) }}
                  </span>
                </td>
              </tr>

              <!-- Transportation/Guide -->
              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]">교통 / 가이드</th>
                <td colspan="2" class="p-2">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="(detail, index) in filterDetailsByTypes(day.details, [2, 7])"
                      :key="`transport-${index}`" class="block">
                      {{ detail.tourism_name || 'No data' }}
                    </span>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Updated Mobile view -->
    <div class="max-w-4xl w-[328px] mx-auto block sm:hidden">
      <div v-for="(day, dayIndex) in dynamicRows" :key="dayIndex" class="border border-t border-white">
        <!-- Day header - Fixed at the top -->
        <div>
          <div class="bg-gray-100 font-bold text-lg flex h-[47px] justify-center items-center border-t border-white">
            <span class="text-base font-medium leading-[23.17px] tracking-[-0.01em] text-center text-[#152123]">
              {{ `${dayIndex + 1} 일차` }}
            </span>
          </div>
          <div class="bg-gray-100 font-bold text-lg h-[47px] flex justify-center items-center border-t border-white">
            <span class="text-base font-medium leading-[23.17px]  tracking-[-0.01em] text-center text-[#6592E2]">
              {{ day.tourismLocation }}
            </span>
          </div>
        </div>

        <!-- Content sections -->
        <div class="grid grid-cols-1 gap-2">
          <!-- Attractions and Activities -->
          <div class="grid grid-cols-4">
            <div
              class="font-semibold text-[#5E5F61] text-sm flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
              일정
            </div>
            <div class="col-span-3">
              <div v-for="(detail, detailIndex) in filterDetailsByTypes(day.details, [1, 5, 6, 8, 9])"
                :key="`attraction-${detailIndex}`"
                class="border text-[#152123] flex text-sm justify-center items-center min-h-[44px] border-[#E6E6E6] p-2">
                {{ detail.tourism_name || 'No data' }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-4 mt-[-8px]">
            <div
              class="font-semibold text-[#5E5F61]  flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
              숙소
            </div>
            <div class="col-span-3">
              <div v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`lodging-${detailIndex}`"
                class="border flex text-[#152123] justify-center items-center min-h-[44px] border-[#E6E6E6] p-2">
                {{ detail.tourism_name || 'No data' }}
              </div>
            </div>
          </div>

          <!-- Lodging -->

          <!-- Meals -->
          <div class="grid grid-cols-4 mt-[-8px]">
            <div
              class="font-semibold text-[#5E5F61]  text-sm flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
              식사
            </div>
            <div class="col-span-3">
              <div v-for="meal in ['조식', '중식', '석식']" :key="meal" class="flex border border-[#E6E6E6]">
                <div class="w-[80px] text-[#152123] text-sm justify-center flex items-center border-r border-[#E6E6E6] p-2">
                  {{ meal }}:
                </div>
                <div class="flex-1 justify-center text-[#152123] flex items-center min-h-[44px] p-2">
                  {{ getMealByType(day.details, mealTypeMap[meal]) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Transportation/Guide -->
          <div class="grid grid-cols-4 gap-0 mt-[-8px]">
            <div
              class="font-semibold text-[#5E5F61]  text-sm flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border p-2">
              교통 / 가이드
            </div>
            <div class="col-span-3 border border-[#E6E6E6] p-2">
              <div class="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
                <div v-for="(detail, detailIndex) in filterDetailsByTypes(day.details, [2, 7])"
                  :key="`transport-${detailIndex}`" class="flex text-[#152123] items-center justify-center p-2">
                  {{ detail.tourism_name || 'No data' }},
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  },
  locale: {
    type: String,
    default: 'en'
  }
});

const isLoading = ref(true);
const dynamicRows = ref([]);

const mealTypeMap = {
  '조식': '1',
  '중식': '2',
  '석식': '3'
};

const filterDetailsByType = (details, type) => {
  return details?.filter(detail => detail.type === type) || [];
};

const filterDetailsByTypes = (details, types) => {
  return details?.filter(detail => types.includes(detail.type)) || [];
};

const getTypeRowCount = (details, type) => {
  return filterDetailsByType(details, type).length || 1;
};

const getTypesRowCount = (details, types) => {
  return filterDetailsByTypes(details, types).length || 1;
};

const getTotalRowSpan = (day) => {
  if (!day.details) return 1;
  return (
    getTypesRowCount(day.details, [1, 5, 6, 8, 9]) + // Attractions and activities
    4 + // Fixed number for meals (header + 3 rows)
    getTypeRowCount(day.details, 3) + // Lodging
    [2,7]// Transportation/Guide (combined into one row)
  );
};

const getMealByType = (details, typeOrder) => {
  if (!details) return '-';
  const meal = details.find(detail =>
    detail.type === 4 && detail.type_order === typeOrder
  );
  return meal ? meal.tourism_name : '-';
};

const getDayOfWeek = (date) => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
};

const processDetails = (touristDetail) => {
  const details = touristDetail.details || [];
  const location = details.length > 0 ? details[0].tourism_location : '';

  return {
    date: touristDetail.tourist_date,
    dayOfWeek: getDayOfWeek(touristDetail.tourist_date),
    tourismLocation: location,
    details: details
  };
};

const updateRows = () => {
  if (!props.quoteDetails?.touris_detail) {
    console.error('Tourism details are not available');
    return;
  }

  const processedRows = props.quoteDetails.touris_detail
    .map(processDetails)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  dynamicRows.value = processedRows;
};

onMounted(() => {
  updateRows();
  isLoading.value = false;
});

watch(() => props.quoteDetails, updateRows, { deep: true });
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}

.text-sm {
  font-size: 0.875rem;
}
</style>