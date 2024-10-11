<template>
  <div>
    <div class="table p-1 mx-auto sm:w-[840px] w-[360px] hidden sm:block" style="font-weight: 410">
      <div class="mb-6 items-center">
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
                <td colspan="2" class="p-2 w-100 ">
                  <span class="w-full p-2 text-left flex justify-between ">
                    {{ detail.tourism_name || 'No data' }}
                    <button @click="openModal" class="bg-[#6EBC30] rounded-[50px] w-[80px] h-[30px] text-white">옵션변경</button>
                  </span>
                </td>
              </tr>

              <!-- Meals -->
              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]" rowspan="4">식사</th>
              </tr>
              <tr>
                <td class="p-2 w-10">조식</td>
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ getMealByType(day.details, '1') }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="p-2 w-[114px]">중식</td>
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ getMealByType(day.details, '2') }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="p-2 w-10">석식</td>
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ getMealByType(day.details, '3') }}
                  </span>
                </td>
              </tr>

              <!-- Additional Activities -->
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

    <OptionChangeModal 
      :is-open="isModalOpen"
      :options="options"
      @close="closeModal"
      @submit="handleOptionSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OptionChangeModal from '@/components/utils/list-modal.vue';

// Sample data structure
const sampleData = {
  touris_detail: [
    {
      tourist_date: '2024-10-15',
      details: [
        {
          type: 1,
          tourism_name: '도쿄 스카이트리 관광',
          tourism_location: '도쿄',
          type_attraction_type: {
            at_name_en: 'Sightseeing'
          }
        },
        {
          type: 3,
          tourism_name: '도쿄 프린스 호텔',
          tourism_location: '도쿄'
        },
        {
          type: 4,
          tourism_name: '호텔 조식',
          type_order: '1'
        },
        {
          type: 4,
          tourism_name: '현지식',
          type_order: '2'
        },
        {
          type: 4,
          tourism_name: '스시 오마카세',
          type_order: '3'
        },
        {
          type: 5,
          tourism_name: '전용차량 및 가이드 포함',
          type_attraction_type: {
            at_name_en: 'Transportation'
          }
        }
      ]
    },
    // Add more days as needed
  ]
};

const dynamicRows = ref([]);
const isModalOpen = ref(false);
const options = [
  { value: '옵션 1', label: '옵션 1' },
  { value: '옵션 2', label: '옵션 2' },
  { value: '옵션 3', label: '옵션 3' },
  { value: '옵션 4', label: '옵션 4' },
];

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
    getTypeRowCount(day.details, 1) +
    4 +
    getTypeRowCount(day.details, 3) +
    getTypeRowCount(day.details, 2) +
    getOtherTypesRowCount(day.details)
  );
};

const getMealByType = (details, typeOrder) => {
  if (!details) return '-';
  const meal = details.find(detail =>
    detail.type === 4 && detail.type_order === typeOrder
  );
  return meal ? meal.tourism_name : '-';
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

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleOptionSubmit = (selectedOption) => {
  console.log('Selected option:', selectedOption);
  // Here you can handle the selected option, e.g., update the itinerary
  closeModal();
};

onMounted(() => {
  // Process the sample data
  dynamicRows.value = sampleData.touris_detail
    .map(processDetails)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
});
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