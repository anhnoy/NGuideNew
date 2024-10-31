<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="onClose"></div>

            <!-- Modal Content -->
            <div
                class="relative bg-white lg:rounded-lg rounded-3xl lg:w-[540px] lg:h-[423px] w-[328px] h-[496px] mx-auto z-10">
                <div class="p-6 w-[328px] h-[496px] lg:h-full lg:w-[480px] mx-auto flex flex-col">
                    <!-- Header -->
                    <h2 class="lg:text-[16px] text-lg text-center font-medium text-[#152123] leading-[23.01px] mb-4">
                        개인정보 수집 및 이용
                        동의</h2>

                    <!-- Content -->
                    <div class="text-sm lg:w-[460px] mx-auto text-[#5E5F61] font-normal gap-[10px] reading-[20px] mb-6">
                        회사는 여행상품의 예약자 정보 확인을 위하여 개인정보를 수집하고 있습니다.
                        <br><br>
                        고객님은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 동의를 거부할 경우 여행상품 예약 서비스 이용이 불가함을 알려드립니다.
                    </div>

                    <!-- Table -->
                    <div class="lg:flex-1 lg:mb-6 mb-10 overflow-x-auto">
                        <table class="w-full border-collapse">
                            <thead class="hidden lg:block">
                                <tr class="bg-gray-50">
                                    <th class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                        수집/이용목적 
                                    </th>
                                    <th class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                        수집/이용항목
                                    </th>
                                    <th class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                        보유 및 이용기간
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="hidden lg:block">
                                <tr>
                                    <td
                                        class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61] w-[160px] h-[60px]">
                                        맞춤/간편 여행 견적신청을 위한 예약자 정보 확인
                                    </td>
                                    <td
                                        class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61] w-[160px] h-[60px]">
                                        예약자정보<br>
                                        -이름, 이메일, 휴대폰번호
                                    </td>
                                    <td
                                        class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61] w-[160px] h-[60px]">
                                        견적일로부터 14일까지
                                    </td>
                                </tr>
                            </tbody>


                            <tbody class="lg:hidden lg:block">
                                <tr>
                                    <th
                                        class="border border-[#FFFFFF] p-2 text-xs font-medium text-[#152123] w-[120px] bg-[#EDEDF2]">
                                        수집/이용목적
                                    </th>
                                    <th
                                        class="border border-[#E6E6E6] p-2 text-xs font-normal text-[#5E5F61] w-[178px] text-start">
                                        맞춤/간편 여행 견적신청을 위한 예약자 정보 확인
                                    </th>
                                </tr>
                                <tr>
                                    <th
                                        class="border border-[#FFFFFF] p-2 text-xs font-medium text-[#152123] w-[120px] bg-[#EDEDF2]">
                                        수집/이용항목
                                    </th>
                                    <th
                                        class="border border-[#E6E6E6] p-2 text-xs font-normal text-[#5E5F61] w-[178px] text-start">
                                        예약자정보 <br>
                                        -이름, 이메일, 휴대폰번호
                                    </th>
                                </tr>
                                <tr>
                                    <th
                                        class="border border-[#FFFFFF] p-2 text-xs font-medium text-[#152123] w-[120px] bg-[#EDEDF2]">
                                        보유 및 이용기간
                                    </th>
                                    <th
                                        class="border border-[#E6E6E6] p-2 text-xs font-normal text-[#5E5F61] w-[178px] text-start">
                                        견적일로부터 14일까지
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Confirm Button -->
                    <button @click="onClose"
                        class="w-[160px] h-[40px] mx-auto text-center text-sm font-medium  bg-[#2F312A] text-white  hover:bg-opacity-90 transition-colors">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
        default: false
    }
})

const emit = defineEmits(['close'])

const onClose = () => {
    emit('close')
}

// Add transition when modal opens
onMounted(() => {
    if (props.isOpen) {
        const modalContent = document.querySelector('.modal-content')
        if (modalContent) {
            modalContent.style.opacity = '1'
            modalContent.style.transform = 'translateY(0)'
        }
    }
})
</script>

<style scoped>
.modal-content {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease-in-out;
}

/* Add smooth transition for modal opening/closing */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>