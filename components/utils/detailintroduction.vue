<template>
  <dialog ref="myModal" class="modal" :open="isOpen" @close="onClose">
    <div
      class="relative md:w-[1282px] md:h-[708px] w-full h-full md:rounded-3xl bg-white overflow-hidden"
    >
      <!-- Close Button -->
      <span
        class="mdi mdi-close text-[#000000] text-3xl cursor-pointer absolute top-5 right-6 z-20 hover:text-[#6EBC30] sm:block hidden"
        @click="onClose"
      ></span>
      <span
        class="text-[#000000] text-3xl cursor-pointer absolute top-5 z-20 hover:text-[#6EBC30] md:hidden left-5"
      >
        <img
          src="@/assets/icons/ic_back.png"
          alt="close"
          class="w-[24px] h-[24px]"
          @click="onClose"
      /></span>

      <!-- Grid Layout -->
      <div class="flex h-full md:mx-[30px] md:my-[60px]">
        <!-- Left thumbnails -->
        <div
          class="w-[100px] bg-white py-6 pr-2 space-y-3 overflow-y-auto sm:block hidden"
        >
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img"
            class="w-[80px] h-[80px] object-cover rounded-xl border-[3px]"
            :class="{
              'border-[#6EBC30]': currentIndex === index,
              'border-transparent': currentIndex !== index,
            }"
            @click="currentIndex = index"
          />
        </div>

        <!-- Main Image + Description -->
        <div class="md:flex-1 md:p-6">
          <div class="flex-col h-full md:flex md:gap-6 md:flex-row">
            <!-- Main image -->
            <!-- Main image -->
            <div class="relative flex-1">
              <img
                :src="images[currentIndex]"
                class="md:rounded-xl object-cover w-full h-[360px] md:h-[528px] md:w-[528px]"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
              />

              <!-- Dots Navigation (Mobile Only) -->
              <div
                v-if="isMobile && images.length > 1"
                class="absolute flex gap-3 transform -translate-x-1/2 bottom-3 left-1/2"
              >
                <div
                  v-for="(img, index) in images"
                  :key="index"
                  class="w-3 h-3 rounded-full"
                  :class="
                    currentIndex === index ? 'bg-[#0EC0CB] w-6' : 'bg-[#B4B4B4]'
                  "
                  @click="currentIndex = index"
                ></div>
              </div>
            </div>

            <!-- Description Section -->
            <div class="w-full md:w-[498px] flex flex-col">
              <h3
                class="text-[#152123] text-[20px] font-semibold md:mb-4 leading-snug p-4"
              >
                {{ store.tour_attraction.land_name }}
              </h3>

              <!-- Tabs -->
              <div class="flex border-b border-[#D9D9D9] mb-3 justify-center md:justify-start">
                <button
                  @click="tab = 1"
                  :class="[
                    'px-4 py-2 text-sm md:text-[20px] font-medium md:w-[120px] md:h-[40px] w-[164px] h-[35px]',
                    tab === 1
                      ? 'text-[#152123] border-b-2 border-[#6EBC30]'
                      : 'text-[#8B8B8B] ',
                  ]"
                >
                  소개
                </button>
                <button
                  @click="tab = 2"
                  :class="[
                    'px-4 py-2 text-sm md:text-[20px] font-medium md:w-[120px] md:h-[40px] w-[164px] h-[35px]',
                    tab === 2
                      ? 'text-[#152123] border-b-2 border-[#6EBC30]'
                      : 'text-[#8B8B8B]',
                  ]"
                >
                  주소
                </button>
              </div>

              <!-- Content -->
              <div
                class="md:pr-2 text-base text-[#5E5F61] leading-relaxed px-4"
              >
                <div v-if="tab === 1">
                  <p>
                    {{ store.tour_attraction.land_detail }}
                  </p>
                </div>

                <div v-else>
                  <p class="mb-2">
                    <span class="font-medium">주소:</span>
                    {{ dataAddress.display_name }}
                    {{ store.tour_attraction.addr }}
                  </p>
                  <GoogleMap
                    api-key="YOUR_API_KEY"
                    :center="center"
                    :zoom="zoom"
                    class="md:w-[498px] w-[328px] h-[250px] md:h-[316px] rounded"
                  >
                    <Marker :options="{ position: center }" />
                    <Circle
                      :options="{
                        center,
                        radius: 100,
                        fillColor: '#6EBC30',
                        fillOpacity: 0.35,
                        strokeOpacity: 0,
                      }"
                    />
                  </GoogleMap>
                </div>
              </div>

              <!-- Confirm Button (for desktop only) -->
              <!-- <div class="justify-center hidden pt-5 mt-auto md:flex">
                <button @click="onClose" class="bg-[#2F312A] text-white font-bold text-sm w-[240px] h-[48px] rounded">
                  확인
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Confirm Button (mobile only) -->
      <!-- <div class="absolute bottom-0 left-0 right-0 md:hidden">
        <button @click="onClose" class="w-full h-[50px] bg-[#2F312A] text-white font-bold text-sm">
          확인
        </button>
      </div> -->
    </div>
  </dialog>
</template>

<script setup>
import { useTourStore } from "@/stores/tour.store";
import { GoogleMap, Marker, Circle, InfoWindow } from "vue3-google-map";

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
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeDistance = touchStartX.value - touchEndX.value;
  const swipeThreshold = 50;

  if (
    swipeDistance > swipeThreshold &&
    currentIndex.value < images.value.length - 1
  ) {
    currentIndex.value++;
  } else if (swipeDistance < -swipeThreshold && currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const onClose = () => {
  emit("update:isOpen", false);
};

const center = ref({
  lat: 37.7749,
  lng: -122.4194,
});
const zoom = ref(16);
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
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=ko`
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
    }, 1000);
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

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
