const MAX_LEVEl = 3;

// for resposive
window.addEventListener("resize", newGame);
let isPause = true;
document.addEventListener("keydown", (e) => {
    // console.log(e);
    if (e.key === 'Escape') {
        isPause = isPause === true ? false : true;
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

var level = 1;

//display level
document.querySelector('.level span').innerHTML = level;

var ball, paddle;
function newGame() {
    // level=1;
    setDimensions();
    paddle = new Paddle();
    // ball = new Ball();
    balls = [new Ball()];
}

var lives = 3;
function outOfBounds() {
    // TODO out of bounds
    lives--;
    powers = [];
    document.querySelector('.lives span').innerHTML = lives
    newGame();
    if (lives === 0) {
        document.getElementById('game-over').style.display = 'flex';
        aud.src = "media/gameOver.wav";
        aud.play().catch((err) => { console.log(err); });
        score = 0;
        
        // isPause = false
        document.querySelector('.score span').innerHTML = score
        document.removeEventListener("keydown", keyDown);
        document.removeEventListener("keyup", keyUp);

    }

}


function gameLoop() {
    // update
    // makeSomeNoise();


    

    if (!createPattern) {
        switch (level) {
            case 1:
                BALL_SPD = 0.005;
                createBricks(level1);
                break;
            case 2:
                BALL_SPD = 0.007;
                newGame();
                createBricks(level2);
                break;
            case 3:
                BALL_SPD = 0.009;
                newGame();
                createBricks(level3);
                break;
            default:
                switchLevel=false;
                isPause = false;
                break;
        }


    }

    if (switchLevel) {
        aud.src = "media/success-fanfare-trumpets-6185.mp3"
        aud.play();

        if (level == MAX_LEVEl)
            document.getElementById('next-level').style.display = 'none';
        document.getElementById('up-level').style.display = 'flex';
        document.querySelector('#up-level h1').textContent = `Congrats You Passed Level ${level}`;
        // isPause = false;
        level++;
        powers = []
        //display level
        document.querySelector('.level span').innerHTML = level;
        createPattern = false;
        document.removeEventListener("keydown", keyDown);
        document.removeEventListener("keyup", keyUp);
    }
    if (isPause === true) {

        updatePaddle();
        updateBall();
    }
    // draw

    drawBackground();
    drawWalls();
    drawPaddle();
    drawBall();
    drawBricks()
    ballBricksCollision();
    drawPower()
    // call the next loop
    requestAnimationFrame(gameLoop);
}
function start() {
    newGame();
    gameLoop();
}


start();
