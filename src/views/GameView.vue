<script lang="ts">
import TableComp from '@/components/TableComponent.vue';
import { defineComponent } from 'vue';
import { usePlayerStore } from '@/stores/player';

class Spelare {
    public name: string;
    public score: Array<number>;
    
    constructor(name: string) {
        this.name = name;
        this.score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    public addScore(score: number) {
        //this.score[]
    }
}

export default defineComponent({
    setup() {
       const playerStore = usePlayerStore();

       function addPlayer(player: string) {
           playerStore.addPlayer(player);
       }

       return {
           playerArray: playerStore.players,
           addPlayer,
       }
    },
    data() {
        return {
            rollsRemaining: 3,
            rolls: [1,1,1,1,1],
            spelare: [],
            names: [],
        }
    },
    components: {
        TableComp,
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
        },
        createPlayers() {
            /*let player = new Spelare(name);
            player.score = [0,0,0,0,0,0,0,0,0,0,0,0];*/
            this.names.forEach((name: string) => {
                this.addPlayer(new Spelare(name));
                console.log(name)
                console.log(this.spelare)    
            });
            
            //return player;
        },
    }
})

</script>

<template>
    <main>
        <h3>{{playerArray}}</h3>
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
        <button v-on:click="rollsRemaining=3">Avsluta runda</button><br>
        <input type="text" v-model="names[0]">
        <input type="text" v-model="names[1]">
        <input type="text" v-model="names[2]">
        <button v-on:click="createPlayers()">Lägg till spelare</button>
        <TableComp/>
    </main>
</template>

<style>

table, tr, td {
    border: 1px black solid;
}

</style>