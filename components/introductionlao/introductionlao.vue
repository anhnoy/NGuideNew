<template>
  <div>
    <div class="card rounded-lg py-10 px-5">
      <div class="flex items-center justify-between lg:justify-center">
        <h1 class="text-start lg:text-center text-[#152123] lg:text-3xl text-lg font-bold my-5">
          라오스 관광지 소개
        </h1>
        <span class="mdi mdi-plus md:hidden text-4xl text-[#132D5C]"></span>
      </div>

      <div class="tabs flex justify-center space-x-20 mb-6 mt-2">
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
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <div v-for="(attraction, index) in store.attractions" :key="index" class="col-span-1">
          <div v-if="loading">
            <div class="skeleton w-full h-48"></div>
            <div class="skeleton h-5 w-full my-2"></div>
          </div>
          <div v-else class="card w-full h-56 border border-[#C0C0C0]">
            <figure>
              <img :src="attraction.image_path" alt="관광지" class="w-full h-56 object-cover" />
            </figure>
            <div class="p-4 cursor-pointer" @click="openModal(attraction.laid)">
              <div class="flex items-center justify-between">
                <p class="text-[#132D5C] font-medium text-base truncate">
                  {{ attraction.land_name }}
                </p>
                <span class="mdi mdi-chevron-right text-[#6592E2] text-2xl"></span>
              </div>
              <p class="text-sm text-gray-500"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <button @click="introduction"
          class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full">
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
    ? "text-[#6EBC30] border-b-2 border-[#6EBC30]  text-base font-medium lg:text-xl lg:font-light"
    : "text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light";
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
    }, 3000);
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

fetchTourAttraction(defaultAtId.value, 1);

const introduction = () => {
  router.push("/introduction");
};
</script>

<style scoped>
.card {
  max-width: 1300px;
  margin: 0 auto;
}
</style>
