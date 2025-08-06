<script lang="ts">
    import { playersStore as players } from "$lib/stores/stores";
    import { volumeStore } from "$lib/stores/stores";
    import { onMount } from "svelte";

    let currentVolume = 0.5;
    volumeStore.subscribe((value) => (currentVolume = value));
    let audioMenuHover: HTMLAudioElement;
    let audioClick: HTMLAudioElement;

    onMount(() => {
        audioMenuHover = new Audio("/audio/Menu-Selection.mp3");
        audioMenuHover.volume = currentVolume;
        audioClick = new Audio("/audio/On-Click.mp3");
        audioClick.volume = currentVolume;

        // Controla o volume pelas opções aqui:
        volumeStore.subscribe((newVolume) => {
            if (audioMenuHover) audioMenuHover.volume = newVolume;
            if (audioClick) audioClick.volume = newVolume;
        });
    });

    function playHoverSound() {
        if (audioMenuHover) {
            audioMenuHover.currentTime = 0; // Isso aqui vai reiniciar o áudio se já estiver tocando
            audioMenuHover.play();
        }
    }

    function playClickSound() {
        if (audioClick) {
            audioClick.currentTime = 0;
            audioClick.play();
        }
    }
</script>

<div id="container">
    <div id="area">
        <div id="menu">
            <img id="icone" src="SnakesBite-Logo.png" alt="" />
            <button
                id="btnGame"
                class="textoMenu"
                on:mouseenter={playHoverSound}
                on:click={playClickSound}
            >
                <a href={$players}>Start</a>
            </button>

            <button
                id="btnOptions"
                class="textoMenu"
                on:mouseenter={playHoverSound}
                on:click={playClickSound}
            >
                <a href="/options">Options</a>
            </button>

            <button
                id="btnCredits"
                class="textoMenu"
                on:mouseenter={playHoverSound}
                on:click={playClickSound}
            >
                <a href="/credits">Credits</a>
            </button>
        </div>
        <div id="menuvao"></div>
    </div>
</div>

<style>
    :global(:root) {
        background-image: url("/wall.png");
    }

    a {
        text-decoration: none;
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

    #area {
        display: flex;
        background-image: url("/telainicial.png");
        background-size: cover;
        margin-top: 7em;
        border: 8px black solid;
    }

    #menu {
        width: 20em;
        height: 30em;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    #icone {
        width: 300px;
        filter: drop-shadow(0 0 10px white);
        margin-bottom: 35px; /* Espaçamento entre o ícone e os botões */
    }

    .textoMenu {
        font-family: "Jacquard 12", system-ui;
        font-weight: 400;
        font-style: normal;

        margin: 0;
        font-size: 45px;
        background-color: rgba(240, 248, 255, 0);
        border: none;
        -webkit-text-fill-color: rgb(241, 241, 241);
        text-shadow: 2px 2px 4px rgb(0, 0, 0);
        cursor: pointer;
    }

    .textoMenu:hover {
        margin: 0;
        font-size: 45px;
        -webkit-text-fill-color: rgb(194, 3, 92);
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.534);
    }

    .textoMenu:active { /* Efeito que o texto fica amarelo ao ser clicado */
        margin:0;
        font-size: 45px;
        -webkit-text-fill-color: #FFD700;
        text-shadow: 2px 2px 4px rgb(0, 0, 0);
    }

    #menuvao {
        width: 25em;
        height: 20em;
        }

    #btnCredits {
        margin-bottom: 1.5em;
    }
</style>
