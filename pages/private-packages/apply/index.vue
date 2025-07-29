<template>
    <div class="w-full md:h-full">
        <navbar class="hidden bg-white sm:block" />
        <div
            class="flex flex-col bg-white md:flex-row pb-10 pt-5 px-4 h-[45px] md:hidden box-shadow: 0px 2px 2px 0px #00000033;">
            <div class="flex items-center justify-between w-full">
                <div>
                    <img @click="navigateToIndex" :src="chevronLeftIcon" alt="" />
                </div>
                <div class="flex items-center">
                    <p class="text-base text-[#152123] leading-[23.17px] font-medium">
                        단독패키지 예약
                    </p>
                </div>
                <div></div>
            </div>
        </div>
        <div class="bg-white md:w-full w-[360px] h-auto md:h-auto overflow-y-auto mx-auto">
            <applyPrivatePackages />
        </div>
        <kakao />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import navbar from "~/components/navbar/navbar.vue";
import { useDestinationStore } from "~/stores/destination.store";
import chevronLeftIcon from "@/assets/icons/chevron-left.svg";
import informService from "~/services/custom-travel.service";
import customTravelService from "~/services/custom-travel.service";
import kakao from "@/components/kakao/buttonKAKAO.vue";
import applyPrivatePackages from "./applyPrivatePackages.vue";

useHead({
    title: "autontour", // Optional, you can set a custom title for the create-quotation page
    meta: [
        {
            name: "naver-site-verification",
            content: "8eaa0adf55c96d5b0b83954be26d188fa8aa6866",
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
        },
        {
            name: "description",
            content:
                "라오스 맞춤 여행! 원하는 일정과 예산에 맞춰 여행 스케줄과 견적을 작성해드립니다. 맞춤 여행을 지금 신청하세요.",
        },
        { name: "robots", content: "index, follow" },
        // Open Graph Meta Tags (for Facebook, KakaoTalk, etc.)
        {
            property: "og:title",
            content: "라오스 맞춤 여행 신청 | 우리끼리 원하는 일정으로 견적 신청",
        },
        {
            property: "og:description",
            content:
                "라오스 여행을 내 일정에 맞춰 자유롭게! 원하는 여행 계획을 입력하면 맞춤 견적과 일정을 제공해드립니다.",
        },
        {
            property: "og:image",
            content: "https://autontour.com/assets/images/AutonTour_logo.png",
        }, // Replace with your image URL
        { property: "og:url", content: "https://autontour.com/create-quotation" },
        { property: "og:type", content: "website" },
    ],
    link: [
        { rel: "canonical", href: "https://autontour.com/create-quotation" }, // Avoid duplicate content issues
    ],
});

const isModalOpen = ref(false);

const destinationStore = useDestinationStore();
const isVisible = ref(1);
const showMobileDropdown = ref(false);
const error = ref(false);
const modalMessage = ref("회원 여부를 선택해주세요.");
const isLoading = ref(false);
const router = useRouter();
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
};

const handleConfirm = () => {
    isVisible.value = 1;
};
const handleBack = () => {
    isVisible.value = 1;
};
const handleChange = () => {
    isVisible.value = 3;
};

const cityLabels = {
    4: "비엔티엔",
    5: "방비엔",
    6: "루앙프라방",
};

const accommodations = ref([
    { value: "1", name: "5성급" },
    { value: "2", name: "4성급" },
    { value: "3", name: "3성급" },
    { value: "4", name: "상관없음" },
]);

const beds = ref([
    { rid: 1, name: "싱글" },
    { rid: 2, name: "트윈" },
    { rid: 3, name: "트리플" },
    { rid: 4, name: "상관없음" },
]);

const otherOptions = ref([
    { value: "1", name: "조식 포함" },
    { value: "0", name: "조식 미포함" },
]);

// Reactive references for food options
const foods = ref([
    { fdt_id: 1, name: "한식" },
    { fdt_id: 2, name: "양식" },
    { fdt_id: 3, name: "태국식" },
    { fdt_id: 4, name: "중식" },
    { fdt_id: 5, name: "현지식" },
    { fdt_id: 6, name: "상관없음" },
]);

// Reactive references for additional options
const others = ref([
    { name: "알레르기 보유", value: 1 },
    { name: "채식", value: 2 },
    { name: "식이 제한", value: 3 },
    { name: "중식 포함", value: 4 },
    { name: "석식 포함", value: 5 },
    { name: "과일 세트", value: 6 },
    { name: "간식 제공", value: 7 },
    { name: "해당없음", value: 8 },
]);

watch(
    () => [
        destinationStore.travelCustom.hasPlaceToVisit,
        destinationStore.travelCustom.region,
    ],
    ([hasPlaceToVisit, region]) => {
        if (hasPlaceToVisit === true && region !== null) {
            isVisible.value = 3;
        }
    },
    { immediate: true }
);

