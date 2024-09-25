<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 lg:bg-[#F5F5F7]">
      <div class="card">
        <!-- tab 1 -->
        <div
          class="tabs flex justify-center space-x-12 m-6 lg:border-b lg:border-[#C0C0C0]"
        >
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

        <div class="flex items-center lg:justify-center space-x-4 mx-4 lg:my-4">
          <button
            @click="activeButton = 1"
            :class="{
              'bg-[#6592E2]': activeButton === 1,
              'bg-[#C0C0C0]': activeButton !== 1,
            }"
            class="text-[#ffffff] text-sm font-medium rounded-full w-16 h-10 lg:w-24"
          >
            항목1
          </button>
          <button
            @click="activeButton = 2"
            :class="{
              'bg-[#6592E2]': activeButton === 2,
              'bg-[#C0C0C0]': activeButton !== 2,
            }"
            class="text-[#ffffff] text-sm font-medium rounded-full w-16 h-10 lg:w-24"
          >
            항목2
          </button>
          <button
            @click="activeButton = 3"
            :class="{
              'bg-[#6592E2]': activeButton === 3,
              'bg-[#C0C0C0]': activeButton !== 3,
            }"
            class="text-[#ffffff] text-sm font-medium rounded-full w-16 h-10 lg:w-24"
          >
            항목3
          </button>
        </div>

        <div v-if="tab === 1">
          <div class="m-4">
            <div class="flex items-center justify-between my-4">
              <div class="flex items-center">
                <span
                  class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"
                ></span>
                <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <span
                :class="isOpen1 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen1 = !isOpen1"
                class="text-[#152123] text-2xl mdi lg:text-4xl"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>

            <div
              v-if="isOpen1"
              class="border-b border-[#C0C0C0] py-4 lg:overflow-auto lg:h-48 lg:bg-white lg:border-b-0 lg:p-6"
            >
              <p class="text-[#152123] font-light text-xs lg:text-sm">
                국제 항공 운송법 기준, 탑승객의 영문 이름은 여권의 이름과 정확히
                일치해야합니다.
              </p>
              <p class="text-[#152123] text-xs font-light mt-3 lg:text-sm">
                [ 항공권 결제 전 이름 변경 ]
              </p>
              <p class="text-xs text-[#152123] font-light lg:text-sm">
                • 변경 불가 항공사
              </p>
              <p class="text-xs font-light text-[#152123] lg:text-sm">
                - 기존 예약을 취소하고 재예약해야 합니다.
              </p>
              <p class="text-xs font-light text-[#152123] lg:text-sm">
                - 재예약 시 항공료가 상이할 수 있습니다.
              </p>
              <p class="text-[#152123] text-xs font-light lg:text-sm">
                • 변경 가능 항공사 - 항공사 확인 후 변경 가능합니다.
              </p>
            </div>

            <div class="flex items-start justify-between my-4">
              <div class="flex">
                <span
                  class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"
                ></span>
                <div class="ml-5">
                  <p class="text-[#132D5C] font-medium text-sm lg:text-xl">
                    예약 시 영문 이름이 여권과 달라도 상관없나요?
                  </p>
                  <p class="text-[#132D5C] font-medium text-sm lg:hidden">
                    예약 시 영문 이름이 여권과 달라도 상관없나요?
                  </p>
                  <p class="text-[#132D5C] font-medium text-sm lg:hidden">
                    예약 시 영문 이름이 여권과 달라도 상관없나요?
                  </p>
                </div>
              </div>
              <span
                :class="isOpen2 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen2 = !isOpen2"
                class="text-[#152123] text-2xl mdi lg:text-4xl lg:text-black"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen2" class="border-b border-[#C0C0C0] py-4"></div>

            <div class="flex items-center justify-between my-4">
              <div class="flex items-center">
                <span
                  class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"
                ></span>
                <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <span
                :class="isOpen3 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen3 = !isOpen3"
                class="text-[#152123] text-2xl mdi lg:text-4xl lg:text-black"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen3" class="py-4 border-b border-[#C0C0C0]"></div>

            <div class="flex items-center justify-between my-4">
              <div class="flex items-center">
                <span
                  class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"
                ></span>
                <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <span
                :class="isOpen4 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen4 = !isOpen4"
                class="text-[#152123] text-2xl mdi lg:text-4xl lg:text-black"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen4" class="py-4 border-b border-[#C0C0C0]"></div>

            <div class="flex items-center justify-between my-4">
              <div class="flex items-center">
                <span
                  class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"
                ></span>
                <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <span
                :class="isOpen5 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen5 = !isOpen5"
                class="text-[#152123] text-2xl mdi lg:text-4xl"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>
            <div v-if="isOpen5" class="py-4 border-b border-[#c0c0c0]"></div>

            <div class="flex items-center justify-between my-4">
              <div class="flex items-center">
                <span
                  class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"
                ></span>
                <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <span
                :class="isOpen6 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="isOpen6 = !isOpen6"
                class="text-[#152123] text-2xl mdi lg:text-4xl lg:text-black"
              ></span>
            </div>
            <div class="border-b border-[#C0C0C0]"></div>

            <div v-if="isOpen6" class="py-4 border-b border-[#C0C0C0]"></div>
          </div>
        </div>

        <!-- tab 2 -->
        <div v-if="tab === 2">
          <div class="m-4">
            <div
              :class="
                isOpenLao1
                  ? 'border-2 border-[#FF9900]'
                  : 'border border-[#C0C0C0]'
              "
            >
              <div
                class="p-4 flex items-center lg:px-10"
                @click="isOpenLao1 = !isOpenLao1"
              >
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p
                  class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5"
                >
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
              <div v-if="isOpenLao1" class="border-dashed mx-4 lg:hidden"></div>
              <div
                v-if="isOpenLao1"
                class="border-0 lg:border border-[#C0C0C0] mx-10"
              ></div>

              <div v-if="isOpenLao1" class="flex p-4 lg:mx-5">
                <span
                  class="mdi mdi-alpha-t-circle-outline text-[#FF9900] text-3xl"
                ></span>
                <p class="text-[#152123] text-xs font-light ml-2 lg:text-lg">
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다.
                  <br class="lg:hidden" />
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다.
                  <br class="lg:hidden" />
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다.
                  <br class="lg:hidden" />
                  네 상관없습니다. 네 상관없습니다. 네 상관없습니다.
                </p>
              </div>
            </div>

            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-center lg:px-10">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p
                  class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5"
                >
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
            </div>
            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-center lg:px-10">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p
                  class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5"
                >
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
            </div>
            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-center lg:px-10">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p
                  class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5"
                >
                  예약 시 영문 이름이 여권과 달라도 상관없나요?
                </p>
              </div>
            </div>
            <div class="border border-[#C0C0C0] my-5">
              <div class="p-5 flex items-center lg:px-10">
                <span
                  class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                ></span>
                <p
                  class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5"
                >
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

const isOpenLao1 = ref(false);
</script>

<style scoped>
.card {
  max-width: 1200px;
  margin: 50px auto;
}
.border-dashed {
  border-top: 1px dashed #8e8d8d;
}
</style>
