<script lang="ts">
import TableComp from '@/components/TableComponent.vue';
import { defineComponent } from 'vue';
import { usePlayerStore } from '@/stores/player';
import DiceComponent from '@/components/DiceComponent.vue';
import { storeToRefs } from 'pinia';
import PlayerCreationOverlay from '@/components/PlayerCreationOverlay.vue';
import RuleOverlay from '@/components/RulesOverlay.vue';

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
            throwsLeft,
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
            pointsOverlayVisible: false,
            rulesOverlayVisible: false,
        }
    },
    components: {
        TableComp,
        DiceComponent,
        PlayerCreationOverlay,
        RuleOverlay,
    },
    methods: {
        unlockDice() {
            var allDice = [this.$refs.dice1, this.$refs.dice2, this.$refs.dice3, this.$refs.dice4, this.$refs.dice5];
            allDice.forEach(dice => {
                console.log(dice);
                dice.locked = false;
            });
        },
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
            this.throwDice();
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
            this.throwsLeft = 3;
        },
        checkLadder(dice: Array<number>) {
            let count = 1;
            let lastVal = 0;
            for (var i = 0; i < dice.length; i++) {
                if (dice[i] && lastVal)
                    count += 1
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
        <div v-bind:class="{ blurred: playerArray < 1 || pointsOverlayVisible || rulesOverlayVisible }"
            style="top: 0; left: 0; width: 100vw; height: 100vh; position: absolute;">
            <div class="flex-container">
                <button class="menuButtons" :disabled="playerArray.length < 1" v-on:click="rulesOverlayVisible = true">Regler</button>
                <button class="menuButtons" :disabled="playerArray.length < 1" v-on:click="pointsOverlayVisible = true">Poäng</button><br>
            </div>
            <div class="flex-container-3">
                <div class="flex-container-2">
                    <DiceComponent ref="dice1" />
                    <DiceComponent ref="dice2" />
                    <DiceComponent ref="dice3" />
                    <DiceComponent ref="dice4" />
                    <DiceComponent ref="dice5" />
                </div>
                <br>
                <div class="iDontLikeFlexboxAnymore">
                    <button v-on:click="playerRoll()" :disabled="playerThrows < 1 || playerArray.length < 1"
                        class="menuButtons" v-bind:class="{ disabled: playerThrows == 0 }"
                        style="width: fit-content">Kasta
                        Tärning</button>
                    <div class="menuButtons" style="width: fit-content; margin: 30px">{{ playerThrows }}/3</div>
                </div>
            </div>
        </div>

        <div v-if="!playerArray[0]"
            style="position: absolute; 
            top: 0; width: 100vw; height: 100vh; 
            left: 0; display: flex; align-items: center; 
            justify-content: center; ">
            <PlayerCreationOverlay />
        </div>

        <div v-if="rulesOverlayVisible" style="height: 100vh; width: 100vw; top: 0; left: 0; margin: 0; align-items: center" class="flex-container">
            <RuleOverlay/>
        </div>

        <div v-if="pointsOverlayVisible" style="height: 100vh; width: 100vw; top: 0; left: 0; margin: 0; align-items: center" class="flex-container">
            <TableComp />
        </div>
    </main>
</template>

<style>
@import '../assets/base.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

.blurred {
    filter: blur(2px) brightness(70%);
}

.disabled {
    opacity: 0.5;
}

.menuButtons {
    background-color: var(--colour-button-background);
    padding: 25px 30px;
    border: 0;
    color: var(--colour-text);
    font-size: xx-large;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    border-radius: 12px;
}

.flex-container {
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.flex-container>button {
    margin: 10px;
}

.flex-container-2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.flex-container-2>* {
    margin: 30px;
}

.flex-container-3 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.iDontLikeFlexboxAnymore {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}
</style>