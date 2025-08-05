<script lang="ts">
    export let nome:string = '';
</script>

<div class="colab">
    <div id="colab-caixa">
        <img src="perfil-exemplo.png" alt="">
        <p>{nome}</p>
    </div>
</div>

<style>
    img {
        width: 40px;
        height: 40px;
        margin: 0 30px;
    }
    .colab {
        display: flex;
        background-color: rgba(212, 65, 65, 0.205);
        margin: 1em;
        border: 7px double black;
    }

    #colab-caixa{
        display:flex;
        margin: 0.5em;
        height: 3em;
        align-items: center;
    }

    p{
        font-size: 2em;
    }
</style>