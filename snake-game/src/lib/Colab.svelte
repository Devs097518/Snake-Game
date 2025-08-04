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
        margin-right: 20px;
    }
    .colab {
        display: flex;
        background-color: rgb(216, 215, 161);
        margin: 1em;
        border: 3px double black;
    }

    #colab-caixa{
        display:flex;
        margin: 0.5em;
        align-items: center;
    }
</style>