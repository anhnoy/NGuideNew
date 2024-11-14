<template>
  <div class="max-w-full md:h-[606px] h-full overflow-x-hidden bg-white shadow-lg overflow-y-auto p-4"
    :class="!loading && packages.length === 0 ">
    <div v-if="loading" >
    </div>

    <h1 v-if="!loading && packages.length > 0"
      class="text-[#152123] text-[22px] lg:text-3xl font-bold text-center p-7 lg:mt-5">
      아래 코스를 추천 드려요.
    </h1>

    <div v-else-if="!loading && packages.length === 0" class="flex flex-col items-center justify-center h-full">
      <h1 class="text-center text-[#152123] text-[30px] font-bold">
        선택하신 일정은 <br> '맞춤 여행 견적 신청'을 이용해 보세요. 
      </h1>
      <router-link to="/create-quotation">
        <p class="text-[#0EC0CB] text-[20px] font-normal flex items-center justify-center mt-7">
          맞춤 여행 견적 신청하러 바로가기
          <img src="@/assets/icons/nextClick.svg" alt="" class="ml-2" />
        </p>
      </router-link>
    </div>

    <!-- Package list -->
    <div v-if="!loading && packages.length > 0"
      class="grid md:w-[840px] grid-cols-2 gap-4 lg:grid-cols-3 lg:p-0 p-2 mx-auto">
      <div v-for="(pkg, index) in packages" :key="pkg.id"
        class="border border-[#E6E6E6] rounded-xl overflow-hidden cursor-pointer" @click="handleImageClick(pkg.id)">
        <img :src="pkg.image" :alt="pkg.name" class="lg:w-[270px] h-[160px] object-cover lg:h-[200px] w-full" />
        <div class="p-4 lg:w-[270px] h-[143px]">
          <h2 class="text-lg font-medium text-textmain text-center lg:w-[238px] mx-auto truncate">
            {{ pkg.name }}
          </h2>
          <p
            class="text-sm text-center text-textsub lg:w-[238px] lg:h-[44px] h-[56px] overflow-hidden text-ellipsis two-line-ellipsis">
            {{ pkg.detail }}
          </p>
          <p
            class="mt-2 text-sub text-sm font-normal lg:text-xl lg:font-bold leading-[20.27px] tracking-[-0.01em] text-center lg:w-[238px] truncate">
            1인당 약 {{ pkg.price.toLocaleString() }}원 ~
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import packageService from "@/services/easy-quote.service.js";
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import moment from 'moment';

const emit = defineEmits(['updateVisibility']);
const packages = ref([]);
const loading = ref(true); 
const packageStore = useEasyQuotationStore();
const page = ref(0);
const size = ref(1000000000);

const th_id = computed(() => packageStore.EasyQuotation.selectedThemes.map(theme => theme.th_id));
const totalCount = ref(0);

const loadPackage = async () => {
  try {
    const startDate = packageStore.EasyQuotation.startDate;
    const endDate = packageStore.EasyQuotation.endDate;
    const trip_days = moment(endDate).diff(moment(startDate), 'days') + 1;

    const themeIds = th_id.value.join(',');
    const data = await packageService.getPackageList(page.value, size.value, trip_days, themeIds);
    totalCount.value = data.count;

    packages.value = data.rows.map((pkg) => ({
      id: pkg.package_id,
      name: pkg.package_name,
      detail: pkg.package_detail,
      image: pkg.package_img,
      price: pkg.package_price,
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
  } finally {
    loading.value = false; 
  }
};

loadPackage();

const handleImageClick = (pkgId) => {
  const selectedPackage = packages.value.find((pkg) => pkg.id === pkgId);
  if (selectedPackage) {
    packageStore.setSelectedPackageId(selectedPackage.id);
    emit("updateVisibility", 4);
  }
};
</script>

