const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CONFIG = {
  FPS: 10,
  TILE_SIZE: 50,
  GRID_GAP: 1,
  THEME: {
    TILE: "#fff",
    PLAYER: "#000",
    BACKGROUND: "#ffbf00",
  },
};

const MOVE = {
  STOP: 0,
  FORWARD: 1,
  BACKWARD: -1,
};

const tileCountX = canvas.width / CONFIG.TILE_SIZE;
const tileCountY = canvas.height / CONFIG.TILE_SIZE;

let isGameRunning = true;

let playerSpeed = CONFIG.TILE_SIZE;
let playerPosX = 0;
let playerPosY = canvas.height / 2;

let velocityX = MOVE.FORWARD;
let velocityY = 0;

const drawRectangle = (color, posX, posY, width, height) => {
  ctx.fillStyle = color;
  ctx.fillRect(posX, posY, width, height);
};

const drawBoard = () => {
  drawRectangle(CONFIG.THEME.BACKGROUND, 0, 0, canvas.width, canvas.height);
};

const drawGrid = () => {
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      drawRectangle(
        CONFIG.THEME.TILE,
        CONFIG.TILE_SIZE * i,
        CONFIG.TILE_SIZE * j,
        CONFIG.TILE_SIZE - CONFIG.GRID_GAP,
        CONFIG.TILE_SIZE - CONFIG.GRID_GAP
      );
    }
  }
};

const drawPlayer = () => {
  drawRectangle(
    CONFIG.THEME.PLAYER,
    playerPosX,
    playerPosY,
    CONFIG.TILE_SIZE,
    CONFIG.TILE_SIZE
  );
};

const move = () => {
  playerPosX += playerSpeed * velocityX;
  playerPosY += playerSpeed * velocityY;
  handleCollision();
};

const handleCollision = () => {
  if (playerPosX > canvas.width - CONFIG.TILE_SIZE) playerPosX = 0;
  if (playerPosX < 0) playerPosX = canvas.width;
  if (playerPosY > canvas.height - CONFIG.TILE_SIZE) playerPosY = 0;
  if (playerPosY < 0) playerPosY = canvas.height;
};

const handleKeyDown = (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (velocityY !== MOVE.FORWARD) {
        velocityX = MOVE.STOP;
        velocityY = MOVE.BACKWARD;
      }
      break;
    case "ArrowDown":
      if (velocityY !== MOVE.BACKWARD) {
        velocityX = MOVE.STOP;
        velocityY = MOVE.FORWARD;
      }
      break;
    case "ArrowLeft":
      if (velocityX !== MOVE.FORWARD) {
        velocityX = MOVE.BACKWARD;
        velocityY = MOVE.STOP;
      }
      break;
    case "ArrowRight":
      if (velocityX !== MOVE.BACKWARD) {
        velocityX = MOVE.FORWARD;
        velocityY = MOVE.STOP;
      }
      break;
    default:
      velocityX = MOVE.STOP;
      velocityY = MOVE.STOP;
      break;
  }
};

document.addEventListener("keydown", handleKeyDown);

const gameLoop = () => {
  if (isGameRunning) {
    drawBoard();
    drawGrid();
    drawPlayer();
    move();

    setTimeout(gameLoop, 1000 / CONFIG.FPS);
  }
};
gameLoop();
