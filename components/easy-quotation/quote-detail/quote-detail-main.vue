<template>
    <div class="max-w-full md:h-[820px] h-[795px] overflow-y-auto bg-white shadow-lg lg:overflow-y-auto">
        <div class="h1-custom p-6">코스명</div>
        <div class="w-[840px] mx-auto p-4 mb-3">
            <img class="w-[840px] mx-auto h-[360px]"
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/1e/f8/6d/photo0jpg.jpg?w=1200&h=-1&s=1"
                alt="">
            <div class="h1-custom p-4">여행 일정</div>
            <tableQuote />
            <div class="flex justify-between">
                <div class="text-[18px] font-medium leading-[24px] text-left text-[#0EC0CB]">1인당 예상 금액</div>
                <div class="text-right">
                    <div class="text-[22px] font-bold leading-[22px] text-right text-[#152123]">
                        8,600,000 원
                    </div>
                    <div class="text-[12px] font-normal leading-[22px] text-right text-[#95C3DD]">※ 항공 미포함 가격이며, 총 예상 금액은
                        견적서 내용과 상이할 수 있습니다.
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup="js">
import tableQuote from '~/components/easy-quotation/quote-detail/table.vue'
</script>
