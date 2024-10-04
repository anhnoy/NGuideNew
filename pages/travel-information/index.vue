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

        <div
          class="tabs flex justify-center space-x-12 my-6 lg:border-b lg:border-[#C0C0C0]"
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



        <!-- <div class="flex items-center lg:justify-center space-x-4 mx-4 lg:my-4">
          <button
            v-for="faq in store.faqs"
            :key="faq.faq_id"
            @click="faq_type = faq.faq_type"
            :class="{
              'bg-[#6592E2]': faq_type === faq.faq_type,
              'bg-[#C0C0C0]': faq_type !== faq.faq_type,
            }"
            class="text-[#ffffff] text-sm font-medium rounded-full w-auto h-10  px-3"
          >
            {{ faq.faq_type_faq_type.faq_type_name_kr }}
          </button>
        </div> -->

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

        <!-- faq -->
        <div v-if="tab === 1">
          <div v-for="(faq, index) in store.faqs" :key="faq.faqType">
            <div class="m-4 lg:m-0">
              <div class="flex items-center justify-between my-4">
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

        <!-- trip lao -->
        <div v-if="tab === 2">
          <div
            v-if="store.faqLaos && store.faqLaos.length > 0"
            class="m-4 lg:m-0"
          >
            <div
              v-for="(faqLao, index) in store.faqLaos"
              :key="faqLao.faq_lao_id"
            >
              <div
                class="my-4"
                :class="
                  isOpenLao[index]
                    ? 'border-2 border-[#FF9900]'
                    : 'border border-[#C0C0C0]'
                "
              >
                <div
                  class="p-4 flex items-center lg:px-10"
                  @click="isOpenLao[index] = !isOpenLao[index]"
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
                  v-if="isOpenLao[index]"
                  class="border-dashed mx-4 lg:hidden"
                ></div>
                <div
                  v-if="isOpenLao[index]"
                  class="border-0 lg:border border-[#C0C0C0] mx-10"
                ></div>

                <div
                  v-if="isOpenLao[index]"
                  class="flex items-center p-4 lg:mx-5"
                >
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

// const faq_type = ref([]);
const tab = ref(1);
const isOpen = ref([]);
const isOpenLao = ref([]);
const store = useFaqStore();
const page = ref(0);
const size = ref(10);
const faqId = ref(3);
const faqLaoId = ref(1);
const activeButton = ref(1);

const fetchFaq = async () => {
  try {
    const params = {
      faqType: faqId.value,
      page: page.value,
      size: size.value,
    };
    await store.getFaq(params);
  } catch (error) {
    console.log("Error fetching FAQ data:", error);
  }
};
fetchFaq();

const fetchFaqLao = async () => {
  try {
    const params = {
      faq_lao_id: faqLaoId.value,
      page: page.value,
      size: size.value,
    };
    await store.getFaqLao(params);
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
