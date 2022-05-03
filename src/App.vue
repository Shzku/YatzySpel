<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <RouterView v-slot="{ Component, route }">
        <transition name="route" mode="out-in">
            <component :is="Component"/>
        </transition>
    </RouterView>
</template>

<style scoped src="./assets/css/style.css">
/*
.route-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.route-enter-active {
    transition: all 300ms ease-out;
}

.route-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}

.route-leave-active {
    transition: all 300ms ease-in;
}
*/
</style>