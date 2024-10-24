<template>
  <div
    class="max-w-full md:h-[820px] h-[795px] overflow-y-auto bg-white shadow-lg lg:overflow-y-auto p-4 lg:rounded-b-xl"
  >
    <h1 class="text-[#152123] text-3xl font-bold text-center p-7 mt-5">
      아래 코스를 추천 드려요.
    </h1>
    <div class="grid md:w-[820px] grid-cols-2 gap-4 lg:grid-cols-3 p-2 mx-auto">
      <div
        v-for="(pkg, index) in visiblePackages"
        :key="pkg.id"
        class="border border-gray-300 rounded-lg overflow-hidden cursor-pointer"
        @click="handleImageClick(index)"
      >
        <img
          :src="pkg.image"
          :alt="pkg.name"
          class="w-full h-[160px] object-cover lg:h-[200px]"
        />
        <div class="p-4">
          <div class="w-28 mx-auto">
            <h2 class="text-lg font-medium text-textmain text-center truncate">
              {{ pkg.name }}
            </h2>
          </div>
          <p class="text-sm text-center text-textsub">{{ pkg.detail }}</p>
          <p
            class="mt-2 text-sub text-sm font-normal lg:text-xl lg:font-bold leading-[20.27px] tracking-[-0.01em] text-center"
          >
            1인당 약 {{ pkg.price.toLocaleString() }}원 ~
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-10">
      <button
        v-if="visiblePackages.length < packages.length"
        @click="loadMore"
        class="w-52 mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
      >
        더보기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import packageService from "@/services/easy-quote.service.js"; // Adjust the import path as needed
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";

const emit = defineEmits(); // Define the emit function
const packages = ref([]); // Initialize packages as an empty array
const visiblePackages = ref([]); // To keep track of visible packages
const packageStore = useEasyQuotationStore(); // Use the package store

// Fetch packages when the component is mounted
onMounted(async () => {
  try {
    const data = await packageService.getPackageList();
    if (Array.isArray(data.rows)) {
      // Check if data.rows is an array
      packages.value = data.rows.map((pkg) => ({
        id: pkg.package_id,
        name: pkg.package_name,
        detail: pkg.package_detail,
        image: pkg.package_img,
        price: pkg.package_price,
      }));
      visiblePackages.value = packages.value.slice(0, 3); // Show only 3 packages initially
    } else {
      console.error("Unexpected data format:", data);
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
  }
});

// Function to load more packages
const loadMore = () => {
  const nextPackages = packages.value.slice(
    visiblePackages.value.length,
    visiblePackages.value.length + 3
  );
  visiblePackages.value = [...visiblePackages.value, ...nextPackages];
};

const handleImageClick = (index) => {
  const selectedPackage = visiblePackages.value[index];
  if (selectedPackage) {
    packageStore.setSelectedPackageId(selectedPackage.id); 
    emit("updateVisibility", 4);
  } else {
    console.error("Package not found at index:", index);
  }
};
</script>
