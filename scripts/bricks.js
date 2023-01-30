
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

const level3 = [[0, 0, 3, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 3, 0, 0],
[0, 3, -1, 3, 0, 0, 0, 2, 2, 0, 0, 0, 3, -1, 3, 0]
    , [0, 0, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 3, 0, 0]
    , [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
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

    let countPowers = 0;
    while (countPowers < 5) { //create powers random
        let r1 = Math.floor(Math.random() * 6);
        let c1 = Math.floor(Math.random() * 16)
        let r2 = Math.floor(Math.random() * 6);
        let c2 = Math.floor(Math.random() * 16)
        let r3 = Math.floor(Math.random() * 6);
        let c3 = Math.floor(Math.random() * 16)
        if (brickArr[r1][c1].status > 0 && brickArr[r1][c1].power === '') {
            brickArr[r1][c1].power = 'life';
            countPowers++;
        }
        if (brickArr[r2][c2].status > 0 && brickArr[r2][c2].power === '') {
            brickArr[r2][c2].power = 'paddle';
            countPowers++;
        }
        if (brickArr[r3][c3].status > 0 && brickArr[r3][c3].power === '') {
            brickArr[r3][c3].power = 'ball';
            countPowers++;
        }
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
        case 'ball':
            drawPowerBall(power);
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
            case 'ball':
                drawPowerBall(powers[i]);
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
    let begin_y = paddle.y - paddle.h / 2;
    let end_y = paddle.y + paddle.h / 2;
    for (var i = 0; i < powers.length; i++) {
        if (powers[i].x > begin_x &&
            powers[i].x < end_x &&
            Math.ceil(powers[i].y) > Math.ceil(begin_y) &&
            Math.ceil(powers[i].y) < Math.ceil(end_y) &&
            !powers[i].isCaught) {
            aud.src = "media/gain power.wav";
            aud.play().catch((err) => { console.log(err); });
            powers[i].isCaught = true;
            if (powers[i].type === 'paddle') {
                clearTimeout(id);
                powerPaddle()
            } else if (powers[i].type === 'life') {
                powerLife()
            }
            else if (powers[i].type === 'ball') {
                powerBall()
            }
        }
    }
}

var id;
function powerPaddle() {
    paddle.w = 0.2 * game_Width
    id = setTimeout(() => { paddle.w = 0.1 * game_Width }, 10000)
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

function drawPowerBall(power) {
    ctx.beginPath()
    ctx.fillStyle = '#ff0000';
    ctx.arc(power.x, power.y, 10, 0, 2 * Math.PI);
    ctx.fill()
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

function powerBall() {
    for (let index = 0; index < 3; index++) {
        let currentBall=balls[0];
        // currentBall = balls[balls.length+index];
        let NewBall = new Ball();
        NewBall.y = currentBall.y;
        NewBall.x = currentBall.x;
        NewBall.spd=currentBall.spd;
        NewBall.dx = Math.ceil(Math.random()*7);
        NewBall.dy = -Math.ceil(Math.random()*7);
        balls.push(NewBall);
    }
}