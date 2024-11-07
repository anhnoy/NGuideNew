<template>
  <div>
    <div class="max-w-[1080px] h-screen py-5 lg:py-10 mx-auto">
      <div class="overflow-x-auto">
        <table class="hidden sm:block table-auto w-full border-collapse">
          <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
            <tr>
              <th :rowspan="day.details.length + 5"
                class="text-[#152123] text-lg font-medium p-4 w-[108px] text-center">
                {{ `${dayIndex + 1} 일차` }}
              </th>
              <th :rowspan="day.details.length + 5"
                class="text-[#152123] text-sm font-medium p-4 w-[127px] text-center">
                {{ day.tourismLocation }}
              </th>
            </tr>

            <!-- 일정  -->
            <tr>
              <th class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[180px]">일정</th>
              <div v-if="filterDetailsByType(day.details, [1, 5, 6, 8, 9]).length > 0" class="w-[425px]">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [1, 5, 6, 8, 9])"
                  :key="`attraction-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal py-2 ">
                    <button class="bg-[#6EBC30] text-white text-sm font-normal rounded w-[68px] h-[24px]">변경가능</button>
                    <span class="truncate w-[295px] text-[#6EBC30] ml-3">{{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else class="truncate w-[425px] text-[#152123]">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal w-[425px] ">-</td>
            </tr>

            <!-- 숙소  -->
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center w-[180px]">숙소</th>
              <div v-if="filterDetailsByType(day.details, 3).length > 0" class="w-[425px]">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)"
                  :key="`lodging-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal">
                    <button class="bg-[#6EBC30] text-white text-sm font-normal rounded w-[68px] h-[24px]">변경가능</button>
                    <span class="truncate w-[295px] text-[#6EBC30] ml-3">{{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else class="truncate w-[295px] text-[#152123]">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal w-[425px] ">-</td>
            </tr>

            <!-- 식사  -->
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center w-[180px]">식사</th>
            <tr
              v-for="(meal, index) in [{ key: '1', remark: '조식' }, { key: '2', remark: '중식' }, { key: '3', remark: '석식' }]"
              :key="index">
              <td class="text-[#152123] text-sm font-normal w-[114px]">{{ meal.remark }}</td>
              <div v-if="getMealList(dayIndex + 1, meal.key).length > 0" class="w-[311px]">
                <template v-for="(detail, index) in getMealList(dayIndex + 1, meal.key)"
                  :key="`meal-${meal.key}-${index}`">
                  <td v-if="detail.laid">
                    <button
                      class=" flex items-center bg-[#6EBC30] text-white text-sm font-normal rounded w-[68px] h-[24px]">변경가능</button>
                    <span class="truncate w-[311px] text-[#6EBC30] ml-3">{{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else-if="detail.tourism_name" class="w-[311px] truncate text-[#152123]">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal w-[311px]">-</td>
            </tr>
            </tr>

            <!-- 교통 / 가이드  -->
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center w-[180px]">교통 / 가이드</th>
              <div v-if="filterDetailsByType(day.details, [2, 7]).length > 0" class="w-[425px] ">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [2, 7])"
                  :key="`attraction-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal  ">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal w-[425px] ">-</td>
            </tr>
          </tbody>
        </table>




        <!-- mobile -->
        <table class="w-full border-collapse mx-auto block md:hidden overflow-x-hidden">
          <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
            <tr>
              <th class="text-[#152123] text-base font-medium">{{ `${dayIndex + 1} 일차`
                }}</th>
            </tr>
            <tr>
              <th class="text-[#152123] text-base font-medium"> {{ day.tourismLocation
                }}</th>
            </tr>
            <tr>
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center w-[90px]">일정</th>
              <div v-if="filterDetailsByType(day.details, [1, 5, 6, 8, 9]).length > 0">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [1, 5, 6, 8, 9])"
                  :key="`attraction-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal">
                    <button class="bg-[#6EBC30] text-white text-xs font-normal rounded w-[60px] h-[21px]">변경가능</button>
                    <span class="truncate w-[180px] ml-3">{{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />

                  </td>
                  <td v-else class="truncate w-[280px] text-[#152123] ">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#152123] text-sm font-normal w-[305px] ">-</td>
            </tr>
            <!--  -->
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center w-[90px]">숙소</th>
              <div v-if="filterDetailsByType(day.details, 3).length > 0">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)"
                  :key="`lodging-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal">
                    <button class="bg-[#6EBC30] text-white text-xs font-normal rounded w-[60px] h-[21px]">변경가능</button>
                    <span class="truncate w-[180px] ml-3">{{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else class="truncate w-[280px]  text-[#152123]">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#152123] text-sm font-normal ">-</td>
            </tr>

            <!--  -->

            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center w-[90px]">식사</th>

            <tr
              v-for="(meal, index) in [{ key: '1', remark: '조식' }, { key: '2', remark: '중식' }, { key: '3', remark: '석식' }]"
              :key="index">
              <td class="text-[#152123] text-sm font-normal w-[80px] text-center">{{ meal.remark }}</td>
              <div v-if="getMealList(dayIndex + 1, meal.key).length > 0">
                <template v-for="(detail, index) in getMealList(dayIndex + 1, meal.key)"
                  :key="`meal-${meal.key}-${index}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal">
                    <button class="bg-[#6EBC30] text-white text-xs font-normal rounded w-[60px] h-[21px] ">변경가능</button>
                    <span class="truncate w-[132px] ml-3">{{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else-if="detail.tourism_name" class="truncate w-[280px] text-[#5E5F61]">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#152123] text-sm font-normal w-[200px]">-</td>
            </tr>
            </tr>

            <!--  -->

            <tr>
              <th class="text-[13px] font-bold text-[#5E5F61] text-center w-[90px]">교통/가이드</th>
              <div v-if="filterDetailsByType(day.details, [2, 7]).length > 0">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [2, 7])"
                  :key="`attraction-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal truncate text-[#5E5F61]">
                    {{ detail.tourism_name }}
                  </td>
                </template>
              </div>
              <td v-else class="text-[#152123] text-sm font-normal ">
                -
              </td>
            </tr>
            </tr>
          </tbody>
        </table>
      </div>


      <div class="border-b-2 border-[#A8A3A3] mt-10"></div>

      <div class="flex justify-between mt-5">
        <p class="text-[#152123] text-lg font-medium">1인당 예상 금액</p>
        <div>
          <p class="text-[#E25C5C] text-xl font-bold text-end">
            {{ totalPrice }} 원
          </p>
          <p class="text-[#8E8D8D] text-xs font-normal text-end w-56 sm:w-full">
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
        :type="selectedAtId" :co_id="coId" :at_id="atId" @confirm-selection="confirmSelection" />
    </div>
  </div>
</template>

<script setup>
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import DetailTourAttraction from "@/components/utils/detail-tour-attraction.vue";
import tourAttractionService from "@/services/tour-attraction.service";

const store = useEasyQuotationStore();
const selectedLaId = ref(null);
const selectedAtId = ref(null);
const isOpen = ref(false);
const cityId = ref(null);
const coId = ref(null);
const atId = ref(null);
const totalCost = ref(0);
const tourAttractionData = ref(null);
const previousLaid = ref(null);
const previousLaidPrice = ref(0);


const openModalMenu = async (laid, type, city_id, co_id, at_id) => {
  previousLaid.value = laid;
  selectedLaId.value = laid;
  selectedAtId.value = type;
  cityId.value = city_id;
  coId.value = co_id;
  atId.value = at_id;
  isOpen.value = true;
  await getTourAttraction(laid);
}

const getTourAttraction = async (laid) => {
  try {
    const response = await tourAttractionService.tourAttraction(laid);
    if (response.status === 200 && response.data) {
      const type_tour = response.data.at_id;
      tourAttractionData.value = response.data.attraction_options[0].attraction_prices[0];
      let price = tourAttractionData.value?.enp_price || 0;
      if (type_tour == '3') price = price / 2;
      return price;
    } else {
      throw new Error("Failed to fetch tour attraction details");
    }
  } catch (error) {
    console.error("Error fetching tour attraction:", error);
    return 0;
  }

};

const confirmSelection = async (newLaid) => {
  if (previousLaid.value !== newLaid) {
    previousLaidPrice.value = await getTourAttraction(previousLaid.value);
    totalCost.value -= previousLaidPrice.value;
    const newLaidPrice = await getTourAttraction(newLaid);
    totalCost.value += newLaidPrice;
    console.log('old laid', previousLaid.value);
    console.log('new laid', newLaid);
    console.log(`Updated totalCost: ${totalCost.value}`);
    previousLaid.value = newLaid;
    previousLaidPrice.value = newLaidPrice;
  }

};


const totalPerson = store.EasyQuotation.selectReq_adults + store.EasyQuotation.selectReq_kids + store.EasyQuotation.selectReq_infants;

watch(totalCost, (newCost) => {
  store.setTotalPrice(newCost);
});

onMounted(() => {
  store.setTotalPrice(totalPrice.value);
  totalCost.value = store.packages.quote.tour_person;
});


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


const totalPrice = computed(() => {
  const exchangeRate = store.packages.exchange || 1;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalCost.value * exchangeRate);

});



const filterDetailsByType = (details, types) => {
  if (!Array.isArray(details) || details.length === 0) {
    return [];
  }

  if (Array.isArray(types)) {
    const filtered = details.filter(detail => types.includes(detail.type));
    return filtered.length > 0 ? filtered : [];
  }

  const filtered = details.filter(detail => detail.type === types);
  return filtered.length > 0 ? filtered : [];
};

const getMealList = (trip_day, meal) => {
  const trip_day_meals = store.packages.courses.filter((item) => {
    return item.type === 4 && item.trip_day === trip_day;
  });

  let results = trip_day_meals.filter((item) => (item.type_order === meal));

  return results;

}


</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 10px;
  align-items: center;
  margin: 0;
  border: 1px solid #ffffff;
  background: #EDEDF2;
}

td {
  border: 1px solid #E6E6E6;
  padding: 10px;
  align-items: center;
  margin: 0;
}
</style>
