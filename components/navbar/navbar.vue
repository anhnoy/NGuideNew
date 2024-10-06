<template>
  <div>
    <header
      :class="{ 'no-interaction': isMobileMenuOpen }"
      class="border-b border-[#8E8D8D]"
    >
      <div class="container mx-auto">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex items-center p-4">
            <router-link to="/">
              <img src="@/assets/icons/logo.png" class="w-24 h-8 lg:w-36"
            /></router-link>
          </div>

          <div class="hidden md:block">
            <ul
              class="flex items-center space-x-12 p-4 text-base text-[#132D5C] cursor-pointer"
            >
              <router-link to="/custom-travel">
                <li class="hover:text-blue-600">
                  맞춤 여행 견적 신청
                </li></router-link
              >
              <li @click="openModal" class="hover:text-blue-600">
                간편 견적 신청
              </li>
              <router-link to="/introduction">
                <li class="hover:text-blue-600">관광지 소개</li></router-link
              >
              <router-link to="/travel-information">
                <li class="hover:text-blue-600">여행 정보</li></router-link
              >
              <router-link to="/event">
                <li class="hover:text-blue-600">이벤트</li></router-link
              >
              <router-link to="/login-quotation">
                <button
                  class="text-[#FF7100] border border-[#FF7100] text-sm font-normal rounded-full px-3 py-1 flex items-center"
                >
                  <img
                    src="@/assets/icons/paper.png"
                    class="w-3.5 mx-2"
                    alt=""
                  />
                  견적서 조회
                </button></router-link
              >
            </ul>
          </div>

          <!-- Mobile Menu Button (Visible on small screens) -->
          <button
            class="block md:hidden btn btn-square btn-ghost"
            @click="toggleMobileMenu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5.33333C3 4.59695 3.59695 4 4.33333 4H19.6667C20.403 4 21 4.59695 21 5.33333C21 6.06971 20.403 6.66667 19.6667 6.66667H4.33333C3.59695 6.66667 3 6.06971 3 5.33333ZM3 12C3 11.2636 3.59695 10.6667 4.33333 10.6667H19.6667C20.403 10.6667 21 11.2636 21 12C21 12.7364 20.403 13.3333 19.6667 13.3333H4.33333C3.59695 13.3333 3 12.7364 3 12ZM3 18.6667C3 17.9303 3.59695 17.3333 4.33333 17.3333H19.6667C20.403 17.3333 21 17.9303 21 18.6667C21 19.403 20.403 20 19.6667 20H4.33333C3.59695 20 3 19.403 3 18.6667Z"
                fill="#132D5C"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Background overlay and Mobile Menu -->
    <div v-if="isMobileMenuOpen">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-[#00000080] z-40 no-interaction"></div>

      <!-- Mobile Menu (Visible when isMobileMenuOpen is true) -->
      <div
        class="fixed top-0 right-0 h-full w-5/6 bg-[#F5F5F7] border-l border-gray-200 z-50 p-4 transition-transform transform translate-x-0 shadow-2xl"
      >
        <div class="flex items-center justify-between">
          <router-link to="/">
            <img src="@/assets/icons/logo.png" class="w-24 h-8" alt="logo"
          /></router-link>
          <span
            class="mdi mdi-close text-[#152123] text-3xl cursor-pointer"
            @click="toggleMobileMenu"
          ></span>
        </div>
        <div class="mt-3">
          <router-link to="/login-quotation">
            <button
              class="text-[#132D5C] text-sm font-normal border border-[#132D5C] rounded-full px-4 py-1 w-full flex items-center"
            >
              <span class="mdi mdi-paper-roll-outline text-2xl"></span>
              <span class="flex-grow text-center">견적서 조회</span>
            </button></router-link
          >
        </div>

        <div class="mt-3 flex justify-center space-x-12">
          <button
            class="md:w-24 md:h-24 w-24 h-24 rounded-full bg-[#ffffff] text-[#152123] font-medium text-xs flex flex-col items-center justify-center"
          >
            <img
              src="@/assets/icons/tune.png"
              class="w-9 h-8"
              alt="Tune Icon"
            />
            <span class="mt-1">간편 견적 신청</span>
          </button>
          <button
            class="md:w-24 md:h-24 w-24 h-24 rounded-full bg-[#ffffff] text-[#152123] font-medium text-xs flex flex-col items-center justify-center"
          >
            <img src="@/assets/icons/pen.png" class="w-9 h-8" alt="Pen Icon" />
            <span class="mt-1">간편 견적 신청</span>
          </button>
        </div>

        <router-link to="introduction">
          <div
            class="flex items-center justify-between mt-3 pb-2 border-b border-[#8E8D8D]"
          >
            <h2 class="text-[#132D5C] font-bold text-sm">관광지 소개</h2>
            <span
              class="mdi mdi-chevron-right ml-1 text-[#132D5C] text-3xl"
            ></span>
          </div>
        </router-link>

        <div class="space-y-4 mt-4">
          <p class="text-[#152123] font-normal text-xs">관광지</p>
          <p class="text-[#152123] font-normal text-xs">숙소</p>
          <p class="text-[#152123] font-normal text-xs">골프장</p>
        </div>
        <router-link to="/travel-information">
          <div
            class="flex items-center justify-between mt-3 pb-2 border-b border-[#8E8D8D]"
          >
            <h2 class="text-[#132D5C] font-bold text-sm">여행 정보</h2>
            <span
              class="mdi mdi-chevron-right ml-1 text-[#132D5C] text-3xl"
            ></span></div
        ></router-link>

        <div class="space-y-4 mt-4">
          <p class="text-[#152123] font-normal text-xs">자주 묻는 질문</p>
          <p class="text-[#152123] font-normal text-xs">라오스 여행 팁</p>
        </div>
        <router-link to="/event">
          <div
            class="flex items-center justify-between mt-3 pb-2 border-b border-[#8E8D8D]"
          >
            <h2 class="text-[#132D5C] font-bold text-sm">이벤트</h2>
            <span
              class="mdi mdi-chevron-right ml-1 text-[#132D5C] text-3xl"
            ></span></div
        ></router-link>
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
  <div v-if="showModal">
    <div class="fixed inset-0 bg-[#00000080] z-50 no-interaction"></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <Prepared v-model:showModal="showModal" />
    </div>
  </div>
</template>

<script setup>
import Prepared from '../modals/prepared.vue';
const isMobileMenuOpen = ref(false);

const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
};
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style scoped>
.no-interaction {
  pointer-events: none;
}
</style>
