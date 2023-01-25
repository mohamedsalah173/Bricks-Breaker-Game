// Colors 
const COLOR_BACKGROUND = "black";
const COLOR_BOARDERS = "grey";
//Game Parameters
var GAME_HEIGHT = window.innerHeight; //pixles 
var GAME_WIDTH = window.innerWidth;

const WALL = 0.02; // wall/ball/paddle size as a fraction of the shortest screen dimension
var BOARDER = WALL * (GAME_HEIGHT < GAME_WIDTH ? GAME_HEIGHT : GAME_WIDTH);
//setup the game canvas
var canv = document.createElement("canvas");
canv.width = GAME_WIDTH;
canv.height = GAME_HEIGHT;
document.body.appendChild(canv);
//setup the context
var ctx = canv.getContext("2d");

// draw background of Canvas
function drawBackground() {
    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(0, 0, canv.width, canv.height);
}
// draw Boarders of Canvas
function drawBoarders() {
    let halfBoarder = BOARDER / 2;
    ctx.lineWidth = BOARDER; //thinks of boarders
    ctx.strokeStyle = COLOR_BOARDERS;
    ctx.beginPath();
    ctx.moveTo(halfBoarder, GAME_HEIGHT);
    ctx.lineTo(halfBoarder, halfBoarder); // top
    ctx.lineTo(GAME_WIDTH - halfBoarder, halfBoarder); // left
    ctx.lineTo(GAME_WIDTH - halfBoarder, GAME_HEIGHT); // right
    ctx.stroke();
    ctx.closePath();
}
