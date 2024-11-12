<template>
  <div>
    <div class="max-w-[1080px] h-screen py-5 lg:py-10 mx-auto">
      <div class="overflow-x-hide">
        <table class="table-auto w-full border-collapse ">
          <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
            <tr class="hidden md:table-row">
              <th :rowspan="day.details.length + 5" class="text-[#152123] text-lg font-medium w-[108px] text-center">
               {{ `${dayIndex + 1} 일차` }} 
              </th>
              <th :rowspan="day.details.length + 5" class="text-[#152123] text-sm font-medium w-[127px] text-center">
                {{ day.tourismLocation }}
              </th>
            </tr>

            <tr class=" md:hidden">
              <th class="text-[#152123] text-base font-medium text-center">
                {{ `${dayIndex + 1} 일차` }}
              </th>
            </tr>

            <tr class="md:hidden">
              <th class="text-[#152123] text-base font-medium text-center">
                {{ day.tourismLocation }}
              </th>
            </tr>

            <tr>

              <!-- 일정  -->
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center md:w-[180px] w-[90px]">일정</th>
              <div v-if="filterDetailsByType(day.details, [1, 5, 6, 8, 9]).length > 0" class="md:w-[425px] ">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [1, 5, 6, 8, 9])"
                  :key="`attraction-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center justify-between text-sm font-normal ">
                    <div class="flex items-center">
                      <button
                        class="bg-[#6EBC30] text-white md:text-sm text-xs font-normal rounded md:w-[68px] md:h-[24px] w-[60px] h-[21px]">변경가능</button>
<<<<<<< HEAD
                      <span class="truncate md:w-[295px] text-sm text-[#6EBC30] font-normal ml-3">{{
  detail.tourism_name }}</span>
=======
                      <span class="truncate md:w-[295px] w-[180px] text-sm text-[#6EBC30] font-normal ml-3">{{
                        detail.tourism_name }}</span>
>>>>>>> 50d8ad16e5be005984b1630dcd5cc836b942c6a5
                    </div>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id, dayIndex, detailIndex)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else class=" md:w-[425px] w-[311px] text-[#152123] text-sm font-normal flex items-center">
                    <span class="truncate">
                      {{ detail.tourism_name }}</span>
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal md:w-[425px] w-[311px] ">-</td>
            </tr>

            <!-- 숙소  -->
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center md:w-[180px] w-[90px]">숙소</th>
              <div v-if="filterDetailsByType(day.details, 3).length > 0" class="md:w-[425px]">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)"
                  :key="`lodging-${detailIndex}`">
                  <td v-if="detail.laid" class="flex items-center text-sm font-normal justify-between">
                    <div class="flex items-center">
                      <button
                        class="bg-[#6EBC30] text-white md:text-sm text-xs font-normal rounded md:w-[68px] md:h-[24px] w-[60px] h-[21px]">변경가능</button>
                      <span class="truncate md:w-[295px] w-[180px] text-[#6EBC30] text-sm font-normal ml-3">{{
                        detail.tourism_name }}</span>
                    </div>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id, dayIndex, detailIndex)"
                      class="ml-2 cursor-pointer " src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else
                    class="truncate  md:w-[425px] w-[311px] text-[#152123] text-sm font-normal flex items-center">
                    <span class="truncate">
                      {{ detail.tourism_name }}</span>
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal md:w-[425px] w-[311px]">-</td>
            </tr>

            <!-- 식사  -->
            <tr>
              <th class="text-sm font-bold text-[#5E5F61] text-center w-[90px] md:w-[180px]">식사</th>
            <tr
              v-for="(meal, index) in [{ key: '1', remark: '조식' }, { key: '2', remark: '중식' }, { key: '3', remark: '석식' }]"
              :key="index">
              <td class="text-[#152123] text-sm font-normal md:w-[114px] w-[50px]">{{ meal.remark }}</td>
              <div v-if="getMealList(dayIndex + 1, meal.key).length > 0">
                <template v-for="(detail, index) in getMealList(dayIndex + 1, meal.key)"
                  :key="`meal-${meal.key}-${index}`">
                  <td v-if="detail.laid" class="flex items-center justify-between">
<<<<<<< HEAD
                    <div>
=======
                    <div class="flex items-center">
>>>>>>> 50d8ad16e5be005984b1630dcd5cc836b942c6a5
                      <button
                        class="bg-[#6EBC30] text-white md:text-sm text-xs font-normal rounded md:w-[68px] md:h-[24px] w-[60px] h-[21px]">변경가능</button>
                      <span class="truncate md:w-[180px] w-[130px] text-[#6EBC30] text-sm font-normal ml-3">{{
                        detail.tourism_name }}</span>
                    </div>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id, dayIndex)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </td>
                  <td v-else-if="detail.tourism_name"
                    class="md:w-[311px] w-[259px] text-sm font-normal truncate text-[#152123] flex items-center">
                    <span class="truncate">
                      {{ detail.tourism_name }}</span>
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal  md:w-[311px] w-[260px]">-</td>
            </tr>
            </tr> 

            <!-- 교통 / 가이드  -->
            <tr>
              <th class="text-sm  font-bold text-[#5E5F61] text-center md:w-[180px] w-[90px]">교통 / 가이드</th>
              <div v-if="filterDetailsByType(day.details, [2, 7]).length > 0" class="md:w-[425px]">
                <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [2, 7])"
                  :key="`attraction-${detailIndex}`">
                  <td class="flex items-center text-sm font-normal truncate text-[#152123]  md:w-[425px] w-[311px]">
                    <span class="truncate">
                      {{ detail.tourism_name }}</span>
                  </td>
                </template>
              </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal md:w-[425px] w-[311px] ">-</td>
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
          <p class="text-[#8E8D8D] text-xs font-normal text-end w-56 md:w-full">
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

