<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <div class="card min-h-screen">
        <div class="hidden lg:flex items-center space-x-2">
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
          class="tabs flex justify-center space-x-4 mb-6 mt-2 lg:border-b lg:border-[#C0C0C0]"
        >
          <button
            @click="tab = 1"
            :class="{
              'text-[#FF9900] border-b-2 border-[#FF9900] text-base font-medium lg:text-xl lg:font-light':
                tab === 1,
              'text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light ':
                tab !== 1,
            }"
            class="tab tab-bordered"
          >
            관광지
          </button>
          <button
            @click="tab = 2"
            :class="{
              'text-[#FF9900] border-b-2 border-[#FF9900] text-base font-medium lg:text-xl lg:font-light':
                tab === 2,
              'text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light':
                tab !== 2,
            }"
            class="tab tab-bordered"
          >
            숙소
          </button>
          <button
            @click="tab = 3"
            :class="{
              'text-[#ff9900] border-b-2 border-[#ff9900] text-base font-medium lg:text-xl lg:font-light':
                tab === 3,
              'text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light':
                tab !== 3,
            }"
            class="tab tab-bordered"
          >
            골프장
          </button>
        </div>

        <div class="flex items-center justify-center space-x-4 mx-4 mb-7 lg:mb-7 lg:mt-4">
          <button
            @click="activeButton = 1"
            :class="{
              'bg-[#6592E2]': activeButton === 1,
              'bg-[#8E8D8D]': activeButton !== 1,
            }"
            class="text-[#ffffff] text-sm font-medium lg:text-base rounded-full lg:w-48 lg:h-12 w-24 h-10"
          >
          비엔티엔
          </button>
          <button
            @click="activeButton = 2"
            :class="{
              'bg-[#6592E2]': activeButton === 2,
              'bg-[#8E8D8D]': activeButton !== 2,
            }"
            class="text-[#ffffff] text-sm font-medium lg:text-base rounded-full lg:w-48 lg:h-12 w-24 h-10"
          >
          방비엔
          </button>
          <button
            @click="activeButton = 3"
            :class="{
              'bg-[#6592E2]': activeButton === 3,
              'bg-[#8E8D8D]': activeButton !== 3,
            }"
            class="text-[#ffffff] text-sm font-medium lg:text-base rounded-full lg:w-48 lg:h-12 w-24 h-10"
          >
          루앙프라방
          </button>
        </div>

        <!-- Tab Content for 관광지 -->
        <div v-if="tab === 1">
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2 px-5">
            <div
              v-for="(i, index) in visibleItems"
              :key="index"
              class="col-span-1"
            >
              <div class="w-full border border-[#C0C0C0] rounded-2xl">
                <figure>
                  <img
                    src="@/assets/images/banner4.jpeg"
                    alt="관광지"
                    class="w-full h-48 object-cover"
                  />
                </figure>
                <div class="p-4">
                  <div class="flex items-center justify-between">
                    <p class="text-[#132D5C] font-medium text-base">
                      지역명지역명
                    </p>
                    <span
                      class="mdi mdi-chevron-right text-[#6592E2] text-2xl"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Always show the "더보기" button -->
          <div class="flex justify-center  items-center mt-8">
            <button
              v-if="items.length > visibleItems.length"
              @click="showMore"
              class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
            >
              더보기
            </button>
          </div>
        </div>

        <!-- Tab Content for 숙소 -->
        <div v-if="tab === 2">
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2 px-5">
            <div
              v-for="(i, index) in visibleItems"
              :key="index"
              class="col-span-1"
            >
              <div class="w-full border border-[#C0C0C0] rounded-2xl">
                <figure>
                  <img
                    src="@/assets/images/sakula.jpg"
                    alt="숙소"
                    class="w-full h-48 object-cover"
                  />
                </figure>
                <div class="p-4">
                  <div class="flex items-center justify-between">
                    <p class="text-[#132D5C] font-medium text-base">
                      지역명지역명
                    </p>
                    <span
                      class="mdi mdi-chevron-right text-[#6592E2] text-2xl"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center mt-8">
            <button
              v-if="items.length > visibleItems.length"
              @click="showMore"
              class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full"
            >
              더보기
            </button>
          </div>
        </div>

        <!-- Tab Content for 골프장 -->
        <div v-if="tab === 3">
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2 px-5">
            <div
              v-for="(i, index) in visibleItems"
              :key="index"
              class="col-span-1"
            >
              <div class="rounded-2xl w-full border border-[#C0C0C0]">
                <figure>
                  <img
                    src="@/assets/images/banner1.avif"
                    alt="골프장"
                    class="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </figure>
                <div class="p-4">
                  <div class="flex items-center justify-between">
                    <p class="text-[#132D5C] font-medium text-base">
                      지역명지역명
                    </p>
                    <span
                      class="mdi mdi-chevron-right text-[#6592E2] text-2xl"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center my-8">
            <button
              v-if="items.length > visibleItems.length"
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
</template>

<script setup>
import Navbar from "~/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";

const tab = ref(1);

const activeButton = ref(1);
const items = ref(Array(9).fill(null));

const isMobile = ref(false);

const visibleItems = ref([]);

const showMore = () => {
  const currentLength = visibleItems.value.length;
  const newLength = Math.min(items.value.length, currentLength + 6);
  visibleItems.value = items.value.slice(0, newLength);
};

const updateViewport = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 640;
    visibleItems.value = isMobile.value
      ? items.value.slice(0, 4)
      : items.value.slice(0, 6);
  }
};

onMounted(() => {
  updateViewport();
  window.addEventListener("resize", updateViewport);
});
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 50px auto 0;
}
</style>
