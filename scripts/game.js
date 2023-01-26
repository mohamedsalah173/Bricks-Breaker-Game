// for resposive
window.addEventListener("resize", newGame);
let isPause = true;
document.addEventListener("keydown",(e)=>{
    // console.log(e);
    if(e.key==='Escape') {
        isPause = isPause === true ? false :true;
        console.log(isPause);
    }
})
// if(isPause) {
//     ctx.fillStyle = "white";
//         ctx.font = "200px Arial";
//         ctx.fillText("Continue",1 , 1);
//         ctx.textAlign = "center";
//         drawPasue();
// }

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
    if(isPause===true) {

        updatePaddle();
        updateBall();
    }
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