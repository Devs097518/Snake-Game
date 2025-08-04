<script lang="ts">
    import { playersStore, difficultyStore } from "$lib/stores/stores";
    import { playersStore as players } from "$lib/stores/stores";
    import { difficultyStore as difficulty } from "$lib/stores/stores";
    import { snakeColorStore } from "$lib/stores/stores"; // Importando o store para a cor da cobrinha
    import { snakeColorStore_p2 } from "$lib/stores/stores";
    import { get } from "svelte/store"; // Importando get para acessar o valor do store
    //import { snakeColor2Store } from '$lib/stores/stores'; // Importando o store para a cor do player 2




    const cores = ["red", "yellow", "blue"];
    const cores_p2 = ["green", "purple", "orange"];

    

    let corSelecionada = get(snakeColorStore);
    let corSelecionada_p2 = get(snakeColorStore_p2);
    //let corSelecionada2 = get(snakeColor2Store);

    let aparente: string = "none";
    // function quantidadeDePlayers(quantos:string):void{ // tira essa função e coloca $: nesses if

    //     if (quantos == "/gameplay1") {
    //         aparente = 'none';
    //     } else {
    //         aparente = 'flex';
    //     }
    // }

    $: aparente = $players === "/gameplay2" ? "flex" : "none";

    function selecionarCor(cor: string) {
        corSelecionada = cor;
        snakeColorStore.set(cor);
    }

    function selecionarCor_p2(cor_p2: string) {
        corSelecionada_p2 = cor_p2;
        snakeColorStore_p2.set(cor_p2);
    }
    /*function selecionarCor2(cor: string) {
  corSelecionada2 = cor;
  snakeColor2Store.set(cor);
} */
</script>

<div id="container">
    <div id="options">
        <div class="AreaDoBotao">
            <button class="VoltarMenu">
                <a href="/">
                    <img class="ImagemVoltar" src="botao-voltar.png" alt="" />
                </a>
            </button>
        </div>
        <h1>Opções :</h1>
        <!-- Personalização da cor da cobrinha -->

        <div
            style="display:flex; flex-wrap: wrap; gap: 0.5em; justify-content: center; align-items: center;"
        >
            <p>Player 1 color</p>
            {#each cores as cor}
                <button
                    on:click={() => selecionarCor(cor)}
                    style="width: 24px; height: 24px; background: {cor}; border: {corSelecionada ===
                    cor
                        ? '3px dotted #000'
                        : '1px solid #ccc'}; border-radius: 6px; cursor: pointer; padding: 0;"
                    aria-label="Selecionar cor {cor}"
                ></button>
            {/each}
        </div>

        <div
            style="display:{aparente}; flex-wrap: wrap; gap: 0.5em; justify-content: center; align-items: center;"
        >
            <p>Player 2 color</p>
            {#each cores_p2 as cor_p2}
                <button
                    on:click={() => selecionarCor_p2(cor_p2)}
                    style="width: 24px; height: 24px; background: {cor_p2}; border: {corSelecionada_p2 ===
                    cor_p2
                        ? '3px dotted #000'
                        : '1px solid #ccc'}; border-radius: 6px; cursor: pointer; padding: 0;"
                    aria-label="Selecionar cor {cor_p2}"
                ></button>
            {/each}
        </div>

        <!-- As outras opções continuam normalmente -->
        <p>Volume</p>
        <input type="range" min="0" max="100" value="50" id="VolumeSlider" />
        <p>Dificuldade</p>
        <select id="Dificuldade" bind:value={$difficulty}>
            <option value="300">Fácil</option>
            <option value="100">Médio</option>
            <option value="80">Difícil</option>
        </select>
        <br />
        <select id="Players" bind:value={$players}>
            <option value='/gameplay1'>1 Player</option>
            <option value='/gameplay2'>2 Players</option>
        </select>
    </div>
</div>

<style>
    :global(:root) {
        background-image: url("bricks.jpg");
    }

    #container {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: "MedievalSharp", cursive;
        font-weight: 400;
        font-style: normal;
        background-size: cover;
    }

    #options {
        display: block;
        margin-top: 7em;
        border: 2px black solid;
        width: 30em;
        min-height: 28em;
        background-color: aliceblue;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .AreaDoBotao {
        text-align: start;
        margin: 8px;
    }

    .VoltarMenu {
        width: 50px;
        background-color: rgba(240, 248, 255, 0);
        border: 0;
        cursor: pointer;
    }

    .ImagemVoltar {
        width: 40px;
        height: 40px;
    }

    select {
        margin-bottom: 1em;
    }
</style>
