<script lang="ts">
  // ------------------- [ CÓDIGO DA SNAKE ABAIXO ]----------------------

  import { onMount } from "svelte";
  import { difficultyStore as difficulty } from "$lib/stores/stores";
  import { snakeColorStore } from "$lib/stores/stores"; // Importando o store para a cor da cobrinha
  import { volumeStore } from "$lib/stores/stores"; // Importando o store para o volume

  let snakeColor = "green"; // cor padrão, para poder mudar a cor da cobrinha
  snakeColorStore.subscribe((value) => (snakeColor = value)); // agora snakeColor recebe o valor do store
  let currentVolume = 0.5;
  volumeStore.subscribe((value) => (currentVolume = value));

  let canvas: HTMLCanvasElement;
  let interval: ReturnType<typeof setInterval>;
  let score: number = 0;
  const box = 10;

  let segundos: number = 0;
  let minutos: number = 0;

  function tempo(): void {
    if (segundos > 59) {
      segundos = 0;
      minutos++;
    }
    segundos++;
  }

  setInterval(tempo, 1000);

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
  let audioMenuHover: HTMLAudioElement; // Declaração do áudio de hover no menu
  let audioClick: HTMLAudioElement; // Declaração do áudio de clique
  let audioGameplay: HTMLAudioElement; // Declaração do áudio de gameplay

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
      if (audioGameplay) audioGameplay.pause(); // Pausa o áudio de gameplay ao perder
      audioGameOver.play(); // Linha que chama o som de Game Over
      alert("Fim de jogo!");
      reiniciarJogo();
      //SnakeSpeed = 9999999
      return;
    }

    // colisão com o corpo
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        if (audioGameplay) audioGameplay.pause(); // Pausa o áudio de gameplay ao perder
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

    if ($difficulty === "300" && audioGameplay) {
      audioGameplay.currentTime = 0 // Reinicia a música
      audioGameplay.play();
    }
  }

  function lidarComTeclado(e: KeyboardEvent): void {
    const tecla = e.key;
    if (tecla === "ArrowUp" && direction !== "down") direction = "up";
    if (tecla === "ArrowDown" && direction !== "up") direction = "down";
    if (tecla === "ArrowLeft" && direction !== "right") direction = "left";
    if (tecla === "ArrowRight" && direction !== "left") direction = "right";
  }

  function playHoverSound() {
    if (audioMenuHover) {
      audioMenuHover.currentTime = 0;
      audioMenuHover.play();
    }
  }

  function playClickSound() {
    if (audioClick) {
      audioClick.currentTime = 0;
      audioClick.play();
    }
  }

  let SnakeSpeed = Number($difficulty);

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    audioComida = new Audio("/audio/Eating-Apple.mp3");
    audioComida.volume = currentVolume;

    audioGameOver = new Audio("/audio/Game-Over.mp3");
    audioGameOver.volume = currentVolume;
    audioMenuHover = new Audio("/audio/Menu-Selection.mp3");
    audioMenuHover.volume = currentVolume;
    audioClick = new Audio("/audio/On-Click.mp3");
    audioClick.volume = currentVolume;
    audioGameplay = new Audio("/audio/Easy-Mode-Gameplay.mp3");
    audioGameplay.volume = currentVolume *0.5;
    audioGameplay.loop = true; // Faz o áudio de gameplay repetir

    // Segue o subscribe para ambos os sons (Só precisa de um)
    volumeStore.subscribe((newVolume) => {
      if (audioComida) audioComida.volume = newVolume;
      if (audioGameOver) audioGameOver.volume = newVolume;
      if (audioMenuHover) audioMenuHover.volume = newVolume;
      if (audioClick) audioClick.volume = newVolume;
      if (audioGameplay) audioGameplay.volume = newVolume * 0.5;
    });

    food = gerarComida();
    desenhar(ctx);

    if ($difficulty === "300") { // Inicia o áudio de gameplay se a dificuldade for easy
        audioGameplay.play(); 
    }

    window.addEventListener("keydown", lidarComTeclado);
    interval = setInterval(() => atualizar(ctx), SnakeSpeed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", lidarComTeclado);
      if (audioGameplay) audioGameplay.pause();
    };
  });

  // ------------------- [ CÓDIGO DA SNAKE ACIMA ]----------------------
</script>

<div id="container">
  <div id="TelaDoGame">
    <div id="tela4">
      <div style="display: flex; align-items: center; justify-content: center;">
        <button
          id="Da4Para1"
          on:mouseenter={playHoverSound}
          on:click={playClickSound}
        >
          <a href="/"> Back </a>
        </button>
        <p id="GameInfo">Score:{score} | Time: {minutos}:{segundos}</p>
      </div>

      <canvas
        bind:this={canvas}
        width="500"
        height="300"
        style="border: 7px solid black; background-image: url(podzol-dirt.png) ; background-repeat: repeat;
        background-size: 150px 150px; display: block; margin: 25px;"
      ></canvas>

      <button id="btnRestart"
        on:click={reiniciarJogo}>Restart</button
      >
    </div>
  </div>
</div>

<style>
  :global(:root) {
    background-image: url("wall.png");
  }

  #container {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-family: "Jacquard 12", system-ui;
    font-weight: 400;
    font-style: normal;
    background-size: cover;
  }

  #TelaDoGame {
    display: block;
    background-color: rgb(100, 4, 49);
    background-size: cover;
    margin-top: 7em;
  }

  #tela4 {
    border: 7px black solid;
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
    font-size: 2.5em;
  }

  #Da4Para1:hover {
    color: red;
  }

  #GameInfo {
    font-size: 2em;
    margin: 0 2em;
  }

  a {
    text-decoration: none;
    color: black;
    font-family: "Jacquard 12", system-ui;
    font-weight: 400;
    font-style: normal;
  }

  #btnRestart{
    text-decoration:none; 
    margin:2em;
    background-color: rgba(255, 0, 0, 0);
    border: 1px solid black;
    border-radius: 30px;
    font-family: "Jacquard 12", system-ui;
    font-size: 1.4em;

  }
</style>
