<template>
    <div>
        <div class="relative lg:h-[150vh] bg-white md:bg-cover bg-no-repeat"
            :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
            <navbar class="hidden sm:block bg-white" />
            <checkEmail />
        </div>
    </div>
</template>

<script setup>
import navbar from '~/components/navbar/navbar.vue';
import backgroundImage from '@/assets/images/logo copy.png'; // Import the image
import checkEmail from '~/components/login-quotation/login-quotation.vue';
</script>

<style scoped>
/* Additional styles if needed */
</style>
