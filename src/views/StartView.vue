<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <main class="titleFlex">
        <h1 class="title">
            YAT<br>ZEE
        </h1>
        <RouterLink to="/yatzy" class="linkButton">Börja!</RouterLink>
    </main>
</template>

<style>
@import '../assets/base.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

.titleFlex {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.title {
    color: var(--colour-text);
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 6em;
    line-height: 0.9em;
}

.linkButton {
    margin-top: 1.5em;
    background-color: var(--colour-button-background);
    padding: 25px 30px;
    border: 0;
    color: var(--colour-text);
    font-size: xx-large;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    border-radius: 12px;
    text-decoration: none;
}

@media screen and (min-width: 800px) {
    .title {
        font-size: 7em;
    }
}

@media screen and (min-width: 1200px) {
    .title {
        font-size: 10em;
    }
}

</style>