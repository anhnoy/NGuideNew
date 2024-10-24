<template>
  <dialog ref="myModal" class="modal" :open="isOpen" @close="onClose">
    <div class="lg:w-[40%] w-full lg:h-[90%] h-full lg:rounded-3xl bg-white pb-5">
      <div class="lg:p-5">
        <div class="flex items-center justify-between border-b border-[#8E8D8D] p-5 lg:px-5 lg:py-2">
          <h3 class="text-[#2F312A] text-2xl font-bold">
            {{ store.tour_attraction.land_name }}
          </h3>
          <span class="mdi mdi-close text-[#000000] text-3xl cursor-pointer" @click="onClose"></span>
        </div>

        <div class="relative flex justify-center items-center overflow-hidden lg:m-0 mx-5">
          <span style="transform: scaleX(0.7)"
            class="cursor-pointer text-6xl md:text-7xl font-thin absolute left-0 z-20" @click="changeImage(-1)"
            :class="currentIndex > 0 ? 'text-[#152123]' : 'text-[#8E8D8D]'">
            < </span>

              <div class="flex space-x-4 p-5 pt-10 justify-center">
                <template v-if="isMobile">
                  <div v-if="loading" class="skeleton w-72 h-44"></div>
                  <img v-else :src="images[currentIndex]" class="w-72 h-44 object-cover" />
                </template>

                <template v-else>
                  <div v-if="loading" class="skeleton w-36 h-28 md:w-48 md:h-32 lg:w-52 lg:h-36"></div>
                  <div v-if="loading" class="skeleton w-36 h-28 md:w-48 md:h-32 lg:w-52 lg:h-36"></div>
                  <div v-if="loading" class="skeleton w-36 h-28 md:w-48 md:h-32 lg:w-52 lg:h-36"></div>

                  <img v-else v-for="(attraction, index) in visibleImages.slice(0, 3)" :key="index" :src="attraction"
                    class="w-36 h-28 md:w-48 md:h-32 lg:w-52 lg:h-36 object-cover"
                    style="max-width: 100%; max-height: 100%" />
                </template>
              </div>

              <span style="transform: scaleX(0.7)"
                class="cursor-pointer text-6xl md:text-7xl font-thin absolute right-0 z-20" @click="changeImage(1)"
                :class="
              (
                isMobile
                  ? currentIndex < images.length - 1
                  : currentIndex < images.length - visibleCount
              )
                ? 'text-[#132D5C]'
                : 'text-[#8E8D8D]'
            ">
                >
              </span>
        </div>

        <div class="tabs flex justify-center space-x-4 lg:mx-4 mx-7 mt-2 border-b lg:border-[#C0C0C0] border-[#E6E6E6]">
          <button @click="tab = 1" :class="{
              'text-[#6EBC30] border-b-2 border-[#6EBC30] text-base font-medium lg:text-xl lg:font-bold':
                tab === 1,
              'text-[#5E5F61] text-base font-normal lg:text-xl lg:font-normal ':
                tab !== 1,
            }" class="tab tab-bordered">
            소개
          </button>
          <button @click="tab = 2" :class="{
              'text-[#6EBC30] border-b-2 border-[#6EBC30] text-base font-medium lg:text-xl lg:font-bold':
                tab === 2,
              'text-[#5E5F61] text-base font-normal lg:text-xl lg:font-normal':
                tab !== 2,
            }" class="tab tab-bordered">
            주소
          </button>
        </div>

        <div v-if="tab === 1">
          <div class="lg:px-4 p-7">
            <div>
              <h3 class="text-[#152123] text-xl font-medium">
                {{ store.tour_attraction.land_name }}
              </h3>
              <p class="text-[#152123] text-sm font-light leading-6 mt-2">
                {{ store.tour_attraction.land_detail }}
              </p>
            </div>
          </div>

          <div class="lg:flex justify-center mt-5 hidden absolute bottom-16 left-0 right-0">
            <button @click="onClose" class="text-white text-base font-bold bg-[#2F312A] w-60 h-12">
              확인
            </button>
          </div>
        </div>

        <div v-if="tab === 2">
          <div class="lg:px-4 px-7 py-2">
            <div>
              <div class="flex items-start">
                <span class="text-[#2F312A] text-base font-bold whitespace-nowrap">주소:</span>
                <span class="text-[#2F312A] text-base font-normal px-1 break-all">
                  {{ dataAddress.display_name }}
                </span>
              </div>

              <p class="text-[#152123] text-base font-normal px-10">
                {{ store.tour_attraction.addr }}
              </p>
            </div>
          </div>
          <div class="lg:px-4 p-0">
            <div class="overflow-hidden">
              <GoogleMap api-key="YOUR_API_KEY" :center="center" :zoom="zoom"
                class="w-full h-[calc(100vh-150px)] lg:h-64">
                <Marker :options="{ position: center }" />
              </GoogleMap>
            </div>
          </div>
          <div class="lg:flex justify-center hidden absolute bottom-16 left-0 right-0">
            <button @click="onClose" class="text-white text-base font-bold bg-[#2F312A] w-60 h-12">
              확인
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-5 absolute bottom-0 left-0 right-0 lg:hidden">
        <button @click="onClose" class="text-white text-base font-bold bg-[#2F312A] w-full h-14">
          확인
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { useTourStore } from "@/stores/tour.store";
import { GoogleMap, Marker } from "vue3-google-map";

const dataAddress = ref("");
const images = ref([]);
const tab = ref(1);
const myModal = ref(null);
const currentIndex = ref(0);
const visibleCount = 3;
const isMobile = ref(false);
const store = useTourStore();
const loading = ref(true);

const props = defineProps(["laid", "isOpen"]);
const emit = defineEmits(["update:isOpen"]);
const { laid, isOpen } = toRefs(props);
const onClose = () => {
  emit("update:isOpen", false);
};

const center = ref({
  lat: 37.7749,
  lng: -122.4194,
});
const zoom = ref(12);
const markerOptions = ref({
  position: center.value,
  label: "I",
  title: "LADY LIBERTY",
});

const fetchDetailTour = async () => {
  try {
    images.value = [];
    currentIndex.value = 0;
    loading.value = true;
    await store.getDetailTour(laid.value);
    const imgs = store.tour_attraction.tourism_attr_imgs;

    const lat = parseFloat(store.tour_attraction.latitude);
    const lng = parseFloat(store.tour_attraction.longitude);

    const responseAddress = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=en-US`
    );
    const addressData = await responseAddress.json();

    dataAddress.value = addressData;

    center.value = {
      lat: lat,
      lng: lng,
    };
    markerOptions.value.position = center.value;

    imgs.forEach((img) => {
      const image = img.image_path === "" ? img.key : img.image_path;
      images.value.push(image);
    });
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  } catch (error) {
    console.log("Error fetching detail tour:", error);
  }
};

fetchDetailTour();

watch(laid, () => {
  fetchDetailTour();
});

const updateIsMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth <= 768;
  }
};

const visibleImages = computed(() => {
  return images.value.slice(
    currentIndex.value,
    currentIndex.value + visibleCount
  );
});

const changeImage = (direction) => {
  const newIndex = currentIndex.value + direction;

  if (isMobile.value) {
    if (newIndex >= 0 && newIndex < images.value.length) {
      currentIndex.value = newIndex;
    }
  } else {
    if (newIndex >= 0 && newIndex <= images.value.length - visibleCount) {
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
</script>

<style scoped></style>
