<script lang="ts">



  // ------------------- [ CÓDIGO DA SNAKE ABAIXO ]----------------------

  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let interval: ReturnType<typeof setInterval>;
  let score:number = 0
  const box = 10;

  // Tipos
  type Direcao = "up" | "down" | "left" | "right";
  type Posicao = { x: number; y: number };


  let snake: Posicao[] = [{ x: 100, y: 100 }];
  let direction: Direcao = "right";
  let food: Posicao;

  function gerarComida(): Posicao {
    return {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
  }

  function desenhar(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // cobra
    snake.forEach((segmento, i) => {
      ctx.fillStyle = i === 0 ? 'lime' : 'green';
      ctx.fillRect(segmento.x, segmento.y, box, box);
    });

    // comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
  }

  function atualizar(ctx: CanvasRenderingContext2D): void {
    const head: Posicao = { ...snake[0] };

    switch (direction) {
      case "right": head.x += box; break;
      case "left": head.x -= box; break;
      case "up": head.y -= box; break;
      case "down": head.y += box; break;
    }

    // colisão com parede
    if (
      head.x < 0 || head.y < 0 ||
      head.x >= canvas.width || head.y >= canvas.height
    ) {
      alert("Fim de jogo!");
      reiniciarJogo();
      //SnakeSpeed = 9999999
      return;
    }

    // colisão com o corpo
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        alert("Você bateu em si mesmo!");
        reiniciarJogo();
        //SnakeSpeed = 9999999
        return;
      }
    }

    snake.unshift(head);

    // comeu a comida?
    if (head.x === food.x && head.y === food.y) {
      score += 1
      food = gerarComida();
    } else {
      snake.pop();
    }

    desenhar(ctx);
  }

  function reiniciarJogo(): void {
    snake = [{ x: 100, y: 100 }];
    direction = "right";
    SnakeSpeed = 500;
    food = gerarComida();
  }

  function lidarComTeclado(e: KeyboardEvent): void {
    const tecla = e.key;
    if (tecla === "ArrowUp" && direction !== "down") direction = "up";
    if (tecla === "ArrowDown" && direction !== "up") direction = "down";
    if (tecla === "ArrowLeft" && direction !== "right") direction = "left";
    if (tecla === "ArrowRight" && direction !== "left") direction = "right";
  }

	let SnakeSpeed = 200

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    food = gerarComida();
    desenhar(ctx);

    window.addEventListener("keydown", lidarComTeclado);
    interval = setInterval(() => atualizar(ctx), SnakeSpeed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", lidarComTeclado);
    };
  });

  // ------------------- [ CÓDIGO DA SNAKE ACIMA ]----------------------



</script>





<div id="container">
    <div id="TelaDoGame">
        <div id="tela4">
            <div style="display: flex;">
                <button id="Da4Para1">
                    <a href="/"> Back </a>
                </button>
                <p id="GameInfo">Score:{score} | Time: 00:20</p>
            </div>


            <canvas
                bind:this={canvas}
                width="200"
                height="200"
                style="border: 2px solid #444; background: #000; display: block; margin: auto;"
            ></canvas>


            <button style="text-decoration:underline;" on:click={reiniciarJogo}>Restart</button>
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
