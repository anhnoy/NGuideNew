<template>
  <div>
    <header :class="{ 'no-interaction': isMobileMenuOpen }" class="border-b border-[#A8A3A3]">
      <div class="card">
        <div class="flex justify-between h-[80px] items-center">
          <!-- Logo -->
          <div @click="home" class="flex items-center p-4 md:p-0">
              <img src="@/assets/icons/auto.svg" title="Home" class="w-24 h-8 md:w-36 cursor-pointer" />
          </div>

          <div class="hidden lg:block">
            <ul @mouseenter="handleMouseEnter"
              class="flex items-center space-x-12 text-base text-[#2F312A] cursor-pointer">
              <router-link to="/create-quotation">
                <li>
                  맞춤 여행 견적 신청
                </li>
              </router-link>
              <router-link to="/easy-create-quotation">
                <li>
                  간편 견적 신청
                </li>
              </router-link>
              <router-link to="/introduction">
                <li>관광지 소개</li>
              </router-link>
              <router-link to="/faq">
                <li>여행 정보</li>
              </router-link>
              <router-link to="/event">
                <li>이벤트</li>
              </router-link>
              <router-link to="/login-quotation">
                <button
                  class="text-[#6EBC30] border border-[#6EBC30] text-sm font-normal rounded-full px-3 py-1 flex items-center">
                  <img src="@/assets/icons/paper.svg" class="w-3.5 mx-2" alt="" />
                  견적서 조회
                </button></router-link>
            </ul>
          </div>

          <!-- Mobile Menu Button (Visible on small screens) -->
          <button class="block lg:hidden btn btn-square btn-ghost" @click="toggleMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 5.33333C3 4.59695 3.59695 4 4.33333 4H19.6667C20.403 4 21 4.59695 21 5.33333C21 6.06971 20.403 6.66667 19.6667 6.66667H4.33333C3.59695 6.66667 3 6.06971 3 5.33333ZM3 12C3 11.2636 3.59695 10.6667 4.33333 10.6667H19.6667C20.403 10.6667 21 11.2636 21 12C21 12.7364 20.403 13.3333 19.6667 13.3333H4.33333C3.59695 13.3333 3 12.7364 3 12ZM3 18.6667C3 17.9303 3.59695 17.3333 4.33333 17.3333H19.6667C20.403 17.3333 21 17.9303 21 18.6667C21 19.403 20.403 20 19.6667 20H4.33333C3.59695 20 3 19.403 3 18.6667Z"
                fill="#132D5C" />
            </svg>
          </button>
        </div>
      </div>
    </header>
    <div @mouseenter="isHovered = true" @mouseleave="isHovered = false">
      <transition name="fade">
        <div v-show="isHovered"
          class="bg-[#2F312A] h-36 hidden md:block smooth-transition absolute top-18 right-0 left-0 z-50">
          <div class="card mx-auto">
            <div class="flex justify-end">
              <ul class="flex mt-5 space-x-16 text-[#FFFFFF] font-normal text-sm text-center cursor-pointer">
                <router-link to="/create-quotation">
                  <li class="hover:text-[#6EBC30]">맞춤 여행 견적 신청</li>
                </router-link>

                <router-link to="/easy-create-quotation">
                  <li class="hover:text-[#6EBC30]">
                    간편 견적 신청
                  </li>
                </router-link>
              </ul>
              <ul class="mx-16 mt-5 space-y-4 text-white text-sm font-normal text-center cursor-pointer">
                <li @click="handleFetch(1, 1)" class="hover:text-[#6EBC30]">
                  관광지
                </li>
                <li @click="handleFetch(3, 2)" class="hover:text-[#6EBC30]">
                  숙소
                </li>
                <li @click="handleFetch(5, 3)" class="hover:text-[#6EBC30]">
                  골프장
                </li>
              </ul>
              <ul class="mr-6 mt-5 space-y-4 text-white text-sm font-normal text-center cursor-pointer">
                <li @click="fetchFaq(1, '자주 묻는 질문')" class="hover:text-[#6EBC30]">
                  자주 묻는 질문
                </li>
                <li @click="fetchFaqLao(1, '라오스 여행 팁')" class="hover:text-[#6EBC30]">
                  라오스 여행 팁
                </li>
              </ul>
              <ul class="mx-6 mt-5 text-white text-sm font-normal text-center cursor-pointer">
                <router-link to="/event">
                  <li class="hover:text-[#6EBC30]">이벤트</li>
                </router-link>
              </ul>
              <ul class="mx-3"></ul>
              <ul class="mx-16"></ul>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="isMobileMenuOpen">
      <div class="fixed inset-0 bg-[#00000080] z-40 no-interaction"></div>
      <div
        class="fixed top-0 right-0 h-full w-5/6 bg-[#2F312A] z-50 p-5 transition-transform transform translate-x-0 shadow-2xl overflow-y-auto max-h-full">
        <div class="flex items-center justify-between cursor-pointer">
          <router-link to="/">
            <img src="@/assets/icons/logoMobile.svg" class="w-24 h-8" alt="logo" /></router-link>
          <img @click="toggleMobileMenu" src="@/assets/icons/close.svg" class="w-[24px] h-[24px]">
        </div>

        <div class="m-7 flex justify-center space-x-12 cursor-pointer">
          <router-link to="/create-quotation">
            <img src="@/assets/icons/tuneMobile.svg" class="w-[100px] h-[100px]" alt="Tune Icon" />
          </router-link>
          <router-link to="easy-create-quotation">
            <img src="@/assets/icons/penMobile.svg" class="w-[100px] h-[100px]" alt="Pen Icon" /></router-link>
        </div>

        <router-link to="introduction">
          <div class="flex items-center justify-between mt-7 pb-2 border-b border-[#E6E6E640] cursor-pointer">
            <h2 class="text-[#FFFFFF] font-bold text-sm">관광지 소개</h2>
            <img src="@/assets/icons/nextLink.svg" alt="" class="w-[16px] h-[16px]">
          </div>
        </router-link>

        <div class="space-y-4 mt-7 px-3 cursor-pointer">
          <p @click="handleFetch(1, 1)" class="text-[#FFFFFF] font-normal text-xs pt-2">
            관광지
          </p>
          <p @click="handleFetch(3, 2)" class="text-[#FFFFFF] font-normal text-xs pt-2">
            숙소
          </p>
          <p @click="handleFetch(4, 3)" class="text-[#FFFFFF] font-normal text-xs pt-2">
            골프장
          </p>
        </div>
        <router-link to="/faq">
          <div class="flex items-center justify-between mt-7 pb-2 border-b border-[#E6E6E640] cursor-pointer">
            <h2 class="text-[#FFFFFF] font-bold text-sm">여행 정보</h2>
            <img src="@/assets/icons/nextLink.svg" alt="" class="w-[16px] h-[16px]">
          </div>
        </router-link>

        <div class="space-y-4 mt-7 px-3 cursor-pointer">
          <p @click="fetchFaq(1, '자주 묻는 질문')" class="text-[#FFFFFF] font-normal text-xs pt-2">
            자주 묻는 질문
          </p>
          <p @click="fetchFaqLao(1, '라오스 여행 팁')" class="text-[#FFFFFF] font-normal text-xs pt-2">
            라오스 여행 팁
          </p>
        </div>
        <router-link to="/event">
          <div class="flex items-center justify-between mt-7 pb-2 border-b border-[#E6E6E640] cursor-pointer">
            <h2 class="text-[#FFFFFF] font-bold text-sm">이벤트</h2>
            <img src="@/assets/icons/nextLink.svg" alt="" class="w-[16px] h-[16px]">
          </div>
        </router-link>

        <router-link to="/login-quotation">
          <div class="flex justify-center mt-10 cursor-pointer">
            <button
              class="text-white text-sm font-medium bg-[#6EBC30] flex items-center p-5 h-[40px] w-[240px] rounded-full">
              <img src="@/assets/icons/paperMobile.svg" alt="Paper Mobile Icon">
              <span class="flex-grow ">견적서조회</span>
            </button>
          </div>
        </router-link>
      </div>


    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const isMobileMenuOpen = ref(false);
