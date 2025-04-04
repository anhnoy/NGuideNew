<template>
  <div class="flex flex-col min-h-screen">
    <kakao />
    <Navbar :fetchFilterCity="fetchFilterCity" />
    <main class="flex-1">
      <div class="mb-10 mx-auto card">
        <div class="hidden md:flex items-center space-x-2 mt-14">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span></router-link>
          <span class="text-[#152123] text-sm font-normal">관광지 소개</span>
        </div>
      </div>

      <div class="card">
        <div class="mb-16">
          <div class="hidden md:flex items-center justify-between md:justify-center">
            <h1 class="text-start md:text-center text-[#152123] md:text-3xl text-lg font-bold my-5">
              관광지 소개
            </h1>
          </div>

          <div class="tabs flex justify-center space-x-10 mb-6 md:mt-2 mt-6 md:border-b md:border-[#C0C0C0]">
            <button @click="fetchFilterCity(1, 1)" :class="tabClass(1)">
              관광지
            </button>
            <button @click="fetchFilterCity(3, 2)" :class="tabClass(2)">
              숙소
            </button>
            <button @click="fetchFilterCity(5, 3)" :class="tabClass(3)">
              골프장
            </button>
          </div>

          <div class="flex items-center justify-center space-x-4 mx-4 mb-7 md:mb-7 md:mt-4">
            <button @click="reloadByCity(4)" :class="{
              'bg-[#0EC0CB]': cityId === 4,
              'bg-[#A8A3A3]': cityId !== 4,
            }"
              class="text-[#ffffff] text-sm font-medium md:text-base rounded-full md:w-[200px] md:h-[50px] w-[100px] h-[40px]">
              비엔티엔
            </button>
            <button @click="reloadByCity(5)" :class="{
              'bg-[#0EC0CB]': cityId === 5,
              'bg-[#A8A3A3]': cityId !== 5,
            }"
              class="text-[#ffffff] text-sm font-medium md:text-base rounded-full md:w-[200px] md:h-[50px] w-[100px] h-[40px]">
              방비엥
            </button>
            <button @click="reloadByCity(6)" :class="{
              'bg-[#0EC0CB]': cityId === 6,
              'bg-[#A8A3A3]': cityId !== 6,
            }"
              class="text-[#ffffff] text-sm font-medium md:text-base rounded-full md:w-[200px] md:h-[50px] w-[100px] h-[40px]">
              루앙프라방
            </button>
          </div>

          <div class="grid grid-cols-2 gap-6 md:grid-cols-3 md:grid-rows-2 px-5 md:px-0">
            <div v-for="(filter, index) in store.filterCity" :key="index" class="col-span-1">
              <div v-if="loading">
                <div class="skeleton w-full h-48"></div>
                <div class="skeleton h-5 w-full my-2"></div>
              </div>
              <div v-else @click="openModal(filter.laid)"
                class="card w-full md:h-[343px] h-[232px] border border-[#C0C0C0] cursor-pointer">
                <figure>
                  <img :src="filter.image_path" alt="관광지" class="w-full h-[280px] object-cover transition-transform duration-300 hover:scale-110" />
                </figure>
                <div class="p-4 h-[120px] lg:h-[50px] flex flex-col justify-center items-center">
                <div class="flex items-center justify-between w-full">
                  <p class="text-[#132D5C] font-medium text-base line-clamp-2 lg:line-clamp-1">
                    {{ filter.land_name }}
                  </p>
                  <img src="@/assets/icons/nextClick.svg" alt="" class="w-[20px] h-[20px]">
                </div>
                  <p class="text-sm text-gray-500"></p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="store.filterCity.length === 0" class="flex justify-center items-center">
            <p class="text-[#5E5F61] text-lg font-medium">준비된 관광지가 없습니다.</p>
          </div>
          <div v-if="showLoadMore" class="flex justify-center items-center m-8">
            <button @click="showMore"
              class="mt-4 font-light text-sm md:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 md:px-[79px] md:py-[10.5px]  rounded-full">
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
      <DetailIntroduction v-if="selectedLaId != null" v-model:isOpen="isOpen" :laid="selectedLaId" />
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import DetailIntroduction from "~/components/utils/detailintroduction.vue";
import { useTourStore } from "~/stores/tour.store";
import kakao from "@/components/kakao/buttonKAKAO.vue";