const requiredType = ref(1);
const selectedDayIndex = ref(null);
const selectedDetailIndex = ref(null);

const updatedData = ref({
  tourism_name: ''
});


const openModalMenu = async (laid, type, city_id, co_id, at_id, dayIndex, detailIndex) => {
<<<<<<< HEAD
  console.log("====>", dayIndex)
=======
>>>>>>> 50d8ad16e5be005984b1630dcd5cc836b942c6a5
  previousLaid.value = laid;
  selectedLaId.value = laid;
  selectedAtId.value = type;
  cityId.value = city_id;
  coId.value = co_id;
  atId.value = at_id;

  selectedDayIndex.value = dayIndex;
  selectedDetailIndex.value = detailIndex;

  requiredType.value = type;

<<<<<<< HEAD
  console.log('===================', requiredType.value)
  
  // Pre-fill updatedData with current values from selected row
  
=======
>>>>>>> 50d8ad16e5be005984b1630dcd5cc836b942c6a5
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
      //console.log(response.data)
      return price;
    } else {
      throw new Error("Failed to fetch tour attraction details");
    }
  } catch (error) {
    console.error("Error fetching tour attraction:", error);
    return 0;
  }

};

<<<<<<< HEAD
const getTourname = async (laid) => {
=======
const getTourName = async (laid) => {
>>>>>>> 50d8ad16e5be005984b1630dcd5cc836b942c6a5
  try {
    const response = await tourAttractionService.tourAttraction(laid);
    if (response.status === 200 && response.data) {
      const tour_name = response.data.land_name;
      return tour_name;
    } else {
      throw new Error("Failed to fetch tour attraction details");
    }
  } catch (error) {
    console.error("Error fetching tour attraction:", error);
    return 0;
<<<<<<< HEAD
  }

};

const confirmSelection = async (newLaid) => {

  if (previousLaid.value !== newLaid) {
    // Find the index of the course with the matching `laid`
    const courseIndex = store.packages.courses.findIndex(
      (course) => course.laid === previousLaid.value
    );

    if (courseIndex !== -1) {
      console.log("Course Index:", courseIndex);
    } else {
      console.error("Course with the specified laid not found!");
    }
  
    previousLaidPrice.value = await getTourAttraction(previousLaid.value);
    totalCost.value -= previousLaidPrice.value;
    const newLaidPrice = await getTourAttraction(newLaid);
    totalCost.value += newLaidPrice;
    console.log('old laid', previousLaid.value);
    console.log('new laid', newLaid);
    console.log(`Updated totalCost: ${totalCost.value}`);
    previousLaid.value = newLaid;
    previousLaidPrice.value = newLaidPrice;
  
    // store.packages.courses[courseIndex].tourism_name = updatedData.value.tourism_name;
    // store.packages.courses[courseIndex].tourism_price = updatedData.value.tourism_price;
    updatedData.value.tourism_name = await getTourname(newLaid);
   

    console.log("Updated Course Details:", updatedData.value.tourism_name);

    // If you still want to use `updateCourseDetail` in the store
    store.updateCourseDetail(courseIndex, {
      tourism_name: updatedData.value.tourism_name
   
    },requiredType.value);

    console.log("After Change:", JSON.parse(JSON.stringify(store.packages.courses)));

    // refreshDynamicRows();

    isOpen.value = false;
  }

};
const refreshDynamicRows = () => {
  // If you use Vue's reactivity system correctly, this should trigger the UI update.
  // Optionally, if needed, you can manually trigger the UI refresh:
  const tempRows = dynamicRows.value;
  dynamicRows.value = []; // Clear first
  dynamicRows.value = tempRows; // Reassign to trigger reactivity
=======
  }

};

const confirmSelection = async (newLaid) => {
  if (previousLaid.value !== newLaid) {
    const courseIndex = store.packages.courses.findIndex(
      (course) => course.laid === previousLaid.value && course.trip_day === selectedDayIndex.value + 1
    );

    if (courseIndex !== -1) {
      console.log("Course Index:", courseIndex);
    } else {
      console.error("Course with the specified laid not found!");
    }

    previousLaidPrice.value = await getTourAttraction(previousLaid.value);
    totalCost.value -= previousLaidPrice.value;
    const newLaidPrice = await getTourAttraction(newLaid);
    totalCost.value += newLaidPrice;
    previousLaid.value = newLaid;
    previousLaidPrice.value = newLaidPrice;

    updatedData.value.tourism_name = await getTourName(newLaid);

    store.updateCourseDetail(courseIndex, {
      tourism_name: updatedData.value.tourism_name

    }, requiredType.value);

    isOpen.value = false;
  }

>>>>>>> 50d8ad16e5be005984b1630dcd5cc836b942c6a5
};


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

<<<<<<< HEAD
  // Group courses by day
=======
>>>>>>> 50d8ad16e5be005984b1630dcd5cc836b942c6a5
  const rowsByDay = store.packages.courses.reduce((acc, course) => {
    const day = course.trip_day;

    if (!acc[day]) {
      acc[day] = {
        tourismLocation: course.tourism_location || '',
        details: [],
      };
    }

    acc[day].details.push(course);
    return acc;
  }, {});

  // Return rows as an array
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