const router = useRouter();
const tab = ref(1);
const isHovered = ref(false);


const props = defineProps({
  fetchFilterCity: {
    type: Function,
    required: true,
  },
  fetchFaq: {
    type: Function,
    required: true,
  },
  fetchFaqLao: {
    type: Function,
    required: true,
  },
});

const handleFetch = async (tourFilterId, tabs) => {
  router.push("/introduction");
  try {
    await props.fetchFilterCity(tourFilterId, tabs);
    isMobileMenuOpen.value = false;
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};

const fetchFaq = async (fqt_id, faq_type_name_kr) => {
  router.push("/faq");
  try {
    await props.fetchFaq(fqt_id, faq_type_name_kr);
    tab.value = 1;
    isMobileMenuOpen.value = false;
  } catch (error) {
    console.error("Error fetching faq:", error);
  }
};

const fetchFaqLao = async (fqtl_id, faq_type_name_kr) => {
  router.push("/faq");
  try {
    await props.fetchFaqLao(fqtl_id, faq_type_name_kr);
    tab.value = 2;
    isMobileMenuOpen.value = false;
  } catch (error) {
    console.error("Error fetching faqLao:", error);
  }
};


const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const home = () => {
  window.location.href = "/";
};


</script>

<style scoped>
.no-interaction {
  pointer-events: none;
}

.card {
  max-width: 1280px;
  margin: 0 auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.fade-enter,
.fade-leave-to
  {
  opacity: 0;
  visibility: hidden;
}
</style>
