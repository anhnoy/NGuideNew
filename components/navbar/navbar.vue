<template>
  <div>
    <header
      :class="{ 'no-interaction': isMobileMenuOpen }"
      class="border-b border-[#8E8D8D]"
    >
      <div class="container mx-auto">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex items-center mt-4">
            <img
              src="@/assets/images/logo.png"
              width="152"
              height="45"
              alt=""
            />
          </div>

          <div class="hidden md:block">
            <ul
              class="flex items-center space-x-12 p-4 mt-5 text-base text-[#132D5C] cursor-pointer"
            >
              <li class="hover:text-blue-600">간편 견적 신청</li>
              <li class="hover:text-blue-600">맞춤 여행 견적 신청</li>
              <li class="hover:text-blue-600">관광지 소개</li>
              <li class="hover:text-blue-600">여행 정보</li>
              <li class="hover:text-blue-600">이벤트</li>
              <li class="hover:text-blue-600">여행자 보험</li>
              <button
                class="text-[#FF7100] border border-[#FF7100] text-sm font-normal rounded-full px-3 flex items-center"
              >
                <span class="mdi mdi-paper-roll-outline text-2xl"></span>
                견적서 조회
              </button>
            </ul>
          </div>

          <!-- Mobile Menu Button (Visible on small screens) -->
          <button
            class="block md:hidden btn btn-square btn-ghost"
            @click="toggleMobileMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-5 w-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Background overlay and Mobile Menu -->
    <div v-if="isMobileMenuOpen">
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-[#00000080] z-40 no-interaction"
      ></div>

      <!-- Mobile Menu (Visible when isMobileMenuOpen is true) -->
      <div
        class="fixed top-0 right-0 h-full w-5/6 bg-[#F5F5F7] border-l border-gray-200 z-50 p-4 transition-transform transform translate-x-0 shadow-2xl"
      >
        <div class="flex items-center justify-between">
          <img
            src="@/assets/images/chatgpt.png"
            width="66"
            height="30"
            alt=""
          />
          <span
            class="mdi mdi-close text-[#152123] text-3xl cursor-pointer"
            @click="toggleMobileMenu"
          ></span>
        </div>
        <div class="mt-3">
          <button
            class="text-[#132D5C] text-sm font-normal border border-[#132D5C] rounded-full px-4 py-1 w-full flex items-center"
          >
            <span class="mdi mdi-paper-roll-outline text-2xl"></span>
            <span class="flex-grow text-center">견적서 조회</span>
          </button>
        </div>

        <div class="mt-3 flex justify-center space-x-12">
          <button
            class="md:w-24 md:h-24 w-24 h-24 rounded-full bg-[#ffffff] text-[#152123] font-medium text-xs"
          >
          <span class="mdi mdi-pencil text-[#FF7100] text-3xl"></span>
          <br>
            간편 견적 신청
          </button>
          <button
            class="md:w-24 md:h-24 w-24 h-24 rounded-full bg-[#ffffff] text-[#152123] font-medium text-xs"
          >
          <span class="mdi mdi-tune text-[#FF7100] text-3xl"></span>
          <br>
            맞춤 견적 신청
          </button>
        </div>

        <div
          class="flex items-center justify-between mt-3 pb-2 border-b border-[#8E8D8D]"
        >
          <h2 class="text-[#132D5C] font-bold text-sm">관광지 소개</h2>
          <span
            class="mdi mdi-chevron-right ml-1 text-[#132D5C] text-3xl"
          ></span>
        </div>

        <div class="space-y-4 mt-4">
          <p class="text-[#152123] font-normal text-xs">관광지</p>
          <p class="text-[#152123] font-normal text-xs">숙소</p>
          <p class="text-[#152123] font-normal text-xs">골프장</p>
        </div>

        <div
          class="flex items-center justify-between mt-3 pb-2 border-b border-[#8E8D8D]"
        >
          <h2 class="text-[#132D5C] font-bold text-sm">여행 정보</h2>
          <span
            class="mdi mdi-chevron-right ml-1 text-[#132D5C] text-3xl"
          ></span>
        </div>

        <div class="space-y-4 mt-4">
          <p class="text-[#152123] font-normal text-xs">자주 묻는 질문</p>
          <p class="text-[#152123] font-normal text-xs">라오스 여행 팁</p>
        </div>

        <div
          class="flex items-center justify-between mt-3 pb-2 border-b border-[#8E8D8D]"
        >
          <h2 class="text-[#132D5C] font-bold text-sm">이벤트</h2>
          <span
            class="mdi mdi-chevron-right ml-1 text-[#132D5C] text-3xl"
          ></span>
        </div>
        <div
          class="flex items-center justify-between mt-3 pb-2 border-b border-[#8E8D8D]"
        >
          <h2 class="text-[#132D5C] font-bold text-sm">여행자 보험</h2>
          <span
            class="mdi mdi-chevron-right ml-1 text-[#132D5C] text-3xl"
          ></span>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style scoped>
.no-interaction {
  pointer-events: none;
}
</style>
