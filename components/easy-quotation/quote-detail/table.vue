<template>
  <div>
    <div class="max-w-[1080px] h-screen py-5 lg:py-10 mx-auto">
      <div class="overflow-x-auto">
        <table class="hidden sm:block table-auto  w-full border-collapse">
          <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
            <tr>
              <th class="text-[#152123] text-lg font-medium p-4 w-[108px] text-center">
                {{ `${dayIndex + 1} 일차` }}
              </th>
              <th class="text-[#152123] text-sm font-medium p-4  w-[127px] text-center">
                {{ day.tourismLocation }}
              </th>
            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[180px]">
                일정
              </th>
            </tr>

            <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, [1, 5, 6, 8, 9])"
              :key="`attraction-3-${detailIndex}`">
              <td class="w-[425px]">
                <div class="flex items-center text-sm font-normal">
                  <template v-if="detail.laid">
                    <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                    <div class="flex items-center ml-3 text-[#6EBC30]">
                      <span class="truncate w-[295px]">{{ detail.tourism_name }}</span>
                      <img
                        @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                        class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                    </div>
                  </template>
                  <template v-else-if="detail.tourism_name">
                    <span class="truncate w-[114px] text-[#5E5F61]">{{ detail.tourism_name }}</span>
                  </template>
                  <span v-else class="text-[#5E5F61] text-sm font-normal text-start truncate w-[114px]">
                    -
                  </span>
                </div>
              </td>
            </tr>
            </tr>

            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[180px]">
                숙소
              </th>
            </tr>
            <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`meal-4-${detailIndex}`">
              <td class="p-2 text-[#6EBC30] text-sm font-normal w-[425px]">
                <div v-if="detail.laid" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center  ml-2">
                    <span class="truncate w-[297px]">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else-if="detail.tourism_name" class="text-[#5E5F61] text-sm font-normal text-start w-[114px]">
                  <span class="truncate w-16 ">
                    {{ detail.tourism_name }}</span>
                </div>
              <td v-else class="text-[#5E5F61] text-sm font-normal text-start  truncate w-[114px]">
                -
              </td>
              </td>
            </tr>
            </tr>


            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[180px]">
                식사
              </th>
            </tr>

            <tr>
              <td class=" p-2 text-[#152123] text-sm font-normal text-start w-[114px]"> 조식</td>
            <tr v-for="(detail, index) in getMealList(day.details, '1')" :key="index">
              <td v-if="detail && detail.tourism_name" class="p-2 text-[#6EBC30] text-sm font-normal w-[311px]">
                <div v-if="detail.laid" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center ml-2">
                    <span class="truncate w-[180px] ">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else-if="detail.tourism_name" class="text-[#152123] text-sm font-normal text-start">
                  <span class="truncate w-[180px]  ">
                    {{ detail.tourism_name }} </span>
                </div>
              </td>

              <td v-else class="text-[#5E5F61] text-sm font-normal text-start  truncate w-[310px]">
                -
              </td>
            </tr>
            </tr>

            <tr>
              <td class=" p-2 text-[#152123] text-sm font-normal text-start w-[114px]"> 중식</td>
            <tr v-for="(detail, index) in getMealList(day.details, '2')" :key="index">
              <td v-if="detail && detail.tourism_name" class="p-2 text-[#6EBC30] text-sm font-normal w-[311px]">
                <div v-if="detail.laid" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center ml-2">
                    <span class="truncate w-[180px] ">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else-if="detail.tourism_name" class="text-[#152123] text-sm font-normal text-start">
                  <span class="truncate w-[180px] ">
                    {{ detail.tourism_name }} </span>
                </div>
              </td>

              <td v-else class="text-[#5E5F61] text-sm font-normal text-start  truncate w-[310px]">
                -
              </td>
            </tr>
            </tr>



            <tr>
              <td class=" p-2 text-[#152123] text-sm font-normal text-start w-[114px]"> 석식</td>
            <tr v-for="(detail, index) in getMealList(day.details, '3')" :key="index">
              <td v-if="detail && detail.tourism_name" class="p-2 text-[#6EBC30] text-sm font-normal w-[311px]">
                <div v-if="detail.laid !== null && detail.laid !== undefined" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center ml-2">
                    <span class="truncate w-[180px] ">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else-if="detail.tourism_name"
                  class="text-[#152123] text-sm font-normal text-start ">
                  <span class="truncate w-[180px] ">
                    {{ detail.tourism_name }}</span>
                </div>
              </td>
              <td v-else class="text-[#5E5F61] text-sm font-normal text-start  truncate w-[310px]">
                -
              </td>
            </tr>
            </tr>
            </tr>



            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[180px]">
                교통 / 가이드
              </th>
            </tr>

            <tr v-if="filterDetailsByType(day.details, 2).length > 0"
              v-for="(detail, detailIndex) in filterDetailsByType(day.details, 2)" :key="`schedule-${detailIndex}`">
              <td class="bg-white p-4 text-sm font-normal text-[#152123] w-[425px]">
                {{ detail.tourism_name }}
              </td>
            </tr>
            <tr v-else>
              <td class="p-4 text-sm font-normal text-[#152123] w-[425px]">
                -
              </td>
            </tr>
            <tr v-if="filterDetailsByType(day.details, 7).length > 0"
              v-for="(detail, detailIndex) in filterDetailsByType(day.details, 7)" :key="`schedule-${detailIndex}`">
              <td class="bg-white p-4 text-sm font-normal text-[#152123] w-[425px]">
                {{ detail.tourism_name }}
              </td>
            </tr>
            <tr v-else>
              <td class="p-4 text-sm font-normal text-[#152123] w-[425px]">
                -
              </td>
            </tr>
            </tr>
            </tr>
          </tbody>
        </table>


        <table class="w-full border-collapse mx-auto block md:hidden overflow-x-hidden">
          <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
            <tr>
              <th>{{ `${dayIndex + 1} 일차` }}</th>
            </tr>
            <tr>
              <th> {{ day.tourismLocation }}</th>
            </tr>

            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[90px]">
                일정
              </th>
            </tr>
            <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, [1, 5, 6, 8, 9])"
              :key="`attraction-3-${detailIndex}`">

              <td v-if="detail.type">
                <div class="flex items-center text-sm font-normal">
                  <template v-if="detail.laid !== null && detail.laid !== undefined">
                    <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                    <div class="flex items-center ml-3 text-[#6EBC30]">
                      <span class="truncate w-[180px]">{{ detail.tourism_name }}</span>
                      <img
                        @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                        class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                    </div>
                  </template>
                  <template v-else>
                    <span class="truncate w-[270px] text-[#5E5F61] ">{{ detail.tourism_name }}</span>
                  </template>
                </div>
              </td>
              <td v-else class="p-4 text-sm font-normal text-[#152123] w-[305px]">
                -
              </td>
            </tr>

            </tr>

            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[90px]">
                숙소
              </th>
            </tr>

            <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`meal-4-${detailIndex}`">
              <td class="p-2 text-[#6EBC30] text-sm font-normal ">
                <div v-if="detail.laid !== null && detail.laid !== undefined" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center  ml-2">
                    <span class="truncate w-[184px]">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else class="text-[#5E5F61] text-sm font-normal text-start w-[270px]">
                  <span class="truncate w-[180px] ">
                    {{ detail.tourism_name }}</span>
                </div>
              </td>
            </tr>
            </tr>

            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[90px]">
                식사
              </th>
            </tr>

            <tr>
              <td class=" p-2 text-[#152123] text-sm font-normal text-start w-[50px]"> 조식</td>
            <tr v-for="(detail, index) in getMealList(day.details, '1')" :key="index">
              <td v-if="detail && detail.tourism_name" class="p-2 text-[#6EBC30] text-sm font-normal ">
                <div v-if="detail.laid !== null && detail.laid !== undefined" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center ml-2">
                    <span class="truncate w-[133px] ">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else class="text-[#152123] text-sm font-normal text-start w-[220px]">
                  <span class="truncate w-[133px] text-[#152123] text-sm font-normal text-start ">
                    {{ detail.tourism_name }}</span>
                </div>
              </td>

              <td v-else class="text-[#5E5F61] text-sm font-normal text-start w-[254px]">
                -
              </td>
            </tr>
            </tr>

            <tr>
              <td class=" p-2 text-[#152123] text-sm font-normal text-start w-[50px]"> 조식</td>
            <tr v-for="(detail, index) in getMealList(day.details, '2')" :key="index">
              <td v-if="detail && detail.tourism_name" class="p-2 text-[#6EBC30] text-sm font-normal ">
                <div v-if="detail.laid !== null && detail.laid !== undefined" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center ml-2">
                    <span class="truncate w-[133px] ">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else class="text-[#152123] text-sm font-normal text-start w-[220px]">
                  <span class="truncate w-[133px] text-[#152123] text-sm font-normal text-start ">
                    {{ detail.tourism_name }}</span>
                </div>
              </td>

              <td v-else class="text-[#5E5F61] text-sm font-normal text-start w-[254px]">
                -
              </td>
            </tr>
            </tr>


            <tr>
              <td class=" p-2 text-[#152123] text-sm font-normal text-start w-[50px]"> 석식</td>
            <tr v-for="(detail, index) in getMealList(day.details, '3')" :key="index">
              <td v-if="detail && detail.tourism_name" class="p-2 text-[#6EBC30] text-sm font-normal ">
                <div v-if="detail.laid !== null && detail.laid !== undefined" class="flex items-center ">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div class="flex items-center ml-2">
                    <span class="truncate w-[133px] ">
                      {{ detail.tourism_name }}</span>
                    <img
                      @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id, detail.type_attraction_type.at_id)"
                      class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>
                </div>
                <div v-else class="text-[#152123] text-sm font-normal text-start w-[220px]">
                  <span class="truncate w-[133px] ">
                    {{ detail.tourism_name }}</span>
                </div>
              </td>

              <td v-else class="text-[#5E5F61] text-sm font-normal text-start w-[254px]">
                -
              </td>
            </tr>
            </tr>
            </tr>
            <tr>
            <tr>
              <th :rowspan="day.details.length" class="p-2 text-sm font-bold text-[#5E5F61] text-center w-[90px]">
                교통 / 가이드
              </th>
            </tr>

            <tr v-if="filterDetailsByType(day.details, 2).length > 0"
              v-for="(detail, detailIndex) in filterDetailsByType(day.details, 2)" :key="`schedule-${detailIndex}`">
              <td class=" p-4 text-sm font-normal text-[#152123] w-[305px]">
                {{ detail.tourism_name }}
              </td>
            </tr>
            <tr v-else>
              <td class=" p-4 text-sm font-normal text-[#152123] w-[305px]">
                -
              </td>
            </tr>
            <tr v-if="filterDetailsByType(day.details, 7).length > 0"
              v-for="(detail, detailIndex) in filterDetailsByType(day.details, 7)" :key="`schedule-${detailIndex}`">
              <td class=" p-4 text-sm font-normal text-[#152123] w-[305px]">
                {{ detail.tourism_name }}
              </td>
            </tr>
            <tr v-else>
              <td class="p-4 text-sm font-normal text-[#152123] w-[305px]">
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
        :type="selectedAtId" :co_id="coId" :at_id="atId" @confirm-selection="confirmSelection"/>
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

