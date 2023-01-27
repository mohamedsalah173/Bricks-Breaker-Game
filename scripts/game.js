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

var level=1;

//display level
document.querySelector('.level span').innerHTML = level;

var ball, paddle;
function newGame() {
    // level=1;
    setDimensions();
    paddle = new Paddle();
    ball = new Ball();
}

var lives = 3;
function outOfBounds() {
    // TODO out of bounds
    lives--;
    document.querySelector('.lives span').innerHTML = lives
    newGame();
    if (lives === 0 ) {
        document.getElementById('game-over').style.display='flex';
        score=0;
        isPause=false
        document.querySelector('.score span').innerHTML = score
    }
}


function gameLoop() {
    // update
    if(!createPattern) {
        switch (level) {
            case 1:
                createBricks(level1);
                break;
            case 2:
                newGame();
                createBricks(level2);
                // setTimeout(()=>{
                    
                //     ctx.fillStyle= "red";
                //     ctx.font = "italic bold 35pt Tahoma";
                //     ctx.fillText("UP LEVEL",30,80);
                //     },10000);
                break;
            case 3:
                newGame();
                createBricks(level3);
                break;
            default:
                console.log("you won ");
                
                break;
        }
        
    }

    if(switchLevel){
        level++;
        powers = []
        //display level
        document.querySelector('.level span').innerHTML = level;
        createPattern=false;
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
