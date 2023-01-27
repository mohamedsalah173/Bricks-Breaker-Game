const BALL_SPD = 0.006; // starting ball speed as a fraction of screen height per second
const BALL_SPIN = 0.5; // ball deflection off the paddle (0 = no spin, 1 = high spin)
const COLOR_BALL = "white";
function Ball() {
    this.radius = wall * 0.75;
    this.x = paddle.x;
    this.y = paddle.y - paddle.h / 2 - this.radius;
    this.spd = BALL_SPD * (height > game_Width ? height : game_Width);
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

function serve() {

    // ball already in motion
    if (ball.dy != 0) {
        return false;
    }

    // random angle, between 45 and 135 degrees
    let angle = Math.random() * Math.PI / 2 + Math.PI / 4;
    applyBallSpeed(angle);
    return true;
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
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    // move the stationary ball with the paddle
    if (ball.dy == 0) {
        ball.x = paddle.x;
    }
    // bounce the ball off the walls
    if (ball.x < wall + ball.radius) {
        ball.x = wall + ball.radius;
        ball.dx = -ball.dx;
        aud.src = "media/wall.m4a";
        aud.play().catch((err) => { console.log(err); });
    } else if (ball.x > game_Width - wall - ball.radius) {
        ball.x = game_Width - wall - ball.radius;
        ball.dx = -ball.dx;
        aud.src = "media/wall.m4a";
        aud.play().catch((err) => { console.log(err); });
    } else if (ball.y < wall + ball.radius) {
        ball.y = wall + ball.radius;
        ball.dy = -ball.dy;
        aud.src = "media/wall.m4a";
        aud.play().catch((err) => { console.log(err); });
    }

    // bounce off the paddle
    if (ball.y > paddle.y - paddle.h * 0.5 - ball.radius
        && ball.y < paddle.y
        && ball.x > paddle.x - paddle.w * 0.5 - ball.radius
        && ball.x < paddle.x + paddle.w * 0.5 + ball.radius) {
        aud.src = "media/paddle.m4a";
        aud.play().catch((err) => { console.log(err); });
        ball.y = paddle.y - paddle.h * 0.5 - ball.radius;
        ball.dy = -ball.dy;

        // modify the angle based off ball spin
        let angle = Math.atan2(-ball.dy, ball.dx);
        angle += (Math.random() * Math.PI / 2 - Math.PI / 4) * BALL_SPIN;
        applyBallSpeed(angle);
    }

    // handle out of bounds
    if (ball.y > height) {
        outOfBounds();
    }
}
var score = 0;
var highScore = score
function ballBricksCollision() {
    for (let row = 0; row < Brick.rows; row++) {
        for (let c = 0; c < Brick.cols; c++) {
            let bk = brickArr[row][c];
            if (bk.status) {

                if (bk.x < ball.x + ball.radius
                    && bk.x + Brick.width > ball.x - ball.radius
                    && ball.y + ball.radius > bk.y
                    && ball.y - ball.radius < bk.y + Brick.height) {
                    aud.src = " media/hit brick.wav";
                    aud.play().catch((err) => { console.log(err); });
                    if (bk.status > 0)
                        score += bk.status; //if lives = 0 set the score back to 0

                    //high score
                    highScore = localStorage.getItem("highScore", highScore)
                    if (score > highScore) {
                        highScore = score
                        localStorage.setItem("highScore", highScore)
                        document.querySelector('.high-score span').innerHTML = highScore
                    }
                    document.querySelector('.score span').innerHTML = score

                    if (bk.power !== '') {
                        createPower(bk);
                        bk.power = '';
                    }

                    if (bk.status === 3 || bk.status === 2 || bk.status === 1) {
                        ball.dy = -ball.dy
                        bk.status--;
                    } else if (bk.status === 0) {
                        bk.status === false
                        bk.status--;
                    }
                    else if (bk.status === -1) {
                        ball.dy = -ball.dy
                    }
                }
            }
        }
    }
}

document.querySelector('.high-score span').innerHTML = localStorage.getItem("highScore", highScore)
