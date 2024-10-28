<template>
  <div>
    <div class="max-w-[1080px] h-screen py-5 lg:py-10 mx-auto">
      <div class="overflow-x-auto">
        <table class="hidden sm:block table-auto w-full border-collapse">
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
              <td :rowspan="day.details.length"
                class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                일정
              </td>


              <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [1, 5, 6, 8, 9])"
                :key="`attraction-3-${detailIndex}`">
            <tr>
              <td v-if="detail.type" class="flex w-96 border border-[#E6E6E6]">
                <template v-if="detail.laid">
                  <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
                  <div @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)"
                    class="flex items-center ml-3 text-[#6EBC30]">
                    <span class="truncate w-16">{{ detail.tourism_name }}</span>
                    <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
                  </div>
                </template>

                <template v-else>
                  {{ detail.tourism_name }}
                </template>
              </td>
            </tr>
</template>

</tr>
</tr>

<tr>
<tr>
  <td :rowspan="day.details.length"
    class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
    숙소
  </td>
</tr>
<tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`meal-4-${detailIndex}`">
  <td class="border-[#E6E6E6] border p-2 text-[#6EBC30] text-sm font-normal flex items-center w-96">
    <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
    <div @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)"
      class="flex items-center  ml-2">
      <span class="truncate w-16">
        {{ detail.tourism_name }}</span>
      <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
    </div>
  </td>
</tr>
</tr>


<tr>
<tr>
  <td :rowspan="day.details.length"
    class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
    식사
  </td>
</tr>

<tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 4)" :key="`meal-4-${detailIndex}`">
  <th class=" border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal text-start w-24">
    {{ getMealTypeLabel(detailIndex + 1) }}
  </th>

  <td v-if="detail && detail.tourism_name"
    class="border-[#E6E6E6] border p-2 text-[#6EBC30] text-sm font-normal flex items-center w-72">
    <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
    <div @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)"
      class="flex items-center ml-2">
      <span class="truncate w-16 ">
        {{ detail.tourism_name }}</span>
      <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
    </div>
  </td>
  <td v-else class="text-[#152123] text-sm font-normal text-start  border-[#E6E6E6] border">
    -
  </td>
</tr>
</tr>

<tr>
<tr>
  <td :rowspan="day.details.length"
    class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
    교통 / 가이드
  </td>
</tr>
<tr>
  <td v-for="(detail, detailIndex) in filterDetailsByType(day.details, 2)" :key="`attraction-2-${detailIndex}`"
    class=" bg-white border-[#E6E6E6] border  p-2 text-[#152123] w-96">
    {{ detail.tourism_name }}
    <div v-for="(detail, detailIndex) in filterDetailsByType(day.details, 7)" :key="`attraction-2-${detailIndex}`">{{
      detail.tourism_name }}</div>
  </td>
</tr>
</tr>
</tr>
</tbody>
</table>

