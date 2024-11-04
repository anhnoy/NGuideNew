<template>
  <div class="max-w-full md:h-[620px] h-full overflow-x-hidden bg-white shadow-lg overflow-y-auto p-4 ">
    <h1 v-if="visiblePackages.length > 0" class="text-[#152123] text-3xl font-bold text-center p-7 lg:mt-5">
      아래 코스를 추천 드려요.
    </h1>

    <h1 v-else class="text-[#152123] text-3xl font-bold text-center p-7 lg:mt-5">일정에 맞는 추천 코스가 없습니다. <br>
      여행 일정을 변경 해 보세요.</h1>

    <div class="grid md:w-[840px] grid-cols-2 gap-4 lg:grid-cols-3 lg:p-0 p-2 mx-auto">
      <div v-for="(pkg, index) in visiblePackages" :key="pkg.id"
        class="border border-[#E6E6E6] rounded-xl overflow-hidden cursor-pointer " @click="handleImageClick(pkg.id)">
        <img :src="pkg.image" :alt="pkg.name" class="lg:w-[270px] h-[160px] object-cover lg:h-[200px] w-full" />
        <div class="p-4 lg:w-[270px] h-[143px]">
          <h2 class="text-lg font-medium text-textmain text-center lg:w-[238px] mx-auto truncate">
            {{ pkg.name }}
          </h2>
          <p
            class="text-sm text-center text-textsub lg:w-[238px] lg:h-[44px] overflow-hidden whitespace-nowrap text-ellipsis two-line-ellipsis md:three-line-ellipsis">
            {{ pkg.detail }}
          </p>
          <p
            class="mt-2 text-sub text-sm font-normal lg:text-xl lg:font-bold leading-[20.27px] tracking-[-0.01em] text-center lg:w-[238px] truncate">
            1인당 약 {{ pkg.price.toLocaleString() }}원 ~
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-10">
      <button v-if="visiblePackages.length < packages.length" @click="loadMore"
        class="w-52 mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full">
        더보기
      </button>
    </div>
  </div>
</template>

<script setup>
import packageService from "@/services/easy-quote.service.js"; // Adjust the import path as needed
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import moment from 'moment';
const emit = defineEmits(['updateVisibility']); // Define the emit function
const packages = ref([]); // Initialize packages as an empty array
const visiblePackages = ref([]); // To keep track of visible packages
const packageStore = useEasyQuotationStore(); // Use the package store
const page = ref(0);
const size = ref(3);

// Fetch packages when the component is mounted
const loadPackage = async () => {
  try {
    const startDate = packageStore.EasyQuotation.startDate;
    const endDate = packageStore.EasyQuotation.endDate;

    const start = moment(startDate);
    const end = moment(endDate);

    const trip_days = end.diff(start, 'days') + 1;

    const data = await packageService.getPackageList(page.value, size.value, trip_days);
    if (data.rows.length === 0) return;

    visiblePackages.value = data.rows.map((pkg) => ({
      id: pkg.package_id,
      name: pkg.package_name,
      detail: pkg.package_detail,
      image: pkg.package_img,
      price: pkg.package_price,
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
  }
};

loadPackage();

// Function to load more packages
const loadMore = async () => {
  size.value += 3; // Increase the number of packages to load
  const data = await packageService.getPackageList(page.value, size.value);
  if (data.rows.length === 0) return;

  visiblePackages.value.push(...data.rows.map((pkg) => ({
    id: pkg.package_id,
    name: pkg.package_name,
    detail: pkg.package_detail,
    image: pkg.package_img,
    price: pkg.package_price,
  })));
};

const handleImageClick = (pkgId) => {
  const index = visiblePackages.value.findIndex((it) => it.id === pkgId);
  const selectedPackage = visiblePackages.value[index];

  if (selectedPackage) {
    packageStore.setSelectedPackageId(selectedPackage.id);
    emit("updateVisibility", 4);
  } else {
    console.error("Package not found at index:", index);
  }
};
</script>

<style scoped>
.two-line-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
@media (max-width: 768px) {
  .two-line-ellipsis {
    -webkit-line-clamp: 3;
  }
}
</style>
