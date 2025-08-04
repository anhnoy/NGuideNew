<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div
        class="bg-white w-full h-auto max-h-screen md:max-h-[512px] md:w-[778px] md:rounded-[30px] shadow-lg md:px-[64px] md:py-[32px] relative flex flex-col"
      >
        <!-- Mobile Header -->
        <div
          class="md:hidden flex justify-between items-center px-4 py-4 border-b border-[#E6E6E6]"
        >
          <h2 class="text-lg font-bold text-[#152123]">국내외 숙박업체</h2>
          <button @click="close" class="text-2xl text-[#152123]">×</button>
        </div>

        <!-- Desktop Title -->
        <h2
          class="hidden md:block text-2xl font-bold text-start text-[#152123] mb-4"
        >
          국내외 숙박업체
        </h2>

        <!-- Scrollable Table -->
        <div class="flex-1 px-4 overflow-y-auto md:px-0">
          <table
            class="w-full text-sm md:text-base text-center border border-black text-[#5E5F61]"
          >
            <thead>
              <tr class="bg-[#C2BCBC]">
                <th
                  class="w-[60px] md:w-[100px] h-[38px] border border-[#E6E6E6] text-[#152123]"
                >
                  NO
                </th>
                <th
                  class="border border-[#E6E6E6] text-[#152123] md:w-[550px] w-[268px] max-w-[268px]"
                >
                  숙박업체
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hotel, index) in hotels" :key="index">
                <td class="border border-[#E6E6E6] h-[44px]">
                  {{ index + 1 }}
                </td>
                <td class="border border-[#E6E6E6]">{{ hotel }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="h-[100px] lg:h-0"></div>

        <!-- Confirm Button -->
        <div
          class="w-full pt-4 flex justify-center fixed bottom-0 left-0 border-[#E6E6E6] sm:static sm:border-none sm:mt-4"
        >
          <button
            @click="close"
            class="w-full h-[50px] sm:w-[150px] sm:h-[48px] bg-[#2F312A] border border-[#152123] text-white text-base font-semibold md:rounded-xl"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({ visible: Boolean });
const emit = defineEmits(["close"]);
const close = () => emit("close");

const hotels = [
  "Muong Thanh Luxury Vientiane",
  "Grand Hotel Vientiane",
  "Vientiane Luxury Hotel",
  "Crowne Plaza Vientiane",
  "Vientiane YooEun Hotel",
  "S 2 Modern Boutique Hotel",
  "Dansavanh Namngum Resort",
  "Amari Vang Vieng Laos Hotel",
  "Thavisouk Hotel and Island",
  "The Grand Riverside Hotel",
  "S Vangvieng Boutique Hotel",
  "The Grand Luang Prabang, Affiliated by Meliá",
  "Sofitel Luang Prabang",
  "Luang Prabang View Hotel",
  "Xishuangbanna Hotel Laos Luang Prabang",
  "Ang Thong Hotel",
  "Manyo Hotel and Resort",
  "Vansana Luang Prabang Hotel",
  "Landmark Mekong Riverside",
  "HotelQube Hotel VientianeTmark",
  "Resort Vang ViengSanti Resort & Spa",
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