useHead({
  title: 'autontour', // Optional, you can set a custom title for the introduction page
  meta: [
    {
      name: 'naver-site-verification',
      content: '8eaa0adf55c96d5b0b83954be26d188fa8aa6866',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'description',
      content: '라오스 주요 관광지 소개! 비엔티안, 루앙프라방, 방비엥 등 라오스에서 꼭 가봐야 할 명소를 만나보세요.',
    },
    {name: 'robots', content: 'index, follow'},
    // Open Graph Meta Tags 
    { property: 'og:title', content: '라오스 관광지 소개 | 비엔티안, 루앙프라방, 방비엥 명소 총정리' },
    { property: 'og:description', content: '라오스의 아름다운 관광지를 한눈에! 비엔티안, 루앙프라방, 방비엥 등 필수 여행지를 확인해보세요.' },
    { property: 'og:image', content: 'https://autontour.com/assets/images/AutonTour_logo.png' }, // Replace with your image URL
    { property: 'og:url', content: 'https://autontour.com/introduction' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: "canonical", href: "https://autontour.com/introduction" } // Avoid duplicate content issues
  ]
});

const props = defineProps(["fetchFilterCity"]);
const store = useTourStore();
const tab = ref(1);
const page = ref(0);
const size = ref(9);
const AtId = ref(1);
const cityId = ref(4);

const selectedLaId = ref(null);
const isOpen = ref(false);
const loading = ref(true);

const openModal = (laid) => {
  selectedLaId.value = laid;
  isOpen.value = true;
};

const filterCity = ref([]);


const reloadByCity = async (cid) => {
  cityId.value = cid;
  page.value = 0;
  size.value = 9;
  filterCity.value = [];
  const params = {
    at_id: AtId.value,
    city_id: cityId.value,
    page: page.value,
    size: size.value,
  };
  try {
    const response = await store.getFilterCity(params);
    if (response && response.data) {
      if (response.data.resp && response.data.resp.length > 0) {
        filterCity.value = response.data.resp;
      } else {
        filterCity.value = [];
      }
    }
  } catch (error) {
    console.error("Error fetching filter city:", error);
  }
};

const tabClass = (tabIndex) => {
  return tab.value === tabIndex
    ? "text-[#6EBC30] border-b-2 border-[#6EBC30] text-base font-medium md:text-xl md:font-bold md:w-[112px] w-[60px]"
    : "text-[#5E5F61] text-base font-medium lg:text-xl lg:font-light md:w-[112px] w-[60px]";
};
const fetchFilterCity = async (tourFilterId, tabs) => {
  tab.value = tabs;
  filterCity.value = [];
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
    loading.value = true;
    const response = await store.getFilterCity(params);
    if (response && response.data) {
      filterCity.value = response.data.resp;
    }
    else {

      filterCity.value = [];
    }
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } catch (error) {
    console.error("Error fetching filter city:", error);
  }
};



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
  return store.totalCity > size.value;
});

const updateSize = async () => {
  const newSize = (typeof window !== 'undefined' && window.innerWidth < 768) ? 8 : 9;

  if (newSize !== size.value) {
    size.value = newSize;
    page.value = 0;
    await fetchFilterCity(AtId.value, tab.value);
  }
};
onMounted(() => {
  const tourTypeSelected = store.tourTypeSelected;
  tab.value = tourTypeSelected;
  if(tourTypeSelected === 1) {
    fetchFilterCity(1, 1);
  } else if(tourTypeSelected === 2) {
    fetchFilterCity(3, 2);
  } else if(tourTypeSelected === 3) {
    fetchFilterCity(5, 3);
  }
  updateSize();
  window.addEventListener("resize", updateSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSize);
});

</script>

<style scoped>
.card {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