const formattedAccommodationDetails = computed(() => {
    const tc = destinationStore.travelCustom;
    const getNameOrDefault = (value, defaultValue) =>
        value ? value : defaultValue;

    const selectedAccommodation = accommodations.value.find(
        (acc) => acc.value === tc.selectedAccommodations
    );
    const accommodationName = getNameOrDefault(
        selectedAccommodation?.name,
        "상관없음"
    );

    const selectedBedId =
        tc.selectedBeds && tc.selectedBeds.length > 0 ? tc.selectedBeds[0].rid : 4;
    const selectedBed = beds.value.find((bed) => bed.rid === selectedBedId);
    const bedName = getNameOrDefault(selectedBed?.name, "상관없음");

    const selectedFood = otherOptions.value.find(
        (opt) => opt.value === tc.req_inc_food
    );
    const foodName = getNameOrDefault(selectedFood?.name, "조식 미포함");

    const selectedFoods = tc.selectedFoods
        .map((foodId) => {
            const foodItem = foods.value.find((food) => food.fdt_id === foodId);
            return foodItem ? foodItem.name : null;
        })
        .filter((name) => name !== null);

    const foodList =
        selectedFoods.length > 0 ? selectedFoods.join(", ") : "상관없음";

    const selectedOthersArray = Array.isArray(tc.strictList) ? tc.strictList : [];
    const selectedOthers = others.value
        .filter((other) => selectedOthersArray.includes(other.value))
        .map((other) => other.name);
    const othersList =
        selectedOthers.length > 0 ? selectedOthers.join(", ") : "해당없음";

    const detailsArray = [
        accommodationName,
        bedName,
        foodName,
        foodList,
        othersList,
    ];

    const limitLines = (arr, maxItems) => {
        const truncated = arr.slice(0, maxItems);
        return truncated.join(", ") + (arr.length > maxItems ? ", ..." : "");
    };
    return limitLines(detailsArray, 3);
});

const cityLabel = computed(() => {
    return cityLabels[destinationStore.travelCustom.selectedCity]; // Default to empty if not found
});

const selectedLandNamesOrDefault = computed(() => {
    const landNames = destinationStore.travelCustom.trip_req.map(
        (trip) => trip.land_name
    );

    if (landNames.length === 0) {
        return "아니요, 추천해 주세요";
    }

    if (landNames.length > 2) {
        return `${landNames.slice(0, 2).join(", ")}...`;
    }

    return landNames.join(", ");
});

const maxDisplayCount = 2; // Adjust the max display count as needed

const formattedSelectedThemeLabels = computed(() => {
    const selectedLabels = destinationStore.travelCustom.selectedThemeLabel;

    if (selectedLabels.length > maxDisplayCount) {
        const displayedLabels = selectedLabels.slice(0, maxDisplayCount);
        return `${displayedLabels.join(", ")} ...`;
    }
    return selectedLabels.join(", ");
});

const setVisible = (value) => {
    if (isVisible.value === 6) {
        return; // Prevents updating when isVisible is 6
    }
    showMobileDropdown.value = false;
    isVisible.value = value;
};

const toggleMobileDropdown = () => {
    showMobileDropdown.value = !showMobileDropdown.value;
};

// const handleBack = () => {
//   if (isVisible.value > 1) {
//     isVisible.value--;
//   }
// };

const requiredFieldsFilled = computed(() => {
    const tc = destinationStore.travelCustom;
    return (
        tc.startDate &&
        tc.endDate &&
        // tc.selectedDeparture &&
        // tc.selectedArrival &&
        tc.selectedOption &&
        tc.req_bid &&
        tc.req_bid_end
    );
});

const requiredFieldsSelection = computed(() => {
    const tc = destinationStore.travelCustom;
    return (
        tc.selectedAccommodations &&
        tc.selectedBeds.length > 0 &&
        tc.selectedFoods.length > 0 &&
        tc.selectedVehicles &&
        tc.strictList.length > 0 &&
        tc.req_inc_food &&
        tc.additionList.length > 0
    );
});

const requiredFieldsReservation = computed(() => {
    const tc = destinationStore.travelCustom;
    return (
        tc.req_group_name &&
        tc.reservationName &&
        tc.email &&
        tc.phone > 0 &&
        tc.OtpNumber &&
        tc.OtpChecked === true
    );
});

const handleBackCustomized = () => {
    router.push("/customized-travel");
};

