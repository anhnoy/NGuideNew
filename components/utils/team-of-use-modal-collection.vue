<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="onClose"></div>
            <div
                class="relative bg-white lg:rounded-3xl lg:w-[540px] lg:h-[800px] w-full h-full mx-auto z-10 modal-teamofuse">
                <div class="flex justify-between p-5 border-b border-[#8E8D8D] lg:hidden">
                    <h2 class="text-sm text-start font-medium text-[#152123] leading-[18px] ">
                        약관 상세보기
                    </h2>
                    <img :src="xIcon" @click="onClose" alt="">
                </div>
                <h2 class="lg:text-base text-lg text-center font-medium text-[#152123] leading-[23.01px] mt-5">
                    개인정보 수집 및 이용 동의
                </h2>
                <div
                    class="w-[320px] h-full mx-auto max-h-auto  lg:max-h-[650px] overflow-y-auto lg:h-full lg:w-[480px] flex flex-col">
                    <div class="">
                        <h2 class="text-xs lg:w-[460px] mx-auto text-[#5E5F61] font-normal gap-[10px] reading-[20px]">
                            <br>
                            회사는 여행상품의 예약 및 여행 관련 서비스 제공 등의 업무처리를 위하여 고객으로부터 최소한의 필수정보를 수집하며, 제공한 모든 개인정보는 별도의 동의가 없는 한
                            해당 목적 이외의 다른 목적으로 사용하지 않습니다. 
                             <br>
                            고객님은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 동의를 거부할 경우 여행상품 예약 서비스 이용이 불가함을 알려드립니다. 
                        </h2>
                    </div>
                    <div class="lg:mb-10 my-10">
                        <table class="w-full border-collapse  lg:table">
                            <thead class="bg-gray-50">
                                <tr>
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
                            <tbody>
                                <!-- First row with rowspan -->
                                <tr>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        맞춤 여행 견적신청 등 여행상품 서비스 제공 
                                    </td>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        예약자 및 여행자 정보: 이름, 이메일, 휴대폰번호, 여권/비자 소지 여부
                                    </td>
                                    <td rowspan="7"
                                        class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        서비스 해지시까지 
                                        (관계법령에 따라 보존할 필요가 있는 경우 법령에서 요구하는 기한까지 보관)
                                    </td>
                                </tr>
                                <!-- Second row -->
                                <tr>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        항공권 구매 결제 및 발권, 예약 및 출국가능 여부 파악 
                                    </td>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        · 예약자 정보: 이름, 이메일 휴대폰번호<br>
                                        · 탑승객 정보: 이름, 성별, 생년월일<br>
                                        · 여권정보: 여권번호, 여권만료일, 국적, 여권발행국
                                    </td>
                                </tr>
                                <!-- Third row -->
                                <tr>
                                    <th rowspan="2"
                                        class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">대금 결제
                                        및 정산 시</th>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        (필수)결제정보: 카드 소유주명, 카드번호, 유효기간, 비밀번호 앞2자리, 생년월일</td>
                                </tr>
                                <tr>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">(선택)
                                        현금결제시: 현금영수증번호, 휴대폰번호, 사업자 번호</td>
                                </tr>
                                <!-- Fourth row -->
                                <tr>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        불법/부정 이용 방지, 외부거래 모니터링 및 서비스 분석
                                    </td>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        자동생성정보: 기기정보(기기종류, OS버전), 이용기록(IP주소, 쿠키,서비스 이용기록)
                                    </td>
                                </tr>
                                <!-- Fifth row -->
                                <tr>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        고객상담 및 문의 대응
                                    </td>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        이름, 이메일, 연락처, 예약번호, 상담내용
                                    </td>
                                </tr>
                                <!-- Sixth row -->
                                <tr>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        만14세 미만 예약시 법정대리인 및 동의 확인
                                    </td>
                                    <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                        법정대리인의 성명, 관계
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="mb-36 block lg:hidden"></div>
                    </div>
                </div>
                <button @click="onClose"
                    class=" mt-2 w-[160px] h-[40px] mx-auto text-center text-xs font-medium  bg-[#2F312A] text-white  hover:bg-opacity-90 transition-colors hidden lg:block">
                    확인
                </button>
                <div class="fixed bottom-0 left-0 right-0 lg:hidden">
                    <button @click="onClose"
                        class="w-full h-[50px] text-center text-xs font-medium bg-[#2F312A] text-white hover:bg-opacity-90 transition-colors">
                        확인
                    </button>
                </div>
            </div>

        </div>
    </Teleport>
</template>

<script setup>
// import xIcon from '../'
import xIcon from '@/assets/icons/x-icon.svg'
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
        const modalTeamOfUse = document.querySelector('.modal-teamofuse')
        if (modalTeamOfUse) {
            modalTeamOfUse.style.opacity = '1'
            modalTeamOfUse.style.transform = 'translateY(0)'
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
