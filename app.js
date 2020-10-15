/**
 * FIXME:
 * height is somehow 2x width
 */

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const COLORS = {
  WHITE: "#fff",
  BLACK: "#000",
  ORANGE: "#ffbf00",
};

const MOVE = {
  STOP: 0,
  FORWARD: 1,
  BACKWARD: -1,
};

const fps = 15;
const tileSize = 25;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let playerSpeed = tileSize;
let playerPosX = 0;
let playerPosY = canvas.height / 2;

let velocityX = MOVE.FORWARD;
let velocityY = 0;

const drawRectangle = (color, posX, posY, width, height) => {
  ctx.fillStyle = color;
  ctx.fillRect(posX, posY, width, height);
};

const drawBoard = () => {
  drawRectangle(COLORS.ORANGE, 0, 0, canvas.width, canvas.height);
};

const drawGrid = () => {
  const gridGap = 1;
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      drawRectangle(
        COLORS.WHITE,
        tileSize * i,
        tileSize * j,
        tileSize - gridGap,
        tileSize - gridGap
      );
    }
  }
};

const drawPlayer = () => {
  drawRectangle(COLORS.BLACK, playerPosX, playerPosY, tileSize, tileSize);
};

const move = () => {
  playerPosX += playerSpeed * velocityX;
  playerPosY += playerSpeed * velocityY;
  handleCollision();
};

const handleCollision = () => {
  if (playerPosX > canvas.width - tileSize) playerPosX = 0;
  if (playerPosX < 0) playerPosX = canvas.width;
  if (playerPosY > canvas.height - tileSize) playerPosY = 0;
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
  drawBoard();
  drawGrid();
  drawPlayer();
  move();

  setTimeout(gameLoop, 1000 / fps);
};

gameLoop();
