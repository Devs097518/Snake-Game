<script lang="ts">
    import Colab from '$lib/Colab.svelte'
    import { volumeStore } from '$lib/stores/stores';
    import { onMount } from 'svelte';

    let currentVolume = 0.5;
    volumeStore.subscribe(value => currentVolume = value);
    let audioMenuHover: HTMLAudioElement;
    let audioClick: HTMLAudioElement;
    
    onMount(() => {
        audioMenuHover = new Audio('/audio/Menu-Selection.mp3');
        audioMenuHover.volume = currentVolume;
        audioClick = new Audio('/audio/On-Click.mp3');
        audioClick.volume = currentVolume;

        // Controla o volume pelas opções aqui:
        volumeStore.subscribe(newVolume => {
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
    <div id="Credits">
        <div class="AreaDoBotao">
            <a class="VoltarMenu" href="/" on:mouseenter={playHoverSound} on:click={playClickSound}>
                <img class="ImagemVoltar" src="botao-voltar.png" alt="" />
            </a>
        </div>

        <div id="colaboradores-caixa">
            <div>
              <h2 style="font-size:3em">Developers :</h2>  
            </div>
            
            <Colab nome="Alan Santos" foto="Alan.png"/>
            <Colab nome="Dayvson Lacerda" foto="Dayvson.png"/>
            <Colab nome="Luhan Felipe" foto="Luhan.png"/>
            <Colab nome="Luísa Vitória" foto="Luisa.png" />
            <Colab nome="Yuri Calixto" foto="Yuri.png"/>
        </div>
    
    </div>
</div>

<style>
    :global(:root) {
        background-image: url("/wall.png");
        color: aliceblue;
        text-shadow: 3px 3px rgb(0, 0, 0);
    }

    #container {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: "Jacquard 12", system-ui;
        font-weight: 100;
        font-style: normal;
        background-size: cover;
    }

    #Credits {
        display: block;
        margin-top: 7em;
        border: 7px black solid;
        width: 30em;
        min-height: 20em;
        background-color: rgb(100, 4, 49);
        align-items: center;
    }

    #colaboradores-caixa {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }


    .AreaDoBotao {
        text-align: start;
        margin: 0px;
    }

    .VoltarMenu {
        width: 50px;
        margin: 5px;
        border: 0;
        cursor: pointer;
    }

    .ImagemVoltar {
        width: 40px;
        height: 40px;
    }

   
</style>
