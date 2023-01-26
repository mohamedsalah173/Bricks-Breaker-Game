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
    // TODO out of boundsz
    newGame();
}

function gameLoop() {
    // update
    if(!createPattern) {
        createBricks();
    }
    updatePaddle();
    updateBall();

    // draw
    drawBackground();
    drawWalls();
    drawPaddle();
    drawBall();
    drawBricks()
    ballBricksCollision ();
    drawPower()

    // call the next loop
    requestAnimationFrame(gameLoop);
}
function start() {
    newGame();
    gameLoop();
}


start();