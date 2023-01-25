var paddle , ball ;
newGame();
gameLoop();



function newGame(){
    paddle = new Paddle();
    ball= new Ball();
}
function outOfBounds() {
    // TODO out of bounds
    newGame();
}
function gameLoop() {
    // updates functions
    updatePaddle();
    updateBall();
    // draw function 
    drawBackground();
    drawBoarders();
    drawPaddle();
    drawBall();
    // call the next loop (recursion)
    requestAnimationFrame(gameLoop);
}









/* 
var paddle , ball ;




function newGame(){
    paddle = new Paddle();
   //ball= new Ball();
}


newGame();


//setup the game loop
//var timeDelta, timeLast;
//  requestAnimationFrame(gameLoop);

function gameLoop() {
   /*  //timeNow
    if (!timeLast) {
        timeLast = timeNow;
    }
    // Calculate the time difference
    timeDelta = (timeNow - timeLast) / 1000;// seconds
    timeLast = timeNow; 

    // updates functions
    updatePaddle();
 
    // draw function 
    drawBackground();
    drawBoarders();
    drawPaddle();
    drawBall();
    // call the next loop (recursion)
    requestAnimationFrame(gameLoop);
}



gameLoop();
function drawBackground() {
    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(0, 0, canv.width, canv.height);
}


function drawBoarders() {
    let halfBoarder = BOARDER / 2;
    ctx.strokeStyle = COLOR_BOARDERS;
    ctx.beginPath();
    ctx.moveTo(halfBoarder, GAME_HEIGHT);
    ctx.lineTo(halfBoarder, halfBoarder); // top
    ctx.lineTo(GAME_WIDTH - halfBoarder, halfBoarder); // left
    ctx.lineTo(GAME_WIDTH - halfBoarder, GAME_HEIGHT); // right
    ctx.stroke();
    ctx.closePath();
} */


