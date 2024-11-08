<template>
  <div class="flex flex-col min-h-screen">
    <Navbar :fetchFaq="fetchFaq" :fetchFaqLao="fetchFaqLao" />
    <main class="flex-1 lg:bg-[#F5F5F7]">
      <div class="my-5 hidden lg:flex"></div>
      <div class="m-10 mx-auto cards">
        <div class="hidden lg:flex items-center space-x-2">
          <router-link to="/">
            <span class="mdi mdi-home-outline text-[#152123] text-2xl"></span>
          </router-link>
          <span class="text-[#152123] text-sm font-normal">여행 정보</span>
          <span class="mdi mdi-chevron-right text-[#5E5F61] text-2xl"></span>
          <span v-if="tab === 1" class="text-[#152123] text-sm font-normal">자주묻는 질문</span>
          <span v-if="tab === 2" class="text-[#152123] text-sm font-normal">라오스 여행 팁</span>
        </div>
      </div>

      <div class="card mx-auto lg:my-12">
        <div class="tabs flex flex-wrap justify-center space-x-12 my-6 lg:border-b lg:border-[#C0C0C0]">
          <button @click="tab = 1" :class="{
            'text-[#6EBC30] border-b-2 border-[#6EBC30] lg:text-xl lg:font-bold text-base font-medium':
              tab === 1,
            'text-[#5E5F61] lg:text-xl text-base font-normal': tab !== 1,
          }" class="tab tab-bordered">
            자주묻는 질문
          </button>
          <button @click="tab = 2" :class="{
            'text-[#6EBC30] border-b-2 border-[#6EBC30] lg:text-xl lg:font-bold text-base font-medium':
              tab === 2,
            'text-[#5E5F61] lg:text-xl font-normal text-base  ': tab !== 2,
          }" class="tab tab-bordered">
            라오스 여행 팁
          </button>
        </div>

        <!-- faq -->

        <div v-if="tab === 1" class="mb-5">
          <div class="flex items-center flex-wrap lg:justify-center space-x-4 mx-4 lg:my-4">
            <button @click="fetchFaq(type.fqt_id, type.faq_type_name_kr)" v-for="(type, index) in store.faqTypes"
              :key="type.fqt_id" :class="{
                'bg-[#0EC0CB]': type.fqt_id === IdFaq,
                'bg-[#A8A3A3]': type.fqt_id !== IdFaq,
              }"
              class="text-[#ffffff] text-sm lg:text-base font-medium rounded-full max-w-full lg:px-4 p-3 my-2 lg:my-0 whitespace-nowrap">
              {{ type.faq_type_name_kr }}
            </button>
          </div>
          <div v-for="(faq, index) in store.faqs" :key="faq.faq_id">
            <div class="m-4 lg:m-0">
              <div class="flex items-center justify-between my-4">
                <div class="flex items-center">
                  <img src="@/assets/icons/q.svg" class="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
                  <p class="text-[#132D5C] font-medium text-sm lg:text-xl ml-5">
                    {{ faq.question }}
                  </p>
                </div>
                <span @click="toggleOpen(index)" class="text-[#152123] text-2xl cursor-pointer">
                  <template v-if="isOpen === index">
                    <svg class="w-[16px] h-[20px] md:w-[24px] md:h-[24px]" viewBox="0 0 24 25" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M22.6424 18.2448C23.0883 17.8733 23.1224 17.2331 22.7154 16.8222L12.7912 6.82304C12.7909 6.82281 12.7914 6.82328 12.7912 6.82304C12.5856 6.61519 12.297 6.5 12.0001 6.5C11.7031 6.5 11.4152 6.61448 11.2096 6.82235C11.2098 6.82211 11.2094 6.82258 11.2096 6.82235L1.2851 16.8218C1.0971 17.0118 1 17.2551 1 17.4998C1 17.7755 1.12245 18.0491 1.35811 18.2451C1.79487 18.6086 2.46568 18.5807 2.86518 18.1783L12.0001 8.9745L21.1348 18.1782C21.5344 18.5807 22.2056 18.6086 22.6424 18.2448Z"
                        fill="#152123" />
                      <path
                        d="M12.7912 6.82304C12.7909 6.82281 12.7914 6.82328 12.7912 6.82304ZM12.7912 6.82304C12.5856 6.61519 12.297 6.5 12.0001 6.5C11.7031 6.5 11.4152 6.61448 11.2096 6.82235M12.7912 6.82304L22.7154 16.8222C23.1224 17.2331 23.0883 17.8733 22.6424 18.2448C22.2056 18.6086 21.5344 18.5807 21.1348 18.1782L12.0001 8.9745L2.86518 18.1783C2.46567 18.5807 1.79487 18.6086 1.35811 18.2451C1.12245 18.0491 1 17.7755 1 17.4998C1 17.2551 1.0971 17.0118 1.2851 16.8218L11.2096 6.82235M11.2096 6.82235C11.2094 6.82258 11.2098 6.82211 11.2096 6.82235Z"
                        stroke="#152123" stroke-width="0.5" />
                    </svg>
                  </template>
                  <template v-else>
                    <svg class="w-[16px] h-[20px] md:w-[24px] md:h-[24px]" viewBox="0 0 24 25" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.3576 6.75524C0.911669 7.1267 0.877636 7.76688 1.28455 8.17777L11.2088 18.177C11.2091 18.1772 11.2086 18.1767 11.2088 18.177C11.4144 18.3848 11.703 18.5 11.9999 18.5C12.2969 18.5 12.5848 18.3855 12.7904 18.1777C12.7902 18.1779 12.7906 18.1774 12.7904 18.1777L22.7149 8.17821C22.9029 7.9882 23 7.74492 23 7.50021C23 7.22451 22.8776 6.95087 22.6419 6.7549C22.2051 6.3914 21.5343 6.41934 21.1348 6.82167L11.9999 16.0255L2.86517 6.82176C2.46556 6.41932 1.79436 6.39143 1.3576 6.75524Z"
                        fill="#152123" />
                      <path
                        d="M11.2088 18.177C11.2091 18.1772 11.2086 18.1767 11.2088 18.177ZM11.2088 18.177C11.4144 18.3848 11.703 18.5 11.9999 18.5C12.2969 18.5 12.5848 18.3855 12.7904 18.1777M11.2088 18.177L1.28455 8.17777C0.877636 7.76688 0.911669 7.1267 1.3576 6.75524C1.79436 6.39143 2.46556 6.41932 2.86517 6.82176L11.9999 16.0255L21.1348 6.82167C21.5343 6.41934 22.2051 6.3914 22.6419 6.7549C22.8776 6.95087 23 7.22451 23 7.50021C23 7.74492 22.9029 7.9882 22.7149 8.17821L12.7904 18.1777M12.7904 18.1777C12.7906 18.1774 12.7902 18.1779 12.7904 18.1777Z"
                        stroke="#152123" stroke-width="0.5" />
                    </svg>
                  </template>
                </span>
              </div>
              <div v-if="isOpen === index"
                class="border-b border-[#C0C0C0] pb-5 lg:py-4 lg:bg-white lg:border-t-2 lg:px-12 lg:overflow-auto">
                <p class="text-[#152123] font-light text-xs lg:text-sm" v-html="faq.answer"></p>
              </div>
              <div class="border-b border-[#C0C0C0]"></div>
            </div>
          </div>
        </div>

        <!-- trip lao -->
        <div v-if="tab === 2" class="mb-5">
          <div class="flex items-center flex-wrap lg:justify-center space-x-4 mx-4 lg:my-4">
            <button v-for="(type, index) in store.faqTypeLaos" :key="type.fqtl_id" :class="{
              'bg-[#0EC0CB]': type.fqtl_id === IdFaqLao,
              'bg-[#A8A3A3]': type.fqtl_id !== IdFaqLao,
            }"
              class="text-[#ffffff] text-sm lg:text-base font-medium rounded-full max-w-full lg:px-4 p-3 my-2 lg:my-0 whitespace-nowrap"
              @click="fetchFaqLao(type.fqtl_id, type.faq_type_name_kr)">
              {{ type.faq_type_name_kr }}
            </button>
          </div>

          <div v-if="store.faqLaos && store.faqLaos.length > 0" class="m-4 lg:m-0">
            <div v-for="(faqLao, index) in store.faqLaos" :key="faqLao.faq_lao_id">
              <div class="my-4" :class="isOpenLao[index]
                ? 'border-2 border-[#0EC0CB]'
                : 'border border-[#E6E6E6]'
                ">
                <div class="p-4 flex items-center md:px-10 cursor-pointer"
                  @click="isOpenLao[index] = !isOpenLao[index]">
                  <img src="@/assets/icons/tip.svg" class="md:w-[30px] md:h-[30px] w-[18px] h-[18px]" />
                  <p class="text-[#152123] text-sm font-medium ml-2 lg:text-xl lg:ml-5">
                    {{ faqLao.question }}
                  </p>
                </div>
                <div v-if="isOpenLao[index]" class="border-dashed mx-4 lg:hidden"></div>
                <div v-if="isOpenLao[index]" class="border-0 lg:border border-[#C0C0C0] mx-10"></div>
                <div v-if="isOpenLao[index]" class="flex items-center p-4 lg:mx-5">
                  <p class="text-[#152123] text-xs font-light ml-2 lg:text-lg" v-html="faqLao.answer"></p>
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

const activeTab = computed(() => tab.value);

watch(activeTab, (newTab) => {
  if (newTab === 2) {
    fetchFaqLao(1, '라오스 여행 팁');
  }
});


const toggleOpen = (index) => {
  isOpen.value = isOpen.value === index ? null : index;
}

const toggleFaq = (fqt_id) => {
  IdFaq.value = fqt_id;
  tab.value = 1;
};

const toggleFaqLao = (fqtl_id) => {
  IdFaqLao.value = fqtl_id;
  tab.value = 2;
};

const loadFaqType = async () => {
  await store.faqType();
  await fetchFaq(1, "자주묻는 질문");
  tab.value = 1;
};

const loadFaqLaoTypes = async () => {
  await store.faqTypeLao();
  await fetchFaqLao(1, "라오스 여행 팁");
  tab.value = 1;
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
  if (tab.value === 1) {
    loadFaqType();
  } else if (tab.value === 2) {
    loadFaqLaoTypes();
  }
});

</script>

<style scoped>
.cards {
  max-width: 1280px;
  margin: 0 auto;
}

.card {
  max-width: 1200px;
}

.border-dashed {
  border-top: 1px dashed #8e8d8d;
}
</style>
