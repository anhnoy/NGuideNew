<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <div class="card">
        <div class="mb-10">
        <div class="hidden lg:flex items-center space-x-2 mt-14">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span
          ></router-link>
          <span class="text-[#152123] text-sm font-normal">관광지 소개</span>
        </div>

        <div
          class="hidden lg:flex items-center justify-between lg:justify-center"
        >
          <h1
            class="text-start lg:text-center text-[#152123] lg:text-3xl text-lg font-bold my-5"
          >
            라오스 관광지 소개
          </h1>
        </div>

        <div
          class="tabs flex justify-center space-x-11 mb-6 mt-2 lg:border-b lg:border-[#C0C0C0]"
        >
          <button @click="fetchFilterCity(1, 1)" :class="tabClass(1)">
            관광지
          </button>
          <button @click="fetchFilterCity(3, 2)" :class="tabClass(2)">
            숙소
          </button>
          <button @click="fetchFilterCity(4, 3)" :class="tabClass(3)">
            골프장
          </button>
        </div>

        <div
          class="flex items-center justify-center space-x-4 mx-4 mb-7 lg:mb-7 lg:mt-4"
        >
          <button
            @click="reloadByCity(4)"
            :class="{
              'bg-[#6592E2]': cityId === 4,
              'bg-[#8E8D8D]': cityId !== 4,
            }"
            class="text-[#ffffff] text-sm font-medium lg:text-base rounded-full lg:w-48 lg:h-12 w-24 h-10"
          >
            비엔티엔
          </button>
          <button
            @click="reloadByCity(5)"
            :class="{
              'bg-[#6592E2]': cityId === 5,
              'bg-[#8E8D8D]': cityId !== 5,
            }"
            class="text-[#ffffff] text-sm font-medium lg:text-base rounded-full lg:w-48 lg:h-12 w-24 h-10"
          >
            방비엔
          </button>
          <button
            @click="reloadByCity(6)"
            :class="{
              'bg-[#6592E2]': cityId === 6,
              'bg-[#8E8D8D]': cityId !== 6,
            }"
            class="text-[#ffffff] text-sm font-medium lg:text-base rounded-full lg:w-48 lg:h-12 w-24 h-10"
          >
            루앙프라방
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2 px-5">
          <div
            v-for="(filter, index) in store.filterCity"
            :key="index"
            class="col-span-1"
          >
            <div class="card w-full h-60 border border-[#C0C0C0] rounded-2xl">
              <figure>
                <img
                  :src="filter.image_path"
                  alt="관광지"
                  class="w-full h-56 object-cover"
                />
              </figure>
              <div class="p-4" @click="openModal(filter.laid)">
                <div class="flex items-center justify-between cursor-pointer">
                  <p class="text-[#132D5C] font-medium text-base truncate">
                    {{ filter.land_name }}
                  </p>
                  <span
                    class="mdi mdi-chevron-right text-[#6592E2] text-2xl"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showLoadMore" class="flex justify-center items-center m-8">
          <button
            @click="showMore"
            class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
          >
            더보기
          </button>
        </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
  <div v-if="isOpen">
    <div class="fixed inset-0 bg-[#00000080] z-40"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <DetailIntroduction
        v-if="selectedLaId != null"
        v-model:isOpen="isOpen"
        :laid="selectedLaId"
      />
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import DetailIntroduction from "~/components/modals/detailintroduction.vue";
import { useTourStore } from "~/stores/tour.store";

const store = useTourStore();

const tab = ref(1);

const page = ref(0);
const size = ref(9);
const AtId = ref(1);
const cityId = ref(4);

const selectedLaId = ref(null);
const isOpen = ref(false);

const openModal = (laid) => {
  selectedLaId.value = laid;
  isOpen.value = true;
};

const filterCity = ref([]);

const reloadByCity = async (cid) => {
  cityId.value = cid;
  page.value = 0;
  size.value = 9;
  const params = {
    at_id: AtId.value,
    city_id: cityId.value,
    page: page.value,
    size: size.value,
  };
  await store.getFilterCity(params);
};

const tabClass = (tabIndex) => {
  return tab.value === tabIndex
    ? "text-[#FF9900] border-b-2 border-[#FF9900] text-base font-medium lg:text-xl lg:font-light"
    : "text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light";
};

const fetchFilterCity = async (tourFilterId, tabs) => {
  tab.value = tabs;
  if (tourFilterId !== AtId.value) {
    page.value = 0;
    size.value = 9;
  }
  AtId.value = tourFilterId;
  const params = {
    at_id: AtId.value,
    city_id: cityId.value,
    page: page.value,
    size: size.value,
  };
  try {
    const response = await store.getFilterCity(params);
    if (response && response.data) {
      filterCity.value = response.data.resp;
    }
  } catch (error) {
    console.error("Error fetching filter city:", error);
  }
};

fetchFilterCity(AtId.value, 1);

const showMore = async () => {
  try {
    size.value += 9;
    const params = {
      at_id: AtId.value,
      city_id: cityId.value,
      page: page.value,
      size: size.value,
    };
    const response = await store.getFilterCity(params);
    if (response && response.data) {
      filterCity.value.push(...response.data.resp);
    }
  } catch (error) {
    console.error("Error loading more data:", error);
  }
};
const showLoadMore = computed(() => {
  return store.filterCity.length >= size.value;
});
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
