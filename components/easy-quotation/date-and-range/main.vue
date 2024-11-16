<template>
    <div class="bg-white max-w-full md:h-[606px] h-screen overflow-x-hidden shadow-lg overflow-y-auto p-4">
        <selectDate class="mb-10" />
        <peopleTraveling class="mb-10" />
    </div>
</template>

<script setup>
import selectDate from './date-picker.vue'
import peopleTraveling from './tourism.vue';
</script>

<style></style>