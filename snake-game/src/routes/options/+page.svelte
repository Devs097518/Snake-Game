<script lang="ts">
    import { playersStore, difficultyStore } from "$lib/stores/stores";
    import { playersStore as players } from "$lib/stores/stores";
    import { difficultyStore as difficulty } from "$lib/stores/stores";
    import { snakeColorStore } from "$lib/stores/stores"; // Importando o store para a cor da cobrinha
    import { snakeColorStore_p2 } from "$lib/stores/stores";
    import { volumeStore } from "$lib/stores/stores"; // Importando o store para o volume
    import { get } from "svelte/store"; // Importando get para acessar o valor do store
    //import { snakeColor2Store } from '$lib/stores/stores'; // Importando o store para a cor do player 2
    import { onMount } from 'svelte';

    const cores = ["red", "yellow", "blue"];
    const cores_p2 = ["green", "purple", "orange"];    

    let corSelecionada = get(snakeColorStore);
    let corSelecionada_p2 = get(snakeColorStore_p2);
    //let corSelecionada2 = get(snakeColor2Store);
    
    let volume = 0.5; // Valor inicial do volume (50%)
    volume = get(volumeStore); // Aqui ele pega o volume atual do store
    volumeStore.subscribe(value => volume = value); // Mantém o volume em sincronia

    let currentVolume = 0.5;
    let audioMenuHover: HTMLAudioElement;
    let audioClick: HTMLAudioElement;

    let aparente: string = "none";
    // function quantidadeDePlayers(quantos:string):void{ // tira essa função e coloca $: nesses if

    //     if (quantos == "/gameplay1") {
    //         aparente = 'none';
    //     } else {
    //         aparente = 'flex';
    //     }
    // }

    $: aparente = $players === "/gameplay2" ? "flex" : "none";

    onMount(() => {
        audioMenuHover = new Audio('/audio/Menu-Selection.mp3');
        audioMenuHover.volume = volume; // Aqui ele usa o volume atual das opções
        audioClick = new Audio('/audio/On-Click.mp3');
        audioClick.volume = volume;

        //Sincroniza com mudanças de volume aqui:
        volumeStore.subscribe(newVolume => {
            if (audioMenuHover) audioMenuHover.volume = newVolume;
            if (audioClick) audioClick.volume = newVolume;
        });
    });

    function playHoverSound() {
        if (audioMenuHover) {
            audioMenuHover.currentTime = 0;
            audioMenuHover.play();
        }
    }

    function playClickSound() {
        if (audioClick) {
            audioClick.currentTime = 0;
            audioClick.play();
        }
    }

    function selecionarCor(cor: string) {
        corSelecionada = cor;
        snakeColorStore.set(cor);
    }

    function selecionarCor_p2(cor_p2: string) {
        corSelecionada_p2 = cor_p2;
        snakeColorStore_p2.set(cor_p2);
    }

    function updateVolume() {
        volumeStore.set(volume);
    }

    /*function selecionarCor2(cor: string) {
  corSelecionada2 = cor;
  snakeColor2Store.set(cor);
} */
</script>

<div id="container">
    <div id="options">
        <div class="AreaDoBotao">
            <button class="VoltarMenu" on:mouseenter={playHoverSound} on:click={playClickSound}>
                <a href="/">
                    <img class="ImagemVoltar" src="botao-voltar.png" alt="" />
                </a>
            </button>
        </div>
        <h1>- Opções -</h1>
        <!-- Personalização da cor da cobrinha -->

        <div
            style="display:flex; flex-wrap: wrap; gap: 0.5em; justify-content: center; align-items: center;"
        >
            <p style="font-size:2em">Player 1 color :</p>
            {#each cores as cor}
                <button
                    on:click={() => selecionarCor(cor)}
                    on:mouseenter={playHoverSound}
                    on:click={playClickSound}
                    style="width: 34px; height: 24px; background: {cor}; border: {corSelecionada ===
                    cor
                        ? '5px double #000'
                        : '1px solid #ccc'}; border-radius: 6px; cursor: pointer; padding: 0;"
                    aria-label="Selecionar cor {cor}"
                ></button>
            {/each}
        </div>

        <div
            style="display:{aparente}; flex-wrap: wrap; gap: 0.5em; justify-content: center; align-items: center;"
        >
            <p style="font-size:2em">Player 2 color : </p>
            {#each cores_p2 as cor_p2}
                <button
                    on:click={() => selecionarCor_p2(cor_p2)}
                    on:mouseenter={playHoverSound}
                    on:click={playClickSound}
                    style="width: 34px; height: 24px; background: {cor_p2}; border: {corSelecionada_p2 ===
                    cor_p2
                        ? '5px double #000'
                        : '1px solid #ccc'}; border-radius: 6px; cursor: pointer; padding: 0;"
                    aria-label="Selecionar cor {cor_p2}"
                ></button>
            {/each}
        </div>

        <!-- As outras opções continuam normalmente -->
         
        <p style="font-size:2em">Volume</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          style="accent-color: red;"
          bind:value={volume}
          on:input={updateVolume}
        />
        <p style="font-size:2em">Dificuldade</p>
        <select id="Dificuldade" bind:value={$difficulty} on:change={playClickSound}>
            <option value="300">Fácil</option>
            <option value="100">Médio</option>
            <option value="80">Difícil</option>
        </select>
        <br />
        <select id="Players" bind:value={$players} on:change={playClickSound}>
            <option value='/gameplay1'>1 Player</option>
            <option value='/gameplay2'>2 Players</option>
        </select>
    </div>
</div>

<style>
    :global(:root) {
        background-image: url("wall.png");
    }

    h1{
        font-size: 3em;
    }

    #container {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: "Jacquard 12", system-ui;
        font-weight: 400;
        font-style: normal;
        background-size: cover;

        
    }

    #options {
        display: block;
        margin-top: 7em;
        border: 10px black solid;
        width: 30em;
        min-height: 28em;
        background-color: rgb(216, 145, 178);
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
        width: 8em;
        font-family: "Jacquard 12", system-ui;
        font-size: 2em;
        border: none;
    }

    option {
        font-family: "Jacquard 12", system-ui;
        border: none;
    }
</style>
