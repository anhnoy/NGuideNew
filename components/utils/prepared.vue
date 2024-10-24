<template>
  <div>
    <dialog
      :open="showModal"
      id="my_modal_5"
      class="modal  sm:modal-middle"
    >
      <div class="bg-white w-96 p-10 rounded-xl border border-[#CCCCCC]">
          <div class="flex flex-col justify-center items-center">
            <img src="@/assets/icons/alert.png" alt="tip" class="w-10" />
            <p class="pt-5 text-[#152123] text-base font-medium">
              서비스 준비중입니다.
            </p>
          </div>
          <div class="modal-action justify-center">
            <form method="dialog" @click="closed">
              <button
                class="text-[#FFFFFF] font-bold text-base bg-[#132D5C] w-40 h-10"
              >
                확인
              </button>
            </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const props = defineProps(["showModal"]);
const emit = defineEmits(["update:showModal"]);

const closed = () => {
  emit("update:showModal", false);
};
</script>

<style scoped></style>
