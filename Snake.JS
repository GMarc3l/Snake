let blockSize = 20;
let rows = 30;
let cols = 30;
let board;
let context; 
let snakeX = blockSize * 15;
let snakeY = blockSize * 15;
let directionX = 0;
let directionY = 0;
let snakeBody = [];
let foodX;
let foodY;
let gameOver = false;
let score  = 1;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(Game, 1000/10);
}

function Game() {
    if (gameOver) {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    context.fillStyle="yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        ++score;
    }
   bodyMove();
    context.fillStyle="white";
    snakeX += directionX * blockSize;
    snakeY += directionY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    winningConditions();
}

function bodyMove() {
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
}

function winningConditions(){
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        document.getElementById('endOfGame').innerHTML += `
            <p class="fw-bold">Game over! Your score is:` + score + `!</p>
			<button type="button" class="btn btn-primary" onclick="restart()">Play Again</button>
		`;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
			document.getElementById('endOfGame').innerHTML += `
			<p class="fw-bold">Game over! Your score is:` + score + `!</p>
			<button type="button" class="btn btn-primary" onclick="restart()">Play Again</button>
		`;
        }
    }

}
function changeDirection(e) {
    if (e.code == "ArrowUp" && directionY != 1) {
        directionX = 0;
        directionY = -1;
    }
    else if (e.code == "ArrowDown" && directionY != -1) {
        directionX = 0;
        directionY = 1;
    }
    else if (e.code == "ArrowLeft" && directionX != 1) {
        directionX = -1;
        directionY = 0;
    }
    else if (e.code == "ArrowRight" && directionX != -1) {
        directionX = 1;
        directionY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function restart() {
	window.location.reload();
}
	
		
