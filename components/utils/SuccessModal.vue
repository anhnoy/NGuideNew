<!-- components/SuccessModal.vue -->
<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
  >
    <div
      class="bg-white w-[328px] h-[200px] lg:w-[450px] lg:h-[250px] rounded-[20px] py-12 text-center shadow-lg "
    >
      <p class="text-[#3B6333] text-[14px] md:text-base font-semibold mb-2">
        맞춤 여행 신청이 완료되었습니다.
      </p>
      <p class="text-[#152123] text-[12px] md:text-sm mb-1">
        담당자가 1~2일 이내 안내 드릴 예정입니다.
      </p>
      <p class="text-[10px] md:text-[12px] text-[#0EC0CB]">(주말/공휴일 제외)</p>

      <button
        class="mt-6 py-2 bg-[#2F312A] text-white text-[14px] rounded-[10px] hover:bg-[#3B6333] transition w-[160px] h-[37px]"
        @click="close"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ visible: Boolean });
const emit = defineEmits(["close"]);
const close = () => emit("close");
</script>
