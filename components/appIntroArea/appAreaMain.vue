<template>
  <section class="relative w-full bg-white">
    <div class="lg:w-[1920px] overflow-hidden relative lg:h-[716px] w-[360px] mx-auto">
      <!-- Slides Container -->
      <div
        class="relative flex lg:pt-[30px] transition-all duration-500 ease-in-out"
        :style="{ transform: `translateX(-${activeTab * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="flex flex-col items-center flex-shrink-0 w-full lg:flex-row lg:pr-[450px] lg:pl-[350px] lg:mt-[40px]"
        >
          <!-- Left Content -->
          <div
            class="text-center lg:text-left flex-1 lg:pl-[150px] lg:w-[404px] gap-[20px]"
          >
            <div class="flex justify-center lg:justify-start">
              <!-- Green Bar -->
              <div
                class="lg:w-[80px] lg:h-[12px] bg-[#3B6333] rounded-full mb-2 w-[40px] h-[6px]"
              ></div>
            </div>
            <p class="mb-1 lg:text-[30px] text-[#152123] text-[20px]">
              더욱 안전한 여행을 위한
            </p>
            <h2
              class="lg:text-[30px] text-[#3B6333] lg:mb-4 text-[20px] font-bold"
            >
              nGuide APP
            </h2>
            <p
              class="mb-4 text-[#152123] lg:w-[404px] lg:text-[24px] font-Regular text-[12px]"
            >
              {{ slide.text }}
            </p>
            <div class="flex justify-center gap-4 mb-3 lg:justify-start">
              <div @click="goToAppStore" class="cursor-pointer">
                <img
                  src="@/assets/icons/AppStore.svg"
                  class="lg:w-[170px] lg:h-[58px] w-[92px] h-[32px]"
                />
              </div>
              <div @click="goToPlayStore" class="cursor-pointer">
                <img
                  src="@/assets/icons/GooglePlay.svg"
                  class="lg:w-[170px] lg:h-[58px] w-[92px] h-[32px]"
                />
              </div>
            </div>
            <p
              class="lg:text-[16px] lg:w-[404px] text-[10px] text-[#152123] lg:mt-[40px]"
            >
              nGuide APP은 여행 확정 후 이용하실 수 있습니다.
            </p>
          </div>

          <!-- Phone Image -->
          <div class="flex justify-center flex-1">
            <img
              v-if="activeTab === 0"
              src="@/assets/images/nGuideApp.png"
              class="lg:w-[481px] w-[200px] object-cover mt-10 lg:mt-0"
              alt="위치와 거리 확인"
            />
            <img
              v-else-if="activeTab === 1"
              src="@/assets/images/nGuideApp2.png"
              class="lg:w-[481px] w-[200px] object-cover mt-10 lg:mt-0"
              alt="여행 일정 확인"
            />
            <img
              v-else
              src="@/assets/images/nGuideApp3.png"
              class="lg:w-[481px] w-[200px] object-cover mt-10 lg:mt-0"
              alt="가이드와 실시간 소통"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Arrows -->
     
    <div
      class="absolute lg:left-[300px] lg:right-[300px] left-5 right-5 transform -translate-y-1/2 pointer-events-none top-1/2 mt-5"
    >
      <div class="flex items-center justify-between">
        <button class="flex pointer-events-auto" @click="prevSlide">
          <img
            src="@/assets/icons/Arrow-left2.png"
            alt="Arrow-left"
            class="w-[30px] h-[20px] lg:w-[50px] lg:h-[36px] object-contain"
          />
        </button>
        <button class="flex pointer-events-auto" @click="nextSlide">
          <img
            src="@/assets/icons/Arrow-right2.png"
            alt="Arrow-right"
            class="w-[30px] h-[20px] lg:w-[50px] lg:h-[36px] object-contain"
          />
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bottom-0 left-0 justify-center hidden w-full lg:flex">
      <button
        v-for="(tab, index) in slides"
        :key="index"
        :class="[
          'w-[120px] lg:w-[400px] lg:h-[40px] h-[50px] text-[12px]',
          activeTab === index
            ? 'bg-[#3B6333] text-white'
            : 'bg-[#C2BCBC] text-white',
        ]"
        @click="activeTab = index"
      >
        <span
          class="block mx-auto lg:w-[120px] w-[80px] text-center leading-snug break-words"
        >
          {{ tab.tab }}
        </span>
      </button>
    </div>

    <!-- Tabs mobile -->
    <div class="flex justify-center lg:hidden">
      <!-- Button 1 -->
      <button
        :class="[
          'w-[120px] lg:w-[400px] h-[50px] lg:h-[40px] text-[12px] ',
          activeTab === 0
            ? 'bg-[#3B6333] text-white'
            : 'bg-[#C2BCBC] text-white',
        ]"
        @click="activeTab = 0"
      >
        <span
          class="block mx-auto w-[47px] text-center leading-snug break-words"
        >
          위치와 <br />거리 확인
        </span>
      </button>

      <!-- Button 2 -->
      <button
        :class="[
          'w-[120px] lg:w-[400px] h-[50px] lg:h-[40px] text-[12px] ',
          activeTab === 1
            ? 'bg-[#3B6333] text-white'
            : 'bg-[#C2BCBC] text-white',
        ]"
        @click="activeTab = 1"
      >
        <span
          class="block mx-auto w-[80px] text-center leading-snug break-words"
        >
          여행 일정 확인
        </span>
      </button>

      <!-- Button 3 -->
      <button
        :class="[
          'w-[120px] lg:w-[400px] h-[50px] lg:h-[40px] text-[12px] ',
          activeTab === 2
            ? 'bg-[#3B6333] text-white'
            : 'bg-[#C2BCBC] text-white',
        ]"
        @click="activeTab = 2"
      >
        <span
          class="block mx-auto w-[80px] text-center leading-snug break-words"
        >
          가이드와 실시간 소통
        </span>
      </button>
    </div>
    <!-- </div> -->
  </section>
</template>

<script setup>
import { ref } from "vue";

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

const activeTab = ref(0);

// Slides
const slides = ref([
  {
    tab: "위치와 거리 확인",
    text: "나의 위치에서 다음 목적지까지의 거리를 확인해 보세요.",
    // image: new URL("@/assets/images/nGuideApp.png", import.meta.url).href,
  },
  {
    tab: "여행 일정 확인",
    text: "여행 일정을 한 눈에 볼 수 있어요.",
    // image: new URL("@/assets/images/nGuideApp2.png", import.meta.url).href,
  },
  {
    tab: "가이드와 실시간 소통",
    text: "가이드 정보를 확인하고 전화로 연락할 수 있어요.",
    // image: new URL("@/assets/images/nGuideApp3.png", import.meta.url).href,
  },
]);

function prevSlide() {
  activeTab.value =
    (activeTab.value - 1 + slides.value.length) % slides.value.length;
}

function nextSlide() {
  activeTab.value = (activeTab.value + 1) % slides.value.length;
}
</script>
