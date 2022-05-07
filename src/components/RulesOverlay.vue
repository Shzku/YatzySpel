<script lang="ts">
export default {
    data() {
        return {}
    }
}
</script>

<template>
    <div class="tableContainer" style="height: fit-content;">
        <div class="overlayReturnButton">
            <button class="material-icons backButton" v-on:click="$parent.rulesOverlayVisible = false">arrow_back</button>
            <div style="text-align: center; align-self: center; width: 100%; font-size: xx-large;">Regler</div>
        </div>
        
        <p style="width: 86vw; text-align: center; overflow: scroll; height: 80vh; font-size: 1.1em;">
            I Yatzy så används 5 st tärningar. En variant av Yatzy finns som heter Maxi-Yatzy - och då används istället
            6 st tärningar. <br>
            Varje spelare får 5 st tärningar där man får kasta totalt 3 st kast per omgång. Målet är att försöka få så
            många poäng som möjligt för att fylla poängkolumnen som ingår i Yatzy.
            För att få Yatzy så skall alla fem tärningarna visa lika siffor.
            För att få liten stege i Yatzy så ska tärningarna vara: 1-2-3-4-5.
            Stor stege är: 2-3-4-5-6 <br>
            <br>
            Kolumnerna som skall fyllas i Yatzy-protokollet är: <br>
            <br>
            Samla på ettor, tvåor, treor, fyror, femmor & sexor<br>
            Ett par<br>
            Två par<br>
            Tretal<br>
            Fyrtal<br>
            Liten straight (stege)<br>
            Stor straight (stege)<br>
            Kåk (par + tretal)<br>
            Chans (poäng på alla fem tärningarna sammanlagt)<br>
            YATZY!<br>
            <br>
            På engelska så heter Yatzy Yahtzee.
        </p>
        
    </div>
</template>

<style>
@import '../assets/base.css';

.backButton {
    background-color: var(--colour-button-background-alt);
    border: none;
    border-right: 5px solid var(--colour-button-border);
    color: var(--colour-button-text);
    width: 30%;
    height: 2em;
    font-size: 2em;
}

.overlayReturnButton {
    display: flex;
    flex-direction: row;
    border: 5px solid var(--colour-button-border);
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    width: 86vw;
}

.tableContainer {
    background-color: var(--colour-container-background);
    padding: 10px;
    border-radius: 10px;
    width: fit-content;
    color: var(--colour-text);
    font-size: 1.3em;
}
</style>