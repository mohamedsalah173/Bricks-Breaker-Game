
let brickArr = [];

var createPattern = false;

class Brick {
    static cols = 16;
    static rows = 6;
    static marginTop = 30;
    static width = 60;
    static height = 20;
    static offsetTop = 20;
    static offsetLeft = 30;
    constructor(x, y, l, p = false) {
        this.x = x;
        this.y = y;
        this.status = l; //life 3,2,1,0
        this.power = p
    }
}

function createBricks() {
    for (let row = 0; row < Brick.rows; row++) {
        brickArr[row] = [];
        for (let c = 0; c < Brick.cols; c++) {
            let x = (c * (Brick.offsetLeft + Brick.width) + Brick.offsetLeft);
            let y = ((row * (Brick.offsetTop + Brick.height) + Brick.offsetLeft) + Brick.marginTop);
            let status = Math.ceil(Math.random() * 3);
            brickArr[row][c] = new Brick(x, y, status);
        }
    }
    brickArr[5][15].power = true
    brickArr[5][14].power = true
    brickArr[5][13].power = true
    brickArr[5][12].power = true
    brickArr[5][11].power = true
    brickArr[5][10].power = true
    brickArr[5][9].power = true
    brickArr[5][8].power = true
    brickArr[5][7].power = true
    brickArr[5][6].power = true
    brickArr[5][5].power = true
    console.log(brickArr);

    createPattern = true
}

function drawBricks() {
    for (let row = 0; row < Brick.rows; row++) {
        for (let c = 0; c < Brick.cols; c++) {
            let bk = brickArr[row][c];
            if (brickArr[row][c].status === 1) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
            } else if (brickArr[row][c].status === 2) {
                ctx.fillStyle = '#33eecc';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
            } else if (brickArr[row][c].status === 3) {
                ctx.fillStyle = '#3322cc';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
            }
        }
    }

}


class Power {
    constructor(brick) {
        this.x = brick.x + (Brick.width / 2);
        this.y = brick.y + (Brick.height / 2);
    }
}
var power;
function createPower(brick) {
    power = new Power(brick);
    ctx.beginPath()
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(power.x, power.y, 10, 5);
    ctx.stroke()
}

// createPower();

function drawPower() {
    if (power) {
        power.y++;
        ctx.beginPath()
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(power.x, power.y, 20, 5);
        ctx.stroke()
        ctx.closePath()
        catchPower()
    }
}

function catchPower() {
    let begin_x = paddle.x - (paddle.w / 2)
    let end_x = paddle.x + (paddle.w / 2)
    if (power.x > begin_x && power.x < end_x && power.y === Math.ceil(paddle.y)) {
        powerPaddle()
    }
}

function powerPaddle() {
    paddle.w = 0.2 * game_Width
    setTimeout(() => { paddle.w = 0.1 * game_Width }, 10000)
}
