<template>
  <div class="sm:w-[840px] w-[360px] mt-5 mx-auto">
    <div class="table p-1">
      <div class="px-3 mb-6 items-center">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <tbody v-for="(day, dayIndex) in dynamicRows" :key="dayIndex" class="text-[14px]">
              <tr>
                <td :rowspan="day.tableRows.length + 100" class="w-25 bg-[#EDEDF2] text-center">
                  <div class="font-bold">
                    <span>{{ `${dayIndex + 1}일차` }}</span>
                    <div class="flex justify-center">
                      <p>{{ '(' }}</p>
                      <p>{{ day.date }} {{ day.dayOfWeek }}</p>
                      <p>{{ ')' }}</p>
                    </div>
                  </div>
                </td>

                <td :rowspan="day.tableRows.length + 100" class="w-30 bg-[#EDEDF2] text-center">
                  <span class="block text-[#6592E2]">
                    {{ day.tourismLocation }}
                  </span>
                </td>

                <th class="p-2 w-30 bg-[#F3F4F7]" :rowspan="day.tableRows.length + 1">
                  일정
                </th>
              </tr>

              <tr v-for="(row, index) in day.tableRows" :key="index">
                <td colspan="2" class="p-2 w-100">
                  <span class="w-full p-2 text-left block" :title="row.tableDetail">
                    {{ row.tableDetail }}
                  </span>
                </td>
              </tr>

              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]"
                  :rowspan="4 + day.meal.breakfastRows.length + day.meal.lunchRows.length + day.meal.dinnerRows.length">
                  식사
                </th>
              </tr>

              <tr>
                <th class="p-2 w-10" :rowspan="day.meal.breakfastRows.length + 1">
                  조식
                </th>
              </tr>
              <tr v-for="(row, index) in day.meal.breakfastRows" :key="index">
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ row.breakfastDetail }}
                  </span>
                </td>
              </tr>

              <tr>
                <th class="p-2 w-10" :rowspan="day.meal.lunchRows.length + 1">중식</th>
              </tr>
              <tr v-for="(row, index) in day.meal.lunchRows" :key="index">
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ row.lunchDetail }}
                  </span>
                </td>
              </tr>

              <tr>
                <th class="p-2 w-10" :rowspan="day.meal.dinnerRows.length + 1">석식</th>
              </tr>
              <tr v-for="(row, index) in day.meal.dinnerRows" :key="index">
                <td class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ row.dinnerDetail }}
                  </span>
                </td>
              </tr>

              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]" :rowspan="day.lodgingRows.length + 1">
                  숙소
                </th>
              </tr>
              <tr v-for="(row, index) in day.lodgingRows" :key="index">
                <td colspan="2" class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ row.lodgingDetail }}
                  </span>
                </td>
              </tr>

              <tr>
                <th class="p-2 w-30 bg-[#F3F4F7]" :rowspan="day.guideRows.length + 1">
                  교통/가이드
                </th>
              </tr>
              <tr v-for="(row, index) in day.guideRows" :key="index">
                <td colspan="2" class="p-2 w-100">
                  <span class="w-full p-2 text-left block">
                    {{ row.guideDetail }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  quoteDetails: {
    type: Object,
    required: true
  }
});

const dynamicRows = computed(() => {
  if (!props.quoteDetails || !props.quoteDetails.touris_detail) {
    return []; // Return an empty array if quoteDetails or touris_detail is null/undefined
  }

  return props.quoteDetails.touris_detail.map(day => {
    const date = new Date(day.tourist_date);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    return {
      date: day.tourist_date,
      dayOfWeek,
      tourismLocation: day.details?.[0]?.tourism_location || '',
      tableRows: day.details?.map(detail => ({
        tableDetail: detail.tourism_name
      })) || [],
      meal: {
        breakfastRows: day.details?.filter(detail =>
          detail.type_attraction_type?.at_name_en === "Restaurant" &&
          detail.tourism_name.toLowerCase().includes('breakfast')
        ).map(detail => ({
          breakfastDetail: detail.tourism_name
        })) || [],
        lunchRows: day.details?.filter(detail =>
          detail.type_attraction_type?.at_name_en === "Restaurant" &&
          detail.tourism_name.toLowerCase().includes('lunch')
        ).map(detail => ({
          lunchDetail: detail.tourism_name
        })) || [],
        dinnerRows: day.details?.filter(detail =>
          detail.type_attraction_type?.at_name_en === "Restaurant" &&
          (detail.tourism_name.toLowerCase().includes('dinner') ||
            detail.tourism_name.toLowerCase().includes('restaurant'))
        ).map(detail => ({
          dinnerDetail: detail.tourism_name
        })) || []
      },
      lodgingRows: day.details?.filter(detail =>
        detail.type_attraction_type?.at_name_en === "Hotel"
      ).map(detail => ({
        lodgingDetail: detail.tourism_name
      })) || [],
      guideRows: day.details?.filter(detail =>
        detail.tourism_name.toLowerCase().includes('guide') ||
        detail.type_attraction_type?.at_name_en === "Transportation"
      ).map(detail => ({
        guideDetail: detail.tourism_name
      })) || []
    };
  });
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

@media (max-width: 640px) {

  th,
  td {
    padding: 4px;
    font-size: 12px;
  }

  .table {
    margin: 0;
  }
}
</style>