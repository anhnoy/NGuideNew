<template>
  <div class="max-w-[1080px] bg-white p-4 sm:p-6 mx-auto">
    <h2 class="text-[#152123] lg:text-3xl text-2xl lg:p-0 px-16 font-bold text-center mb-4">
      같이 여행하는 인원에 대해 작성해 주세요.
    </h2>
    <p class="text-base font-normal text-center text-[#8E8D8D] mb-4 lg:p-0 px-16">
      ※ 여행 인원은 총 8명 이상 가능합니다. (골프 여행은 4명 이상)
    </p>
    <div class="mx-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-0 justify-center items-center">
        <!-- Category 1: Adults -->
        <div class="flex flex-col items-center">
          <div class="flex sm:flex-col justify-between items-center w-[300px]">
            <div>
              <p class="text-lg font-medium text-[#2F312A] sm:text-center">
                성인
              </p>
              <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                (만 12세 이상)
              </p>
            </div>
            <div class="flex items-center">
              <img class="cursor-pointer" @click="decrements('adults')" src="@/assets/icons/minus.svg" />
              <p
                class="w-[80px] lg:max-w-full lg:h-[44px] h-[40px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white">
                {{ store.EasyQuotation.selectReq_adults }}
              </p>
              <img class="cursor-pointer" @click="increments('adults')" src="@/assets/icons/plus.svg" />
            </div>
          </div>
        </div>

        <!-- Category 2: Kids -->
        <div class="flex flex-col items-center">
          <div class="flex sm:flex-col justify-between items-center w-[300px]">
            <div>
              <p class="text-lg font-medium text-[#2F312A] sm:text-center">
                아동
              </p>
              <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                (만 2세~만 12세 이상)
              </p>
            </div>
            <div class="flex items-center">
              <img class="cursor-pointer" @click="decrements('kids')" src="@/assets/icons/minus.svg" />
              <p
                class="w-[80px] lg:max-w-full  lg:h-[44px] h-[40px] flex justify-center items-center text-black mx-2 border border-[#E6E6E6] bg-white">
                {{ store.EasyQuotation.selectReq_kids }}
              </p>
              <img class="cursor-pointer" @click="increments('kids')" src="@/assets/icons/plus.svg" />
            </div>
          </div>
        </div>

        <!-- Category 3: Infants -->
        <div class="flex flex-col items-center">
          <div class="flex sm:flex-col justify-between items-center w-[300px]">
            <div>
              <p class="text-lg font-medium text-[#2F312A] sm:text-center">
                유아
              </p>
              <p class="text-xs font-normal text-[#5E5F61] mb-2 text-center">
                (만 2세 미만)
              </p>
            </div>
            <div class="flex items-center">
              <img class="cursor-pointer" @click="decrements('infants')" src="@/assets/icons/minus.svg" />
              <p
                class="w-[80px]  lg:h-[44px] h-[40px] items-center flex justify-center bg-white text-black mx-2 border">
                {{ store.EasyQuotation.selectReq_infants }}
              </p>
              <img class="cursor-pointer" @click="increments('infants')" src="@/assets/icons/plus.svg" />
            </div>
          </div>
        </div>

        
      </div>
    </div>



  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import mainGroup from "@/services/custom-travel.service.js";

const store = useEasyQuotationStore();
const ageGroups = ref([]);

// Budget settings
const minBudgets = 100;
const maxBudgets = 150;
const budgetOption = [100, 110, 120, 130, 140, 150];


const increments = (category) => {
  const currentValue =
    Number(store.EasyQuotation[`selectReq_${category}`]) || 0;
  if (currentValue < 99) {
    store.EasyQuotation[`selectReq_${category}`] = String(currentValue + 1);
  }
};

const decrements = (category) => {
  const currentValue =
    Number(store.EasyQuotation[`selectReq_${category}`]) || 0;
  if (currentValue > 0) {
    store.EasyQuotation[`selectReq_${category}`] = String(currentValue - 1);
  }
};


const selectedOptions = computed({
  get: () => store.EasyQuotation.selectedOption,
  set: (value) => (store.EasyQuotation.selectedOption = value),
});


// Fetch main age groups on component mount
onMounted(async () => {
  const response = await mainGroup.getMainGroup();
  if (response && response.data && response.data.resp) {
    ageGroups.value = response.data.resp;
  }
});
</script>
