<template>
  <div>
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
                <span class="w-full p-4 text-center block text-[#6592E2]">
                  {{ day.tourismLocation }}
                </span>
              </td>
            </tr>

            <!-- Tourist Attractions -->
            <template v-if="day.details">
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 1)"
                :key="`attraction-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-30 bg-[#F3F4F7]" :rowspan="getTypeRowCount(day.details, 1)">
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
                  <span class="w-full p-2 text-left block" v-for="lodging in getguideByType(day.details, 3)"
                    :key="lodging.id">
                    {{ lodging.tourism_name || 'No data' }}
                  </span>
                </td>
              </tr>

              <!-- Meals -->
              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]" rowspan="4">식사</th>
              </tr>
              <!-- Breakfast -->
              <tr>
                <td class="p-2 w-10">조식</td>
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ getMealByType(day.details, '1') }}
                  </span>
                </td>
              </tr>
              <!-- Lunch -->
              <tr>
                <td class="p-2 w-[114px]">중식</td>
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ getMealByType(day.details, '2') }}
                  </span>
                </td>
              </tr>
              <!-- Dinner -->
              <tr>
                <td class="p-2 w-10">석식</td>
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ getMealByType(day.details, '3') }}
                  </span>
                </td>
              </tr>

              <!-- Transportation/Guide -->
              <!-- <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 2)" :key="`transport-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-30 bg-[#F3F4F7]" :rowspan="getTypeRowCount(day.details, 2)">
                  교통 / 가이드
                </th>
                <td colspan="2" class="p-2 w-100">
                  <span class="w-full p-2 text-left block" :title="detail.tourism_name">
                    {{ detail.tourism_name || 'No data' }}
                  </span>
                </td>
              </tr> -->

              <!-- Additional Activities (Golf, Massage, etc.) -->
              <tr v-for="(detail, detailIndex) in filterDetailsByOtherTypes(day.details)"
                :key="`activity-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-30 bg-[#F3F4F7]"
                  :rowspan="getOtherTypesRowCount(day.details)">
                  교통 / 가이드
                </th>
                <td colspan="2" class="p-2 w-100">
                  <span class="w-full p-2 text-left block" :title="detail.tourism_name">
                    {{ detail.tourism_name || 'No data' }}
                    <span class="text-gray-500 text-sm">
                      ({{ detail.type_attraction_type.at_name_en }})
                    </span>
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <!-- mobile -->
    <div class="max-w-4xl mx-auto  block lg:hidden">
      <div v-for="(day, dayIndex) in dynamicRows" :key="dayIndex" class=" border  border-t border-white">
        <div class="bg-gray-100 font-bold text-lg flex h-[47px] justify-center items-center border-t border-white">
          <span class="text-[16px] font-medium leading-[23.17px] tracking-[-0.01em] text-center text-[#152123]">{{
            `${dayIndex + 1} 일차` }}</span>
        </div>
        <div class="bg-gray-100 font-bold text-lg h-[47px] flex justify-center items-center border-t border-white">
          <span class="text-[16px] font-medium leading-[23.17px] tracking-[-0.01em] text-center text-[#6592E2]">{{
            day.tourismLocation }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-2 ">
          <!-- Attractions -->
          <div class="grid grid-cols-4">
            <div
              class="font-semibold flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
              일정</div>
            <div class="col-span-3">
              <div v-for="(detail, detailIndex) in filterDetailsByType(day.details, 1)"
                :key="`attraction-${detailIndex}`"
                class="border flex justify-center items-center h-[44px] border-[#E6E6E6] pt-2">
                {{ detail.tourism_name || 'No data' }}
              </div>
            </div>
            <div
              class="font-semibold flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
              숙소</div>
            <div class="col-span-3">
              <div class="md:col-span-3">
                <div v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)"
                  class="border flex justify-center items-center h-[44px]  border-[#E6E6E6] pt-2"
                  :key="`lodging-${detailIndex}`">
                  {{ detail.tourism_name || 'No data' }}
                </div>
              </div>
            </div>
            <div
              class="font-semibold flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
              식사</div>
            <div class="col-span-3">
              <div class="md:col-span-3">
                <div class="flex">
                  <div class="w-[80px] justify-center flex items-center border">조식:</div>
                  <div class="w-full h-[44px]  justify-center flex items-center border"> {{ getMealByType(day.details,
                    '1')
                    }}
                  </div>
                </div>
                <div class="flex">
                  <div class="w-[80px] h-[44px]  justify-center flex items-center border">중식:</div>
                  <div class="w-full  justify-center flex items-center border"> {{ getMealByType(day.details, '2') }}
                  </div>
                </div>
                <div class="flex">
                  <div class="w-[80px] justify-center flex items-center border">석식:</div>
                  <div class="w-full h-[44px]  justify-center flex items-center border"> {{ getMealByType(day.details,
                    '3')
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="font-semibold flex justify-center items-center bg-[#EDEDF2] border-solid border-[#FFFFFF] border-[1px]">
              교통 / 가이드</div>
            <div class="md:col-span-3">
              <div v-for="(detail, detailIndex) in filterDetailsByOtherTypes(day.details)"
                :key="`activity-${detailIndex}`"
                class="border flex justify-center h-[44px]  w-[297px] items-center border-[#E6E6E6] pt-2">
                {{ detail.tourism_name || 'No data' }}
                <span class="text-gray-500 text-sm">
                  ({{ detail.type_attraction_type.at_name_en }})
                </span>
              </div>
            </div>
          </div>



          <!-- Transportation/Guide -->

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

const filterDetailsByType = (details, type) => {
  return details?.filter(detail => detail.type === type) || [];
};

const filterDetailsByOtherTypes = (details) => {
  return details?.filter(detail => ![1, 2, 3, 4].includes(detail.type)) || [];
};

const getTypeRowCount = (details, type) => {
  return filterDetailsByType(details, type).length || 1;
};

const getOtherTypesRowCount = (details) => {
  return filterDetailsByOtherTypes(details).length || 1;
};

const getTotalRowSpan = (day) => {
  if (!day.details) return 1;
  return (
    getTypeRowCount(day.details, 1) + // Attractions
    4 + // Fixed number for meals (header + 3 rows)
    getTypeRowCount(day.details, 3) + // Lodging
    getTypeRowCount(day.details, 2) + // Transportation/Guide
    getOtherTypesRowCount(day.details) // Other activities
  );
};

const getMealByType = (details, typeOrder) => {
  if (!details) return '-';
  const meal = details.find(detail =>
    detail.type === 4 && detail.type_order === typeOrder
  );
  return meal ? meal.tourism_name : '-';
};

const getguideByType = (details, type) => {
  if (!details) return [];
  return details.filter(detail => detail.type === type) || [];
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit'
  });
};

const getDayOfWeek = (date) => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
};

const processDetails = (touristDetail) => {
  const details = touristDetail.details || [];
  const location = details.length > 0 ? details[0].tourism_location : '';

  return {
    date: formatDate(touristDetail.tourist_date),
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
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  align-items: center;
}

.text-gray-500 {
  color: #6b7280;
}

.text-sm {
  font-size: 0.875rem;
}
</style>
