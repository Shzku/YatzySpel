<script lang="ts">
export default {
    data() {
        return {
            locked: false,
            rolledNumber: 1,
        }
    },
    methods: {
        diceRoll() {
            if (this.locked) return;
            this.rolledNumber = Math.floor(Math.random() * 6) + 1;
        }
    }
}
</script>

<template>
    <button v-on:click="locked=!locked">{{rolledNumber}}:{{locked}}</button>
</template>