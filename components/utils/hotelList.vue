<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white w-1/3 p-4 rounded-xl">
            <div class="flex justify-between items-center">
                <p>옵션 변경</p>
                <img class="cursor-pointer w-6" src="@/assets/icons/closeModal.svg" alt="Close" @click="closeModal" />
            </div>
            <div class="border-b border-[#A8A3A3] my-5"></div>

            <div v-for="hotel in focusedOption" :key="hotel.id">
                <label class="flex items-center cursor-pointer">
                    <input type="radio" :value="hotel" v-model="selectedOption" class="sr-only" @focus="onFocus(hotel)"
                        @blur="onBlur" />

                    <span
                        class="inline-block w-5 h-5 rounded-full border border-[#6EBC30] relative transition-all duration-300 ease-in-out">
                        <span v-if="selectedOption === hotel"
                            class="block w-2.5 h-2.5 bg-[#6EBC30] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                    </span>
                    <span class="ml-2">{{ hotel.h_star }}</span>
                </label>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";

const store = useEasyQuotationStore();

const props = defineProps({
    isOpen: Boolean,
    options: Array,
});

const emit = defineEmits(['close', 'submit']);

// Define selectedOption and focusedOption
const selectedOption = ref(null); // Initialize selectedOption
const focusedOption = ref([]);

// Load hotel data when the component mounts
const loadHotel = async () => {
    try {
        await store.getHotel();
        if (store.hotels && Array.isArray(store.hotels.resp)) {
            focusedOption.value = store.hotels.resp.map(hotel => ({
                id: hotel.hid,
                h_star: hotel.h_star,
                h_star_kr: hotel.h_star_kr,
            }));
        } else {
            console.error('No hotel data found:', store.hotels.resp);
        }
    } catch (error) {
        console.error('Error loading hotels:', error);
    }
};

loadHotel();

const closeModal = () => {
    emit('close');
};

const onFocus = (hotel) => {
    console.log('Focused on hotel:', hotel);
};


</script>

<style scoped>
</style>
