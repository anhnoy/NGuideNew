<template>
  <div
    class="flex flex-col md:flex-row items-center justify-center mx-3 mt-5 md:m-10 space-y-4 md:space-y-0 md:space-x-4"
  >
    <!-- Card 1 -->
    <div
      class="rounded-lg w-full md:w-auto border-0 md:border md:border-[#8E8D8D]"
    >
      <div @click="handleClick" class="md:py-5 lg:pl-16 px-2">
        <div
          class="flex flex-row md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <button
            class="md:w-28 md:h-28 w-20 h-20 p-5 rounded-full bg-[#F5F5F7] flex justify-center items-center"
          >
            <img
              src="@/assets/icons/tune.svg"
              class="lg:w-14 lg:h-14 w-9 h-8"
              alt=""
            />
          </button>
          <div
            class="text-left md:text-left lg:w-[22rem] lg:max-w-full ml-3 lg:p-5"
          >
            <p class="text-[#152123] font-normal md:text-base text-sm">
              희망하는 옵션을 모두 선택해서 <br />
              나만의 맞춤 여행 견적을 받아 보세요.
            </p>
            <div class="flex items-center justify-start">
              <button
                class="mt-2 bg-[#FF7100] px-4 md:py-1 rounded-full text-white text-sm font-medium flex items-center justify-center md:justify-start"
              >
                맞춤 여행 견적 신청
                <span
                  class="mdi mdi-chevron-right ml-1 text-[#FFFFFF] text-2xl"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider for mobile -->
    <hr class="w-full border-t border-[#E6E6E6] md:hidden" />

    <!-- Card 2 -->
    <div
      class="rounded-lg w-full md:w-auto border-0 md:border md:border-[#8E8D8D]"
    >
      <div class="md:py-5 lg:pl-16 px-2">
        <div
          class="flex flex-row md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <button
            class="md:w-28 md:h-28 w-20 h-20 p-5 rounded-full bg-[#F5F5F7] flex items-center justify-center"
          >
            <img
              src="@/assets/icons/pen.svg"
              class="lg:w-14 lg:h-14 w-9 h-8"
              alt=""
            />
          </button>
          <div
            class="text-left ml-3 md:text-left lg:w-[22rem] lg:max-w-full lg:p-5"
          >
            <p class="text-[#152123] font-normal md:text-base text-sm">
              앤가이드가 추천하는 코스에서 <br />
              원하는 옵션만 변경해 보세요.
            </p>
            <div class="flex items-center justify-start">
              <button
                @click="openModal"
                class="mt-2 bg-[#6592E2] px-4 md:py-1 rounded-full text-white text-sm font-medium flex items-center justify-center md:justify-start"
              >
                간편 견적 신청
                <span
                  class="mdi mdi-chevron-right ml-1 text-[#FFFFFF] text-2xl"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal">
    <div class="fixed inset-0 bg-[#00000080] z-50 no-interaction"></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <Prepared v-model:showModal="showModal" />
    </div>
  </div>
</template>

<script setup>
import Prepared from "../modals/prepared.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const handleClick = () => {
  router.push("/create-quotation");
};
</script>

<style scoped></style>
