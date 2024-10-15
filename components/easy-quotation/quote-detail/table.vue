<template>
  <div>
    <div class="table p-4 mx-auto sm:w-[840px] w-[360px] hidden sm:block" style="font-weight: 410">
      <div class="mb-6 items-center">
        <table class="w-full text-[14px] border-collapse">
          <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
            <tr>
              <td :rowspan="getTotalRowSpan(day)" class="w-[108px] bg-[#EDEDF2] border border-[#FFFFFF]">
                <div class="flex justify-center items-center font-bold text-lg">
                  <span>{{ `${dayIndex + 1} 일차` }}</span>
                </div>
              </td>
              <td :rowspan="getTotalRowSpan(day)" class="w-30 bg-[#EDEDF2] border border-[#FFFFFF]">
                <span>{{ packageDetails?.resp?.package_name || "Default Package Name" }}</span>
              </td>
            </tr>

            <template v-if="day.details">
              <!-- Tourist Attractions -->
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 1)"
                :key="`attraction-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-30 bg-[#F3F4F7]" :rowspan="getTypeRowCount(day.details, 1)">
                  일정
                </th>
                <td colspan="2" class="p-2">
                  <span class="block p-2 text-left" :title="detail.tourism_name">
                    {{ detail.tourism_name || 'No data' }}
                  </span>
                </td>
              </tr>

              <!-- Lodging -->
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`lodging-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-30 bg-[#F3F4F7]" :rowspan="getTypeRowCount(day.details, 3)">
                  숙소
                </th>
                <td colspan="2" class="justify-center items-center ">
                  <span class="flex justify-between">
                    <div class="flex mt-1 text-sub">
                      {{ detail.tourism_name || 'No data' }}
                      <img :src="chervonRight" alt="" class="w-4 h-4 ml-2 mt-0.5" />
                    </div>
                    <button @click="openModal([detail], 3)"
                      class="bg-sub rounded-[50px] w-[80px] h-[28px] text-white hover:bg-sub transition">
                      옵션변경
                    </button>
                  </span>
                </td>
              </tr>

              <!-- Meals -->
              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]" rowspan="4">식사</th>
              </tr>
              <tr v-for="meal in ['1', '2', '3']" :key="meal">
                <td class="p-2 w-10">{{ getMealTypeLabel(meal) }}</td>
                <td colspan="2" class="justify-center items-center ">
                  <span class="flex text-sub justify-between">
                    {{ getMealByType(day.details, meal)?.tourism_name || 'No meal specified' }}
                    <button @click="openModal(getMealOptions(day.details, meal), 4)"
                      class="bg-sub rounded-[50px] w-[80px] h-[28px] text-white hover:bg-sub transition ml-2">
                      옵션변경
                    </button>
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
                <td colspan="2" class="p-2">
                  <span class="block p-2 text-left" :title="detail.tourism_name">
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
      :options="modalOptions" 
      :selected-option="selectedOption"
      @close="closeModal" 
      @submit="handleOptionSubmit" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import chervonRight from '@/assets/icons/chevron-right.svg';
import packageService from '@/services/easy-quote.service.js';
import { useEasyQuotationStore } from '~/stores/easy-quotation.store';
import OptionChangeModal from '@/components/utils/list-modal.vue';
const store = useEasyQuotationStore();
const packageId = store.EasyQuotation.selectedPackageId;
const packageDetails = ref(null);
const isModalOpen = ref(false);
const modalOptions = ref([]);
const selectedOption = ref(null);

// New computed property to process API data
const dynamicRows = computed(() => {
  if (!packageDetails.value) return [];

  const courses = packageDetails.value.resp.courses;
  const rowsByDay = {};

  courses.forEach(course => {
    const day = course.trip_day;
    if (!rowsByDay[day]) {
      rowsByDay[day] = {
        tourismLocation: course.tourism_location,
        details: []
      };
    }
    rowsByDay[day].details.push({
      ...course,
      ...course.type_attraction_type
    });
  });

  return Object.values(rowsByDay);
});

onMounted(async () => {
  try {
    packageDetails.value = await packageService.getPackageDetail(packageId);
  } catch (error) {
    console.error("Error fetching package details:", error);
  }
});

// Helper functions
const getTotalRowSpan = (day) => {
  if (!day.details) return 1;

  return (
    filterDetailsByType(day.details, 1).length + // Attractions
    4 + // Meals (header + 3 rows for breakfast, lunch, and dinner)
    filterDetailsByType(day.details, 3).length + // Lodging
    1 + // Transportation and guide (one row for both)
    filterDetailsByOtherTypes(day.details).length // Other activities like guide/transport
  );
};

const filterDetailsByType = (details, type) => {
  return details.filter(detail => detail.type === type);
};

const getTypeRowCount = (details, type) => {
  return filterDetailsByType(details, type).length || 1; // At least 1 row
};

const getMealByType = (details, typeOrder) => {
  return details.find(detail => detail.type === 4 && detail.type_order === typeOrder) || null;
};

const getMealOptions = (details, typeOrder) => {
  return details.filter(detail => detail.type === 4 && detail.type_order === typeOrder);
};

const filterDetailsByOtherTypes = (details) => {
  return details.filter(detail => ![1, 3, 4].includes(detail.type));
};

const getOtherTypesRowCount = (details) => {
  return filterDetailsByOtherTypes(details).length || 1; // At least 1 row
};

const getMealTypeLabel = (typeOrder) => {
  switch (typeOrder) {
    case '1': return '조식';
    case '2': return '중식';
    case '3': return '석식';
    default: return '';
  }
};

// Modal handlers
const openModal = (options, type) => {
  modalOptions.value = Array.isArray(options) ? options : [options];
  selectedOption.value = modalOptions.value.find(option => option.type === type)?.option_num || null;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleOptionSubmit = (newOptionNum) => {
  // Here you would update the package details with the new option
  console.log('New option selected:', newOptionNum);
  // Update the relevant part of packageDetails.value based on the newOptionNum
  closeModal();
};
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