<template>
  <div>
    <div v-if="dynamicRows && dynamicRows.length">
      <div class="max-w-[1080px] h-screen py-16 mx-auto">
        <div class="overflow-x-auto">
          <table class="table-auto w-full border-collapse">
            <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
              <tr>
                <td class="bg-[#EDEDF2] text-[#152123] text-lg font-medium p-4 border border-white w-28 text-center">
                  {{ `${dayIndex + 1} 일차` }}
                </td>
                <td class="bg-[#EDEDF2] text-[#152123] text-sm font-medium p-4 border border-white w-32 text-center">
                  인천비엔티엔
                </td>
              <tr>
              <tr>
                <td rowspan="3"
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center ">
                  일정
                </td>
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, 1)"
                  :key="`attraction-${detailIndex}`">
                  <td v-if="detail.type === 1"
                    class="bg-white border border-[#E6E6E6] p-2 text-[#152123] text-sm font-normal w-96">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </tr>
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)"
                :key="`attraction-3-${detailIndex}`">
                <td class="bg-white border border-[#E6E6E6] p-2 text-[#152123] text-sm font-normal w-96">
                  {{ detail.tourism_name }}
                </td>
              </tr>
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 5)"
                :key="`attraction-5-${detailIndex}`">
                <td class="bg-white border border-[#E6E6E6] p-2 text-[#152123] text-sm font-normal w-96">
                  {{ detail.tourism_name }}
                </td>
              </tr>
              </tr>

              <tr>
              <tr>
                <td rowspan="2"
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                  숙소
                </td>
              </tr>
              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`meal-4-${detailIndex}`">
                <td
                  class="bg-white border-[#E6E6E6] border-r p-2 text-[#6EBC30] text-sm font-normal flex justify-between items-center w-96">
                  <div class="flex items-center">
                    ○○○ 호텔
                    <img @click="openModalMenu(detail.laid)" class="ml-2 cursor-pointer"
                      src="@/assets/icons/nextChange.svg" alt="">
                  </div>

                  <button @click="openModalMenu(detail.laid)"
                    class="text-sm text-white font-medium bg-[#6EBC30] rounded-full px-7 p-2">변경하기</button>
                </td>
              </tr>
              </tr>


              <tr>
              <tr>
                <td rowspan="4"
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                  식사
                </td>
              </tr>

              <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 4)" :key="`meal-4-${detailIndex}`">
                <th class="bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal text-start w-24">
                  {{ getMealTypeLabel("1") }}
                </th>
                <td
                  class=" bg-white border-[#E6E6E6] border p-2  text-[#6EBC30] text-sm font-normal flex justify-between items-center w-72">
                  <div @click="openModalMenu(detail.laid)" class="flex items-center">
                    {{ detail.option_name }}
                    <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>

                  <button @click="openModalMenu(detail.laid)"
                    class="text-sm text-white font-medium bg-[#6EBC30] rounded-full px-7 p-2">변경하기</button>
                </td>
              </tr>
              </tr>
              <tr>



              <tr>
                <td rowspan="2"
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                  교통 / 가이드
                </td>
              </tr>
              <tr>
                <td v-for="(detail, detailIndex) in filterDetailsByType(day.details, 2)"
                  :key="`attraction-2-${detailIndex}`"
                  class=" bg-white border-[#E6E6E6] border-b border-r p-2 text-[#152123] w-96">
                  {{ detail.tourism_name }}
                  <div v-for="(detail, detailIndex) in filterDetailsByType(day.details, 7)"
                    :key="`attraction-2-${detailIndex}`">{{
                    detail.tourism_name }}</div>
                </td>
              </tr>
              </tr>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <div class="border-b-2 border-[#A8A3A3] mt-10"></div>

          <div class="flex justify-between mt-5">
            <p class="text-[#0EC0CB] text-lg font-medium">1인당 예상 금액</p>
            <div>
              <p class="text-[#152123] text-xl font-bold] text-end">
                {{ packageDetails?.totalSum }}
              </p>
              <p class="text-[#95C3DD] text-xs font-normal">
                ※ 항공 미포함 가격이며, 총 예상 금액은 견적서 내용과 상이할 수
                있습니다.
              </p>
            </div>
          </div> -->


    <div v-else>
      <p class="text-center">Loading or no package details available...</p>
    </div>
  </div>

  <hotelList :is-open="isModalOpen" :options="modalOptions" :selected-option="selectedOption" @close="closeModal"
    @submit="handleOptionSubmit" :load-hotel="loadHotel" />


  <div v-if="isOpen">
    <div class="fixed inset-0 bg-[#00000080] z-40"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <DetailTourAttraction v-if="selectedLaId !== null" v-model:isOpen="isOpen" :laid="selectedLaId" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import packageService from "@/services/easy-quote.service.js";
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import hotelList from "~/components/utils/hotelList.vue";
import DetailTourAttraction from "@/components/utils/detail-tour-attraction.vue";
const store = useEasyQuotationStore();
const packageId = store.EasyQuotation.selectedPackageId;
const packageDetails = ref(null);
const isModalOpen = ref(false);
const modalOptions = ref([]);
const selectedOption = ref(null);
const selectedLaId = ref(null);
const isOpen = ref(false);


const openModalMenu = (laid) => {
  selectedLaId.value = laid;
  console.log("selectedLaId", selectedLaId.value)
  isOpen.value = true;
}

const openModal = async (options, type) => {
  modalOptions.value = Array.isArray(options) ? options : [options];
  selectedOption.value = modalOptions.value.find((option) => option.type === type)?.option_num || null;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleOptionSubmit = (newOptionNum) => {
  console.log("New option selected:", newOptionNum);
  closeModal();
};




const dynamicRows = computed(() => {
  if (!packageDetails.value || !packageDetails.value.coursesByTripDay) return [];

  const coursesByTripDay = packageDetails.value.coursesByTripDay;
  const rowsByDay = {};

  Object.keys(coursesByTripDay).forEach((day) => {
    const courses = coursesByTripDay[day];

    if (!rowsByDay[day]) {
      rowsByDay[day] = {
        tourismLocation: courses[0].tourism_location,
        details: [],
      };
    }

    courses.forEach((course) => {
      rowsByDay[day].details.push({
        ...course,
        ...course.type_attraction_type,
      });
    });
  });

  return Object.values(rowsByDay);
});

onMounted(async () => {
  try {
    packageDetails.value = await packageService.getPackageDetail(packageId);
    console.log("Package Details:", packageDetails.value);
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
  return details.filter((detail) => detail.type === type);
};

const getTypeRowCount = (details, type) => {
  return filterDetailsByType(details, type).length || 1; // At least 1 row
};

const getMealByType = (details, typeOrder) => {
  return (
    details.find(
      (detail) => detail.type === 4 && detail.type_order === typeOrder
    ) || null
  );
};

const getMealOptions = (details, typeOrder) => {
  return details.filter(
    (detail) => detail.type === 4 && detail.type_order === typeOrder
  );
};

const filterDetailsByOtherTypes = (details) => {
  return details.filter((detail) => ![1, 3, 4].includes(detail.type));
};

const getOtherTypesRowCount = (details) => {
  return filterDetailsByOtherTypes(details).length || 1; // At least 1 row
};

const getMealTypeLabel = (typeOrder) => {
  console.log("Meal Type Order:", typeOrder); // Log the value
  switch (typeOrder) {
    case "1":
      return "조식";
    case "2":
      return "중식";
    case "3":
      return "석식";
    default:
      return "";
  }
};



</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  align-items: center;
}
</style>
