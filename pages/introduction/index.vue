<template>
  <div class="flex flex-col min-h-screen">
    <kakao />
    <Navbar :fetchFilterCity="fetchFilterCity" />
    <main class="flex-1">
      <div class="mx-auto mb-10 card">
        <div class="items-center hidden space-x-2 md:flex mt-14">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
            <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span
          ></router-link>
          <span class="text-[#152123] text-sm font-normal">관광지 소개</span>
        </div>
      </div>

      <div class="card">
        <div class="mb-16">
          <div
            class="items-center justify-between hidden md:flex md:justify-center"
          >
            <h1
              class="text-start md:text-center text-[#152123] md:text-3xl text-lg font-bold my-8"
            >
              관광지 소개
            </h1>
          </div>

          <div
            class="tabs flex justify-center mb-6 md:mt-2 mt-6 md:border-b md:border-[#C0C0C0] space-x-5 lg:space-x-[150px]"
          >
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

          <div
            ref="dropdownContainer"
            class="flex items-center justify-center mx-auto mb-7 w-[360px] sm:w-auto space-x-1 sm:space-x-8 px-4"
          >
            <div class="flex ml-2 w-[262px] gap-0 sm:gap-[16px] items-center">
              <label
                class="text-base font-medium text-[#152123] text-[14px] sm:text-[16px]"
              >
                국가
              </label>

              <div class="relative ml-2">
                <!-- Trigger Button -->
                <button
                  @click="isDropdownOpen = !isDropdownOpen"
                  class="md:w-[200px] w-[120px] h-[36px] md:h-[42px] px-2 py-3 border border-[#E6E6E6] bg-white text-left text-[#8E8D8D] flex items-center justify-between rounded-[4px]"
                >
                  <span
                    :class="
                      selectedCountryLabel ? 'text-[#152123]' : 'text-[#8E8D8D]'
                    "
                  >
                    {{ selectedCountryLabel || "국가를 선택해 주세요." }}
                  </span>
                  <img
                    :src="isDropdownOpen ? chevronUp : chevronDown"
                    alt="Chevron Icon"
                    class="w-6 h-6 md:w-7 md:h-7"
                  />
                </button>

                <!-- Dropdown List -->
                <div
                  v-if="isDropdownOpen"
                  class="absolute mt-1 bg-white border border-[#E6E6E6] shadow-lg z-10 overflow-auto md:w-[200px] w-[120px] max-h-[300px] rounded-[4px]"
                >
                  <ul class="divide-y divide-gray-100 text-[#8E8D8D]">
                    <li
                      v-for="country in countries"
                      :key="country.cid"
                      @click="selectCountry(country)"
                      class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      :class="{
                        'bg-gray-100 font-medium':
                          selectedCountry === country.cid,
                      }"
                    >
                      {{ country.c_name_kr }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex w-[262px] gap-0 sm:gap-[16px] items-center">
              <label
                class="text-base font-medium text-[#152123] text-[14px] sm:text-[16px]"
              >
                도시
              </label>

              <!-- City Dropdown -->
              <div class="relative ml-2">
                <button
                  @click="isCityDropdownOpen = !isCityDropdownOpen"
                  class="md:w-[200px] w-[120px] h-[36px] md:h-[42px] px-2 py-3 border border-[#E6E6E6] bg-white text-left text-[#8E8D8D] flex items-center justify-between rounded-[4px]"
                >
                  <span
                    :class="
                      selectedCityLabel ? 'text-[#152123]' : 'text-[#8E8D8D]'
                    "
                  >
                    {{ selectedCityLabel || "비엔티안" }}
                  </span>
                  <img
                    :src="isCityDropdownOpen ? chevronUp : chevronDown"
                    alt="Chevron Icon"
                    class="w-6 h-6 md:w-7 md:h-7"
                  />
                </button>

                <!-- City List -->
                <div
                  v-if="isCityDropdownOpen"
                  class="absolute mt-1 bg-white border border-[#E6E6E6] shadow-lg z-10 overflow-auto md:w-[200px] w-[120px] max-h-[300px] rounded-[4px]"
                >
                  <ul class="divide-y divide-gray-100 text-[#8E8D8D]">
                    <li
                      v-for="city in filteredCities"
                      :key="city.id"
                      @click="selectCity(city)"
                      class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      :class="{
                        'bg-gray-100 font-medium': selectedCity === city.id,
                      }"
                    >
                      {{ city.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-2 gap-6 px-5 md:grid-cols-3 md:grid-rows-2 md:px-0"
          >
            <div
              v-for="(filter, index) in store.filterCity"
              :key="index"
              class="col-span-1"
            >
              <div v-if="loading">
                <div class="w-full h-48 skeleton"></div>
                <div class="w-full h-5 my-2 skeleton"></div>
              </div>
              <div
                v-else
                @click="openModal(filter.laid)"
                class="card md:h-[340px] h-[209px] border border-[#C0C0C0] cursor-pointer md:w-[384px] w-[160px]"
              >
                <figure>
                  <img
                    :src="filter.image_path"
                    alt="관광지"
                    class="w-full lg:h-[280px] object-cover transition-transform duration-300 hover:scale-110 md:min-w-[384px] min-w-[160px] h-[160px]"
                  />
                </figure>
                <div
                  class="p-2 h-[60px] lg:h-[50px] flex flex-col justify-center items-center"
                >
                  <div class="flex items-center justify-between w-full">
                    <p
                      class="text-[#2F312A] font-medium text-sm lg:text-base line-clamp-2 lg:line-clamp-1"
                    >
                      {{ filter.land_name }}
                    </p>
                    <img
                      src="@/assets/icons/nextClick.svg"
                      alt=""
                      class="w-[20px] h-[20px]"
                    />
                  </div>
                  <p class="text-sm text-gray-500"></p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="store.filterCity.length === 0"
            class="flex items-center justify-center"
          >
            <p class="text-[#5E5F61] text-lg font-medium">
              준비된 관광지가 없습니다.
            </p>
          </div>
          <div v-if="showLoadMore" class="flex items-center justify-center m-8">
            <button
              @click="showMore"
              class="mt-4 font-light text-sm md:text-base border border-[#2F312A] text-[#2F312A] py-1 md:px-[70px] rounded-full md:w-[204px] md:h-[43px] w-[119px] h-[37px]"
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
import DetailIntroduction from "~/components/utils/detailintroduction.vue";
import { useTourStore } from "~/stores/tour.store";
import tourService from "~/services/tour.service";
import chevronUp from "@/assets/icons/chevron-up.png";
import chevronDown from "@/assets/icons/chevron-down.png";

useHead({
  // title: "autontour", // Optional, you can set a custom title for the introduction page
  // meta: [
  //   {
  //     name: "naver-site-verification",
  //     content: "8eaa0adf55c96d5b0b83954be26d188fa8aa6866",
  //   },
  //   {
  //     name: "viewport",
  //     content: "width=device-width, initial-scale=1",
  //   },
  //   {
  //     name: "description",
  //     content:
  //       "라오스 주요 관광지 소개! 비엔티안, 루앙프라방, 방비엥 등 라오스에서 꼭 가봐야 할 명소를 만나보세요.",
  //   },
  //   { name: "robots", content: "index, follow" },
  //   // Open Graph Meta Tags
  //   {
  //     property: "og:title",
  //     content: "라오스 관광지 소개 | 비엔티안, 루앙프라방, 방비엥 명소 총정리",
  //   },
  //   {
  //     property: "og:description",
  //     content:
  //       "라오스의 아름다운 관광지를 한눈에! 비엔티안, 루앙프라방, 방비엥 등 필수 여행지를 확인해보세요.",
  //   },
  //   {
  //     property: "og:image",
  //     content: "https://autontour.com/assets/images/AutonTour_logo.png",
  //   }, // Replace with your image URL
  //   { property: "og:url", content: "https://autontour.com/introduction" },
  //   { property: "og:type", content: "website" },
  // ],
  // link: [
  //   { rel: "canonical", href: "https://autontour.com/introduction" }, // Avoid duplicate content issues
  // ],
  title: "라오스·태국 주요 관광지 총정리 - 비엔티안부터 방콕까지!",
  meta: [
    {
      property: "og:title",
      content: "라오스·태국 주요 관광지 총정리 - 비엔티안부터 방콕까지!",
    },
    {
      property: "og:description",
      content:
        "비엔티안, 루앙프라방, 방비엥 등 라오스 여행 명소와 방콕, 파타야 등 태국 관광지를 한눈에! 여행 전 꼭 알아야 할 핵심 관광 정보 총정리.",
    },
    {
      property: "og:image",
      content: "https://autontour.com/assets/images/AutonTour_logo.png",
    },
    {
      property: "og:url",
      content: "https://autontour.com/introduction",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "description",
      content:
        "라오스 여행, 태국 여행을 준비 중이라면 주목! 비엔티안, 루앙프라방, 방비엥, 방콕, 파타야 등 핵심 관광지를 상세히 소개합니다.",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
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

const countries = ref([]);
const selectedCountry = ref(null);
const isDropdownOpen = ref(false);
const isCityDropdownOpen = ref(false);
const cities = ref([]);
const selectedCity = ref(null);
const dropdownContainer = ref(null);

const handleClickOutside = (event) => {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target)
  ) {
    isDropdownOpen.value = false;
    isCityDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
const filteredCities = computed(() =>
  cities.value.filter((city) => city.countryId === selectedCountry.value)
);

const fetchCities = async (cid) => {
  try {
    const response = await tourService.getCity(cid);
    if (response && response.data) {
      cities.value = response.data.map((city) => ({
        id: city.city_id,
        name: city.city_name_kr,
        countryId: city.cid,
      }));
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};
const selectCity = (city) => {
  selectedCity.value = city.id;
  isCityDropdownOpen.value = false;
};

const selectedCityLabel = computed(
  () => filteredCities.value.find((c) => c.id === selectedCity.value)?.name
);
watch(selectedCountry, async (newVal) => {
  if (newVal) {
    await fetchCities(newVal);
    const firstCity = filteredCities.value[0];
    if (firstCity) {
      selectedCity.value = firstCity.id;
    } else {
      selectedCity.value = null;
    }
  }
});
watch(selectedCity, (newVal) => {
  reloadByCity(newVal);
});

const reloadByCity = async (cid) => {
  const newSize =
    typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 9;
  cityId.value = cid;
  page.value = 0;
  size.value = newSize;
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
    ? "text-[#386333] border-b-2 border-[#386333] text-base font-medium md:text-xl md:font-bold md:w-[150px] w-[80px] min-w-[80px]"
    : "text-[#5E5F61] text-base font-medium lg:text-[20px] lg:font-normal md:w-[150px] w-[80px] min-w-[80px]";
};
const fetchFilterCity = async (tourFilterId, tabs) => {
  tab.value = tabs;
  filterCity.value = [];
  if (tourFilterId !== AtId.value) {
    page.value = 0;
    const newSize =
      typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 9;
    size.value = newSize;
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
    } else {
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
    const newSize =
      typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 9;
    size.value += newSize;
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

// const updateSize = async () => {
//   const newSize =
//     typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 9;
//   size.value = newSize;
// };

const fetchCountries = async () => {
  try {
    const response = await tourService.getCountry();
    if (response && response.data) {
      countries.value = response.data || [];
      if (countries.value.length > 0) {
        selectedCountry.value = countries.value[0].cid;
      }
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};
const selectCountry = (country) => {
  selectedCountry.value = country.cid;
  isDropdownOpen.value = false;
};

const selectedCountryLabel = computed(() => {
  return countries.value.find((c) => c.cid === selectedCountry.value)
    ?.c_name_kr;
});

onMounted(async () => {
  // updateSize();
  // window.addEventListener("resize", updateSize);
  await fetchCountries();
});

onMounted(() => {
  const tourTypeSelected = store.tourTypeSelected;
  tab.value = tourTypeSelected;
  if (tourTypeSelected === 1) {
    fetchFilterCity(1, 1);
  } else if (tourTypeSelected === 2) {
    fetchFilterCity(3, 2);
  } else if (tourTypeSelected === 3) {
    fetchFilterCity(5, 3);
  }
  // updateSize();
});
</script>

<style scoped>
.card {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
