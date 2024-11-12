<template>
    <div class="flex items-center justify-center fixed inset-0 z-50">
        <dialog ref="myModal" class="modal" :open="isOpen" @close="onClose">
            <div class="lg:w-[730px] w-full lg:h-[90%] h-full lg:rounded-3xl bg-white pb-5">
                <div class="lg:p-5">
                    <div class="flex items-center justify-between border-b border-[#8E8D8D] p-5 lg:px-5 lg:py-2">
                        <h3 class="text-[#2F312A] text-[26px] font-bold">

                            상세보기
                        </h3>
                        <span class="mdi mdi-close text-[#000000] text-3xl cursor-pointer" @click="onClose"></span>
                    </div>
                    <div class="lg:flex items-center justify-between mt-7 mx-5 lg:mx-0">
                        <h1 class="text-[#2F312A] lg:text-base lg:font-medium text-xs font-normal">
                            {{ store.tour_attractions.at?.at_name_kr }}
                        </h1>
                        <select @change="onAttractionChange" v-model="selectedLaid"
                            class="border lg:w-[508px] w-full max-w-full  lg:max-w-xl bg-white rounded px-4 py-2 lg:m-0 mt-2">
                            <option disabled value="">변경하기</option>
                            <option v-for="option in store.tourAttractions" :key="option.laid" :value="option.laid">
                                {{ option.land_name }}
                            </option>
                        </select>
                    </div>
                    <h1 class="text-[#2F312A] text-lg font-medium text-center my-5">
                        {{ store.tour_attractions.land_name }}
                    </h1>

                    <div class="relative flex justify-center items-center overflow-hidden lg:m-0 mx-5 h-44">
                        <img @click="changeImage(-1)" src="@/assets/icons/pLeft.svg" width="24" height="12"
                            class="absolute left-0 z-20 cursor-pointer">

                        <div class="flex space-x-4 p-5 justify-center items-center h-60">
                            <template v-if="isMobile">
                                <div v-if="loading" class="skeleton w-72 h-44"></div>
                                <img v-else :src="images[currentIndex]" class="w-72 h-44 object-cover" />
                            </template>

                            <template v-else>
                                <div v-if="loading"
                                    class="skeleton w-36 h-28 md:w-[270px] md:h-[200px] lg:w-[270px] lg:h-[200px] rounded-none">
                                </div>
                                <div v-if="loading"
                                    class="skeleton w-36 h-28 md:w-[270px] md:h-[200px] lg:w-[270px] lg:h-[200px] rounded-none">
                                </div>

                                <img v-else v-for="(attraction, index) in visibleImages.slice(0, 2)" :key="index"
                                    :src="attraction"
                                    class="w-36 h-28 md:w-[270px] md:h-[200px] lg:w-[270px] lg:h-[200px] object-cover"
                                    style="max-width: 100%; max-height: 100%" />
                            </template>
                        </div>
                        <img @click="changeImage(1)" src="@/assets/icons/pRight.svg" width="24" height="12"
                            class="absolute right-0 z-20 cursor-pointer">

                    </div>


                    <div
                        class="tabs flex justify-center space-x-4 lg:mx-4 mx-7 mt-2 border-b lg:border-[#C0C0C0] border-[#E6E6E6]">
                        <button @click="tab = 1" :class="{
                            'text-[#6EBC30] border-b-2 border-[#6EBC30] text-base font-medium lg:text-xl lg:font-bold':
                                tab === 1,
                            'text-[#5E5F61] text-base font-normal lg:text-xl lg:font-normal ':
                                tab !== 1,
                        }" class="tab tab-bordered">
                            소개
                        </button>
                        <button @click="tab = 2" :class="{
                            'text-[#6EBC30] border-b-2 border-[#6EBC30] text-base font-medium lg:text-xl lg:font-bold':
                                tab === 2,
                            'text-[#5E5F61] text-base font-normal lg:text-xl lg:font-normal':
                                tab !== 2,
                        }" class="tab tab-bordered">
                            주소
                        </button>
                    </div>

                    <div v-if="tab === 1">
                        <div class="overflow-y-auto lg:max-h-[250px] max-h-[435px]">
                            <div class=" lg:px-4 p-7">
                                <div>
                                    <h3 class="text-[#152123] text-xl font-medium">
                                        {{ store.tour_attractions.land_name }}
                                    </h3>
                                    <p class="text-[#152123] text-sm font-light leading-6 mt-2">
                                        {{ store.tour_attractions.land_detail }}
                                    </p>
                                </div>
                            </div>

                            <div class="lg:flex justify-center mt-5 hidden absolute bottom-16 left-0 right-0">
                                <button @click="update"
                                    class="text-white text-base font-bold bg-[#2F312A] w-[250px] h-[50px]">
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="tab === 2">
                        <div class="overflow-y-auto lg:max-h-[300px] max-h-[435px]">
                            <div class="lg:px-4 px-7 py-2">
                                <div>
                                    <div class="flex items-start">
                                        <span class="text-[#2F312A] text-base font-bold whitespace-nowrap">주소:</span>
                                        <span class="text-[#2F312A] text-base font-normal px-1 break-all">
                                            {{ dataAddress.display_name }}
                                        </span>
                                    </div>

                                    <p class="text-[#152123] text-base font-normal px-10">
                                        {{ store.tour_attractions.addr }}
                                    </p>
                                </div>
                            </div>
                            <div class="lg:pt-4 lg:pl-4 p-0">
                                <div class="overflow-hidden">
                                    <GoogleMap api-key="YOUR_API_KEY" :center="center" :zoom="zoom"
                                        class="w-full h-[calc(100vh-150px)] lg:h-64">
                                        <Marker :options="{ position: center }" />
                                    </GoogleMap>
                                </div>
                            </div>
                            <div class="lg:flex justify-center hidden absolute bottom-16 left-0 right-0">
                                <button @click="update"
                                    class="text-white text-base font-bold bg-[#2F312A] w-[250px] h-[50px]">
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center mt-5 absolute bottom-0 left-0 right-0 lg:hidden">
                    <button @click="update" class="text-white text-base font-bold bg-[#2F312A] w-full h-14">
                        확인
                    </button>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { useEasyQuotationStore } from "~/stores/easy-quotation.store";
