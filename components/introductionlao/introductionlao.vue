<template>
  <div>
    <div class="card rounded-lg py-10 lg:px-0 px-4">
      <div class="flex items-center justify-between lg:justify-center">
        <h1 class="text-start lg:text-center text-[#152123] lg:text-3xl text-lg font-bold my-5">
          라오스 관광지 소개
        </h1>
        <img src="@/assets/icons/add.svg" alt="" class="w-[24px] h-[24px] md:hidden">
      </div>

      <div class="tabs flex justify-center space-x-5 mb-6 md:mt-2">
        <button @click="fetchTourAttraction(1, 1)" :class="tabClass(1)">
          관광지
        </button>
        <button @click="fetchTourAttraction(3, 2)" :class="tabClass(2)">
          숙소
        </button>
        <button @click="fetchTourAttraction(5, 3)" :class="tabClass(3)">
          골프장
        </button>
      </div>
      <div class="grid grid-cols-2 gap-6 lg:grid-cols-3 ">
        <div v-for="(attraction, index) in store.attractions" :key="index" class="col-span-1">
          <div v-if="loading">
            <div class="skeleton w-full h-48"></div>
            <div class="skeleton h-5 w-full my-2"></div>
          </div>
          <div v-else class="card w-full md:h-[343px] h-[232px] border border-[#C0C0C0] cursor-pointer hover:shadow"
            @click="openModal(attraction.laid)">
            <figure>
        <img
          :src="attraction.image_path"
          alt="관광지"
          class="w-full h-[280px] object-cover transition-transform duration-300 hover:scale-110"
        />
      </figure>
      <div class="p-4 h-[120px] lg:h-[50px]  flex flex-col justify-center items-center">
          <div class="flex items-center justify-between w-full">
            <p class="text-[#132D5C] font-medium text-base line-clamp-2 lg:line-clamp-1">
              {{ attraction.land_name }}
            </p>
            <img src="@/assets/icons/nextClick.svg" alt="" class="w-[20px] h-[20px]">
          </div>
          <p class="text-sm text-gray-500"></p>
        </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <button @click="introduction"
           class="mt-10 h-[40px] font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 md:px-[79px] md:py-[10.5px] rounded-full flex items-center justify-center hover:bg-[#F5F5F5]">
          더보기
        </button>
      </div>
    </div>

    <div v-if="isOpen">
      <div class="fixed inset-0 bg-[#00000080] z-40"></div>
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <ModalDetail v-if="selectedLaId != null" v-model:isOpen="isOpen" :laid="selectedLaId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTourStore } from "~/stores/tour.store";
import ModalDetail from "~/components/utils/detailintroduction.vue";
import { useRouter } from "vue-router";

const tab = ref(1);
const store = useTourStore();
const router = useRouter();
const selectedLaId = ref(null);
const isOpen = ref(false);
const loading = ref(true);
const openModal = (laid) => {
  selectedLaId.value = laid;
  isOpen.value = true;
};

const tabClass = (tabIndex) => {
  return tab.value === tabIndex
    ? "text-[#6EBC30] border-b-2 border-[#6EBC30] text-base font-medium md:text-xl md:font-bold w-[60px] md:w-[112px]"
    : "text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light w-[60px] md:w-[112px]";
};

const page = ref(0);
const size = ref(6);
const defaultAtId = ref(1);
const fetchTourAttraction = async (tourAttractionId, tb) => {
  tab.value = tb;
  if (tourAttractionId !== defaultAtId.value) {
    page.value = 0;
    size.value = 6;
  }
  defaultAtId.value = tourAttractionId;
  const params = {
    at_id: defaultAtId.value,
    page: page.value,
    size: size.value,
  };

  try {
    loading.value = true;
    await store.getTourAttraction(params);
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

fetchTourAttraction(defaultAtId.value, 1);

const introduction = async() => {
store.tourTypeSelected = tab.value;
 await router.push("/introduction");
};
</script>

<style scoped>
.card {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
