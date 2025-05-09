<template>
  <div class="mx-auto text-center text-black">
    <!-- PC Version -->
    <div class="hidden lg:block">
      <div class="p-6 mb-12">
        <p class="font-bold text-[30px] mt-1">
          더욱 안전한 여행을 위한 nGuide APP
        </p>
        <!-- Buttons -->
        <div class="flex justify-center gap-4 mb-6 flex-wrap mt-10">
          <button
            v-for="(label, index) in buttons"
            :key="index"
            @click="selected = index + 1"
            :class="[
              'px-4 py-2 rounded-3xl border text-[16px]',
              selected === index + 1
                ? 'bg-[#95C3DD] text-white '
                : 'bg-[#8E8D8D] text-white border-gray-300',
            ]"
          >
            {{ label }}
          </button>
        </div>

        <div
          class="bg-[#EFEFEF] w-[1280px] h-[800px] flex justify-center flex-col my-[50px] mx-auto"
        >
          <div>
            <div class="flex items-center justify-center gap-x-[150px]">
              <div class="flex items-center">
                <div>
                  <div v-if="selected === 1" class="text-[30px] font-bold">
                    <p>나의 위치에서 다음 목적지까지의</p>
                    <p>거리를 확인해 보세요.</p>
                  </div>
                  <div v-if="selected === 2" class="text-[30px] font-bold">
                    <p>여행 일정을 한 눈에 볼 수 있어요.</p>
                  </div>
                  <div v-if="selected === 3" class="text-[30px] font-bold">
                    <p>가이드 정보를 확인하고 전화로</p>
                    <p>연락할 수 있어요.</p>
                  </div>
                  <div class="mt-8">
                    <div
                      class="space-x-5 h-[70px] flex items-center justify-center"
                    >
                      <button
                        class="rounded-lg w-[170px] h-[58px]"
                        @click="goToAppStore"
                      >
                        <img
                          src="@/assets/icons/Appstore.svg"
                          class="w-[170px] h-[58px]"
                        />
                      </button>
                      <button
                        class="rounded-lg w-[170px] h-[58px]"
                        @click="goToPlayStore"
                      >
                        <img
                          src="@/assets/icons/GooglePlay.svg"
                          class="w-[170px] h-[58px]"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <!-- Images -->
                <div class="flex justify-center mt-10">
                  <img
                    v-if="selected === 1"
                    src="../../assets/images/app-area1.png"
                    alt="위치와 거리 확인"
                    class="w-[345px] h-[708px]"
                  />
                  <img
                    v-if="selected === 2"
                    src="../../assets/images/app-area2.png"
                    alt="여행 일정 확인"
                    class="w-[345px] h-[708px]"
                  />
                  <img
                    v-if="selected === 3"
                    src="../../assets/images/app-area3.png"
                    alt="가이드와 실시간 소통"
                    class="w-[345px] h-[708px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="text-[16px] float-start ml-5">
              <p>nGuide APP은 여행 확정 후 이용하실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Version -->
    <div class="lg:hidden">
      <div class="p-6 mb-10">
        <p class="font-bold text-[18px] mt-1">
          더욱 안전한 여행을 위한 nGuide APP
        </p>
        <!-- Buttons -->
        <div class="flex justify-center gap-2 mb-8 flex-wrap mt-10">
          <button
            v-for="(label, index) in buttons"
            :key="index"
            @click="selected = index + 1"
            :class="[
              'px-2 py-1 rounded-3xl border text-[10px]',
              selected === index + 1
                ? 'bg-[#95C3DD] text-white '
                : 'bg-[#8E8D8D] text-white border-gray-300',
            ]"
          >
            {{ label }}
          </button>
        </div>

        <div
          class="bg-[#EFEFEF] w-[328px] h-[314px] flex justify-center flex-col mx-auto"
        >
          <div>
            <div class="flex items-center justify-center gap-x-[40px]">
              <div class="items-center">
                <div class="flex justify-center">
                  <!-- Images -->
                  <div class="flex justify-center">
                    <img
                      v-if="selected === 1"
                      src="../../assets/images/app-area1.png"
                      alt="위치와 거리 확인"
                      class="w-[89px] h-[183px]"
                    />
                    <img
                      v-if="selected === 2"
                      src="../../assets/images/app-area2.png"
                      alt="여행 일정 확인"
                      class="w-[89px] h-[183px]"
                    />
                    <img
                      v-if="selected === 3"
                      src="../../assets/images/app-area3.png"
                      alt="가이드와 실시간 소통"
                      class="w-[89px] h-[183px]"
                    />
                  </div>
                </div>
                <div class="mt-2">
                  <div v-if="selected === 1" class="text-[10px] font-bold">
                    <p>나의 위치에서 다음 목적지까지의</p>
                    <p>거리를 확인해 보세요.</p>
                  </div>
                  <div v-if="selected === 2" class="text-[10px] font-bold">
                    <p>여행 일정을 한 눈에 볼 수 있어요.</p>
                  </div>
                  <div v-if="selected === 3" class="text-[10px] font-bold">
                    <p>가이드 정보를 확인하고 전화로</p>
                    <p>연락할 수 있어요.</p>
                  </div>
                  <div class="">
                    <div
                      class="space-x-3 h-[40px] flex items-center justify-center"
                    >
                      <button
                        class="rounded-lg w-[44px] h-[15px]"
                        @click="goToAppStore"
                      >
                        <img
                          src="@/assets/icons/Appstore.svg"
                          class="w-[44px] h-[15px]"
                        />
                      </button>
                      <button
                        class="rounded-lg w-[44px] h-[15px]"
                        @click="goToPlayStore"
                      >
                        <img
                          src="@/assets/icons/GooglePlay.svg"
                          class="w-[44px] h-[15px]"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div class="text-[6px] float-start ml-2">
              <p>nGuide APP은 여행 확정 후 이용하실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selected = ref(1);
const buttons = ["위치와 거리 확인", "여행 일정 확인", "가이드와 실시간 소통"];
const goToAppStore = () => {
  window.open(
    "https://apps.apple.com/kr/app/%EC%95%A4%EA%B0%80%EC%9D%B4%EB%93%9C-nguide/id6738574891",
    "_blank"
  );
};
const goToPlayStore = () => {
  window.open(
    "https://play.google.com/store/apps/details?id=com.andguide&pli=1",
    "_blank"
  );
};
</script>
