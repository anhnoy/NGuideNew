<template>
  <div class="max-w-[1080px] h-screen py-16 mx-auto">
    <div class="bg-white shadow-xl">
      <h1 class="text-[#152123] text-3xl font-bold text-center p-10">여행 일정</h1>
      <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse">
          <div class="flex justify-center items-center py-10">
            <tbody>
              <tr>
                <td class="bg-[#EDEDF2] text-[#152123] text-lg font-medium p-4 border border-white w-28 text-center">
                  1일차
                </td>
                <td class="bg-[#EDEDF2] text-[#152123] text-sm font-medium p-4 border border-white w-32 text-center">
                  인천비엔티엔
                </td>
              <tr>
              <tr>
                <td rowspan="3" Merge the cell vertically to cover all three rows
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                  일정
                </td>

                <td class="bg-white border border-[#E6E6E6] p-2 text-[#152123] text-sm font-normal w-96">
                  인천공항 출발
                </td>
              </tr>
              <tr>
                <td class="bg-white border border-[#E6E6E6] p-2 text-[#152123] text-sm font-normal ">
                  비엔티엔 도착, 가이드 미팅
                </td>
              </tr>
              <tr>
                <td class="bg-white border border-[#E6E6E6] p-2 text-[#152123] text-sm font-normal">
                  호텔 체크인 및 휴식
                </td>
              </tr>
              </tr>
              <tr>
              <tr>
                <td rowspan="2" Merge the cell vertically to cover all three rows
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                  숙소
                </td>
              </tr>
              <tr>
                <td
                  class="bg-white border-[#E6E6E6] border-r p-2 text-[#6EBC30] text-sm font-normal flex justify-between items-center w-96">
                  <div class="flex items-center">
                    ○○○ 호텔
                    <img class="ml-2 cursor-pointer" src="@/assets/icons/nextChange.svg" alt="">
                  </div>

                  <button class="text-sm text-white font-medium bg-[#6EBC30] rounded-full px-7 p-2">변경하기</button>
                </td>
              </tr>
              </tr>
              
              <tr>
              <tr>
                <td rowspan="4" Merge the cell vertically to cover all three rows
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                  식사
                </td>
              </tr>


              <tr>
                <th class="bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal text-start w-32">
                  조식
                </th>
                <td class=" bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal w-64">
                  -
                </td>
              </tr>
              <tr>
                <th class="bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal text-start">
                  중식
                </th>
                <td class=" bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal">
                  기내식
                </td>
              </tr>

              <tr>
                <th class=" bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal text-start">
                  석식
                </th>
                <td class=" bg-white border-[#E6E6E6] border p-2 text-[#152123] text-sm font-normal">
                  바베큐 식당
                </td>
              </tr>
              </tr>
              <tr>
              <tr>
                <td rowspan="2" Merge the cell vertically to cover all three rows
                  class="bg-[#EDEDF2] border border-white p-2 text-sm font-bold text-[#5E5F61] text-center w-44">
                  교통 / 가이드
                </td>
              </tr>
              <tr>
                <td class="bg-white border-[#E6E6E6] border-b border-r p-2 text-[#152123] w-96">
                  승합차 13인승
                  <div>현지인 가이드 (한국어 가능)</div>
                </td>
              </tr>
              </tr>
              </tr>
            </tbody>
          </div>
        </table>
      </div>
    </div>
  </div>
  
</template>

<script setup></script>

<style scoped>
table {
  border-collapse: collapse;
}

td,
th {
  padding: 10px;
}

thead th {
  background-color: #ededf2;
  font-weight: bold;
}
</style>
