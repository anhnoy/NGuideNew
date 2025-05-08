<template>
    <div class="flex items-center justify-center fixed inset-0 z-50">
      <dialog ref="myModal" class="modal" :open="isOpen">
        <div
          class="w-[400px] h-[150px] bg-white border-[#8E8D8D] border rounded-2xl flex flex-col"
        >
          <h3 class="text-[#2F312A] text-base font-bold p-7 text-center">
            존재하는 페이지가 아니거나 삭제된 페이지입니다.
          </h3>
          <div class="border-t w-full"></div>
          <div class="flex flex-col items-center justify-center">
            <button
              @click="backToEvent"
              class="text-blue-500 text-base] font-bold p-5 w-full"
            >
              확인
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const props = defineProps(["isOpen"]);
  const emit = defineEmits(["update:isOpen"]);
  const { isOpen } = toRefs(props);
  const myModal = ref(null);
  
  watch(isOpen, (value) => {
    if (value) {
      myModal.value?.showModal();
    } else {
      myModal.value?.close();
    }
  });
  
  const backToEvent = () => {
    router.push("/");
    emit("update:isOpen", false);
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>