const handleNext = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    if (isVisible.value === 2 && !requiredFieldsFilled.value) {
        modalMessage.value = "모든 항목을 선택해 주세요.";
        isModalOpen.value = true;
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        return;
    }
    if (
        isVisible.value === 2 &&
        destinationStore.travelCustom.selectReq_adults === "0"
    ) {
        modalMessage.value = "여행 인원을 확인해 주세요.";
        isModalOpen.value = true;
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        return;
    }

    if (
        isVisible.value === 3 &&
        destinationStore.travelCustom.hasPlaceToVisit === "" &&
        destinationStore.travelCustom.trip_req.length === 0
    ) {
        modalMessage.value = "방문하고 싶은 곳을 선택해 주세요";
        isModalOpen.value = true;
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        return;
    } else if (
        isVisible.value === 3 &&
        destinationStore.travelCustom.hasPlaceToVisit === false // Check for false
    ) {
        // Set selectedCity to "" in the store
        destinationStore.travelCustom.selectedCity = "";
        // Set trip_req to null when hasPlaceToVisit is false
        destinationStore.travelCustom.trip_req = [];
        destinationStore.travelCustom.selectedPlaces = [];
        isVisible.value = 4;
        return;
    } else if (
        isVisible.value === 3 &&
        destinationStore.travelCustom.hasPlaceToVisit &&
        destinationStore.travelCustom.trip_req.length === 0
    ) {
        modalMessage.value = "방문하고 싶은 곳을 선택해 주세요";
        isModalOpen.value = true;
        return;
    }

    if (isVisible.value === 4 && !requiredFieldsSelection.value) {
        isModalOpen.value = true;
        modalMessage.value = "모든 항목을 선택해 주세요.";
        return;
    }

    if (isVisible.value < 5) {
        isVisible.value++;
    }
};

const sendData = async () => {
    if (!requiredFieldsReservation.value) {
        isModalOpen.value = true;
        modalMessage.value = "예약자 정보를 모두 작성해 주세요";
        return;
    } else if (!destinationStore.travelCustom.isChecked) {
        isModalOpen.value = true;
        modalMessage.value = "개인정보 수집 및 이용 동의에 체크해 주세요.";
        return;
    }

    const respone = await customTravelService.getToken();
    const token = respone.token;
    const tc = destinationStore.travelCustom;
    const storeData = {
        req_group_name: tc.req_group_name || "",
        req_book_name: tc.reservationName,
        req_book_email: tc.email,
        req_book_phone: tc.phone,
        req_book_pass: "autonlao@1108",
        req_book_pass_confirm: "autonlao@1108",
        req_hotel: tc.selectedAccommodations,
        req_depart: tc.startDate,
        req_arr: tc.endDate,
        req_adults: tc.selectReq_adults,
        req_kids: tc.selectReq_kids,
        req_infant: tc.selectReq_infants,
        req_main_group: tc.selectedOption,
        req_inc_food: tc.req_inc_food,
        req_bid: tc.req_bid,
        req_bid_end: tc.req_bid_end,
        // req_depart_period: tc.selectedDeparture,
        // req_arr_period: tc.selectedArrival,
        req_vehicle: tc.selectedVehicles,
        req_opt: tc.additionalInfo,
        trip_req: tc.trip_req,
        fts_id: tc.selectedFlight,
        goal_selected: tc.selectedDestination,
        theme_selected: tc.selectedThemes,
        room_selected: tc.selectedBeds,
        favor_food: tc.selectedFoods,
        strict_list: tc.strictList,
        addition_list: tc.additionList,
        token: token,
        countrys: Array.isArray(tc.region)
            ? tc.region.map((c) => ({ cid: c }))
            : [{ cid: tc.region }],
    };

    // console.log(JSON.stringify(storeData, null, 2));
    try {
        isLoading.value = true;
        const response = await informService.createInform(storeData);

        if (response.status === 200) {
            isVisible.value = 6;
        } else if (response.status === 404) {
            // Redirect to index page if status is 404
            router.push("/");
        }
    } catch (error) {
        // Check if the error has a response status
        if (error.response && error.response.status === 404) {
            router.push("/");
        }
        // console.error("Error creating Inform:", error);
    } finally {
        clearStoreData();
        isLoading.value = false;
    }
};

const handleError = (errorState) => {
    error.value = errorState;
};
const clearStoreData = () => {
    destinationStore.clearSelection();
};

const handlePopState = () => {
    // console.log("Browser back button was clicked!");
    clearStoreData();
};

onBeforeRouteLeave((to, from, next) => {
    destinationStore.clearSelection();
    next();
});

// For manual navigation
const navigateToIndex = () => {
    destinationStore.clearSelection();
    router.push("/customized-travel");
};

onMounted(() => {
    window.addEventListener("popstate", handlePopState);
});

onBeforeUnmount(() => {
    window.removeEventListener("popstate", handlePopState);
});
</script>

<style scoped>
.truncate-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Limits to two lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
</style>