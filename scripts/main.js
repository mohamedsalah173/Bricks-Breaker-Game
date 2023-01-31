
var section = document.createElement('section')
section.classList.add('dashboard')
section.innerHTML = `
<div class="pause"><i class="fa-sharp fa-solid fa-pause" style="color="white""></i> ESC</div>
<div class="sound"><i id='mute' class="fa-solid fa-volume-high"></i> <i id="icon" class='fa fa-music'></i></div>
<div class="level"><i class="fa-sharp fa-solid fa-flag-checkered"></i> <span> </span></div>
<div class="score"><i class="fa-sharp fa-solid fa-coins"></i><span> 0</span></div>
<div class="lives"><i class="fa-solid fa-heart"></i><span> 3</span></div>
<div class="high-score">high score <span></span></div>`
document.body.appendChild(section)
//create audio diff src


window.addEventListener("resize", setDimensions);
// Colors 
const COLOR_BACKGROUND = "black";
const COLOR_WALL = "grey";
//Game Parameters
const WALL_F = 0.02; // wall/ball/paddle size as a fraction of the shortest screen dimension

//setup the game canvas
var canv = document.createElement("canvas");
document.body.appendChild(canv);
//setup the context
var ctx = canv.getContext("2d");
document.querySelector('canvas').style.display = 'none'




// dimensions
var height, game_Width, wall;
// set game dimensions
function setDimensions() {
    height = window.innerHeight - section.offsetHeight;
    game_Width = window.innerWidth;
    wall = WALL_F * (height < game_Width ? height : game_Width);
    canv.width = game_Width;
    canv.height = height;
    ctx.lineWidth = wall;
}
// draw background of Canvas
function drawBackground() {
    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(0, 0, canv.width, canv.height);
}
// draw Boarders of Canvas
function drawWalls() {
    let hwall = wall * 0.5;
    ctx.strokeStyle = COLOR_WALL;
    ctx.beginPath();
    ctx.moveTo(hwall, height);
    ctx.lineTo(hwall, hwall);
    ctx.lineTo(game_Width - hwall, hwall);
    ctx.lineTo(game_Width - hwall, height);
    ctx.stroke();
}

function returnMenu() {
    createPattern = false;
    score=0;
    lives = 3;
    level = 1;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('up-level').style.display = 'none';
    document.getElementById('next-level').style.display = 'inline-block';
    document.getElementById('menu').style.display = 'flex';
    document.querySelector('.score span').innerHTML = score
    section.style.visibility = 'hidden'
    document.querySelector('canvas').style.display = 'none'
    document.querySelector('.level span').innerHTML = level;

    isPause = true
    powers = []
    document.querySelector('.lives span').innerHTML = lives
}

setDimensions();

document.getElementById('start').addEventListener('click', () => {

    timeout();

    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'none';
    section.style.visibility = 'visible'
    document.querySelector('canvas').style.display = 'none'
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

})


document.getElementById('restart-level').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('game-over').style.display = 'none';
    createPattern = false;
    lives = 3;
    // isPause = true
    powers = []
    document.querySelector('.lives span').innerHTML = lives
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    newGame();

})

document.getElementById('return-menu').addEventListener('click', returnMenu);

document.getElementById('return-menu-level').addEventListener('click', returnMenu);


document.getElementById('exit-help').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('help-menu').style.display = 'none';
})
document.getElementById('next-level').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('up-level').style.display = 'none';
    createPattern = false;
    // isPause = true
    powers = []
    document.querySelector('.lives span').innerHTML = lives
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    newGame();
})


document.getElementById('help').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'none';
    document.getElementById('help-menu').style.display = 'flex';
})


document.getElementById('about').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'none';
    document.getElementById('about-us').style.display = 'flex';
})

document.getElementById('exit-about').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('about-us').style.display = 'none';
})



const startShowDiv = document.getElementById("startshow")
function timeout() {
    isPause = false
    startShowDiv.style.display = 'flex';
    startShowDiv.textContent = 'Ready!';
    setTimeout(myGreeting3, 1000);

}


function myGreeting3() {

    startShowDiv.textContent = "Steady!";
    const myTimeout2 = () => {
        setTimeout(myGreeting2, 1000);
    };
    myTimeout2();
}

function myGreeting2() {
    startShowDiv.textContent = "Go!";
    const myTimeout1 = () => {
        setTimeout(myGreeting1, 1000);
    };
    myTimeout1();
}

function myGreeting1() {
    startShowDiv.style.display = "none";
    isPause = true
    document.querySelector('canvas').style.display = 'block'


}
