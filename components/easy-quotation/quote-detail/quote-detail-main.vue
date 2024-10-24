<template>
  <div class="max-w-full md:h-[820px] h-[795px] overflow-y-auto bg-white shadow-lg lg:overflow-y-auto">
    <div class="text-[#152123] text-3xl font-bold text-center p-10">{{ packageDetail.package_name }}</div>
    <div class="w-[840px] mx-auto p-4 mb-3">
      <img class="w-[840px] mx-auto h-[360px]" :src="packageDetail.package_img" alt="image detail" />
      <div class="mt-10">
        <h1 class="text-[#152123] text-3xl font-bold text-center p-6">여행 일정</h1>
      </div>
      <tableQuote :packageDetails="packageDetail" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import packageService from "@/services/easy-quote.service";
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import tableQuote from "./table.vue";

const packageStore = useEasyQuotationStore();
const packageId = packageStore.EasyQuotation.selectedPackageId;

const packageDetail = ref([]); // Initializes packageDetail as an empty array

const loadIdPackage = async () => {
  try {
    const response = await packageService.getPackageDetail(packageId);

    if (response) {
      packageDetail.value = response; // Assigns the response directly
      console.log("Package details set:", packageDetail.value);
    } else {
      console.error("No response received");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Load the package details when the component is set up
loadIdPackage();

// Watch the packageDetail ref for changes and log them
watch(packageDetail, (newVal) => {
  console.log("packageDetail changed:", newVal);
});
</script>
