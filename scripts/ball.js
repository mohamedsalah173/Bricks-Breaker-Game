const COLOR_BALL = "white";
const BALL_SPD = 0.01;

var BALL_RADIUS = 0.5;
const BALL_SPIN = 0.5; // ball deflection off the paddle (0 = no spin, 1 = high spin)
function Ball() {
    this.radius = BALL_RADIUS * BOARDER;
    this.x = paddle.x;
    this.y = paddle.y - paddle.h - this.radius;
    this.spd = BALL_SPD * GAME_HEIGHT;
    this.dx = 0;
    this.dy = 0;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath;
}



function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // move the stationary ball with the paddle
    if (ball.dy == 0) {
        ball.x = paddle.x;
    }


    // bounce the ball off the walls
    if (ball.x < BOARDER + ball.radius) {
        ball.x = BOARDER + ball.radius;
        ball.dx = -ball.dx;
    } else if (ball.x > canv.width - BOARDER - ball.radius) {
        ball.x = canv.width - BOARDER - ball.radius;
        ball.dx = -ball.dx;
    } else if (ball.y < BOARDER + ball.radius) {
        ball.y = BOARDER + ball.radius;
        ball.dy = -ball.dy;
    }
    // bounce off the paddle

    if (ball.y > paddle.y - paddle.h - ball.radius 
        && ball.y < paddle.y
        && ball.x > paddle.x - paddle.w /2- ball.radius 
        && ball.x < paddle.x + paddle.w /2 + ball.radius
    ) {
        ball.y = paddle.y - paddle.h  - ball.radius;
        ball.dy = -ball.dy;

        // modify the angle based off ball spin
        let angle = Math.atan2(-ball.dy, ball.dx);
        angle += (Math.random() * Math.PI / 2 - Math.PI / 4) * BALL_SPIN;


        applyBallSpeed(angle); 
    }



    // handle out of bounds
    if (ball.y > canv.height) {
        outOfBounds();
    }

}


function applyBallSpeed(angle) {

    // keep the angle between 30 and 150 degrees
    if (angle < Math.PI / 6) {
        angle = Math.PI / 6;
    } else if (angle > Math.PI * 5 / 6) {
        angle = Math.PI * 5 / 6;
    }

    // update the x and y velocities of the ball
    ball.dx = ball.spd * Math.cos(angle);
    ball.dy = -ball.spd * Math.sin(angle);
}


function serve() {
    // ball already in motion
    if (ball.dy != 0) {
        return;
    }
    // random angle, between 45 and 135 degrees
    let angle = Math.random() * Math.PI / 2 + Math.PI / 4;
    applyBallSpeed(angle);
}     