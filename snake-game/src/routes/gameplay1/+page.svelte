<div id="container">
    <div id="TelaDoGame">
        <div id="tela4">
            <div style="display: flex;">
                <button id="Da4Para1">
                    <a href="/"> Back </a>
                </button>
                <p id="GameInfo">Score:7 | Time: 00:20</p>
            </div>
            <img id="matriz" src="gameplay.gif" alt="" />
            <p style="text-decoration:underline;">Restart</p>
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

    #TelaDoGame {
        display: block;
        background-color: aliceblue;
        background-size: cover;
        margin-top: 7em;
    }

    #tela4 {
        border: 2px black solid;
        width: 30em;
        height: 20em;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    #matriz {
        width: 20em;
        height: auto;
    }

    #Da4Para1 {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        font-size: 1.5em;
        text-decoration: underline;
    }

    #Da4Para1:hover {
        color: red;
    }
</style>
