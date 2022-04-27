<script lang="ts">
import { usePlayerStore } from "@/stores/player"


export default {
    setup() {
        const playerStore = usePlayerStore();

        function getPlayers() {
            return playerStore.getPlayers();
        }

        return {
            playerArray: playerStore.players,
            getPlayers,
        }
    },
    data() {
        return {
            spelare: [
                {
                    name: "Bob",
                    score: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                },
                {
                    name: "Alice",
                    score: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
                },
                {
                    name: "Carol",
                    score: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
                },
                {
                    name: "Dave",
                    score: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
                },
            ],
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
            <td v-for="player in playerArray">{{player.score[0]}}</td>
        </tr>
        <tr>
            <td>Tvåor</td>
            <td v-for="player in playerArray">{{player.score[1]}}</td>
        </tr>
        <tr>
            <td>Treor</td>
            <td v-for="player in playerArray">{{player.score[2]}}</td>
        </tr>
        <tr>
            <td>Fyror</td>
            <td v-for="player in playerArray">{{player.score[3]}}</td>
        </tr>
        <tr>
            <td>Femmor</td>
            <td v-for="player in playerArray">{{player.score[4]}}</td>
        </tr>
        <tr>
            <td>Sexor</td>
            <td v-for="player in playerArray">{{player.score[5]}}</td>
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