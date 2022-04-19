import { defineStore } from 'pinia';

// Create and Import a Player Type here

export const usePlayerStore = defineStore({
    id: "players",
    state: () => ({ 
        players: [],
    }),
    actions: {
        addPlayer(player: string) {
            this.players.push(player);
        }
    },
    getters: {
        getPlayers(state: any) {
            return state.players;
        }
    }
});