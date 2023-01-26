
var section = document.createElement('section')
section.classList.add('dashboard')
section.innerHTML = `<div class="score">score <span>0</span></div>
<div class="lives">lives <span>3</span></div>
<div class="high-score">high score <span></span></div>`
document.body.appendChild(section)

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

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    section.style.visibility = 'visible'
    document.querySelector('canvas').style.display = 'block'
})
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

setDimensions();