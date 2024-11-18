<template>
    <div class="relative lg:h-auto lg:min-h-[100vh] bg-cover bg-no-repeat"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <navbar class="hidden sm:block bg-white" />
        <div class="bg-white h-[66px] flex items-center justify-between px-4 md:hidden">
            <div class="flex items-center">
                <img src="@/assets/icons/chevron-left.svg" @click="clickBack" alt="Back" class="text-black" />
            </div>
            <div class="text-center flex-grow text-black">견적서</div>
            <div>
                <img v-if="!loading" @click="handleExport" src="@/assets/icons/download.svg" alt="Download"
                    class="w-[24px] h-[24px] md:w-[16px] md:h-[16px] cursor-pointer" />
            </div>
        </div>
        <div class="max-w-[1080px]  sm:rounded-[50px] sm:mt-5 mx-auto h-[1295px] overflow-y-auto bg-white">
            <div class="text-center mt-12 md:mb-8 mb-5  hidden md:block">
                <h1 class=" text-2xl md:text-3xl h1-custom text-center font-bold">견적서</h1>
            </div>

            <div
                class="flex flex-col mx-auto w-[328px] sm:w-[840px] mt-2 md:flex-row justify-between mb-4 md:mb-6 w space-y-4 md:space-y-0">
                <div class="relative" ref="dropdownRef">
                    <div class="flex items-center space-x-2">
                        <label class="font-medium text-gray-700 text-[14px] sm:text-[16px]">견적번호</label>
                        <div class="relative">
                            <button @click.stop="toggleDropdown"
                                class="flex items-center justify-between w-[256px] px-3 py-2 text-[12px] bg-[#EDEDF2] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                :class="{ '': isDropdownOpen }">
                                <button
                                    v-if="selectedQuote && selectedQuote.endsWith('-0') && !selectedQuote.endsWith('-0-C')"
                                    class="px-2 py-1 w-[42px] h-[24px] text-[10px] text-white bg-[#6EBC30] rounded  ml-2">
                                    선택
                                </button>
                                <span>{{ selectedQuote || '견적번호를 선택하세요' }}</span>
                                <img src="@/assets/icons/chevron-down.svg"
                                    :class="{ 'transform rotate-180': isDropdownOpen }"
                                    class="w-4 h-4 transition-transform filter grayscale invert" alt="dropdown" />
                            </button>

                            <!-- Dropdown Menu with higher z-index -->
                            <div v-show="isDropdownOpen"
                                class="absolute left-0 w-[256px] right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
                                <div v-if="quoteList.length" class="max-h-60 overflow-y-auto">
                                    <div v-for="quote in quoteList" :key="quote.qid"
                                        @click.stop="selectAndConfirmQuote(quote.qu_num)"
                                        class="flex items-center px-[12px] py-2 hover:bg-gray-100 cursor-pointer">
                                        <button v-if="quote.qu_num.endsWith('-0') && !quote.qu_num.endsWith('-0-C')"
                                            class="px-2 py-1 w-[42px] h-[24px] text-[10px] text-white bg-[#6EBC30] rounded  ml-2">
                                            선택
                                        </button>
                                        <span class="text-[12px] ml-2">{{ quote.qu_num }}</span>
                                    </div>
                                </div>
                                <div v-else class="px-3 py-2 text-[12px] text-gray-500">
                                    견적번호가 없습니다
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button v-if="!loading" @click="handleExport"
                    class="bg-white border border-sub text-sub w-[170px] px-4 py-2 rounded-[50px] hidden md:block">
                    <img src="@/assets/icons/download.svg" alt="Download" class="text-sub inline-block mr-2" />
                    견적서 다운로드
                </button>

                <!-- Loading indicator -->
                <div v-if="loading" class="loading-indicator">
                    <div class="spinner"></div>
                    로딩 중입니다...
                </div>
            </div>
            <!-- pdf -->
            <div id="content-to-export" class="pdf-content">
                <div class="mb-6">
                    <h2
                        class="text-[16px]  md:text-[18px] font-bold text-center w-full bg-[#F1F3F6] h-[44px] md:h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        기본 정보</h2>
                </div>
                <emailAddress :quoteDetails="quoteDetails" />
                <div class="mt-6">
                    <h2
                        class="text-[16px] md:text-[18px] font-bold text-center bg-[#F1F3F6] h-[44px] md:h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        신청 내용</h2>
                </div>
                <content :quoteDetails="quoteDetails" />
                <div class="mt-6">
                    <h2
                        class="text-[16px] md:text-[18px] font-bold text-center bg-[#F1F3F6] h-[44px] md:h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        견적가</h2>
                </div>
                <quotePrice :quoteDetails="quoteDetails" />
                <div class="mt-6">
                    <h2
                        class="text-[16px] md:text-[18px] font-bold text-center bg-[#F1F3F6] h-[44px] md:h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        기본 견적 사항</h2>
                </div>
                <basicQuoteDetail :quoteDetails="quoteDetails" />
                <div class="mt-6 ">
                    <h2
                        class="text-[16px] md:text-[18px] font-bold text-center bg-[#F1F3F6] h-[44px] md:h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        여행 일정</h2>
                </div>
                <travelItinerary :quoteDetails="quoteDetails" />
                <footers :quoteDetails="quoteDetails" :selectedQuote="selectedQuote"
                    :fetchQuotationList="fetchQuotationList" />
            </div>
        </div>
    </div>
