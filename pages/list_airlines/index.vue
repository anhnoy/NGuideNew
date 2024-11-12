<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="p-5 max-w-lg w-full">
        <table class="w-full text-black border text-center border-black">
          <thead>
            <tr>
              <th class="p-3 border border-black font-bold">NO</th>
              <th class="p-3 border border-black font-bold">항공사</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="airline in airlines" :key="airline.no">
              <td class="p-3 border border-black text-center w-16">{{ airline.no }}</td>
              <td class="p-3 border border-black">{{ airline.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const airlines = ref([
    { no: 1, name: '제주항공' },
    { no: 2, name: '진에어' },
    { no: 3, name: '에어부산' },
    { no: 4, name: '아시아나항공' },
    { no: 5, name: '티웨이항공' },
    { no: 6, name: '대한항공' }
  ])
  </script>
  
  <style scoped>
  /* No additional styles needed */
  </style>
  