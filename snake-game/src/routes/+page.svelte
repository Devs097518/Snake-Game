<div id="container">
    <div id="area">
        <div id="menu">
            <img id="icone" src="SnakesBite-removebg-preview.png" alt="" />
            <p id="btnGame" class="textoMenu"><a href="/gameplay1">Start</a></p>
            <p id="btnOptions" class="textoMenu"><a href="/options">Options</a></p>
            <p id="btnCredits" class="textoMenu"><a href="/credits">Credits</a></p>
        </div>
        <div id="menuvao"></div>
    </div>
</div>

<style>
    :global(:root) {
        background-image: url('bricks.jpg');
    }

    a{
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
        background-image: url(telainicial.jpg);
        background-size: cover;
        margin-top: 7em;
    }

    #menu {
        border-top: 2px black solid;
        border-left: 2px black solid;
        border-bottom: 2px black solid;
        width: 15em;
        height: 20em;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    #icone {
        width: 200px;
    }

    .textoMenu {
        margin: 0;
        font-size: 25px;
        -webkit-text-fill-color: rgb(0, 0, 0);
        -webkit-text-stroke: 1px rgb(0, 0, 0);
        cursor: pointer;
    }

    .textoMenu:hover {
        margin: 0;
        font-size: 27px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke: 1px rgb(0, 0, 0);
    }

    #menuvao {
        width: 15em;
        height: 20em;
        border-top: 2px black solid;
        border-right: 2px black solid;
        border-bottom: 2px black solid;
    }
</style>