</template>

<script setup>
import navbar from '~/components/navbar/navbar.vue';
import backgroundImage from '@/assets/images/logo copy.png';
import emailAddress from '~/components/reservation-detail/quote-information.vue';
import content from '~/components/reservation-detail/quote-content.vue';
import quotePrice from '~/components/reservation-detail/quote-price.vue';
import basicQuoteDetail from '~/components/reservation-detail/basic-quote-detail.vue';
import travelItinerary from '~/components/reservation-detail/travel-itinerary.vue';
import footers from '~/components/reservation-detail/quote-footer.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import quotationService from '~/services/quotation.service.js';
// import { PDFDocument } from 'pdf-lib';
// import domtoimage from 'dom-to-image';
import { exportToPDF } from '~/components/utils/pdfExport';

// Existing refs
const router = useRouter();
const loading = ref(false);
const pdfContent = ref(null);
const selectedQuote = ref('');
const quoteList = ref([]);
const quoteDetails = ref(null);

// New refs for dropdown
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);


console.log('11111111111111111',exportToPDF)


// Dropdown functions
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectAndConfirmQuote = (quoteNum) => {
    selectedQuote.value = quoteNum;
    confirmQuoteSelection();
    isDropdownOpen.value = false;
};

// Click outside handler
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isDropdownOpen.value = false;
    }
};
const shouldShowConfirmButton = computed(() => {
    const currentQuote = quoteList.value.find(quote => quote.qu_num === props.selectedQuote);
    if (!currentQuote) return true; // If no quote is found, show the button by default

    // Hide if quote number ends with -0 or -0-c
    return !currentQuote.qu_num.endsWith('-0') && !currentQuote.qu_num.endsWith('-0-C');
});

// Your existing functions remain the same
const clickBack = () => router.back();

const fetchQuotationList = async () => {
    try {
        const quotationNumber = localStorage.getItem('quotationNumber');
        if (!quotationNumber) {
            console.error('No quotation number found in localStorage');
            return;
        }

        const response = await quotationService.getQuotationList({
            quo_id: quotationNumber,
        });

        if (response.data && response.data.length > 0) {
            quoteList.value = response.data;
            selectedQuote.value = response.data[0].qu_num;
            await fetchQuotationDetails(selectedQuote.value);
        }
    } catch (error) {
        console.error('Failed to fetch quotation list:', error);
    }
};

const fetchQuotationDetails = async (quoteId) => {
    if (!quoteId) return;

    try {
        const response = await quotationService.quotation_detail(quoteId);
        quoteDetails.value = response.data;
    } catch (error) {
        console.error('Failed to fetch quotation details:', error);
    }
};

const confirmQuoteSelection = () => {
    if (selectedQuote.value) {
        fetchQuotationDetails(selectedQuote.value);
    }
};
const handleExport = async () => {
  try {
    await exportToPDF('content-to-export', 'my-document.pdf')
    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Export failed:', error)
  }
}

// const handleExport = async () => {
//     if (!pdfContent.value) {
//         console.error('PDF content reference not found');
//         return;
//     }

//     loading.value = true;
//     try {
//         const input = pdfContent.value;
//         const scale = 4;

//         const options = {
//             width: input.offsetWidth * scale,
//             height: input.offsetHeight * scale,
//             style: {
//                 transform: `scale(${scale})`,
//                 transformOrigin: 'top left',
//                 width: `${input.offsetWidth * scale}px`,
//                 height: `${input.offsetHeight * scale}px`
//             },
//             quality: 100
//         };

//         const dataUrl = await domtoimage.toPng(input, options);

//         const img = new Image();
//         img.src = dataUrl;
//         await new Promise((resolve) => (img.onload = resolve));

//         const imgWidth = img.width / scale;
//         const imgHeight = img.height / scale;

//         const pdfDoc = await PDFDocument.create();
//         const page = pdfDoc.addPage([imgWidth, imgHeight]);
//         const pngImage = await pdfDoc.embedPng(dataUrl);

//         page.drawImage(pngImage, {
//             x: 0,
//             y: 0,
//             width: imgWidth,
//             height: imgHeight
//         });

//         const pdfBytes = await pdfDoc.save();
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'quotation.pdf';
//         link.click();

//         URL.revokeObjectURL(link.href);
//     } catch (error) {
//         console.error('Error exporting to PDF:', error);
//     } finally {
//         loading.value = false;
//     }
// };

// Mount and unmount handlers
onMounted(() => {
    fetchQuotationList();
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>