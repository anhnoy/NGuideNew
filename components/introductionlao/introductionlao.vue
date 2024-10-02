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
      <button @click="tab = 1" :class="tabClass(1)">관광지</button>
      <button @click="tab = 2" :class="tabClass(2)">숙소</button>
      <button @click="tab = 3" :class="tabClass(3)">골프장</button>
    </div>

    <!-- Tab Content for 관광지 -->
    <div v-if="tab === 1">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <div
          v-for="(attraction, index) in visibleAttractions"
          :key="index"
          class="col-span-1"
        >
          <div class="card w-full border border-[#C0C0C0]">
            <figure>
              <img
                src="@/assets/images/kuangsi.jpg"
                alt="관광지"
                class="w-full h-48 object-cover"
              />
            </figure>
            <div class="p-4 cursor-pointer" @click="openModal">
              <div class="flex items-center justify-between">
                <p class="text-[#132D5C] font-medium text-base">
                  {{ attraction.at.at_name_kr }}
                </p>
                <span
                  class="mdi mdi-chevron-right text-[#6592E2] text-2xl"
                ></span>
              </div>
              <p class="text-sm text-gray-500"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button
          v-if="
            attractions.length > 0 &&
            attractions.length > visibleAttractions.length
          "
          @click="showMore('attractions')"
          class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
        >
          더보기
        </button>
      </div>
    </div>

    <!-- Tab Content for 숙소 -->
    <div v-if="tab === 2">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <div
          v-for="(stay, index) in visibleStays"
          :key="index"
          class="col-span-1"
        >
          <div class="card w-full border border-[#C0C0C0]">
            <figure>
              <img
                src="@/assets/images/sakula.jpg"
                alt="숙소"
                class="w-full h-48 object-cover"
              />
            </figure>
            <div class="p-4 cursor-pointer" @click="openModal">
              <div class="flex items-center justify-between">
                <p class="text-[#132D5C] font-medium text-base">
                  {{ stay.at.at_name_kr }}
                </p>
                <span
                  class="mdi mdi-chevron-right text-[#6592E2] text-2xl"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button
          v-if="stays.length > 0 && stays.length > visibleStays.length"
          @click="showMore('stays')"
          class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
        >
          더보기
        </button>
      </div>
    </div>

    <!-- Tab Content for 골프장 -->
    <div v-if="tab === 3">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <div
          v-for="(golf, index) in visibleGolfs"
          :key="index"
          class="col-span-1"
        >
          <div class="card w-full border border-[#C0C0C0]">
            <figure>
              <img
                src="@/assets/images/thatluang.jpg"
                alt="골프장"
                class="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </figure>
            <div class="p-4 cursor-pointer" @click="openModal">
              <div class="flex items-center justify-between">
                <p class="text-[#132D5C] font-medium text-base">
                  {{ golf.at.at_name_kr }}
                </p>
                <span
                  class="mdi mdi-chevron-right text-[#6592E2] text-2xl"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button
          v-if="golfs.length > 0 && golfs.length > visibleGolfs.length"
          @click="showMore('golfs')"
          class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
        >
          더보기
        </button>
      </div>
    </div>
  </div>
  <ModalDetail
    ref="modalDetail"
    :at_id="selectedAtId"
    :city_id="selectedCityId"
  />
</template>

<script setup>
import { useTourStore } from "~/stores/tour.store";
import ModalDetail from "@/components/modals/detailintroduction.vue";

const tab = ref(1);
const store = useTourStore();

const attractions = ref([]);
const stays = ref([]);
const golfs = ref([]);

const visibleAttractions = ref([]);
const visibleStays = ref([]);
const visibleGolfs = ref([]);

const selectedAtId = ref(null);
const selectedCityId = ref(null);

const modalDetail = ref();
const openModal = () => {
  modalDetail.value?.openModal();
};

const tabClass = (tabIndex) => {
  return tab.value === tabIndex
    ? "text-[#FF9900] border-b-2 border-[#FF9900] text-base font-medium lg:text-xl lg:font-light"
    : "text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light";
};

const showMore = (category) => {
  const currentVisible =
    category === "attractions"
      ? visibleAttractions.value.length
      : category === "stays"
      ? visibleStays.value.length
      : category === "golfs"
      ? visibleGolfs.value.length
      : 0;

  const allItems =
    category === "attractions"
      ? attractions.value
      : category === "stays"
      ? stays.value
      : category === "golfs"
      ? golfs.value
      : [];

  if (category === "attractions") {
    visibleAttractions.value = allItems.slice(
      0,
      Math.min(allItems.length, currentVisible + 6)
    );
  } else if (category === "stays") {
    visibleStays.value = allItems.slice(
      0,
      Math.min(allItems.length, currentVisible + 6)
    );
  } else if (category === "golfs") {
    visibleGolfs.value = allItems.slice(
      0,
      Math.min(allItems.length, currentVisible + 6)
    );
  } else {
    console.warn("Unknown category:", category);
  }
};

const fetchTourAttraction = async () => {
  const tourAttractionId = 1;
  const tourAttractionCityId = 4;
  try {
    await store.getTourAttraction(tourAttractionId, tourAttractionCityId);
    attractions.value = store.attractions;
    visibleAttractions.value = attractions.value.slice(0, 6);
  } catch (error) {
    console.log(error);
  }
};

const fetchTourStay = async () => {
  const tourStayId = 3;
  const tourStayCityId = 4;
  try {
    await store.getTourStay(tourStayId, tourStayCityId);
    stays.value = store.stays;
    visibleStays.value = stays.value.slice(0, 6);
  } catch (error) {
    console.log(error);
  }
};

const fetchTourGolf = async () => {
  const tourGolfId = 5;
  const tourGolfCityId = 4;
  try {
    await store.getTourGolf(tourGolfId, tourGolfCityId);
    golfs.value = store.golfs;
    visibleGolfs.value = golfs.value.slice(0, 6);
  } catch (error) {
    console.log(error);
  }
};

fetchTourAttraction();
fetchTourStay();
fetchTourGolf();
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
