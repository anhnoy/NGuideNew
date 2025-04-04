<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="p-5 max-w-lg w-full">
            <table class="w-full text-black text-center border border-black">
                <thead>
                    <tr>
                        <th class="p-3 border border-black font-bold">NO</th>
                        <th class="p-3 border border-black font-bold">숙박업체 </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="accommodation in accommodations" :key="accommodation.no">
                        <td class="p-3 border border-black text-center w-16">{{ accommodation.no }}</td>
                        <td class="p-3 border border-black">{{ accommodation.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const accommodations = ref([
    { no: 1, name: 'Muong Thanh Luxury Vientiane' },
    { no: 2, name: 'Grand Hotel Vientiane' },
    { no: 3, name: 'Vientiane Luxury Hotel' },
    { no: 4, name: 'Crowne Plaza Vientiane' },
    { no: 5, name: 'Vientiane YooEun Hotel' },
    { no: 6, name: 'S 2 Modern Boutique Hotel ' },
    { no: 7, name: 'Dansavanh Namngum Resort ' },
    { no: 8, name: 'Amari Vang Vieng Laos Hotel' },
    { no: 9, name: 'Thavisouk Hotel and Island' },
    { no: 10, name: 'The Grand Riverside Hotel' },
    { no: 11, name: 'S Vangvieng Boutique Hotel' },
    { no: 12, name: 'The Grand Luang Prabang, Affiliated by Meliá' },
    { no: 13, name: 'Sofitel Luang Prabang' },
    { no: 14, name: 'Luang Prabang View Hotel' },
    { no: 15, name: 'Xishuangbanna Hotel Laos Luang Prabang' },
    { no: 16, name: 'Ang Thong Hotel' },
    { no: 17, name: 'Manyo Hotel and Resort' },
    { no: 18, name: 'Vansana Luang Prabang Hotel' },
    { no: 19, name: 'Landmark Mekong Riverside' },
    { no: 20, name: 'HotelQube Hotel VientianeTmark' },
    { no: 21, name: 'Resort Vang ViengSanti Resort & Spa' }
])
</script>

<style scoped>
/* No additional styles needed */
</style>