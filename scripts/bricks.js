
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


