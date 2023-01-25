document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
const PADDLE_SPD = 0.02;
const COLOR_PADDLE = "white";
//const PADDLE_HEIGHT = BOARDER;
const PADDLE_WIDTH = 0.1;



const Direction = {
    LEFT: 0,
    RIGHT: 1,
    STOP: 2
}
 
function drawPaddle() {

    ctx.fillStyle = COLOR_PADDLE;
    ctx.fillRect(paddle.x - paddle.w / 2, paddle.y - paddle.w / 2, paddle.w, paddle.h);

}

function Paddle() {
    this.w = PADDLE_WIDTH * GAME_WIDTH;
    this.h = BOARDER;
    this.x = canv.width / 2;
    this.y = canv.height ;
    this.dx = 0;
    this.spd = PADDLE_SPD * GAME_HEIGHT; 
}


function keyDown(ev) {
    switch (ev.keyCode) {
        case 32: // space bar (serve the ball)
        serve();
        break;
        case 37: // left arrow (move paddle left)
            movePaddle(Direction.LEFT);
            break;
        case 39: // right arrow (move paddle right)
            movePaddle(Direction.RIGHT);
            break;

    }
}

function keyUp(ev) {

    switch (ev.keyCode) {
        case 37: // left arrow (stop moving)
        case 39: // right arrow (stop moving)
            movePaddle(Direction.STOP);
            break;


    }
}

function movePaddle(direction) {
    switch (direction) {

        case Direction.LEFT:
            paddle.dx =-paddle.spd;
            break;
        case Direction.RIGHT:
            paddle.dx =+paddle.spd ;
            break;
         case Direction.STOP:
            paddle.dx= 0;
            break;
 

    }
}


function updatePaddle() {
    paddle.x+=paddle.dx;
    // stop paddle at walls
    if (paddle.x < BOARDER + paddle.w / 2) {
        paddle.x = BOARDER + paddle.w / 2;
    }
    else if (paddle.x > canv.width - BOARDER - paddle.w / 2) {
        paddle.x = canv.width - BOARDER - paddle.w / 2 ;
    }

} 

