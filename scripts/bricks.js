
let brickArr = [];

var createPattern = false;

class Brick {
    static cols = 16;
    static rows = 6;
    static marginTop = 30;
    static width = (canv.width /16) - (wall*2);
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
    for (let i = 0; i < 4; i++) { // create 4 powers random
        brickArr[Math.floor(Math.random()*6)][Math.floor(Math.random()*16)].power = true        
    }
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
var powers = []
function createPower(brick) {
    power = new Power(brick);
    ctx.beginPath()
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(power.x, power.y, 10, 5);
    ctx.stroke()
    powers.push(power)
}


function drawPower() {
    for (let i = 0; i < powers.length; i++) {
        powers[i].y++;
        ctx.beginPath()
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(powers[i].x, powers[i].y, 20, 5);
        ctx.stroke()
        ctx.closePath()
        catchPower()
    }
}

function catchPower() {
    let begin_x = paddle.x - (paddle.w / 2)
    let end_x = paddle.x + (paddle.w / 2)
    for (let i = 0; i < powers.length; i++) {
        if (powers[i].x > begin_x && powers[i].x < end_x && powers[i].y === Math.ceil(paddle.y)) {
            powerPaddle()
        }

    }

}

function powerPaddle() {
    paddle.w = 0.2 * game_Width
    setTimeout(() => { paddle.w = 0.1 * game_Width }, 10000)
}
