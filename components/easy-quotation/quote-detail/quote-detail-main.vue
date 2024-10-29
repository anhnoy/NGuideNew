<template>
  <div class="max-w-full md:h-[820px] h-full overflow-y-auto bg-white shadow-lg lg:overflow-y-auto">
    <div class="text-[#152123] lg:text-3xl text-xl font-bold text-center p-7 lg:mt-5">{{ store.packages.package_name }}
    </div>
    <div v-if="loading" class="flex justify-center p-4 mb-3">
      <div>
        <div class="skeleton lg:w-[840px] w-full max-w-full md:h-[360px] h-48 "></div>
        <div class="skeleton lg:w-[840px] w-full max-w-full md:h-[660px] h-60 mt-10 rounded-none"></div>
      </div>
    </div>
    <div v-else class="w-[840px] mx-auto max-w-full p-4 mb-3">
      <img class="w-full mx-auto md:h-[360px] h-[160px]  rounded-2xl md:rounded-none" :src="store.packages.package_img"
        alt="image detail" />

      <div class="mt-10 md:hidden flex justify-center">
        <svg width="auto" height="1" class="mt-4">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="#E6E6E6" stroke-width="1" stroke-dasharray="8,8" />
        </svg>
      </div>

      <div class="md:mt-10 mt-4">
        <h1 class="text-[#152123] text-3xl font-bold text-center p-6">여행 일정</h1>
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
