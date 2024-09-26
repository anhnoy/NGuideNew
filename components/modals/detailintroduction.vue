<template>
  <dialog ref="myModal" class="modal">
    <div class="lg:w-2/4 w-full lg:rounded-3xl bg-white">
      <div class="p-5">
        <div
          class="flex items-center justify-between border-b border-[#8E8D8D] pb-3"
        >
          <h3 class="text-[#132D5C] text-2xl font-bold">숙소명</h3>
          <span
            class="mdi mdi-close text-[#000000] text-3xl cursor-pointer"
            @click="closeModal"
          ></span>
        </div>
        <div class="relative flex justify-center items-center">
          <span
          style="transform: scaleX(0.7)"
            class="cursor-pointer text-6xl md:text-7xl font-thin absolute left-0 z-10"
            @click="changeImage(-1)"
            :class="currentIndex > 0 ? 'text-[#152123]' : 'text-[#8E8D8D]'"
          >
            <
          </span>

          <div class="flex space-x-4 p-5">
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
          class="tabs flex justify-center space-x-4 mb-6 mt-2 lg:border-b lg:border-[#C0C0C0]"
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
          <div class="px-4">
            <h3 class="text-[#152123] text-xl font-medium">호텔소개</h3>
            <p class="text-[#152123] text-sm font-light leading-6 mt-2">
              엔티안에 자리한 무엉 탄 럭셔리 비엔티안에서는 5성급 객실과 시설을
              제공합니다. 거품 욕조, 사우나, 실외 풀 또한 마련되어 있습니다. 이
              호텔에서는 여행객들을 위해 피트니스센터, 공용 지역 무료 무선
              인터넷, 익스프레스 체크인/체크아웃 등을 포함한 다양한 시설과
              서비스를 제공하고 있습니다. 직원들이 항시 대기하고 있으며 투어
              예약 및 티켓 예매를 지원해 드립니다. 호텔 내 현대적인 모든
              객실에는 헤어드라이어, 미니 바, 냉장고 등이 완비되어 있습니다.
              고객님들은 저녁에 호텔 내 레스토랑 및 바에서 휴식을 취하실 수
              있습니다.
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
          <div class="px-4">
            <p class="text-[#152123] text-base font-normal">
              주소 : 1231243412312
            </p>
          </div>
          <div>
            <Map />
          </div>
          <div class="lg:flex justify-center mt-5 hidden">
            <button
              class="text-white text-base font-bold bg-[#132d5c] w-60 h-12"
            >
              확인
            </button>
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

<style scoped>
/* .modals-box {
  width: 980px;
  height: 800px;
  padding: 20px;
  border-radius: 20px;
} */
</style>
