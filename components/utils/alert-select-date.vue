<template>
    <div class="flex items-center justify-center fixed inset-0 z-50">
        <dialog ref="myModal" class="modal" :open="isOpen" >
            <div class="w-[400px] h-[240px] bg-white border-[#8E8D8D] border rounded-2xl flex flex-col">
                <img src="@/assets/icons/alert.svg" alt="">
                <h3 class="text-[#2F312A] text-base font-bold p-7 text-center ">
                    일정에 맞는 추천 코스가 없습니다.
                    여행 일정을 변경해 보세요.
                    (3박 5일, 4박 6일만 가능​)</h3>
                <div class="flex flex-col items-center justify-center">
                    <button @click="close" class="text-blue-500 text-base] font-bold p-5 w-full">참고</button>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup>

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

const close = () => {
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