<script lang="ts">

export default {
    data() {
        return {
            rollsRemaining: 3,
            rolls: [1,1,1,1,1],
        }
    },
    methods: {
        diceRoll() {
            return Math.floor(Math.random() * 6) + 1;
        },
        playerRoll() : number[] {
            this.rolls = [];
            for (let i = 0; i < 5; i++) {
                this.rolls.push(this.diceRoll());
            }
            --this.rollsRemaining;
            return this.rolls;
        }
    }
}

</script>

<template>
    <main>
        <button>Regler</button>
        <button>Poäng</button><br>
        <button>{{rolls[0]}}</button>
        <button>{{rolls[1]}}</button>
        <button>{{rolls[2]}}</button>
        <button>{{rolls[3]}}</button>
        <button>{{rolls[4]}}</button><br>
        <button v-on:click="playerRoll()" :disabled="rollsRemaining<1">Kasta Tärning</button>
        <div>{{rolls}}</div>
        <div>Number of turns left: {{rollsRemaining}}</div>
    </main>
</template>