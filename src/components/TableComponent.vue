<script lang="ts">
import { usePlayerStore } from "@/stores/player"


export default {
    setup() {
        const playerStore = usePlayerStore();

        function getPlayers() {
            return playerStore.getPlayers();
        }

        function getThrows() {
            return playerStore.getThrows();
        }

        return {
            playerArray: playerStore.players,
            playerThrows: playerStore.throwsLeft,
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
            console.log(this.playerThrows)
            //this.playerArray[this.currentPlayer].score[pointIndex] = this.playerArray[this.currentPlayer].selectScore[pointIndex];
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
                <button v-on:click="addChosenPoints(0)" v-if="!player.score[0] && playerThrows < 3">{{player.selectScore[0]}}</button>
                <div v-else>{{player.score[0]}}</div>
            </td>
        </tr>
        <tr>
            <td>Tvåor</td>
            <td v-for="player in playerArray">
                <button v-on:click="addChosenPoints(1)" v-if="!player.score[1]">{{player.selectScore[1]}}</button>
                <div v-else>{{player.score[1]}}</div>
            </td>
        </tr>
        <tr>
            <td>Treor</td>
            <td v-for="player in playerArray">
                <button v-on:click="addChosenPoints(2)" v-if="player.selectScore[2] && !player.score[2]">{{player.selectScore[2]}}</button>
                <div v-else>{{player.selectScore[2]}}</div>
            </td>
        </tr>
        <tr>
            <td>Fyror</td>
            <td v-for="player in playerArray">
                <button v-on:click="addChosenPoints(3)" v-if="player.selectScore[3] && !player.score[3]">{{player.selectScore[3]}}</button>
                <div v-else>{{player.selectScore[3]}}</div>
            </td>
        </tr>
        <tr>
            <td>Femmor</td>
            <td v-for="player in playerArray">
                <button v-on:click="addChosenPoints(4)" v-if="player.selectScore[4] && !player.score[4]">{{player.selectScore[4]}}</button>
                <div v-else>{{player.selectScore[4]}}</div>
            </td>
        </tr>
        <tr>
            <td>Sexor</td>
            <td v-for="player in playerArray">
                <button v-on:click="addChosenPoints(5)" v-if="player.selectScore[5] && !player.score[5]">{{player.selectScore[5]}}</button>
                <div v-else>{{player.selectScore[5]}}</div>
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