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
        <p>Volume</p>
        <input type="range" min="0" max="100" value="50" id="VolumeSlider" />
        <p>Dificuldade</p>
        <select id="Dificuldade">
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
        </select>
        <button id="SalvarConfiguracao">Salvar</button>
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
        height: 20em;
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
