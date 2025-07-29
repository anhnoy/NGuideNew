<template>
  <div class="w-full bg-[#EAEDE9] lg:py-10 lg:pl-[300px] lg:h-[580px] h-auto">
    <!-- Outer container -->
    <div
      class="flex flex-col w-full mx-auto lg:flex-row py-[50px] lg:py-0 sm:flex sm:flex-col h-auto"
    >
      <!-- 🔵 Left Sidebar: Category selector -->
      <div
        class="flex flex-col sm:flex sm:flex-col items-center w-full lg:w-[300px] lg:items-start lg:mt-10"
      >
        <div class="flex justify-center lg:justify-start">
          <!-- Green Bar -->
          <div
            class="lg:w-[80px] lg:h-[12px] bg-[#3B6333] rounded-full mb-2 w-[40px] h-[6px] lg:mb-5"
          ></div>
        </div>
        <span
          class="text-[#152123] font-medium lg:text-[30px] lg:mb-6 text-center lg:text-left text-base lg:font-normal"
        >
          당신만의 특별한
        </span>
        <span
          class="text-[#152123] font-medium lg:text-[30px] mb-6 text-center lg:text-left text-base lg:font-normal"
          >여행지는 어디인가요?
        </span>

        <div
          class="grid grid-cols-2 gap-2 place-items-center sm:flex sm:flex-col sm:gap-4 sm:items-start sm:mt-5 w-[328px] mx-auto"
        >
          <button
            type="button"
            v-for="(country, index) in countryOptions"
            :key="country.cid"
            @click="handleSelectCountry(country, e)"
            :class="[
              'w-[160px] h-[36px] text-center rounded-full font-semibold text-sm mt-2 sm:mt-0',
              'sm:w-[267px] sm:h-[50px] sm:text-base sm:py-3',
              'transition-colors duration-300 ease-in-out transform active:scale-95',
              selectedCountry?.cid === country.cid
                ? 'bg-[#2F312A] text-white'
                : 'bg-[#CCC8C8] text-[#2F312A]',
            ]"
          >
            {{ country.c_name_kr }}
          </button>
        </div>
      </div>

      <!-- 🟢 Right Scrollable Cards -->
      <div
        class="custom-scrollbar lg:flex-1 mt-10 lg:mt-0 lg:overflow-x-auto lg:bg-white lg:w-full lg:h-[480px] lg:ml-[100px] lg:p-[100px] flex items-center w-full h-auto"
      >
        <!-- Show skeleton while loading -->
        <div v-if="isLoadingEvents" class="flex gap-10 w-max">
          <div
            v-for="n in 3"
            :key="n"
            class="object-cover w-full h-[234px] lg:h-full lg:max-h-[260px] mt-5 lg:mt-0 min-w-[360px] bg-gray-200"
          />
        </div>
        <!-- Desktop Cards -->
        <div
          v-else
          :key="selectedCountry?.cid"
          class="gap-10 mx-auto lg:flex lg:w-max"
        >
          <div
            v-for="event in eventList"
            :key="event.ev_id"
            class="rounded-[10px] hover:shadow cursor-pointer lg:w-[400px] lg:h-[260px] min-h-[234px] w-full"
            @click="toId(event)"
          >
            <img
              :src="event.ev_image"
              class="object-cover w-full h-[234px] lg:h-full lg:max-h-[260px] mt-5 lg:mt-0 min-w-[360px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import regionService from "~/services/region.service";
import { useApplyPrivatePackageStore } from "~/stores/apply-private-package.store";

const router = useRouter();

const selectedCountry = ref(null);
const countryOptions = ref([]);
const eventList = ref([]);
const isLoadingCountries = ref(true);
const isLoadingEvents = ref(false);
const applyStore = useApplyPrivatePackageStore();

const getCountryList = async () => {
  isLoadingCountries.value = true;
  try {
    const response = await regionService.getCountry();
    // console.log("✅ Country list fetched successfully", response.data);
    countryOptions.value = response.data.map((item) => ({
      cid: item.cid,
      c_name_kr: item.c_name_kr,
      icon: item.c_image || "",
    }));
  } catch (e) {
    console.error("❌ Failed to fetch country list", e);
  } finally {
    isLoadingCountries.value = false;
  }
};

const fetchEventsByCountry = async (cid) => {
  isLoadingEvents.value = true;
  try {
    const response = await regionService.getEventByCountry(cid);
    // console.log("✅ Events fetched successfully for country", cid, response.data);
    eventList.value = response.data;
  } catch (err) {
    console.error("❌ Failed to fetch events", err);
    eventList.value = [];
  } finally {
    isLoadingEvents.value = false;
  }
};
const handleSelectCountry = async (country, e) => {
  e?.target?.blur?.();
  const scrollY = window.scrollY;

  selectedCountry.value = country;
  await fetchEventsByCountry(country.cid);

  // Prevent scroll jump
  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY });
  });
};

const toId = async (item) => {
  // Store event image and name before navigating
  applyStore.setPackage(item.ev_image, item.ev_name);

  // Navigate to private package page
  await router.push(`/private-packages/${item.ev_id}`);
};

onMounted(async () => {
  await getCountryList();
  if (countryOptions.value.length > 0) {
    const first = countryOptions.value[0];
    selectedCountry.value = first;
    await fetchEventsByCountry(first.cid);
  }
});
watch(eventList, (val) => {
  // console.log("🔄 Event list updated", val);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #3b3d3b;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #eef0ec;
}

/* For Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3b3d3b #eef0ec;
}
</style>
