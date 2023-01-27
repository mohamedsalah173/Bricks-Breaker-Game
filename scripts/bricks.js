
let brickArr = [];
var switchLevel = false;
var createPattern = false;


const level1 = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
    , [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]];

const level2 = [[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2]
    , [2, 2, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 2, 2]
    , [2, 2, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 2, 2],
[2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2]
    , [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

const level3 = [[0, 3, 3, 0, 0, 0, -1, 3, 3, 0, 0, 0, -1, 3, 0, 0],
[0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 2, 0]
    , [0, 0, 0, 0, -1, 2, 0, 0, 0, 0, -1, 2, 0, 0, -1, 2]
    , [0, 0, 0, 0, -1, 2, 0, 0, 0, 0, -1, 2, 0, 0, -1, 2],
[0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 2, 0]
    , [0, 3, 3, 0, 0, 0, -1, 3, 3, 0, 0, 0, -1, 3, 0, 0]];
class Brick {
    static cols = 16;
    static rows = 6;
    static marginTop = 30;
    static width = (canv.width / 16) - 32;
    static height = 20;
    static offsetTop = 20;
    static offsetLeft = 30;
    constructor(x, y, l, p = '') {
        this.x = x;
        this.y = y;
        this.status = l; //life 3,2,1,0
        this.power = p
    }
}

function createBricks(arr) {
    for (let row = 0; row < arr.length; row++) {
        brickArr[row] = [];
        for (let c = 0; c < arr[row].length; c++) {
            let x = (c * (Brick.offsetLeft + Brick.width) + Brick.offsetLeft);
            let y = ((row * (Brick.offsetTop + Brick.height) + Brick.offsetLeft) + Brick.marginTop);
            // let status = Math.ceil(Math.random() * 3);
            brickArr[row][c] = new Brick(x, y, arr[row][c]);
        }
    }

    for (let i = 0; i < 20; i++) { //create powers random
        brickArr[Math.floor(Math.random() * 6)][Math.floor(Math.random() * 16)].power = 'life'
        brickArr[Math.floor(Math.random() * 6)][Math.floor(Math.random() * 16)].power = 'paddle'
    }
    switchLevel = false;
    createPattern = true
}

function drawBricks() {
    switchLevel = true;
    for (let row = 0; row < Brick.rows; row++) {
        for (let c = 0; c < Brick.cols; c++) {
            let bk = brickArr[row][c];
            if (brickArr[row][c].status === 1) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
                switchLevel = false;
            } else if (brickArr[row][c].status === 2) {
                ctx.fillStyle = '#33eecc';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
                switchLevel = false;
            } else if (brickArr[row][c].status === 3) {
                ctx.fillStyle = '#3322cc';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
                switchLevel = false;
            }
            else if (brickArr[row][c].status === -1) {
                ctx.fillStyle = '#808080';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
            }
        }
    }

}


class Power {
    constructor(brick) {
        this.x = brick.x + (Brick.width / 2);
        this.y = brick.y + (Brick.height / 2);
        this.type = brick.power
        this.isCaught = false
    }
}
var power;
var powers = []
function createPower(brick) {
    power = new Power(brick);
    switch (power.type) {
        case 'paddle':
            drawLine(power)
            break;
        case 'life':
            drawHeart(power);
            break;
        default:
            break;
    }
    powers.push(power)
}

function drawPower() {
    for (let i = 0; i < powers.length; i++) {

        if (powers[i].y <= canv.height && isPause && !powers[i].isCaught) {
            powers[i].y++;
        }

        switch (powers[i].type) {
            case 'paddle':
                drawLine(powers[i])
                break;
            case 'life':
                drawHeart(powers[i])
                break;
            default:
                break;
        }
        ctx.closePath()
        catchPower()
        if ((powers[i].isCaught && powers[i].y < canv.height) || powers[i].y === canv.height) {
            powers.splice(i, 1)
        }
    }
}
function catchPower() {
    let begin_x = paddle.x - (paddle.w / 2)
    let end_x = paddle.x + (paddle.w / 2)
    for (var i = 0; i < powers.length; i++) {
        if (powers[i].x > begin_x && powers[i].x < end_x && powers[i].y + 10 === Math.ceil(paddle.y) && !powers[i].isCaught) {
            aud.src = "../media/powerup.m4a";
            aud.play().catch((err) => { console.log(err); });
            powers[i].isCaught = true;
            if (powers[i].type === 'paddle') {
                powerPaddle()
            } else if (powers[i].type === 'life') {
                powerLife()
            }
        }
    }
}
function powerPaddle() {
    paddle.w = 0.2 * game_Width
    setTimeout(() => { paddle.w = 0.1 * game_Width }, 10000)
}
function powerLife() {
    console.log('life');
    lives++;
    document.querySelector('.lives span').innerHTML = lives;
}

function drawLine(power) {
    ctx.beginPath()
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(power.x, power.y, 20, 5);
    ctx.stroke()
}
function drawHeart(power) {

    var x = power.x;
    var y = power.y;
    var width = 20;
    var height = 20;

    ctx.save();
    ctx.beginPath();
    var topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x, y,
        x - width / 2, y,
        x - width / 2, y + topCurveHeight
    );

    // bottom left curve
    ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2,
        x, y + (height + topCurveHeight) / 2,
        x, y + height
    );

    // bottom right curve
    ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2,
        x + width / 2, y + (height + topCurveHeight) / 2,
        x + width / 2, y + topCurveHeight
    );

    // top right curve
    ctx.bezierCurveTo(
        x + width / 2, y,
        x, y,
        x, y + topCurveHeight
    );

    ctx.closePath();
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.restore();

}