const tourAttractionData = ref(null);

const previousLaid = ref(null);
const previousLaidPrice = ref(0);

// Initialize totalCost from store's totalPrice when the component is mounted
const totalCost = ref(0);


const openModalMenu = async (laid, type, city_id, co_id, at_id) => {
  previousLaid.value = laid;
  
  selectedLaId.value = laid;
  selectedAtId.value = type;
  cityId.value = city_id;
  coId.value = co_id;
  atId.value = at_id;
  isOpen.value = true;

  await getTourAttraction(laid);

};

const getTourAttraction = async (laid) => {
  try {
    console.log("Fetching tour attraction with laid:", laid); // Debug
    const response = await tourAttractionService.tourAttraction(laid);
    if (response.status === 200 && response.data) {
      const type_tour = response.data.at_id;
      tourAttractionData.value = response.data.attraction_options[0].attraction_prices[0];
      let price = tourAttractionData.value?.enp_price || 0;
      if (type_tour == '3') price = price / 2;
      console.log(`Fetched tourism price: ${price}`);
      return price;
    } else {
      throw new Error("Failed to fetch tour attraction details");
      return 0;
    }
  } catch (error) {
    console.error("Error fetching tour attraction:", error);
    return 0;
  }
};
// Confirm the selection and adjust totalCost
const confirmSelection = async (newLaid) => {
  if (previousLaid.value !== newLaid) {
    // Minus old price
    previousLaidPrice.value =await getTourAttraction(previousLaid.value);
    
    totalCost.value -=  previousLaidPrice.value;
    // console.log(`Minus previous laid price: -${previousLaidPrice.value}`);

    const newLaidPrice = await getTourAttraction(newLaid);
    // Update laid and price
    totalCost.value += newLaidPrice;
    // console.log(`Added new laid price: +${newLaidPrice}`);

    
    console.log('old laid', previousLaid.value);
    console.log('new laid', newLaid);
    console.log(`Updated totalCost: ${totalCost.value}`);
    previousLaid.value = newLaid;
    previousLaidPrice.value = newLaidPrice;
  }
  
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

//Watch for changes in totalCost to update totalPrice in store
watch(totalCost, (newCost) => {
  store.setTotalPrice(newCost); // Sync totalPrice with updated totalCost in the store
});

onMounted(() => {
  store.setTotalPrice(totalPrice.value);
  totalCost.value = store.packages.quote.tour_person;
  // console.log(totalPerson.value);
  console.log(totalCost.value);
});
// const totalPrice = computed(

//   {
//     get() {
//       if (store.packages) {

//         let total = 0;
//         const courses = store.packages.courses || [];
//         const persons = totalPerson.value;
//         if (!courses) return 0;
//         courses.forEach((it) => {
//           if ( it.type === 7) {
//         total += it.tourism_price / persons;
//       } else if (it.type === 3) {
//         total += it.tourism_price / 2;
//       } else {
//         total += it.tourism_price;
//       }
//     });
//         let exchangeRate = store.packages.exchange;
//         const formatter = new Intl.NumberFormat('en-US', {
//           minimumFractionDigits: 0,
//           maximumFractionDigits: 0,
//         });

//         const formattedNumber = formatter.format(total * exchangeRate);
//         return formattedNumber;
//       }
//       return 0;
//     }
//   }
// );
// Computed totalPrice with exchange rate applied to totalCost
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


const getMealList = (details, mealType) => {
  const list = details.filter(detail => detail.type === 4);
  let ret = list.filter((item) => item.type_order === mealType);
  if (ret.length > 0) return ret;

  ret = [
    {
      laid: null,
    }
  ];

  return ret;

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
