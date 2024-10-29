<template>
  <div class="flex flex-col min-h-screen">
    <Navbar :fetchFaq="fetchFaq" :fetchFaqLao="fetchFaqLao" />
    <main class="flex-1 lg:bg-[#F5F5F7]">
      <div class="my-16"></div>
      <div class="m-10 mx-auto card">
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
      </div>

      <div class="card">
        <div class="flex justify-center">
          <h1 class="text-[#152123] text-3xl font-bold">여행 정보</h1>
        </div>

        <div
          class="tabs flex flex-wrap justify-center space-x-12 my-6 lg:border-b lg:border-[#C0C0C0]"
        >
          <button
            @click="tab = 1"
            :class="{
              'text-[#6EBC30] border-b-2 border-[#6EBC30] text-lg font-bold':
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
              'text-[#6EBC30] border-b-2 border-[#6EBC30] text-lg font-bold':
                tab === 2,
              'text-[#5E5F61] text-lg font-normal': tab !== 2,
            }"
            class="tab tab-bordered"
          >
            라오스 여행 팁
          </button>
        </div>

        <!-- faq -->

        <div v-if="tab === 1" class="mb-5">
          <div
            class="flex items-center flex-wrap lg:justify-center space-x-4 mx-4 lg:my-4"
          >
            <button
              @click="fetchFaq(type.fqt_id, type.faq_type_name_kr)"
              v-for="(type, index) in store.faqTypes"
              :key="type.fqt_id"
              :class="{
                'bg-[#0EC0CB]': type.fqt_id === IdFaq,
                'bg-[#A8A3A3]': type.fqt_id !== IdFaq,
              }"
              class="text-[#ffffff] text-sm lg:text-base font-medium rounded-full max-w-full lg:px-4 p-3 my-2 lg:my-0 whitespace-nowrap"
            >
              {{ type.faq_type_name_kr }}
            </button>
          </div>
          <div v-for="(faq, index) in store.faqs" :key="faq.faq_id">
            <div class="m-4 lg:m-0">
              <div class="flex items-center justify-between my-4">
                <div class="flex items-center">
                  <img src="@/assets/icons/q.svg" />
                  <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                    {{ faq.question }}
                  </p>
                </div>
                <span
                  :class="
                    isOpen === index ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  "
                  @click="isOpen = isOpen === index ? null : index"
                  class="text-[#152123] text-2xl mdi lg:text-4xl cursor-pointer"
                ></span>
              </div>
              <div
                v-if="isOpen === index"
                class="border-b border-[#C0C0C0] pb-5 lg:py-4 lg:bg-white lg:border-t-2 lg:px-12 lg:overflow-auto"
              >
                <p
                  class="text-[#152123] font-light text-xs lg:text-sm"
                  v-html="faq.answer"
                ></p>
              </div>
              <div class="border-b border-[#C0C0C0]"></div>
            </div>
          </div>
        </div>

        <!-- trip lao -->
        <div v-if="tab === 2" class="mb-5">
          <div
            class="flex items-center flex-wrap lg:justify-center space-x-4 mx-4 lg:my-4"
          >
            <button
              v-for="(type, index) in store.faqTypeLaos"
              :key="type.fqtl_id"
              :class="{
                'bg-[#0EC0CB]': type.fqtl_id === IdFaqLao,
                'bg-[#A8A3A3]': type.fqtl_id !== IdFaqLao,
              }"
              class="text-[#ffffff] text-sm lg:text-base font-medium rounded-full max-w-full lg:px-4 p-3 my-2 lg:my-0 whitespace-nowrap"
              @click="fetchFaqLao(type.fqtl_id, type.faq_type_name_kr)"
            >
              {{ type.faq_type_name_kr }}
            </button>
          </div>

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
                    ? 'border-2 border-[#0EC0CB]'
                    : 'border border-[#E6E6E6]'
                "
              >
                <div
                  class="p-4 flex items-center lg:px-10 cursor-pointer"
                  @click="isOpenLao[index] = !isOpenLao[index]"
                >
                  <img src="@/assets/icons/tip.svg" />
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
                  <p
                    class="text-[#152123] text-xs font-light ml-2 lg:text-lg"
                    v-html="faqLao.answer"
                  ></p>
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

const props = defineProps(["fetchFaq", "fetchFaqLao"]);
const tab = ref(1);
const isOpen = ref([]);
const isOpenLao = ref([]);
const store = useFaqStore();
const page = ref(0);
const size = ref(10);
const faq_type = ref([]);
const faq_lao_type = ref([]);
const IdFaq = ref(1);
const IdFaqLao = ref(1);

const toggleFaq = (fqt_id) => {
  IdFaq.value = fqt_id;
  tab.value = 1;
  console.log(`fqt_id: ${IdFaq.value}`);
};

const toggleFaqLao = (fqtl_id) => {
  IdFaqLao.value = fqtl_id;
  tab.value = 2;
  console.log(`fqtl_id: ${IdFaqLao.value}`);
};

const loadFaqType = async () => {
  await store.faqType();
  await fetchFaq(1, "자주묻는 질문");
  // tab.value = 1;
};

const loadFaqLaoTypes = async () => {
  await store.faqTypeLao();
  // await fetchFaqLao(1, "라오스 여행 팁");
};

const fetchFaq = async (faq_id, faqType) => {
  try {
    const params = {
      faqId: faq_id,
      faqType: faq_id ? faq_id : 1,
      page: page.value ? page.value : 0,
      size: size.value ? size.value : 10,
    };
    faq_type.value = faqType;
    await store.getFaq(params);
    isOpen.value = [];
    toggleFaq(params.faqType);
  } catch (error) {
    console.log("Error fetching FAQ data:", error);
  }
};
const fetchFaqLao = async (faq_lao, faq_lao_id) => {
  try {
    const params = {
      faqLao: faq_lao,
      faq_lao_id: faq_lao ? faq_lao : 1,
      page: page.value ? page.value : 0,
      size: size.value ? size.value : 10,
    };
    faq_lao_type.value = faq_lao_id;
    await store.getFaqLao(params);
    isOpenLao.value = [];
    toggleFaqLao(params.faq_lao_id);
  } catch (error) {
    console.log("Error fetching faq lao", error);
  }
};

onMounted(() => {
  loadFaqType();
  loadFaqLaoTypes();
  tab.value = 1;
});
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
  max-width: 1280px;
  margin: 0 auto;
}
.border-dashed {
  border-top: 1px dashed #8e8d8d;
}
</style>
