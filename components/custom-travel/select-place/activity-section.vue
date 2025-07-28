<template>
  <div
    v-if="!isLoading && activityPlaces.length > 0"
    class="w-full mx-auto md:mb-6 bg-[#E9F5FF] md:h-[608px] h-[340px] min-h-[340px] md:py-10"
  >
    <div class="w-full md:w-[1282px] sm:w-[840px] mx-auto">
      <!-- Arrows -->
      <div class="md:flex justify-between gap-3 px-4 mt-[-10px] mb-2">
        <h2
          class="font-semibold text-[16px] md:mb-4 h-[50px] flex items-center justify-start text-[#152123] pl-2 md:text-[26px] pt-6"
        >
          액티비티
        </h2>
        <div class="hidden md:flex sm:block">
          <button
            @click="prevPage"
            :disabled="currentActivityPage === 1"
            class="w-[36px] h-[36px] rounded-full bg-[#F2F2F2] text-xl flex items-center justify-center shadow hover:bg-[#ccc] disabled:opacity-30"
          >
            ←
          </button>
          <button
            @click="nextPage"
            :disabled="currentActivityPage === totalActivityPages"
            class="w-[36px] h-[36px] rounded-full bg-[#F2F2F2] text-xl flex items-center justify-center shadow hover:bg-[#ccc] disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
        <div
          v-for="activity in paginatedActivityPlaces"
          :key="activity.laid"
          class="relative"
        >
          <div
            class="card w-[158px] h-[220px] md:w-[302.5px] md:h-[366px] border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white md:min-w-[302.5px] min-w-[158px] mx-auto"
          >
            <!-- Image -->
            <figure>
              <img
                :src="getProfileImage(activity.tourism_attr_imgs)"
                :alt="activity.land_name"
                class="w-full h-[160px] md:h-[250px] object-cover md:min-w-[302.5px] min-w-[158px]"
              />
            </figure>

            <!-- City Label -->
            <div
              class="flex items-center gap-3 text-sm text-[#95C3DD] font-semibold md:px-4 md:pt-5 pt-2 px-2 md:min-w-[302.5px] min-w-[158px]"
            >
              <img
                src="@/assets/icons/Vector.png"
                class="md:w-[14px] md:h-[20px] w-[10px] h-[14px]"
              />
              {{ cityLabel }}
            </div>

            <!-- Select Button -->
            <button
              class="absolute p-1 bg-white rounded-full shadow-md top-2 right-2"
              @click="$emit('toggle', { ...activity, type: 'activity' })"
            >
              <img
                :src="isSelected(activity) ? check : noncheck"
                alt="Selection indicator"
                class="w-[16px] h-[16px] md:w-[30px] md:h-[30px]"
              />
            </button>

            <!-- Name & Arrow -->
            <div
              class="flex items-start justify-between w-[158px] h-[60px] md:pl-4 md:pt-2 md:pr-3 md:w-[302.5px] md:h-[48px]"
            >
              <p
                class="text-[#5E5F61] font-normal lg:text-base text-[12px] line-clamp-2 md:w-[242.5px] w-[110px] pt-1 pl-2 md:pt-0 md:pl-0"
              >
                {{ activity.land_name }}
              </p>
              <img
                @click="$emit('modal', activity.laid)"
                src="@/assets/icons/buttonRight.svg"
                class="cursor-pointer w-[20px] h-[20px] sm:w-[20px] sm:h-[20px] md:mt-1 mt-1 mr-2"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Dots -->
      <div v-if="totalActivityPages > 1" class="flex justify-center md:mt-4">
        <div class="flex gap-[6px] md:gap-[10px]">
          <button
            v-for="n in totalActivityPages"
            :key="n"
            @click="currentActivityPage = n"
            :class="[
              'transition-all duration-300 rounded-full',
              n === currentActivityPage
                ? 'w-[18px] h-[8px] md:w-[24px] md:h-[10px] bg-[#0EC0CB]'
                : 'w-[8px] h-[8px] md:w-[10px] md:h-[10px] bg-[#B4B4B4]',
            ]"
          ></button>
        </div>
      </div>

      <!-- Show More Button -->
      <div v-if="countActivity > 9" class="flex justify-center p-2">
        <button
          @click="$emit('showMore')"
          class="w-[120px] h-[40px] sm:w-[200px] sm:h-[40px] text-[14px] py-2 px-4 transition-colors duration-200 bg-[#a8a3a300] text-gray-800 rounded-3xl border hover:bg-[#77777783]"
        >
          {{ isShowAllActivity ? "일부 보기" : "더보기" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import check from "@/assets/icons/check.svg";
import noncheck from "@/assets/icons/non-check.svg";

const props = defineProps({
  activityPlaces: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  isShowAllActivity: { type: Boolean, default: false },
  countActivity: { type: Number, default: 0 },
  isSelected: { type: Function, required: true },
  cityLabel: { type: String, default: "" },
});

const currentActivityPage = ref(1);
const isMobile = ref(false);
const nextPage = () => {
  if (currentActivityPage.value < totalActivityPages.value) {
    currentActivityPage.value++;
  }
};

const prevPage = () => {
  if (currentActivityPage.value > 1) {
    currentActivityPage.value--;
  }
};

const updateDeviceType = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  updateDeviceType();
  window.addEventListener("resize", updateDeviceType);
});

const pageSize = computed(() => (isMobile.value ? 2 : 4));
const totalActivityPages = computed(() =>
  Math.max(1, Math.ceil((props.activityPlaces?.length || 0) / pageSize.value))
);
const paginatedActivityPlaces = computed(() => {
  const start = (currentActivityPage.value - 1) * pageSize.value;
  return props.activityPlaces.slice(start, start + pageSize.value);
});

watch(
  () => props.activityPlaces,
  () => {
    if (currentActivityPage.value > totalActivityPages.value) {
      currentActivityPage.value = 1;
    }
  }
);

const getProfileImage = (images) => {
  if (!Array.isArray(images)) return "";
  const profile = images.find((img) => img.is_profile === "Y");
  return profile ? profile.image_path : images[0]?.image_path || "";
};
</script>
