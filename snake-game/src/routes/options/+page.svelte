<script lang="ts">
    import { playersStore , difficultyStore } from '$lib/stores/stores';
    import { playersStore as players } from '$lib/stores/stores';
    import { difficultyStore as difficulty } from '$lib/stores/stores';
    import { snakeColorStore } from '$lib/stores/stores'; // Importando o store para a cor da cobrinha
    import { get } from 'svelte/store'; // Importando get para acessar o valor do store
    //import { snakeColor2Store } from '$lib/stores/stores'; // Importando o store para a cor do player 2

  // Lista de 10 cores
  const cores = [
    'green', 'blue', 'red', 'yellow', 'purple',
    'orange', 'pink', 'brown', 'black', 'cyan'
  ];

  let corSelecionada = get(snakeColorStore);
  //let corSelecionada2 = get(snakeColor2Store);

  function selecionarCor(cor: string) {
    corSelecionada = cor;
    snakeColorStore.set(cor);
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
    <h2>Personalize a cor da cobrinha</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5em; justify-content: center;">
      {#each cores as cor}
        <button
          on:click={() => selecionarCor(cor)}
          style="width: 24px; height: 24px; background: {cor}; border: {corSelecionada === cor ? '2px solid #000' : '1px solid #ccc'}; border-radius: 6px; cursor: pointer; padding: 0;"
          aria-label="Selecionar cor {cor}"
        ></button>
      {/each}
    </div>
    <p>Cor selecionada: <span style="color: {corSelecionada}; font-weight: bold;">{corSelecionada}</span></p>
     <!-- As outras opções continuam normalmente -->
        <p>Volume</p>
        <input type="range" min="0" max="100" value="50" id="VolumeSlider" />
        <p>Dificuldade</p>
        <select id="Dificuldade" bind:value={$difficulty}>
            <option value=1000>Fácil</option>
            <option value=500>Médio</option>
            <option value=100>Difícil</option>
        </select>
        <br>
        <select id="Players" bind:value={$players}>
            <option value="/gameplay1">1 Player</option>
            <option value="/gameplay2">2 Players</option>
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
        height: 28em;
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
</style>
