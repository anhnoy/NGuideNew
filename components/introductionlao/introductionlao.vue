<template>
  <div class="card rounded-lg p-6">
    <!-- Tabs Section -->
    <div class="flex items-center justify-between lg:justify-center">
      <h1
        class="text-start lg:text-center text-[#152123] lg:text-3xl text-lg font-bold my-5"
      >
        라오스 관광지 소개
      </h1>
      <span class="mdi mdi-plus md:hidden text-4xl text-[#132D5C]"></span>
    </div>

    <div class="tabs flex justify-center space-x-11 mb-6 mt-2">
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
    <Attraction v-on:open-model="openModal" />

    <div class="flex justify-center items-center">
      <button
        @click="loadMore"
        class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
      >
        더보기
      </button>
    </div>
  </div>

  <ModalDetail
    v-if="selectedLaId != null"
    v-model:isOpen="isOpen"
    :laid="selectedLaId"
  />
</template>

<script setup>
import { useTourStore } from "~/stores/tour.store";
import ModalDetail from "@/components/modals/detailintroduction.vue";
import Attraction from "./attraction.vue";

const tab = ref(1);
const store = useTourStore();

const selectedLaId = ref(null);
const isOpen = ref(false);

const openModal = (laid) => {
  selectedLaId.value = laid;
  isOpen.value = true;
};

const tabClass = (tabIndex) => {
  return tab.value === tabIndex
    ? "text-[#FF9900] border-b-2 border-[#FF9900] text-base font-medium lg:text-xl lg:font-light"
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
    store.resetAttractions();
  }
  defaultAtId.value = tourAttractionId;
  const params = {
    at_id: defaultAtId.value,
    page: page.value,
    size: size.value,
  };
  try {
    const resp = await store.getTourAttraction(params);
  } catch (error) {
    console.log(error);
  }
};

fetchTourAttraction(defaultAtId.value, 1);

const loadMore = async () => {
  try {
    size.value = size.value + 6;
    const params = {
      at_id: defaultAtId.value,
      page: page.value,
      size: size.value,
    };
    await store.getTourAttraction(params);
  } catch (error) {
    console.error("Error loading more data:", error);
  }
};
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