import { useTourAttractionStore } from "@/stores/tour-attraction.store";
import { GoogleMap, Marker } from "vue3-google-map";

const dataAddress = ref("");
const images = ref([]);
const tab = ref(1);
const myModal = ref(null);
const currentIndex = ref(0);
const visibleCount = 2;
const isMobile = ref(false);
const store = useTourAttractionStore();
const storeQuotation = useEasyQuotationStore();
const loading = ref(true);
const selectedAttraction = ref(null);
const props = defineProps(["laid", "type", "isOpen", "city_id", "co_id", "at_id"]);
const emit = defineEmits(["update:isOpen"]);
const { laid, type, isOpen, city_id, co_id, at_id } = toRefs(props);
const selectedLaid = ref(null);

const onClose = () => {
    store.clearData();
    emit("update:isOpen", false);
};


const update = () => {
    if (laid.value !== selectedLaid.value) {
        emit("confirm-selection", selectedLaid.value);
    }

    onClose();
};

const center = ref({
    lat: 37.7749,
    lng: -122.4194,
});
const zoom = ref(12);
const markerOptions = ref({
    position: center.value,
    label: "I",
    title: "LADY LIBERTY",
});



const onAttractionChange = async (event) => {
    const selectedId = event.target.value;
    selectedLaid.value = selectedId;

    await fetchDetailTourAttraction(selectedLaid.value);

    selectedAttraction.value = store.tourAttractions.find(
        (attraction) => attraction.laid === selectedLaid.value
    );
};

const loadTypeDetail = async () => {
    try {

        selectedLaid.value = laid.value;
        await store.getTypeDetail(type.value, city_id.value);
        await fetchDetailTourAttraction(selectedLaid.value);

    } catch (error) {
        console.error("Error fetching type detail:", error.message);
    }
};

loadTypeDetail();

const fetchDetailTourAttraction = async (selectedId) => {
    try {
        images.value = [];
        currentIndex.value = 0;
        loading.value = true;

        await store.getTourAttraction(selectedId);


        const imgs = store.tour_attractions.tourism_attr_imgs;
        const lat = parseFloat(store.tour_attractions.latitude);
        const lng = parseFloat(store.tour_attractions.longitude);

        
        if (isNaN(lat) || isNaN(lng)) {
            console.error("Invalid coordinates:", { lat, lng });
            return;
        }

        const responseAddress = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=en-US`
        );
        const addressData = await responseAddress.json();

        dataAddress.value = addressData;

        center.value = {
            lat: lat,
            lng: lng,
        };
        markerOptions.value.position = center.value;

        imgs.forEach((img) => {
            const image = img.image_path === "" ? img.key : img.image_path;
            images.value.push(image);
        });
        setTimeout(() => {
            loading.value = false;
        }, 1000);
    } catch (error) {
        console.log("Error fetching detail tour:", error);
    }
};


const updateIsMobile = () => {
    if (typeof window !== "undefined") {
        isMobile.value = window.innerWidth <= 768;
    }
};

const visibleImages = computed(() => {
    return images.value.slice(
        currentIndex.value,
        currentIndex.value + visibleCount
    );
});

const changeImage = (direction) => {
    const newIndex = currentIndex.value + direction;

    if (isMobile.value) {
        if (newIndex >= 0 && newIndex < images.value.length) {
            currentIndex.value = newIndex;
        }
    } else {
        if (newIndex >= 0 && newIndex <= images.value.length - visibleCount) {
            currentIndex.value = newIndex;
        }
    }
};

onMounted(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateIsMobile);
});
</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
