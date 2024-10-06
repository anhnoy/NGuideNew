<template>
    <div class="relative md:h-screen bg-cover bg-no-repeat"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <navbar class="hidden sm:block bg-white" />
        <div class="bg-white h-[66px] flex items-center justify-between px-4 md:hidden">
            <div class="flex items-center">
                <img src="@/assets/icons/chevron-left.svg" @click="clickBack" alt="Back" class="text-black" />
            </div>
            <div class="text-center flex-grow text-black">견적서</div>
            <div>
                <img v-if="!loading" @click="exportToPDF" src="@/assets/icons/download.svg" alt="Download"
                    class="text-[#FF7100]" />
            </div>
        </div>
        <div class="max-w-[1080px] sm:rounded-[50px] p-4 sm:mt-5 mx-auto h-[1295px] overflow-y-auto bg-white">

            <div class="text-center mt-12 md:mb-8 mb-5">
                <h1 class="text-2xl md:text-3xl h1-custom text-center font-bold">견적서</h1>
            </div>
            <div
                class="flex flex-col w-[840px] mx-auto md:flex-row justify-between mb-4 md:mb-6 space-y-4 md:space-y-0">
                <div class="flex items-center space-x-2">
                    <label for="quoteNumber" class="font-medium text-gray-700">견적번호</label>
                    <div v-if="quoteList.length">
                        <select id="quoteNumber" v-model="selectedQuote" @change="confirmQuoteSelection"
                            class="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-[#EDEDF2]">
                            <option v-for="quote in quoteList" :key="quote.qid" :value="quote.qu_num">
                                {{ quote.qu_num }}
                            </option>
                        </select>
                    </div>
                    <div v-else>
                        <select id="quoteNumber" class="border border-gray-300 px-3 py-2 rounded-md bg-[#EDEDF2]"
                            disabled>
                            <option>No quotes available</option>
                        </select>
                    </div>
                </div>
                <button v-if="!loading" @click="exportToPDF"
                    class="bg-white border border-[#FF7100] text-[#FF7100] w-[170px] px-4 py-2 rounded-[50px] hidden md:block">
                    <img src="@/assets/icons/download.svg" alt="Download" class="text-[#FF7100] inline-block mr-2" />
                    견적서 다운로드
                </button>

                <!-- Loading indicator -->
                <div v-if="loading" class="loading-indicator">
                    <div class="spinner"></div>
                    Loading, please wait...
                </div>
            </div>
            <!-- pdf -->
            <div ref="pdfContent" class="pdf-content">
                <div class="mb-6">
                    <h2
                        class="text-lg md:text-xl font-bold text-center bg-[#F1F3F6] h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        기본 정보</h2>
                </div>
                <emailAddress :quoteDetails="quoteDetails" />
                <div class="mt-6">
                    <h2
                        class="text-lg md:text-xl font-bold text-center bg-[#F1F3F6] h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        신청 내용</h2>
                </div>
                <content :quoteDetails="quoteDetails" />
                <div class="mt-6">
                    <h2
                        class="text-lg md:text-xl font-bold text-center bg-[#F1F3F6] h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        견적가</h2>
                </div>
                <quotePrice :quoteDetails="quoteDetails" />
                <div class="mt-6">
                    <h2
                        class="text-lg md:text-xl font-bold text-center bg-[#F1F3F6] h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        기본 견적 사항</h2>
                </div>
                <basicQuoteDetail :quoteDetails="quoteDetails" />
                <div class="mt-6 ">
                    <h2
                        class="text-lg md:text-xl font-bold text-center bg-[#F1F3F6] h-[50px] text-gray-800 flex items-center justify-center mb-4">
                        여행 일정</h2>
                </div>
                <travelItinerary :quoteDetails="quoteDetails" />
                <footers :quoteDetails="quoteDetails" />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import quotationService from '~/services/quotation.service.js';  // Ensure your quotationService instance is properly imported


import { PDFDocument } from 'pdf-lib';
import domtoimage from 'dom-to-image';

const loading = ref(false); // Create a ref to track loading state

// Method to generate PDF
const pdfContent = ref(null);
const exportToPDF = async () => {
    loading.value = true; // Set loading to true when starting the export
    try {
        const input = pdfContent.value; // Access the ref

        // Check if the reference is available
        if (!input) {
            console.error('pdfContent reference not found');
            return;
        }

        const scale = 4;
        const options = {
            width: input.offsetWidth * scale,
            height: input.offsetHeight * scale,
            style: {
                transform: 'scale(' + scale + ')',
                transformOrigin: 'top left',
                width: input.offsetWidth * scale + 'px',
                height: input.offsetHeight * scale + 'px'
            },
            quality: 100
        };

        // Convert the HTML content to a PNG image
        const dataUrl = await domtoimage.toPng(input, options);

        // Create an image to get its dimensions
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => (img.onload = resolve));

        const imgWidth = img.width / scale;
        const imgHeight = img.height / scale;

        // Create a new PDF using pdf-lib
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([imgWidth, imgHeight]);

        // Load the image into the PDF
        const pngImage = await pdfDoc.embedPng(dataUrl);

        // Draw the PNG image onto the PDF page
        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: imgWidth,
            height: imgHeight
        });

        const defaultFilename = `quotation.pdf`;

        // Save the PDF to a Uint8Array
        const pdfBytes = await pdfDoc.save();

        // Create a Blob from the PDF bytes and trigger download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = defaultFilename;
        link.click();

    } catch (error) {
        console.error('Error exporting to PDF:', error);
    } finally {
        loading.value = false; // Set loading to false after processing
    }
};
const router = useRouter();
const selectedQuote = ref(''); // Store the selected quote
const quoteList = ref([]); // Store the quotes from sessionStorage
const quoteDetails = ref(null); // Store the fetched quote details

const clickBack = () => {
    router.back();
}

// Function to fetch quotation details by `quo_id`
const quotation_detail = async (quo_id) => {
    try {
        const response = await quotationService.quotation_detail(quo_id); // Pass quo_id correctly
        quoteDetails.value = response.data;
    } catch (error) {
        console.error("Failed to fetch quotation details", error);
    }
}

// Call this when the Confirm button is clicked or when the selection changes
const confirmQuoteSelection = () => {
    if (selectedQuote.value) {
        quotation_detail(selectedQuote.value);  // Pass the selected quote number to the quotationService
    }
}

// Ensure code runs only in the browser
onMounted(() => {
    // Check if sessionStorage is available
    if (typeof sessionStorage !== 'undefined') {
        const storedQuotes = sessionStorage.getItem('quoteList');
        if (storedQuotes) {
            quoteList.value = JSON.parse(storedQuotes); // Parse and store the sessionStorage data
            if (quoteList.value.length > 0) {
                selectedQuote.value = quoteList.value[0].qu_num; // Set default selected quote
                confirmQuoteSelection(); // Automatically fetch details for the first quote
            }
        }
    }
});
</script>
<style scoped>
.loading-indicator {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #FF7100;
    /* Change this color as needed */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s ease-in-out infinite;
    margin-right: 10px;
    /* Space between spinner and text */
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
