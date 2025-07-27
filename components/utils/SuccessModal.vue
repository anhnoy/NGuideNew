<!-- components/SuccessModal.vue -->
<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
  >
    <div
      class="bg-white w-[328px] sm:w-[420px] rounded-[20px] p-6 text-center shadow-lg"
    >
      <p class="text-[#3B6333] text-[16px] font-semibold mb-2">
        맞춤 여행 신청이 완료되었습니다.
      </p>
      <p class="text-[#152123] text-[14px] mb-1">
        담당자가 1~2일 이내 안내 드릴 예정입니다.
      </p>
      <p class="text-[13px] text-[#0EC0CB]">(주말/공휴일 제외)</p>

      <button
        class="mt-6 w-full py-2 bg-[#2F312A] text-white text-[14px] rounded-[10px] hover:bg-[#3B6333] transition"
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
