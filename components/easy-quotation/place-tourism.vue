<template>
    <div class="max-w-full md:h-[820px] h-[795px] overflow-y-auto bg-white shadow-lg lg:overflow-y-auto p-4">
        <h1 class="h1-custom p-4">아래 코스를 추천 드려요.</h1>
        <div class="grid md:w-[820px] grid-cols-2 gap-4 lg:grid-cols-3 p-2 mx-auto">
            <div v-for="(pkg, index) in visiblePackages" :key="pkg.id" class="border border-gray-300 rounded-lg overflow-hidden cursor-pointer" @click="handleImageClick(index)">
                <img :src="pkg.image" :alt="pkg.title" class="w-full h-[160px] object-cover lg:h-[200px]" >
                <div class="p-4">
                    <h2 class="font-bold text-textmain text-center text-lg">{{ pkg.title }}</h2>
                    <p class="text-sm text-center text-textsub">{{ pkg.duration }}</p>
                    <p class="text-sm text-center text-textsub">{{ pkg.description }}</p>
                    <p class="mt-2 text-sub text-[14px] sm:text-[20px] font-bold leading-[20.27px] tracking-[-0.01em] text-center">1인당 약 {{ pkg.price.toLocaleString() }}원 ~</p>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <button
                v-if="visiblePackages.length < packages.length"
                @click="loadMore"
                class="mt-4 font-light text-sm lg:text-base border border-[#8E8D8D] text-[#152123] px-10 py-1 lg:px-12 lg:py-2 rounded-full">
                더보기
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import packageService from '@/services/easy-quote.service.js'; // Adjust the import path as needed
import { useEasyQuotationStore } from '~/stores/easy-quotation.store';

const emit = defineEmits(); // Define the emit function
const packages = ref([]); // Initialize packages as an empty array
const visiblePackages = ref([]); // To keep track of visible packages
const packageStore = useEasyQuotationStore(); // Use the package store

// Fetch packages when the component is mounted
onMounted(async () => {
    try {
        const data = await packageService.getPackageList(); // Fetch package data from the service
        if (Array.isArray) {
            packages.value = data.map(pkg => ({
                id: pkg.package_id,
                title: pkg.package_name,
                price: pkg.package_price,
                // Add more fields here if needed
            })); 
            visiblePackages.value = packages.value.slice(0, 3); // Show only 3 packages initially
        } else {
            console.error("Unexpected data format:", data);
        }
    } catch (error) {
        console.error("Error fetching packages:", error);
    }
});

// Function to load more packages
const loadMore = () => {
    const nextPackages = packages.value.slice(visiblePackages.value.length, visiblePackages.value.length + 3);
    visiblePackages.value = [...visiblePackages.value, ...nextPackages];
}

// Update handleImageClick to set the package ID in the store and emit visibility
const handleImageClick = (index) => {
    const selectedPackage = visiblePackages.value[index];
    if (selectedPackage) {
        packageStore.setSelectedPackageId(selectedPackage.id);
        console.log(`Package ID ${selectedPackage.id} clicked`); 
        console.log("Current selectedPackageId in store:", packageStore.selectedPackageId); // Check the store's value
        emit('updateVisibility', 4);
    }
}

</script>
