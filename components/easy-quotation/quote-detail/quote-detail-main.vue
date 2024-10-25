<template>
  <div class="max-w-full md:h-[820px] h-full overflow-y-auto bg-white shadow-lg lg:overflow-y-auto">
    <div class="text-[#152123] lg:text-3xl text-xl font-bold text-center p-7 lg:mt-5">{{ store.packages.package_name }}
    </div>
    <div class="w-[840px] mx-auto max-w-full p-4 mb-3">
      <img class="w-full mx-auto lg:h-[360px] h-[160px]  rounded-2xl lg:rounded-none" :src="store.packages.package_img"
        alt="image detail" />

      <div class="mt-10 lg:hidden flex justify-center">
        <svg width="auto" height="1" class="mt-4">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="#E6E6E6" stroke-width="1" stroke-dasharray="8,8" />
        </svg>
      </div>

      <div class="lg:mt-10 mt-4">
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

const fetchPackages = async () => {
  try {
    await store.loadPackages(packageId);
  }
  catch (error) {
    console.log(error.message)
  }
}
fetchPackages();

</script>
