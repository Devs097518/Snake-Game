<script lang="ts">
    export let nome:string = '';
    export let foto:string = '';
</script>

<div class="colab">
    <div id="colab-caixa">
        <img src={foto} alt="">
        <p>{nome}</p>
    </div>
</div>

<style>
    img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin: 0 30px;
        border: 4px solid black;
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