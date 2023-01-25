// for resposive
window.addEventListener("resize", newGame);
// game variables
var ball, paddle;
function newGame() {
    setDimensions();
    paddle = new Paddle();
    ball = new Ball();
}

function outOfBounds() {
    // TODO out of bounds
    newGame();
}

function gameLoop() {
    // update
    updatePaddle();
    updateBall();

    // draw
    drawBackground();
    drawWalls();
    drawPaddle();
    drawBall();

    // call the next loop
    requestAnimationFrame(gameLoop);
}
function start() {
    newGame();
    gameLoop();
}


start();