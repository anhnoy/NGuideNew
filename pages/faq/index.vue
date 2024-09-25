<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <div class="card">
        <!-- tab 1 -->
        <div class="tabs flex justify-center space-x-12 m-6">
          <button
            @click="tab = 1"
            :class="{
              'text-[#FF9900] border-b-2 border-[#FF9900] text-lg font-bold':
                tab === 1,
              'text-[#5E5F61] text-lg font-normal': tab !== 1,
            }"
            class="tab tab-bordered"
          >
            자주묻는 질문
          </button>
          <button
            @click="tab = 2"
            :class="{
              'text-[#FF9900] border-b-2 border-[#FF9900] text-lg font-bold':
                tab === 2,
              'text-[#5E5F61] text-lg font-normal': tab !== 2,
            }"
            class="tab tab-bordered"
          >
            라오스 여행 팁
          </button>
        </div>

        <div class="flex items-center lg:justify-center space-x-4 mx-4">
          <button
            @click="activeButton = 1"
            :class="{
              'bg-[#6592E2]': activeButton === 1,
              'bg-[#C0C0C0]': activeButton !== 1,
            }"
            class="text-[#ffffff] text-sm font-medium rounded-full w-16 h-10"
          >
            항목1
          </button>
          <button
            @click="activeButton = 2"
            :class="{
              'bg-[#6592E2]': activeButton === 2,
              'bg-[#C0C0C0]': activeButton !== 2,
            }"
            class="text-[#ffffff] text-sm font-medium rounded-full w-16 h-10"
          >
            항목2
          </button>
          <button
            @click="activeButton = 3"
            :class="{
              'bg-[#6592E2]': activeButton === 3,
              'bg-[#C0C0C0]': activeButton !== 3,
            }"
            class="text-[#ffffff] text-sm font-medium rounded-full w-16 h-10"
          >
            항목3
          </button>
        </div>

        <div v-if="tab === 1">
          <div class="m-4">
            <div class="flex items-center justify-between my-4">
              <span class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"></span>
              <p class="text-[#132D5C] font-medium text-sm lg:text-xl">
                예약 시 영문 이름이 여권과 달라도 상관없나요?
              </p>
              <span
                :class="isOpen1 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen1 = !isOpen1"
                class="text-[#152123] text-2xl mdi"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>

            <div v-if="isOpen1" class="border-b border-[#C0C0C0] py-4">
              <p class="text-[#152123] font-light text-xs">
                국제 항공 운송법 기준, 탑승객의 영문 이름은 여권의 이름과 정확히
                일치해야합니다.
              </p>
              <p class="text-[#152123] text-xs font-light mt-3">
                [ 항공권 결제 전 이름 변경 ]
              </p>
              <p class="text-xs text-[#152123] font-light">
                • 변경 불가 항공사
              </p>
              <p class="text-xs font-light text-[#152123]">
                - 기존 예약을 취소하고 재예약해야 합니다.
              </p>
              <p class="text-xs font-light text-[#152123]">
                - 재예약 시 항공료가 상이할 수 있습니다.
              </p>
              <p class="text-[#152123] text-xs font-light">
                • 변경 가능 항공사 - 항공사 확인 후 변경 가능합니다.
              </p>
            </div>

            <div class="flex items-start justify-between my-4">
              <span class="mdi mdi-help-box text-[#152123] text-2xl "></span>
              <div>
                <p class="text-[#132D5C] font-medium text-sm">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
                <p class="text-[#132D5C] font-medium text-sm">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
                <p class="text-[#132D5C] font-medium text-sm">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <span
                :class="isOpen2 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen2 = !isOpen2"
                class="text-[#152123] text-2xl mdi"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen2" class="border-b border-[#C0C0C0] py-4"></div>

            <div class="flex items-center justify-between my-4">
              <span class="mdi mdi-help-box text-[#152123] text-2xl"></span>
              <p class="text-[#132D5C] font-medium text-sm">
                예약 시 영문 이름이 여권과 달라도 상관없나요?
              </p>
              <span
                :class="isOpen3 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen3 = !isOpen3"
                class="text-[#152123] text-2xl mdi"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen3" class="py-4 border-b border-[#C0C0C0]"></div>

            <div class="flex items-center justify-between my-4">
              <span class="mdi mdi-help-box text-[#152123] text-2xl"></span>
              <p class="text-[#132D5C] font-medium text-sm">
                예약 시 영문 이름이 여권과 달라도 상관없나요?
              </p>
              <span
                :class="isOpen4 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen4 = !isOpen4"
                class="text-[#152123] text-2xl mdi"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen4" class="py-4 border-b border-[#C0C0C0]"></div>

            <div class="flex items-center justify-between my-4">
              <span class="mdi mdi-help-box text-[#152123] text-2xl"></span>
              <p class="text-[#132D5C] font-medium text-sm">
                예약 시 영문 이름이 여권과 달라도 상관없나요?
              </p>
              <span
                :class="isOpen5 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen5 = !isOpen5"
                class="text-[#152123] text-2xl mdi"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen5" class="py-4 border-b border-[#c0c0c0]"></div>

            <div class="flex items-center justify-between my-4">
              <span class="mdi mdi-help-box text-[#152123] text-2xl"></span>
              <p class="text-[#132D5C] font-medium text-sm">
                예약 시 영문 이름이 여권과 달라도 상관없나요?
              </p>
              <span
                :class="isOpen6 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen6 = !isOpen6"
                class="text-[#152123] text-2xl mdi"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>

            <div v-if="isOpen6" class="py-4 border-b border-[#C0C0C0]"></div>
          </div>
        </div>

        <!-- tab 2 -->
        <div v-if="tab === 2">
          <div class="m-4">
            <div class="border-2 border-[#FF9900]">
              <div class="p-4 flex items-start lg:items-center">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p class="text-[#152123] text-sm font-medium ml-2">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <div class="border-dashed mx-4"></div>

              <div class="flex p-4">
                <span class="mdi mdi-alpha-t-circle-outline text-[#FF9900] text-3xl"></span>
                <p class="text-[#152123] text-xs font-light ml-2">
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다. <br />
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다. <br />
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다. <br />
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다.
                </p>
              </div>
            </div>

            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-start lg:items-center">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p class="text-[#152123] text-sm font-medium ml-2">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
            </div>
            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-start lg:items-center">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p class="text-[#152123] text-sm font-medium ml-2">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
            </div>
            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-start lg:items-center">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p class="text-[#152123] text-sm font-medium ml-2">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
            </div>
            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-start lg:items-center">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p class="text-[#152123] text-sm font-medium ml-2">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";

const activeButton = ref(1);
const tab = ref(1);
const isOpen1 = ref(false);
const isOpen2 = ref(false);
const isOpen3 = ref(false);
const isOpen4 = ref(false);
const isOpen5 = ref(false);
const isOpen6 = ref(false);

const items = ref(Array(6).fill(null));

const isMobile = ref(false);
const visibleItems = ref([]);

const updateViewport = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 640;
    visibleItems.value = isMobile.value
      ? items.value.slice(0, 4)
      : items.value.slice(0, 6);
  }
};
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 0 auto;
}
.border-dashed {
  border-top: 1px dashed #8E8D8D;
}
</style>
