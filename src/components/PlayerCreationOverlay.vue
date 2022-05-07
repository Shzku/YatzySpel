<script lang="ts">
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";

class Spelare {
    public name: string;
    public score: Array<number | null>;
    public selectScore: Array<number | null>;

    constructor(name: string) {
        this.name = name;
        this.score = [null, null, null, null, null, null, 0, 0, 0, null, null, null, null, null, null, null, null, 0];
        this.selectScore = [null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    }
}

export default {
    setup() {
        const playerStore = usePlayerStore();

        function addPlayer(player: string) {
            playerStore.addPlayer(player);
        }

        function clearPlayers() {
            playerStore.clearPlayers();
        }

        function throwDice() {
            playerStore.throwDice();
        }

        function getPlayers() {
            return playerStore.getPlayers();
        }

        const { players, throwsLeft, currentPlayer } = storeToRefs(playerStore);

        return {
            throwsLeft,
            addPlayer,
            clearPlayers,
            getPlayers,
            throwDice,
        }
    },
    data() {
        return {
            names: [],
            playerCount: 1,
        }
    },
    methods: {
        createPlayers() {
            this.clearPlayers();
            let createdUsers = 0;
            this.names.forEach((name: string) => {
                if (createdUsers >= this.playerCount) return;
                this.addPlayer(new Spelare(name));
                createdUsers++;
            });
            this.throwsLeft = 3;
        },
    },
}
</script>

<template>
    <div class="overlayContainer">
        <div class="spacer" id="header">Hur många ska spela?</div>
        <div class="toggleButtonContainer spacer">
            <button class="toggleButton" v-bind:class="{ selected: playerCount == 1}" v-on:click="playerCount = 1">1</button>
            <button class="toggleButton" v-bind:class="{ selected: playerCount == 2}" v-on:click="playerCount = 2">2</button>
            <button class="toggleButton" v-bind:class="{ selected: playerCount == 3}" v-on:click="playerCount = 3">3</button>
            <button class="toggleButton" v-bind:class="{ selected: playerCount == 4}" v-on:click="playerCount = 4">4</button>
        </div>
        <input class="spacer" v-if="0 < playerCount" type="text" v-model="names[0]" placeholder="Namn">
        <input class="spacer" v-if="1 < playerCount" type="text" v-model="names[1]" placeholder="Namn">
        <input class="spacer" v-if="2 < playerCount" type="text" v-model="names[2]" placeholder="Namn">
        <input class="spacer" v-if="3 < playerCount" type="text" v-model="names[3]" placeholder="Namn">
        <div style="display: flex; justify-content: center">
            <button id="startButton" v-on:click="createPlayers()">Starta!</button>
        </div>
    </div>
</template>

<style>
@import '../assets/base.css';

#header {
    border: 4px solid var(--colour-button-border);
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    font-size: 1.5em;
    color: var(--colour-text)
}

#startButton {
    background-color: var(--colour-button-background-alt);
    border-radius: 10px;
    border: 0;
    width: fit-content;
    padding: 15px;
    font-size: 1.3em;
    color: var(--colour-text);
    font-family: 'Inter', sans-serif;
}

.spacer {
    margin-bottom: 15px;
}

.overlayContainer {
    background-color: var(--colour-container-background);
    padding: 5vw;
    width: 86vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 12px;
}

.toggleButtonContainer {
    border-radius: 10px;
    border: var(--colour-button-border) solid 4px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.toggleButton {
    background-color: var(--colour-button-background);
    flex: 1 1 auto;
    height: 17vw;
    color: var(--colour-text);
    font-size: xx-large;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    border: 0;
}

input {
    border: var(--colour-button-border) solid 4px;
    border-radius: 10px;
    background-color: var(--colour-textInput-background);
    color: var(--colour-text);
    padding: 5px;
    font-size: 1.0em;
    font-family: 'Inter', sans-serif;
}

.selected {
    background-color: var(--colour-button-selected);
}

@media screen and (min-width: 800px) {
    .overlayContainer {
        width: fit-content;
    }

    .toggleButton {
        height: 6vh;
    }
}

</style>