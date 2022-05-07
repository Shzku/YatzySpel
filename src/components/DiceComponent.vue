<script lang="ts">
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";

import diceOneDarkUnlocked from "../assets/dice/Dark=on, Type=One, Lock=Off.svg";
import diceOneDarkLocked from "../assets/dice/Dark=on, Type=One, Lock=On.svg";
import diceTwoDarkUnlocked from "../assets/dice/Dark=on, Type=Two, Lock=Off.svg";
import diceTwoDarkLocked from "../assets/dice/Dark=on, Type=Two, Lock=On.svg";
import diceThreeDarkUnlocked from "../assets/dice/Dark=on, Type=Three, Lock=Off.svg";
import diceThreeDarkLocked from "../assets/dice/Dark=on, Type=Three, Lock=On.svg";
import diceFourDarkUnlocked from "../assets/dice/Dark=on, Type=Four, Lock=Off.svg";
import diceFourDarkLocked from "../assets/dice/Dark=on, Type=Four, Lock=On.svg";
import diceFiveDarkUnlocked from "../assets/dice/Dark=on, Type=Five, Lock=Off.svg";
import diceFiveDarkLocked from "../assets/dice/Dark=on, Type=Five, Lock=On.svg";
import diceSixDarkUnlocked from "../assets/dice/Dark=on, Type=Six, Lock=Off.svg";
import diceSixDarkLocked from "../assets/dice/Dark=on, Type=Six, Lock=On.svg";

export default {
    setup() {
        const playerStore = usePlayerStore();

        const { throwsLeft } = storeToRefs(playerStore);

        return {
            throwsLeft,
            diceOneDarkUnlocked,
            diceOneDarkLocked,
        }
    },
    data() {
        return {
            locked: false,
            rolledNumber: 1,
            diceUnlockedTable: [
                diceOneDarkUnlocked,
                diceTwoDarkUnlocked,
                diceThreeDarkUnlocked,
                diceFourDarkUnlocked,
                diceFiveDarkUnlocked,
                diceSixDarkUnlocked,
            ],
            diceLockedTable: [
                diceOneDarkLocked,
                diceTwoDarkLocked,
                diceThreeDarkLocked,
                diceFourDarkLocked,
                diceFiveDarkLocked,
                diceSixDarkLocked,
            ],
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
    <button 
        class="diceButton" 
        v-on:click="locked=!locked" 
        :disabled="throwsLeft == 3"
    >
        <img class="dice" :src="locked ? diceLockedTable[rolledNumber - 1] : diceUnlockedTable[rolledNumber - 1]" alt="dice" style="visibility: visible;" v-bind:class="{ disabled: throwsLeft == 3}"/>
    </button>
</template>

<style>
    .disabled {
        opacity: 0.5;
    }
    .diceButton {
        padding: 0;
        border: 0;
        visibility: hidden;
    }
    
    @media screen and (min-width: 800px) {
        .dice {
            width: 140px;
        }
    }

    @media screen and (min-width: 1200px) {
        .dice {
            width: 180px;
        }
    }

</style>