<table class="sm:hidden">
  <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex">
    <tr>
      <th class="text-[#152123] text-lg font-medium bg-[#EDEDF2] border border-[#FFFFFF] w-96"> {{ `${dayIndex + 1}
        일차` }}</th>

    </tr>
    <tr>
      <th class="text-[#152123] text-lg font-medium bg-[#EDEDF2] border border-[#FFFFFF] w-96">인천 비엔티엔</th>
    </tr>

    <tr>
    <tr>
      <th :rowspan="day.details.length"
        class="w-24 bg-[#EDEDF2] border border-[#FFFFFF] text-[#5E5F61] text-sm font-bold">일정
      </th>
    </tr>
    <template v-for="(detail, detailIndex) in filterDetailsByType(day.details, [1, 5, 6, 8, 9])"
      :key="`attraction-3-${detailIndex}`">
      <tr>
        <td v-if="detail.type" class="flex border-r  border-b border-[#E6E6E6] max-w-full w-72">
          <template v-if="detail.laid">
            <button class="bg-[#6EBC30] text-white text-sm font-normal rounded px-2 py-1">변경가능</button>
            <div @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)"
              class="flex items-center ml-3 text-[#6EBC30]">
              <span class="truncate w-16">{{ detail.tourism_name }}</span>
              <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="" />
            </div>
          </template>

          <template v-else>
            {{ detail.tourism_name }}
          </template>
        </td>
      </tr>
    </template>
    </tr>

    <tr>
    <tr>
      <th :rowspan="day.details.length"
        class="w-24 max-w-full bg-[#EDEDF2] border border-[#FFFFFF] text-[#5E5F61] text-sm font-bold">숙소
      </th>
    </tr>
    <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 3)" :key="`meal-4-${detailIndex}`">
      <td class="w-72 max-w-full flex items-center border-r border-b border-t  border-[#E6E6E6] ">
        <button @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)"
          class="bg-[#6EBC30] text-xs font-normal rounded px-2 py-1 text-white ">변경가능</button>
        <div class="text-[#6EBC30] text-sm font-normal flex items-center ml-2">
          <span class=" truncate w-16">
            {{ detail.tourism_name }}
          </span>
          <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
        </div>

      </td>
    </tr>
    </tr>
    <tr>
    <tr>
      <th :rowspan="day.details.length"
        class="w-24 max-w-full bg-[#EDEDF2] border border-[#FFFFFF] text-[#5E5F61] text-sm font-bold">식사
      </th>
    </tr>
    <tr v-for="(detail, detailIndex) in filterDetailsByType(day.details, 4)" :key="`meal-4-${detailIndex}`">
      <th class="w-12 max-w-full bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal text-start ">
        {{ getMealTypeLabel(detailIndex + 1) }}
      </th>
      <td
        class="w-60 max-w-full bg-white border-[#E6E6E6] border-r border-b border-t p-2 text-[#6EBC30] text-sm font-normal flex items-center ">
        <button class="bg-[#6EBC30] text-xs font-normal rounded px-2 py-1 text-white">변경하기</button>
        <div @click="openModalMenu(detail.laid, detail.type, detail.la.city_id, detail.co_id)"
          class="flex items-center ml-2">
          <span class=" truncate w-16">
            {{ detail.tourism_name }}</span>
          <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
        </div>
      </td>
    </tr>
    </tr>
    <tr>
    <tr>
      <th :rowspan="day.details.length"
        class="w-24 max-w-full bg-[#EDEDF2] border border-[#FFFFFF] text-[#5E5F61] text-sm font-bold">
        교통/가이드
      </th>
    </tr>
    <tr>
      <td v-for="(detail, detailIndex) in filterDetailsByType(day.details, 2)" :key="`attraction-2-${detailIndex}`"
        class="w-72 max-w-full text-[#152123] text-sm font-normal border border-[#E6E6E6]">
        <span class=" truncate w-16">
          {{ detail.tourism_name }} </span>
        <div v-for="(detail, detailIndex) in filterDetailsByType(day.details, 7)" :key="`attraction-2-${detailIndex}`">
          {{
          detail.tourism_name }}</div>
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
      {{ totalPrice }}
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
      :type="selectedAtId" :co_id="coId" />
  </div>
</div>
</template>

<script setup>
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import DetailTourAttraction from "@/components/utils/detail-tour-attraction.vue";
const store = useEasyQuotationStore();
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

const getExchange = async () => {
  try {
    const val = await exchangeService.getExchangeRate();
    return val;
  }
  catch (error) {
    console.error('Exception occurred while try fetch exchange', error);
    return 0;
  }
}

const totalPrice = computed(
  {
    get() {
      if (store.packages) {

        let total = 0;
        const courses = store.packages.courses;
        if (!courses) return 0;
        courses.forEach((it) => {
          total += it.tourism_price;
        });
        let exchangeRate = store.packages.exchange;
        const formatter = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        const formattedNumber = formatter.format(total * exchangeRate);
        return formattedNumber;
      }
      return 0;
    }
  }
);

const filterDetailsByType = (details, types) => {
  if (Array.isArray(types)) {
    return details.filter(detail => types.includes(detail.type));
  }
  return details.filter((detail) => detail.type === types);
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
  margin: 0;
}
</style>
