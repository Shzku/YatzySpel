import { defineStore } from 'pinia';

// Create and Import a Player Type here

export const usePlayerStore = defineStore({
    id: "players",
    state: () => ({ 
        players: [],
        throwsLeft: 3,
        currentPlayer: 0,
    }),
    actions: {
        addPlayer(player: string) {
            this.players.push(player);
        },
        clearPlayers() {
            this.players.length = 0;
        },
        throwDice() {
            this.throwsLeft--;
        },
        resetThrows() {
            this.throwsLeft = 3;
        }
    },
    getters: {
        getPlayers(state: any) {
            return state.players;
        },
        getThrows(state: any) {
            return state.throwsLeft;
        }
    }
});