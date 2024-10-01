<template>
  <dialog ref="myModal" class="modal w-full">
    <div class="lg:w-2/4 w-full lg:rounded-3xl bg-white pb-5">
      <div class="lg:p-5">
        <div
          class="flex items-center justify-between border-b border-[#8E8D8D] p-5 lg:px-5 lg:py-2"
        >
          <h3 class="text-[#132D5C] text-2xl font-bold">숙소명</h3>
          <span
            class="mdi mdi-close text-[#000000] text-3xl cursor-pointer"
            @click="closeModal"
          ></span>
        </div>

        <div v-for="(detailTour, index) in store.tours" :key="detailTour.at_id">
          <div class="relative flex justify-center items-center lg:m-0 mx-5">
            <span
              style="transform: scaleX(0.7)"
              class="cursor-pointer text-6xl md:text-7xl font-thin absolute left-0 z-10"
              @click="changeImage(-1)"
              :class="currentIndex > 0 ? 'text-[#152123]' : 'text-[#8E8D8D]'"
            >
              <
            </span>

            <div class="flex space-x-4 p-5 pt-10">
              <img
                v-if="isMobile"
                :src="images[currentIndex]"
                class="w-72 h-44 object-cover"
              />
              <template v-else>
                <img
                  v-for="(image, index) in visibleImages"
                  :key="index"
                  :src="image"
                  class="w-48 h-40 md:w-64 md:h-44 object-cover"
                />
              </template>
            </div>

            <span
              style="transform: scaleX(0.7)"
              class="cursor-pointer text-6xl md:text-7xl font-thin absolute right-0 z-10"
              @click="changeImage(1)"
              :class="
                (
                  isMobile
                    ? currentIndex < images.length - 1
                    : currentIndex < images.length - visibleCount
                )
                  ? 'text-[#132D5C]'
                  : 'text-[#8E8D8D]'
              "
            >
              >
            </span>
          </div>

          <!-- tab -->

          <div
            class="tabs flex justify-center space-x-4 lg:mx-4 mx-7 mt-2 border-b lg:border-[#C0C0C0] border-[#E6E6E6]"
          >
            <button
              @click="tab = 1"
              :class="{
                'text-[#FF9900] border-b-2 border-[#FF9900] text-base font-medium lg:text-xl lg:font-bold':
                  tab === 1,
                'text-[#5E5F61] text-base font-medium lg:text-xl lg:font-normal ':
                  tab !== 1,
              }"
              class="tab tab-bordered"
            >
              소개
            </button>
            <button
              @click="tab = 2"
              :class="{
                'text-[#FF9900] border-b-2 border-[#FF9900] text-base font-medium lg:text-xl lg:font-bold':
                  tab === 2,
                'text-[#5E5F61] text-base font-medium lg:text-xl lg:font-normal':
                  tab !== 2,
              }"
              class="tab tab-bordered"
            >
              숙소
            </button>
          </div>

          <div v-if="tab === 1">
            <div class="lg:px-4 px-7 pt-7 pb-20">
              <h3 class="text-[#152123] text-xl font-medium">{{ detailTour.land_name }}</h3>
              <p class="text-[#152123] text-sm font-light leading-6 mt-2">
                {{ detailTour.land_detail }}
              </p>

              <h3 class="mt-5 text-[#152123] text-xl font-medium">
                시설 및 서비스
              </h3>
              <p class="mt-2 text-[#152123] text-sm font-light leading-6">
                야외 수영장
              </p>

              <h3 class="mt-5 text-[#152123] text-xl font-medium">세부 정보</h3>
              <p class="mt-2 text-[#152123] text-sm font-light leading-7">
                객실 수 : 45개 <br />
                전화번호 : 555-55555
              </p>
            </div>

            <div class="lg:flex justify-center mt-5 hidden">
              <button
                class="text-white text-base font-bold bg-[#132d5c] w-60 h-12"
              >
                확인
              </button>
            </div>
          </div>

          <div v-if="tab === 2">
            <div class="lg:px-4 px-7 py-7">
              <p class="text-[#152123] text-base font-normal">
                주소 : 1231243412312
              </p>
            </div>
            <div class="lg:p-0 pb-20 pt-7">
              <Map />
            </div>
            <div class="lg:flex justify-center hidden">
              <button
                class="text-white text-base font-bold bg-[#132d5c] w-60 h-12"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex justify-center mt-5 absolute bottom-0 left-0 right-0 lg:hidden"
      >
        <button class="text-white text-base font-bold bg-[#132d5c] w-full h-14">
          확인
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import Map from "@/components/maps/map.vue";
import { useTourStore } from "@/stores/tour.store";
const images = [
  "https://t4.ftcdn.net/jpg/02/80/35/71/360_F_280357195_4frMFmoDrVD3NMbqUCT0eGzIYAyQ0WTv.jpg",
  "https://f.ptcdn.info/257/030/000/1428736798-IMG9164-o.jpg",
  "https://career-advice.jobs.ac.uk/wp-content/uploads/An-image-of-Vietnam-scaled-e1691139574867-1170x630.jpg.optimal.jpg",
  "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?cs=srgb&dl=pexels-fabianwiktor-994605.jpg&fm=jpg",
  "https://wallpapers.com/images/featured/beautiful-3vau5vtfa3qn7k8v.jpg",
  "https://www.southernliving.com/thmb/cgX9dGC8pHOSbZn53uISfCjY9Nc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-560335173-438d7cbf959a40d1b8ff0e39aef4f2e4.jpg",
];

const tab = ref(1);
const myModal = ref(null);
const currentIndex = ref(0);
const visibleCount = 3;
const isMobile = ref(false);
const store = useTourStore();

const fetchDetailTour = async () => {
  const detailTourId = 1;
  const cityId = 4;  
  try {
    await store.getDetailTour(detailTourId, cityId); 
  } catch (error) {
    console.log("Error fetching detail tour:", error);
  }
};
fetchDetailTour();

const updateIsMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth <= 768;
  }
};

const visibleImages = computed(() => {
  return images.slice(currentIndex.value, currentIndex.value + visibleCount);
});

const changeImage = (direction) => {
  const newIndex = currentIndex.value + direction;
  if (isMobile.value) {
    if (newIndex >= 0 && newIndex < images.length) {
      currentIndex.value = newIndex;
    }
  } else {
    if (newIndex >= 0 && newIndex <= images.length - visibleCount) {
      currentIndex.value = newIndex;
    }
  }
};
onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const openModal = () => {
  myModal.value?.showModal();
};

const closeModal = () => {
  myModal.value?.close();
};
defineExpose({ openModal });
</script>

<style scoped></style>
