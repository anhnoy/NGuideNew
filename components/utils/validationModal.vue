<!-- components/ValidationModal.vue -->
<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[#2F312A] bg-opacity-50"
  >
    <div
      class="bg-white md:h-[250px] md:w-[450px] w-[328px] h-[200px] p-10 rounded-xl text-center shadow-lg"
    >
      <div class="flex flex-col justify-between h-full">
        <img
          src="@/assets/icons/warning-icon.png"
          alt="warning"
          class="w-[42px] h-[42px] mx-auto mb-3"
        />
        <p
          class="font-medium text-[16px] mb-4 leading-relaxed whitespace-pre-line"
          :class="
            message.includes('완료') ? 'text-green-600' : 'text-[#152123]'
          "
        >
          {{ message }}
        </p>

        <div class="flex justify-center w-full">
          <button
            @click="close"
            class="bg-[#2F312A] text-white text-sm py-2 rounded-md hover:bg-green-700 md:w-[160px] md:h-[37px] w-[120px] h-[37px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  message: String,
});
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
