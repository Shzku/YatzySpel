<script lang="ts">
import TableComp from '@/components/TableComponent.vue';
import { defineComponent } from 'vue';
import { usePlayerStore } from '@/stores/player';
import DiceComponent from '@/components/DiceComponent.vue';
import { storeToRefs } from 'pinia';

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

export default defineComponent({
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
            playerStore,
            playerArray: players,
            playerThrows: throwsLeft,
            currentPlayer,
            addPlayer,
            clearPlayers,
            getPlayers,
            throwDice,
        }
    },
    data() {
        return {
            rollsRemaining: 3,
            names: [],
            playerCount: 1,
            currentDice: [0, 0, 0, 0, 0, 0],
        }
    },
    components: {
        TableComp,
        DiceComponent
    },
    methods: {
        countDice(dice: Array<any>) {
            this.playerArray[this.currentPlayer].selectScore = [0, 0, 0, 0, 0, 0, null, null, null, null, 0, 0, 0, 0, 0, 0, 0];

            this.currentDice = [0, 0, 0, 0, 0, 0];
            let count = 0;
            dice.forEach(die => {
                this.currentDice[die.rolledNumber - 1]++;
            });
            let i = 0
            this.currentDice.forEach(die => {
                if (i >= 8) return;
                this.playerArray[this.currentPlayer].selectScore[i] = die * (i + 1);
                i++
            });

            // Chance
            this.playerArray[this.currentPlayer].selectScore[16] = (this.currentDice[0] * 1) + (this.currentDice[1] * 2) + (this.currentDice[2] * 3) + (this.currentDice[3] * 4) + (this.currentDice[4] * 5) + (this.currentDice[5] * 6);

            this.checkLadder(this.currentDice);

            let dieCount = 1;
            let pairExists = 0;
            let numOfPair = 0;
            let singleDie = 0;
            this.currentDice.forEach(die => {
                
                if (die == 3) {
                    this.playerArray[this.currentPlayer].selectScore[10] = (this.currentDice[0] * 1) + (this.currentDice[1] * 2) + (this.currentDice[2] * 3) + (this.currentDice[3] * 4) + (this.currentDice[4] * 5) + (this.currentDice[5] * 6);
                    this.currentDice.forEach(dieTwo => {
                        if (dieTwo == 2) {
                            this.playerArray[this.currentPlayer].selectScore[12] = 25;
                        }
                    });
                    return;
                }

                if (die >= 4) {
                    this.playerArray[this.currentPlayer].selectScore[10] = (this.currentDice[0] * 1) + (this.currentDice[1] * 2) + (this.currentDice[2] * 3) + (this.currentDice[3] * 4) + (this.currentDice[4] * 5) + (this.currentDice[5] * 6);
                    this.playerArray[this.currentPlayer].selectScore[11] = (this.currentDice[0] * 1) + (this.currentDice[1] * 2) + (this.currentDice[2] * 3) + (this.currentDice[3] * 4) + (this.currentDice[4] * 5) + (this.currentDice[5] * 6);
                    if (die == 5) {
                        this.playerArray[this.currentPlayer].selectScore[15] = 50;
                    }
                    return;
                }

                

                dieCount++
            });
            
            return count;
        },
        playerRoll() {
            var allDice = [this.$refs.dice1, this.$refs.dice2, this.$refs.dice3, this.$refs.dice4, this.$refs.dice5];
            allDice.forEach(die => {
                die.diceRoll();
            });
            this.countDice(allDice);
        },
        createPlayers() {
            this.clearPlayers();
            let createdUsers = 0;
            this.names.forEach((name: string) => {
                if (createdUsers >= this.playerCount) return;
                this.addPlayer(new Spelare(name));
                createdUsers++;
            });
        },
        checkLadder(dice: Array<number>) {
            let count = 1;
            let lastVal = 0;
            for (var i = 0; i < dice.length; i++) {
                if (dice[i] && lastVal)
                count+=1
                lastVal = dice[i];
            };

            if (count == 4) this.playerArray[this.currentPlayer].selectScore[13] = 30;
            if (count == 5) {
                this.playerArray[this.currentPlayer].selectScore[13] = 30;
                this.playerArray[this.currentPlayer].selectScore[14] = 40;
            }
        }
    }
})

</script>

<template>
    <main>
        <h3>{{ playerArray }}</h3>
        <button>Regler</button>
        <button>Poäng</button><br>
        <DiceComponent ref="dice1" />
        <DiceComponent ref="dice2" />
        <DiceComponent ref="dice3" />
        <DiceComponent ref="dice4" />
        <DiceComponent ref="dice5" />
        <br>
        <button v-on:click="playerRoll()" :disabled="playerThrows < 1 || playerArray.length < 1">Kasta Tärning</button>
        <div>Number of throws left: {{ playerThrows }}</div>
        <button v-on:click="playerCount = 1">1</button>
        <button v-on:click="playerCount = 2">2</button>
        <button v-on:click="playerCount = 3">3</button>
        <button v-on:click="playerCount = 4">4</button><br>
        <div>{{ playerCount }}</div>
        <input v-if="0 < playerCount" type="text" v-model="names[0]">
        <input v-if="1 < playerCount" type="text" v-model="names[1]">
        <input v-if="2 < playerCount" type="text" v-model="names[2]">
        <input v-if="3 < playerCount" type="text" v-model="names[3]">
        <button v-on:click="createPlayers()">Lägg till spelare</button>
        <div>{{ names }}</div>
        <TableComp />
    </main>
</template>

<style>
table,
tr,
td {
    border: 1px black solid;
}
</style>