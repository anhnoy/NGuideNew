<template>
  <div>
    <div class="md:w-[1282px] md:h-[470px] mx-auto flex flex-col">
      <div class="flex items-center justify-center h-[50px]">
        <h2 class="md:text-[30px] text-[#152123] font-bold text-center">
          선택한 항목
        </h2>
      </div>

      <!-- Horizontal Scrollable Final Selected List -->
      <div
        class="flex justify-start px-2 pb-2 space-x-2 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:space-x-4 sm:justify-center items-center md:h-[236px] md:mt-[30px] overflow-y-hidden"
      >
        <div
          v-for="place in paginatedSelectedPlaces"
          :key="place.laid"
          class="relative flex-shrink-0 snap-start"
        >
          <div
            class="card h-[190.31px] w-[150px] md:w-[288px] md:h-[236px] border md:rounded-3xl rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200 md:mt-9 bg-white"
          >
            <!-- Image -->
            <figure>
              <img
                :src="place.image_path || place.tourism_attr_imgs"
                alt="tourism_attr_imgs"
                class="w-[134px] h-[114px] md:h-[114px] md:w-[256px] object-cover md:rounded-[20px] mt-5 mx-auto"
              />
              <div>{{ place.tourism_attr_imgs }}</div>
            </figure>
            <!-- Location Label -->
            <div
              class="flex items-center gap-3 md:text-sm text-[#95C3DD] font-semibold md:px-4 pt-2 px-2 text-xs"
            >
              <img
                src="@/assets/icons/Vector.png"
                class="md:w-[14px] md:h-[20px] w-[10px] h-[14px]"
              />
              {{ cityLabel }}
            </div>
            <button
              class="absolute p-1 bg-white rounded-full shadow-md top-2 right-2"
              @click="toggleFinalConfirm(place)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-500 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              class="flex items-start justify-between w-[160px] h-[60px] md:pl-4 md:pr-3 md:w-[300.5px] md:h-[48px]"
            >
              <p
                class="text-[#5E5F61] font-medium lg:text-base line-clamp-2 md:w-[242.5px] pt-1 pl-2 text-[10px]"
              >
                {{ place.land_name }}
              </p>
              <img
                @click="openModal(place.laid)"
                src="@/assets/icons/buttonRight.svg"
                class="cursor-pointer w-[20px] h-[20px] sm:w-[20px] sm:h-[20px] md:mt-1 mt-1 mr-5"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center md:mt-[60px]">
        <div class="flex items-center gap-3">
          <!-- Left Arrow -->
          <button
            @click="currentFinalPage--"
            :disabled="currentFinalPage === 1"
            class="text-[#999] hover:text-[#000] disabled:opacity-40"
          >
            &lt;
          </button>

          <!-- Page Numbers -->
          <button
            v-for="n in totalFinalPages"
            :key="n"
            @click="currentFinalPage = n"
            :class="[
              'text-sm font-medium px-1 transition-colors duration-200',
              n === currentFinalPage ? 'text-[#00BCC8]' : 'text-[#333]',
            ]"
          >
            {{ n }}
          </button>

          <!-- Right Arrow -->
          <button
            @click="currentFinalPage++"
            :disabled="currentFinalPage === totalFinalPages"
            class="text-[#999] hover:text-[#000] disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  finalSelectedPlaces: {
    type: Array,
    required: true,
    default: () => [],
  },
  getProfileImage: {
    type: Function,
    required: true,
  },
  cityLabel: {
    type: String,
    default: "",
  },
  openModal: {
    type: Function,
    required: true,
  },
  toggleFinalConfirm: {
    type: Function,
    required: true,
  },
});

const currentFinalPage = ref(1);
const itemsPerPage = ref(4);

const handleResize = () => {
  itemsPerPage.value = window.innerWidth < 768 ? 2 : 4;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const startIndex = computed(() => (currentFinalPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);

// ✅ This will prevent 'slice of undefined'
const paginatedSelectedPlaces = computed(() =>
  Array.isArray(props.finalSelectedPlaces)
    ? props.finalSelectedPlaces.slice(startIndex.value, endIndex.value)
    : []
);


const totalFinalPages = computed(() =>
  Math.ceil((props.finalSelectedPlaces?.length || 0) / itemsPerPage.value)
);
</script>
