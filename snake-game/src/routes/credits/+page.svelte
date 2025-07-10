<div id="container">
    <div id="Credits">
        <div class="AreaDoBotao">
            <a class="VoltarMenu" href="/">
                <img class="ImagemVoltar" src="botao-voltar.png" alt="" />
            </a>
        </div>

        <div style="flex-direction: column;">
            <h2>Colaboradores :</h2>
            <p class="colaboradores">Dayvson</p>
            <p class="colaboradores">Luhan</p>
            <p class="colaboradores">Alan</p>
            <p class="colaboradores">Luísa</p>
            <p class="colaboradores">Yuri</p>
        </div>
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

    #Credits {
        display: block;
        margin-top: 7em;
        border: 1px black solid;
        width: 30em;
        height: 20em;
        background-color: rgb(155, 166, 175);
        align-items: center;
    }
    .AreaDoBotao {
        text-align: start;
        margin: 0px;
    }

    .VoltarMenu {
        width: 50px;
        margin: 5px;
        background-color: rgba(240, 248, 255, 0);
        border: 0;
        cursor: pointer;
    }

    .ImagemVoltar {
        width: 40px;
        height: 40px;
    }

    .colaboradores {
        font-size: 1.2em;
        margin: 3px;
    }
</style>
