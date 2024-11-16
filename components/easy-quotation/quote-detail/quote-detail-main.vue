<template>
  <div class="bg-white max-w-full md:h-[606px] h-screen overflow-x-hidden shadow-lg overflow-y-auto md:p-4">
    <div class="text-[#152123] md:text-[30px] text-[22px] font-bold text-center p-7 md:mt-5">{{
      store.packages.package_name }}
    </div>
    <div v-if="loading" class="flex justify-center p-4 lg:p-0 mb-3">
      <div>
        <div class="skeleton lg:w-[840px] w-full max-w-full md:h-[360px] h-48 rounded-none"></div>
        <div class="skeleton lg:w-[840px] w-full max-w-full md:h-[660px] h-60 mt-10 rounded-none"></div>
      </div>
    </div>
    <div v-else class="w-[840px] mx-auto max-w-full p-4 md:p-0 mb-3">
      <img class="w-[840px] mx-auto md:h-[350px] h-[160px]  rounded-2xl md:rounded-none"
        :src="store.packages.package_img" alt="image detail" />

      <div class="mt-10 md:hidden flex justify-center">
        <svg width="auto" height="1" class="mt-4">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="#E6E6E6" stroke-width="1" stroke-dasharray="8,8" />
        </svg>
      </div>

      <div class="md:mt-10 mt-4">
        <h1 class="text-[#152123] text-[22px] md:text-[30px] font-bold text-center p-6">여행 일정</h1>
      </div>
      <tableQuote :packageDetails="packageDetail" />
    </div>
  </div>
</template>

<script setup>
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import tableQuote from "./table.vue";

const store = useEasyQuotationStore();
const packageId = store.EasyQuotation.selectedPackageId;
const packageDetail = ref([]);
const loading = ref(true);

const fetchPackages = async () => {
  try {
    loading.value = true;
    await store.loadPackages(packageId);
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
  catch (error) {
    console.log(error.message)
  }
}
fetchPackages();

</script>
