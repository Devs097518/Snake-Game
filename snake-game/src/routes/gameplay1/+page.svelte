<script lang="ts">
  // ------------------- [ CÓDIGO DA SNAKE ABAIXO ]----------------------

  import { onMount } from "svelte";
  import { difficultyStore as difficulty } from "$lib/stores/stores";
  import { snakeColorStore } from "$lib/stores/stores"; // Importando o store para a cor da cobrinha
  import { volumeStore } from "$lib/stores/stores"; // Importando o store para o volume

  let snakeColor = "green"; // cor padrão, para poder mudar a cor da cobrinha
  snakeColorStore.subscribe((value) => (snakeColor = value)); // agora snakeColor recebe o valor do store
  let currentVolume = 0.5;
  volumeStore.subscribe(value => currentVolume = value);

  let canvas: HTMLCanvasElement;
  let interval: ReturnType<typeof setInterval>;
  let score: number = 0;
  const box = 10;

  let segundos:number = 0
  let minutos:number = 0
  

  function tempo():void{
    if(segundos>59){
      segundos = 0
      minutos++
    }
    segundos++
  };

  setInterval(tempo,1000);

  // Tipos
  type Direcao = "up" | "down" | "left" | "right";
  type Posicao = { x: number; y: number };

  let snake: Posicao[] = [
    { x: 100, y: 100 }, // cabeça
    { x: 90, y: 100 }, // corpo
    { x: 80, y: 100 }, // corpo
  ];
  let direction: Direcao = "right";
  let food: Posicao;
  let audioComida: HTMLAudioElement; // Declaração do áudio da mordida aqui
  let audioGameOver: HTMLAudioElement; // Declaração do áudio de Game Over (Fim de Jogo)

  function gerarComida(): Posicao {
    return {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
  }

  function desenhar(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // cobra
    snake.forEach((segmento, i) => {
      ctx.fillStyle = snakeColor; // agora todos os segmentos, inclusive a cabeça, usam a cor escolhida
      ctx.fillRect(segmento.x, segmento.y, box, box);
    });

    // comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
  }

  function atualizar(ctx: CanvasRenderingContext2D): void {
    const head: Posicao = { ...snake[0] };

    switch (direction) {
      case "right":
        head.x += box;
        break;
      case "left":
        head.x -= box;
        break;
      case "up":
        head.y -= box;
        break;
      case "down":
        head.y += box;
        break;
    }

    // colisão com parede
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvas.width ||
      head.y >= canvas.height
    ) {
      audioGameOver.play(); // Linha que chama o som de Game Over
      alert("Fim de jogo!");
      reiniciarJogo();
      //SnakeSpeed = 9999999
      return;
    }

    // colisão com o corpo
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        audioGameOver.play(); // Linha que chama o som de Game Over
        alert("Você bateu em si mesmo!");
        reiniciarJogo();
        //SnakeSpeed = 9999999
        return;
      }
    }

    snake.unshift(head);

    // comeu a comida?
    if (head.x === food.x && head.y === food.y) {
      score += 1;
      food = gerarComida();
      audioComida.play();
    } else {
      snake.pop();
    }

    desenhar(ctx);
  }



  function reiniciarJogo(): void {
    //     let snake: Posicao[] = [
    //   { x: 100, y: 100 }, // cabeça
    //   { x: 90, y: 100 }, // corpo
    //   { x: 80, y: 100 }  // corpo
    // ];

    snake = [
      { x: 100, y: 100 }, // cabeça
      { x: 90, y: 100 }, // corpo
      { x: 80, y: 100 }, // corpo
    ];
    direction = "right";
    SnakeSpeed = 500;
    food = gerarComida();
    segundos = 0;
    minutos = 0;

  }

  function lidarComTeclado(e: KeyboardEvent): void {
    const tecla = e.key;
    if (tecla === "ArrowUp" && direction !== "down") direction = "up";
    if (tecla === "ArrowDown" && direction !== "up") direction = "down";
    if (tecla === "ArrowLeft" && direction !== "right") direction = "left";
    if (tecla === "ArrowRight" && direction !== "left") direction = "right";
  }

	let SnakeSpeed = Number($difficulty)

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    audioComida = new Audio('/Eating-Apple.mp3');
    audioComida.volume = currentVolume;

audioGameOver = new Audio('/Game-Over.mp3');
audioGameOver.volume = currentVolume;

// Segue o subscribe para ambos os sons (Só precisa de um)
volumeStore.subscribe(newVolume => {
  if (audioComida) audioComida.volume = newVolume;
  if (audioGameOver) audioGameOver.volume = newVolume;
});
    
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
                <p id="GameInfo">Score:{score} | Time: {minutos}:{segundos}</p>
            </div>


      <canvas
        bind:this={canvas}
        width="500"
        height="300"
        style="border: 2px solid #444; background-color: fff8d9 ; display: block; margin: auto;"
      ></canvas>

      <button
        style="text-decoration:underline; margin:2em"
        on:click={reiniciarJogo}>Restart</button
      >
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
    background-color: rgb(255, 252, 240);
    background-size: cover;
    margin-top: 7em;
  }

  #tela4 {
    border: 2px black solid;
    min-width: 30em;
    min-height: 20em;
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
