<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 lg:bg-[#F5F5F7]">
      <div class="card">
        <div class="hidden lg:flex items-center space-x-2">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span
          ></router-link>
          <span class="text-[#152123] text-sm font-normal">여행 정보</span>
          <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span>
          <span v-if="tab === 1" class="text-[#152123] text-sm font-normal"
            >자주묻는 질문</span
          >
          <span v-if="tab === 2" class="text-[#152123] text-sm font-normal"
            >라오스 여행 팁</span
          >
        </div>

        <div class="flex justify-center">
          <h1 class="text-[#152123] text-3xl font-bold">여행 정보</h1>
        </div>
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
            <div v-for="(faq, index) in store.faqs" :key="faq.faq_id">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span
                    class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"
                  ></span>
                  <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                    {{ faq.question }}
                  </p>
                </div>
                <span
                  :class="
                    isOpen === index ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  "
                  @click="isOpen = isOpen === index ? null : index"
                  class="text-[#152123] text-2xl mdi lg:text-4xl"
                ></span>
              </div>
              hg
              <div
                v-if="isOpen === index"
                class="border-b border-[#C0C0C0] py-4"
              >
                <p class="text-[#152123] font-light text-xs lg:text-sm">
                  {{ faq.answer }}
                </p>
              </div>
              <div class="border-b border-[#C0C0C0]"></div>
            </div>
          </div>
        </div>

        <!-- tab 2 -->
        <div v-if="tab === 2">
          <div v-if="store.faqLaos && store.faqLaos.length > 0" class="m-4">
            <div
              v-for="(faqLao, index) in store.faqLaos"
              :key="faqLao.faq_lao_id"
            >
              <div
                :class="
                  isOpenLao
                    ? 'border-2 border-[#FF9900]'
                    : 'border border-[#C0C0C0]'
                "
              >
                <div
                  class="p-4 flex items-center lg:px-10"
                  @click="isOpenLao = !isOpenLao"
                >
                  <span
                    class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"
                  ></span>
                  <p
                    class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5"
                  >
                    {{ faqLao.question }}
                  </p>
                </div>
                <div
                  v-if="isOpenLao"
                  class="border-dashed mx-4 lg:hidden"
                ></div>
                <div
                  v-if="isOpenLao"
                  class="border-0 lg:border border-[#C0C0C0] mx-10"
                ></div>

                <div v-if="isOpenLao" class="flex items-center p-4 lg:mx-5">
                  <span
                    class="mdi mdi-alpha-t-circle-outline text-[#FF9900] text-3xl"
                  ></span>
                  <p class="text-[#152123] text-xs font-light ml-2 lg:text-lg">
                    {{ faqLao.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-else>
            <p class="text-center text-gray-500">
              No data available for Laos FAQs
            </p>
          </div> -->
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script setup>
import Navbar from "@/components/navbar/navbar.vue";
import Footer from "@/components/footer/footer.vue";
import { useFaqStore } from "@/stores/faq.store";

const activeButton = ref(1);
const tab = ref(1);
const isOpen = ref(false);
const isOpenLao = ref(false);

const store = useFaqStore();

const fetchFaq = async () => {
  const faqId = 2;
  const params = { faq_id: faqId };
  try {
    console.log("Fetching FAQ with ID:", params.faq_id);
    await store.getFaq(params.faq_id);
    console.log("Fetched FAQs:", store.faqs);
  } catch (error) {
    console.log("Error fetching FAQ data:", error);
  }
};
fetchFaq();

const fetchFaqLao = async () => {
  const faqLaoId = 2;
  const params = { faq_lao_id: faqLaoId };
  try {
    await store.getFaqLao(params.faq_lao_id);
    console.log("Fetched FAQ Lao:", store.faqLaos);
  } catch (error) {
    console.log("Error fetch faq lao", error);
  }
};

fetchFaqLao();
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

<style scoped>
.card {
  max-width: 1200px;
  margin: 50px auto;
}
.border-dashed {
  border-top: 1px dashed #8e8d8d;
}
</style>
