<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="onClose"></div>
            <!-- Modal Content -->
            <div
                class="relative bg-white lg:rounded-3xl lg:w-[730px] lg:h-[900px] w-full h-full mx-auto z-10 modal-teamofuse">
                <div class="flex justify-between p-5 border-b border-[#8E8D8D] lg:hidden">
                    <h2 class="text-sm text-start font-medium text-[#152123] leading-[18px]">
                        약관 상세보기
                    </h2>
                    <img :src="xIcon" @click="onClose" alt="">
                </div>
                <h2 class="lg:text-base text-lg text-center font-medium text-[#152123] leading-[23.01px] mt-5">
                    개인정보 제3자 제공 및 국외 이전 동의
                </h2>
                <div class="w-[320px] lg:w-[730px] h-full mx-auto lg:max-h-[750px] overflow-y-auto flex flex-col">
                    <!-- First Table Section -->
                    <div class="lg:mb-10">
                        <div class="">
                            <h2
                                class="w-[320px] text-xs lg:w-[670px] mx-auto text-[#5E5F61] font-normal gap-[10px] reading-[20px]">
                                <br>
                                회사는 여행상품의 예약 및 여행 관련 서비스 제공 등의 업무처리를 위하여 고객으로부터 최소한의 필수정보를 수집하며, 제공한 모든 개인정보는 별도의 동의가 없는
                                한
                                해당 목적 이외의 다른 목적으로 사용하지 않습니다.
                                <br>
                                고객님은 개인정보 제공에 대한 동의를 거부할 권리가 있습니다. 동의를 거부할 경우 여행상품 예약 서비스 이용이 불가함을 알려드립니다.
                            </h2>
                        </div>
                        <div
                            class="text-sm w-[320px] lg:w-[670px] mx-auto font-medium reading-[20.27px] text-[#152123] my-5">
                            1. 개인정보 제3자 제공에 관한 사항
                        </div>
                        <div class="overflow-x-auto w-[320px] lg:w-[670px] mx-auto">
                            <table class="w-[670px] border-collapse text-center min-w-[670px]">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                            제공받는 자
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                            제공 목적
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                            제공 항목
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                            국외이전여부
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[160px]">
                                            보유 및 이용기간
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            항공사 <br>
                                            <router-link to="/list_airlines">
                                                <span class="font-light">[전체보기]</span>
                                            </router-link>
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            항공권 예약 및 출국가능여부 파악
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            성명(한글/영문), 성별, 연락처, 여권정보
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            업체별 상이
                                        </td>
                                        <td rowspan="5"
                                            class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            <span class="text-[#152123]">여행계약 종료일까지</span>
                                            (관계법령에 따라 보존할 필요가 있는 경우 법령에서 요구하는 기한까지 보관)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            국내외 숙박업체 <br>
                                            <router-link to="/list_accommodation">
                                                <span class="font-light">[전체보기]</span>
                                            </router-link>
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            숙박예약 진행/확인
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            성명(국문/영문),연락처, 여권정보
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            업체별 상이
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            Auto and Lao Sole Co.,Ltd
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            국내외 행사 진행 및 고객관리
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            성명(국문/영문), 생년월일, 성별, 연락처, 이메일, 여권정보(영문명, 여권번호,여권만료일)
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            업체별 상이
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            Auto and Lao Sole Co.,Ltd
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            투어/입장권/공연예매, 상품배송, 구매자 식별/취소/환불 등의 업무처리
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            성명(국문/영문), 생년월일, 휴대폰번호
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            업체별 상이
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            여행자보험 서비스 제공 보험사<br>
                                            <span class="font-light">[전체보기]</span>
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            여행자보험 가입대행을 원한 고객의 여행자 보험가입
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            성명,이메일,연락처,주민등록번호
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            해당사항 없음
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Second Table Section -->
                    <div class="lg:mb-10 mb-36 w-[320px] lg:w-[670px] mx-auto">
                        <div class="text-sm font-medium reading-[20.27px] text-[#152123] my-5">
                            2. 개인정보 국외 이전에 관한 사항
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-[670px] border-collapse min-w-[670px]">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[100px]">
                                            이전받는 자
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[100px]">
                                            이전 받는 자의연락처
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[70px]">
                                            이전국가
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[100px]">
                                            이전 시기및 방법
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[100px]">
                                            이전되는항목
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[100px]">
                                            이전되는항목
                                        </th>
                                        <th
                                            class="border border-gray-200 p-2 text-sm font-medium text-[#152123] w-[100px]">
                                            이전되는항목
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            class="border h-[200px] border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            Auto and Lao Sole Co.,Ltd
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            jerry@auton.kr
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            라오스
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            오토앤투어 공급상품 예약시 이메일 또는 API, 네트워크를 통한 전송
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            업체별 상이
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            오토앤투어 공급상품 예약시 이메일 또는 API, 네트워크를 통한 전송
                                        </td>
                                        <td class="border border-gray-200 p-2 text-[12px] font-normal text-[#5E5F61]">
                                            <span class="text-[#152123]">여행계약 종료일까지</span>
                                            (관계법령에 따라 보존할 필요가 있는 경우 법령에서 요구하는 기한까지 보관)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            class="w-[320px] my-5 text-xs lg:w-[650px] mx-auto text-[#5E5F61] font-normal gap-[10px] reading-[20px]">
                            ※ 동의거부권 <br>
                            - 이용자는 개인정보 제3자 제공에 대한 동의를 거부할 권리가 있습니다.<br>
                            - 이용자는 회사의 개인정보보호책임자 및 담당부서를 통해 개인정보의국외 이전을거부할 수 있습니다.<br>
                            - 동의를 거부할 경우 상품서비스 수행에 필수적인 정보제공이 이뤄지지 않으므로, 상품예약이 불가능합니다. 
                        </div>
                    </div>


                </div>

                <div class="hidden lg:flex justify-center py-6">
                    <button @click="onClose"
                        class="w-[160px] h-[40px] text-xs font-medium bg-[#2F312A] text-white hover:bg-opacity-90 transition-colors">
                        확인
                    </button>
                </div>
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
import { RouterLink } from 'vue-router';
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
