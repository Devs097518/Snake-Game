<script lang="ts">
  import { onMount } from "svelte";
  import { difficultyStore as difficulty } from "$lib/stores/stores";
  import { snakeColorStore } from "$lib/stores/stores";
  import { snakeColorStore_p2 } from "$lib/stores/stores";
  import { volumeStore } from "$lib/stores/stores";
  //import { snakeColorStore, snakeColor2Store } from '$lib/stores/stores';

  //let snakeColor1 = 'green'; // cor padrão, para poder mudar a cor da cobrinha
  //let snakeColor2 = 'blue';
  //snakeColorStore.subscribe(value => snakeColor1 = value);
  //snakeColor2Store.subscribe(value => snakeColor2 = value);

  // Use snakeColor1 para a cobrinha do player 1 e snakeColor2 para a do player 2

  let canvas: HTMLCanvasElement;
  let interval: ReturnType<typeof setInterval>;
  const box = 10;

  // Sistema de áudio
  let currentVolume = 0.5;
  volumeStore.subscribe(value => currentVolume = value);
  let audioComida: HTMLAudioElement;
  let audioGameOver: HTMLAudioElement;

  // Sistema de timer
  let segundos: number = 0;
  let minutos: number = 0;

  type Direcao = "up" | "down" | "left" | "right";
  type Posicao = { x: number; y: number };

  type Player = {
    snake: Posicao[];
    direction: Direcao;
    nextDirection: Direcao; // pra evitar virar na direção oposta instantâneo
    colorHead: string;
    colorBody: string;
    controls: Record<string, Direcao>; // mapa tecla -> direção
    score: number;
  };

  // Inicializa os dois players
  let players: Player[] = [
    {
      snake: [
        { x: 100, y: 100 }, // cabeça
        { x: 90, y: 100 }, // corpo
        { x: 80, y: 100 }, // corpo
      ],
      direction: "right",
      nextDirection: "right",
      colorHead: $snakeColorStore,
      colorBody: $snakeColorStore,
      controls: {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      },
      score: 0,
    },
    {
      snake: [
        { x: 200, y: 200 }, // cabeça
        { x: 190, y: 200 }, // corpo
        { x: 180, y: 200 }, // corpo
      ],
      direction: "left",
      nextDirection: "left",
      colorHead: $snakeColorStore_p2,
      colorBody: $snakeColorStore_p2,
      controls: {
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      },
      score: 0,
    },
  ];

  let food: Posicao;

  function gerarComida(): Posicao {
    // Gera comida em uma posição que não esteja em nenhuma cobra
    while (true) {
      const pos = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
      };
      const ocupada = players.some((player) =>
        player.snake.some(
          (segmento) => segmento.x === pos.x && segmento.y === pos.y,
        ),
      );
      if (!ocupada) return pos;
    }
  }

  function desenhar(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualiza as cores dos jogadores antes de desenhar
    //players[0].colorHead = snakeColor1;
    //players[0].colorBody = snakeColor1;
    //players[1].colorHead = snakeColor2;
    //players[1].colorBody = snakeColor2;

    // Desenha comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Desenha as cobras
    players.forEach((player) => {
      player.snake.forEach((segmento, i) => {
        ctx.fillStyle = i === 0 ? player.colorHead : player.colorBody;
        ctx.fillRect(segmento.x, segmento.y, box, box);
      });
    });

    // Desenha pontuações
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`Player 1: ${players[0].score}`, 10, 20);
    ctx.fillText(`Player 2: ${players[1].score}`, 10, 40);
  }

  function atualizarSnake(player: Player): boolean {
    // Atualiza a direção (previne virar 180 graus)
    if (
      (player.nextDirection === "up" && player.direction !== "down") ||
      (player.nextDirection === "down" && player.direction !== "up") ||
      (player.nextDirection === "left" && player.direction !== "right") ||
      (player.nextDirection === "right" && player.direction !== "left")
    ) {
      player.direction = player.nextDirection;
    }

    const head = { ...player.snake[0] };

    switch (player.direction) {
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

    // Colisão com parede
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvas.width ||
      head.y >= canvas.height
    ) {
      return true; // Colidiu = game over pra esse player
    }

    // Colisão com o próprio corpo
    for (let i = 0; i < player.snake.length; i++) {
      if (head.x === player.snake[i].x && head.y === player.snake[i].y) {
        return true;
      }
    }

    // Colisão com outras cobras (inclusive a cabeça)
    for (const outro of players) {
      if (outro === player) continue;
      for (const segment of outro.snake) {
        if (head.x === segment.x && head.y === segment.y) {
          return true;
        }
      }
    }

    player.snake.unshift(head);

    // Comeu a comida?
    if (head.x === food.x && head.y === food.y) {
      player.score += 1;
      food = gerarComida(); // Não remove a cauda (cresce)
      audioComida.play();
    } else {
      player.snake.pop();
    }

    return false;
  }

  function gameLoop(ctx: CanvasRenderingContext2D) {
    let gameOver = false;
    players.forEach((player) => {
      if (atualizarSnake(player)) {
        gameOver = true;
      }
    });

    if (gameOver) {
      audioGameOver.play();
      alert("Fim de jogo! Alguém perdeu.");
      reiniciarJogo();
    }

    desenhar(ctx);
  }

  function tempo(): void {
    if (segundos > 59) {
      segundos = 0;
      minutos++;
    }
    segundos++;
  }
  setInterval(tempo, 1000);

  function reiniciarJogo() {
    players[0].snake = [{ x: 100, y: 100 }, { x: 90, y: 100 }, { x: 80, y: 100 }
    ];
    players[0].direction = "right";
    players[0].nextDirection = "right";
    players[0].score = 0;

    players[1].snake = [{ x: 400, y: 200 }, { x: 410, y: 200 }, { x: 420, y: 200 }
      ];
    players[1].direction = "left";
    players[1].nextDirection = "left";
    players[1].score = 0;

    food = gerarComida();
    segundos = 0;
    minutos = 0;
  }

  function lidarComTeclado(e: KeyboardEvent) {
    const teclaOriginal = e.key;
    const teclaLower = teclaOriginal.toLowerCase();

    players.forEach((player) => {
      if (player.controls[teclaOriginal]) {
        player.nextDirection = player.controls[teclaOriginal];
      } else if (player.controls[teclaLower]) {
        player.nextDirection = player.controls[teclaLower];
      }
    });
  }

  let SnakeSpeed = Number($difficulty);

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    audioComida = new Audio('/Eating-Apple.mp3');
    audioComida.volume = currentVolume;
    audioGameOver = new Audio('/Game-Over.mp3');
    audioGameOver.volume = currentVolume;

    volumeStore.subscribe(newVolume => {
      if (audioComida) audioComida.volume = newVolume;
      if (audioGameOver) audioGameOver.volume = newVolume;
    });

    reiniciarJogo();

    window.addEventListener("keydown", lidarComTeclado);
    interval = setInterval(() => gameLoop(ctx), SnakeSpeed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", lidarComTeclado);
    };
  });
</script>

<div id="container">
  <div id="TelaDoGame">
    <div id="tela4">
      <div style="display: flex;">
        <button id="Da4Para1">
          <a href="/"> Back </a>
        </button>
        <p id="GameInfo">Score | Time: {minutos}:{segundos}</p>
      </div>

      <canvas bind:this={canvas} width="500" height="300"></canvas>

      <button
        style="text-decoration:underline; margin:2em;"
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
    background-color: aliceblue;
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

  canvas {
    border: 2px solid black;
    background: #eee;
    display: block;
    margin: 0 auto;
  }
</style>
