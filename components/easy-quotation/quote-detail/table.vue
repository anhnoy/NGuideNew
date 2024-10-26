<template>
  <div>
    <div class="max-w-[1080px] h-screen py-5 lg:py-10 mx-auto">
      <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse">
          <!-- {{ store.packages }} -->

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
                class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
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
                <div @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)"
                  class="flex items-center truncate w-44">
                  {{ detail.tourism_name }}
                  <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                </div>

                <button class="text-sm text-white font-medium bg-[#6EBC30] rounded-full px-7 p-2">변경하기</button>
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
                {{ getMealTypeLabel(detailIndex + 1) }}
              </th>
              <td
                class=" bg-white border-[#E6E6E6] border p-2  text-[#6EBC30] text-sm font-normal flex justify-between items-center w-72">
                <div @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)" class="flex items-center">
                  {{ detail.tourism_name }}
                  <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                </div>

                <button class="text-sm text-white font-medium bg-[#6EBC30] rounded-full px-7 p-2">변경하기</button>
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

        <!-- <table>
            <thead>
              <tr>
                <th class="text-[#152123] text-lg font-medium bg-[#EDEDF2] border border-[#FFFFFF]">1일차</th>

              </tr>
              <tr>
                <th class="text-[#152123] text-lg font-medium bg-[#EDEDF2] border border-[#FFFFFF]">인천 비엔티엔</th>
              </tr>
            </thead>
          </table> -->
      </div>
      <div class="border-b-2 border-[#A8A3A3] mt-10"></div>

      <div class="flex justify-between mt-5">
        <p class="text-[#152123] text-lg font-medium">1인당 예상 금액</p>
        <div>
          <p class="text-[#E25C5C] text-xl font-bold text-end">
            {{ totalPrice }}
          </p>
          <p class="text-[#8E8D8D] text-xs font-normal">
            ※ 항공 미포함 가격이며, 총 예상 금액은 견적서 내용과 상이할 수
            있습니다.
          </p>
        </div>
      </div><br>
    </div>
  </div>


  <div v-if="isOpen">
    <div class="fixed inset-0 bg-[#00000080] z-40"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <DetailTourAttraction v-if="selectedLaId !== null" v-model:isOpen="isOpen" :laid="selectedLaId" :city_id="cityId"
        :type="selectedAtId" :co_id="coId"/>
    </div>
  </div>
</template>

<script setup>
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import DetailTourAttraction from "@/components/utils/detail-tour-attraction.vue";
const store = useEasyQuotationStore();
const packageDetails = ref(null);
const isModalOpen = ref(false);
const modalOptions = ref([]);
const selectedOption = ref(null);
const selectedLaId = ref(null);
const selectedAtId = ref(null);
const isOpen = ref(false);

const cityId = ref(null);
const coId = ref(null);

const openModalMenu = (laid, type, city_id, co_id) => {
  selectedLaId.value = laid;
  selectedAtId.value = type;
  cityId.value = city_id;
  coId.value = co_id;
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
  if (!store.packages || !store.packages || !store.packages.courses) {
    return [];
  }

  const rowsByDay = {};

  store.packages.courses.forEach((course) => {
    const day = course.trip_day;

    if (!rowsByDay[day]) {
      rowsByDay[day] = {
        tourismLocation: course.tourism_location || '',
        details: [],
      };
    }

    rowsByDay[day].details.push(course);
  });

  return Object.entries(rowsByDay).map(([day, data]) => ({
    day: parseInt(day, 10),
    tourismLocation: data.tourismLocation,
    details: data.details,
  }));
});



const totalPrice = computed(
  {
    get() {
      if (store.packages) {
        console.log('--->', store.packages.courses);
        let total = 0;
        const courses = store.packages.courses;
        if (!courses) return 0;
        courses.forEach((it) => {
          total += it.tourism_price;
        });
        console.log('total ---> ', total);
        return total;
      }
      return 0;
    }
  }
);

const filterDetailsByType = (details, type) => {
  return details.filter((detail) => detail.type === type);
};


const getMealTypeLabel = (typeOrder) => {
  
  switch (typeOrder) {
    case 1:
      return "조식";
    case 2:
      return "중식";
    case 3:
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
