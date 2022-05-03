<script lang="ts">
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";

export default {
    setup() {
        const playerStore = usePlayerStore();

        const { throwsLeft } = storeToRefs(playerStore);

        return {
            throwsLeft
        }
    },
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
    <button v-on:click="locked=!locked" :disabled="throwsLeft == 3">{{rolledNumber}}:{{locked}}</button>
</template>