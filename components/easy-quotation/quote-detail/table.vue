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
                <span class="w-full p-4 text-center block text-[#6592E2] font-semibold">
                  {{ day.tourismLocation }}
                </span>
              </td>
            </tr>

            <template v-if="day.details">
              <!-- Tourist Attractions -->
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 1)" :key="`attraction-${detailIndex}`">
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
                    <button @click="openModal" class="bg-sub rounded-[50px] w-[80px] h-[28px] text-white hover:bg-sub transition">
                      옵션변경
                    </button>
                  </span>
                </td>
              </tr>

              <!-- Meals -->
              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]" rowspan="4">식사</th>
              </tr>
              <tr>
                <td class="p-2 w-10">조식</td>
                <td colspan="2" class="justify-center items-center ">
                  <span class="flex text-sub justify-between">
                    {{ getMealByType(day.details, '1') }}
                    <button @click="openModal" class="bg-sub rounded-[50px] w-[80px] h-[28px] text-white hover:bg-sub transition">
                      옵션변경
                    </button>
                  </span>
                </td>
              </tr>
              <tr>
                <td class="p-2 w-[114px]">중식</td>
                <td colspan="2" class="justify-center items-center ">
                  <span class="flex text-sub justify-between">
                    {{ getMealByType(day.details, '2') }}
                    <button @click="openModal" class="bg-sub rounded-[50px] w-[80px] h-[28px] text-white hover:bg-sub transition">
                      옵션변경
                    </button>
                  </span>
                </td>
              </tr>
              <tr>
                <td class="p-2 w-10">석식</td>
                <td colspan="2" class="justify-center items-center ">
                  <span class="flex text-sub justify-between">
                    {{ getMealByType(day.details, '3') }}
                    <button @click="openModal" class="bg-sub rounded-[50px] w-[80px] h-[28px] text-white hover:bg-sub transition">
                      옵션변경
                    </button>
                  </span>
                </td>
              </tr>

              <!-- Additional Activities -->
              <tr v-for="(detail, detailIndex) in filterDetailsByOtherTypes(day.details)" :key="`activity-${detailIndex}`">
                <th v-if="detailIndex === 0" class="p-2 w-30 bg-[#F3F4F7]" :rowspan="getOtherTypesRowCount(day.details)">
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

    <OptionChangeModal :is-open="isModalOpen" :options="options" @close="closeModal" @submit="handleOptionSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OptionChangeModal from '@/components/utils/list-modal.vue';
import chervonRight from '@/assets/icons/chevron-right.svg';
import packageService from '@/services/easy-quote.service.js'; // Adjust the import path as needed
import { useEasyQuotationStore } from '~/stores/easy-quotation.store';

const store = useEasyQuotationStore();
const packageId = store.EasyQuotation.selectedPackageId; // Assume packageId is stored in the EasyQuotation store
const packageDetails = ref(null);
const isModalOpen = ref(false);
const options = ref({}); // Adjust as per your options needed in the modal

// Fetch package details on component mount
onMounted(async () => {
  try {
    packageDetails.value = await packageService.getPackageDetail(3);
    // Perform any additional logic with packageDetails if needed
  } catch (error) {
    console.error("Error fetching package details:", error);
  }
});

// Modal handlers
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleOptionSubmit = (newOptions) => {
  options.value = newOptions; // Handle the submitted options as needed
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
