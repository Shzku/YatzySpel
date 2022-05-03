<script lang="ts">
import { usePlayerStore } from "@/stores/player"
import { storeToRefs } from "pinia";


export default {
    setup() {
        const playerStore = usePlayerStore();

        function getPlayers() {
            return playerStore.getPlayers();
        }

        function getThrows() {
            return playerStore.getThrows();
        }

        const { currentPlayer, throwsLeft } = storeToRefs(playerStore);

        return {
            playerStore,
            playerArray: playerStore.players,
            playerThrows: playerStore.throwsLeft,
            currentPlayer,
            throwsLeft,
            getPlayers,
            getThrows,
        }
    },
    data() {
        return {
        }
    },
    methods: {
        addChosenPoints(pointIndex: number) {
            //console.log(this.playerThrows)
            let player = this.playerArray[this.currentPlayer];
            player.score[pointIndex] = player.selectScore[pointIndex];
            player.selectScore = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
            player.score[6] = player.score[0] + player.score[1] + player.score[2] + player.score[3] + player.score[4] + player.score[5];

            if (player.score[6] >= 63) {
                player.score[7] = 35;
            }
            
            player.score[8] = player.score[6] + player.score[7];
            player.score[17] = player.score[8] + player.score[10] + player.score[11] + player.score[12] + player.score[13] + player.score[14] + player.score[15] + player.score[16];

            this.throwsLeft = 3;
            this.currentPlayer++;
            if (this.currentPlayer >= this.playerArray.length) {
                this.currentPlayer = 0;
            }
        }
    },
}
</script>

<template>
    <table>
        <tr>
            <td>Players</td>
            <td v-for="player in playerArray">{{player.name}}</td>
        </tr>
        <tr>
            <td>Aces</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[0] != null">{{player.score[0]}}</div>
                <button v-on:click="addChosenPoints(0)" v-else-if="player.selectScore[0] != null">{{player.selectScore[0]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Twos</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[1] != null">{{player.score[1]}}</div>
                <button v-on:click="addChosenPoints(1)" v-else-if="player.selectScore[1] != null">{{player.selectScore[1]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Threes</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[2] != null">{{player.score[2]}}</div>
                <button v-on:click="addChosenPoints(2)" v-else-if="player.selectScore[2] != null">{{player.selectScore[2]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Fours</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[3] != null">{{player.score[3]}}</div>
                <button v-on:click="addChosenPoints(3)" v-else-if="player.selectScore[3] != null">{{player.selectScore[3]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Fives</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[4] != null">{{player.score[4]}}</div>
                <button v-on:click="addChosenPoints(4)" v-else-if="player.selectScore[4] != null">{{player.selectScore[4]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Sixes</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[5] != null">{{player.score[5]}}</div>
                <button v-on:click="addChosenPoints(5)" v-else-if="player.selectScore[5] != null">{{player.selectScore[5]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>SCORE</td>
            <td v-for="player in playerArray">{{player.score[6]}}</td>
        </tr>
        <tr>
            <td>BONUS</td>
            <td v-for="player in playerArray">{{player.score[7]}}</td>
        </tr>
        <tr>
            <td>TOTAL</td>
            <td v-for="player in playerArray">{{player.score[8]}}</td>
        </tr>
        <tr v-if="false">
            <td>Par</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[8] != null">{{player.score[8]}}</div>
                <button v-on:click="addChosenPoints(6)" v-else-if="player.selectScore[6] != null">{{player.selectScore[6]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr v-if="false">
            <td>Två Par</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[9] != null">{{player.score[9]}}</div>
                <button v-on:click="addChosenPoints(7)" v-else-if="player.selectScore[7] != null">{{player.selectScore[7]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>3 of a Kind</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[10] != null">{{player.score[10]}}</div>
                <button v-on:click="addChosenPoints(10)" v-else-if="player.selectScore[10] != null">{{player.selectScore[10]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>4 of a Kind</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[11] != null">{{player.score[11]}}</div>
                <button v-on:click="addChosenPoints(11)" v-else-if="player.selectScore[11] != null">{{player.selectScore[11]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Full House</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[12] != null">{{player.score[12]}}</div>
                <button v-on:click="addChosenPoints(12)" v-else-if="player.selectScore[12] != null">{{player.selectScore[12]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Small Straight</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[13] != null">{{player.score[13]}}</div>
                <button v-on:click="addChosenPoints(13)" v-else-if="player.selectScore[13] != null">{{player.selectScore[13]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Large Straight</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[14] != null">{{player.score[14]}}</div>
                <button v-on:click="addChosenPoints(14)" v-else-if="player.selectScore[14] != null">{{player.selectScore[14]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Yatzy</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[15] != null">{{player.score[15]}}</div>
                <button v-on:click="addChosenPoints(15)" v-else-if="player.selectScore[15] != null">{{player.selectScore[15]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Chance</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[16] != null">{{player.score[16]}}</div>
                <button v-on:click="addChosenPoints(16)" v-else-if="player.selectScore[16] != null">{{player.selectScore[16]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>TOTAL</td>
            <td v-for="player in playerArray">{{player.score[17]}}</td>
        </tr>
        </table>
</template>