<template>
  <div
    v-if="!isLoading"
    class="md:mb-6 w-full md:w-[1282px] sm:w-[840px] mx-auto"
  >
    <h2
      class="font-semibold text-[16px] md:mb-4 h-[50px] flex items-center justify-start text-[#152123] pl-4 md:text-[26px]"
    >
      관광지
    </h2>

    <!-- Grid Cards -->
    <div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
      <div v-for="place in paginatedPlaces" :key="place.laid" class="relative">
        <div
          class="card h-[238px] w-[158px] md:w-[302.5px] md:h-[366px] border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <figure>
            <img
              :src="getProfileImage(place.tourism_attr_imgs)"
              :alt="place.land_name"
              class="w-full h-[160px] md:h-[250px] md:w-[302.5px] object-cover"
            />
          </figure>

          <!-- Location Label -->
          <div
            class="flex items-center gap-3 text-sm text-[#95C3DD] font-semibold md:px-4 md:pt-5 pt-2 px-2"
          >
            <img
              src="@/assets/icons/Vector.png"
              class="md:w-[14px] md:h-[20px] w-[10px] h-[14px]"
            />
            {{ cityLabel }}
          </div>

          <!-- Content Row -->
          <div class="flex items-center justify-between">
            <button
              class="absolute p-1 bg-white rounded-full shadow-md top-2 right-2"
              @click="$emit('toggle', { ...place, type: 'tourism' })"
            >
              <img
                :src="isSelected(place) ? check : noncheck"
                alt="Selection indicator"
                class="w-[16px] h-[16px] md:w-[30px] md:h-[30px]"
              />
            </button>
            <div
              class="flex items-start justify-between w-[160px] h-[60px] md:pl-4 md:pt-2 md:pr-3 md:w-[300.5px] md:h-[48px]"
            >
              <p
                class="text-[#5E5F61] font-normal lg:text-base text-[12px] line-clamp-2 md:w-[242.5px] w-[110px] pt-1 pl-2 md:pt-0 md:pl-0"
              >
                {{ place.land_name }}
              </p>
              <img
                @click="$emit('modal', place.laid)"
                src="@/assets/icons/buttonRight.svg"
                class="cursor-pointer w-[20px] h-[20px] sm:w-[20px] sm:h-[20px] md:mt-1 mt-1 mr-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Show More Button -->
    <div v-if="countPlaces > perPage" class="flex justify-center p-2">
      <button
        @click="$emit('showMore')"
        class="w-[71px] h-[33px] md:w-[158px] md:h-[56px] text-[14px] md:text-[16px] md:py-2 md:px-4 transition-colors duration-200 bg-white text-[#0EC0CB] rounded-lg border hover:bg-[#0EC0CB] border-[#0EC0CB] hover:text-white"
      >
        {{ isShowAllPlaces ? "일부 보기" : "더보기" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import check from '@/assets/icons/check.svg';
import noncheck from '@/assets/icons/non-check.svg';
import { ref, computed, watch, onMounted } from 'vue';

// Props
const props = defineProps({
  tourismPlaces: Array,
  isLoading: Boolean,
  isSelected: Function,
  getProfileImage: Function,
  cityLabel: String,
  isShowAllPlaces: Boolean,
  countPlaces: Number,
});

const perPage = computed(() => {
  if (props.isShowAllPlaces) return props.tourismPlaces.length;
  return window.innerWidth >= 768 ? 8 : 2;
});

const paginatedPlaces = computed(() => {
  return props.tourismPlaces.slice(0, perPage.value);
});
</script>
