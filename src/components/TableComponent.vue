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
            player.selectScore = [null, null, null, null, null, null];
            player.score[6] = player.score[0] + player.score[1] + player.score[2] + player.score[3] + player.score[4] + player.score[5];

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
            <td>Spelare</td>
            <td v-for="player in playerArray">{{player.name}}</td>
        </tr>
        <tr>
            <td>Ettor</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[0] != null">{{player.score[0]}}</div>
                <button v-on:click="addChosenPoints(0)" v-else-if="player.selectScore[0] != null">{{player.selectScore[0]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Tvåor</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[1] != null">{{player.score[1]}}</div>
                <button v-on:click="addChosenPoints(1)" v-else-if="player.selectScore[1] != null">{{player.selectScore[1]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Treor</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[2] != null">{{player.score[2]}}</div>
                <button v-on:click="addChosenPoints(2)" v-else-if="player.selectScore[2] != null">{{player.selectScore[2]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Fyror</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[3] != null">{{player.score[3]}}</div>
                <button v-on:click="addChosenPoints(3)" v-else-if="player.selectScore[3] != null">{{player.selectScore[3]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Femmor</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[4] != null">{{player.score[4]}}</div>
                <button v-on:click="addChosenPoints(4)" v-else-if="player.selectScore[4] != null">{{player.selectScore[4]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>Sexor</td>
            <td v-for="player in playerArray">
                <div v-if="player.score[5] != null">{{player.score[5]}}</div>
                <button v-on:click="addChosenPoints(5)" v-else-if="player.selectScore[5] != null">{{player.selectScore[5]}}</button>
                <br v-else/>
            </td>
        </tr>
        <tr>
            <td>SUMMA</td>
            <td v-for="player in playerArray">{{player.score[6]}}</td>
        </tr>
        <tr>
            <td>BONUS</td>
            <td v-for="player in playerArray">{{player.score[7]}}</td>
        </tr>
        <tr>
            <td>Par</td>
            <td v-for="player in playerArray">{{player.score[8]}}</td>
        </tr>
        <tr>
            <td>Två Par</td>
            <td v-for="player in playerArray">{{player.score[9]}}</td>
        </tr>
        <tr>
            <td>Tretal</td>
            <td v-for="player in playerArray">{{player.score[10]}}</td>
        </tr>
        <tr>
            <td>Fyrtal</td>
            <td v-for="player in playerArray">{{player.score[11]}}</td>
        </tr>
        <tr>
            <td>Liten stege</td>
            <td v-for="player in playerArray">{{player.score[12]}}</td>
        </tr>
        <tr>
            <td>Stor stege</td>
            <td v-for="player in playerArray">{{player.score[13]}}</td>
        </tr>
        <tr>
            <td>Kåk</td>
            <td v-for="player in playerArray">{{player.score[14]}}</td>
        </tr>
        <tr>
            <td>Chans</td>
            <td v-for="player in playerArray">{{player.score[15]}}</td>
        </tr>
        <tr>
            <td>Yatzy</td>
            <td v-for="player in playerArray">{{player.score[16]}}</td>
        </tr>
        <tr>
            <td>Total</td>
            <td v-for="player in playerArray">{{player.score[17]}}</td>
        </tr>
        </table>
</template>