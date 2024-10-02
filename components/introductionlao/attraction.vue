<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:grid-rows-2">
    <div
      v-for="(attraction, index) in store.attractions"
      :key="index"
      class="col-span-1"
    >
      <div class="card w-full border border-[#C0C0C0]">
        <figure>
          <img
            :src="attraction.image_path"
            alt="관광지"
            class="w-full h-48 object-cover"
          />
        </figure>
        <div class="p-4 cursor-pointer" @click="openModal(attraction.laid)">
          <div class="flex items-center justify-between">
            <p class="text-[#132D5C] font-medium text-base">
              {{ attraction.at.at_name_kr }}
            </p>
            <span class="mdi mdi-chevron-right text-[#6592E2] text-2xl"></span>
          </div>
          <p class="text-sm text-gray-500"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTourStore } from "~/stores/tour.store";

const store = useTourStore();

const emit = defineEmits(['openModel']);


const openModal = (laid) => {
  emit('openModel', laid);
  
};
</script>
<style scoped>
</style>
