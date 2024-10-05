<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 lg:bg-[#F5F5F7]">
      <div class="card">
        <div class="hidden lg:flex items-center space-x-2">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
          </router-link>
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

        <!-- faq -->
        
        <div v-if="tab === 1">
          <div class="flex items-center lg:justify-center space-x-4 mx-4 lg:my-4">
            <button
              v-for="(type, index) in store.faqTypes"
              :key="type.fqt_id"
              :class="{
                'bg-[#6592E2]': faq_type.value === type.fqt_id,
                'bg-[#C0C0C0]': faq_type.value !== type.fqt_id,
              }"
              class="text-[#ffffff] text-sm font-medium rounded-full w-auto h-10 px-3"
              @click="fetchFaq(type.fqt_id, type.faq_type_name_kr)"
            >
              {{ type.faq_type_name_kr }}
            </button>
          </div>
          <div v-for="(faq, index) in store.faqs" :key="faq.faq_id">
            <div class="m-4 lg:m-0">
              <div class="flex items-center justify-between my-4">
                <div class="flex items-center">
                  <span class="mdi mdi-help-box text-[#152123] text-2xl lg:text-3xl"></span>
                  <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                    {{ faq.question }}
                  </p>
                </div>
                <span
                  :class="isOpen === index ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @click="isOpen = isOpen === index ? null : index"
                  class="text-[#152123] text-2xl mdi lg:text-4xl cursor-pointer"
                ></span>
              </div>
              <div v-if="isOpen === index" class="border-b border-[#C0C0C0] py-4">
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
          <div class="flex items-center lg:justify-center space-x-4 mx-4 lg:my-4">
            <button
              v-for="(type, index) in store.faqTypeLaos"
              :key="type.faqT_lao_id"
              :class="{
                'bg-[#6592E2]': faq_lao_type.value === type.faqT_lao_id,
                'bg-[#C0C0C0]': faq_lao_type.value !== type.faqT_lao_id,
              }"
              class="text-[#ffffff] text-sm font-medium rounded-full w-auto h-10 px-3"
              @click="fetchFaqLao(type.faqT_lao_id, type.faq_type_name_kr)"
            >
              {{ type.faq_type_name_kr }}
            </button>
          </div>
          <div v-if="store.faqLaos && store.faqLaos.length > 0" class="m-4 lg:m-0">
            <div v-for="(faqLao, index) in store.faqLaos" :key="faqLao.faq_lao_id">
              <div class="my-4" :class="isOpenLao[index] ? 'border-2 border-[#FF9900]' : 'border border-[#C0C0C0]'">
                <div class="p-4 flex items-center lg:px-10 cursor-pointer" @click="isOpenLao[index] = !isOpenLao[index]">
                  <span class="mdi mdi-tooltip-question-outline text-[#6592E2] text-3xl"></span>
                  <p class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5">
                    {{ faqLao.question }}
                  </p>
                </div>
                <div v-if="isOpenLao[index]" class="border-dashed mx-4 lg:hidden"></div>
                <div v-if="isOpenLao[index]" class="border-0 lg:border border-[#C0C0C0] mx-10"></div>
                <div v-if="isOpenLao[index]" class="flex items-center p-4 lg:mx-5">
                  <span class="mdi mdi-alpha-t-circle-outline text-[#FF9900] text-3xl"></span>
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
import { ref } from "vue";

const tab = ref(1);
const isOpen = ref([]);
const isOpenLao = ref([]);
const store = useFaqStore();
const page = ref(0);
const size = ref(10);
const faqId = ref(null);
const faqLaoId = ref(null);
const faq_type = ref([]);
const faq_lao_type = ref([]);

const loadFaqType = async () => {
  await store.faqType();
};

const loadFaqLaoTypes = async () => {
  await store.faqTypeLao();
};

const fetchFaq = async (faqT_id, faqType) => {
  try {
    const params = {
      faqT_id: faqT_id,
      faqType: faqType,
      page: page.value,
      size: size.value,
    };
    faq_type.value = faqType;
    await store.getFaq(params);
  } catch (error) {
    console.log("Error fetching FAQ data:", error);
  }
};

const fetchFaqLao = async (faq_lao, faq_lao_id) => {
  try {
    const params = {
      faq_lao: faq_lao,
      faq_lao_id: faq_lao_id,
      page: page.value,
      size: size.value,
    };
    faqLaoId.value = faq_lao_id;
    await store.getFaqLao(params);
  } catch (error) {
    console.log("Error fetching faq lao", error);
  }
};

loadFaqType();
loadFaqLaoTypes();
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
