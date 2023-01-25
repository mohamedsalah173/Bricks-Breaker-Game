
let brickArr = [];

var createPattern = false;

const brick ={
    col:16,
    rows:4,
    width:50,
    height:20,
    offsetTop:20,
    offsetLeft:30,
    marginTop:30,
    fillColor:"#B9F3FC",
    counter:2
}


function createBricks() {
    for(let row = 0 ; row < brick.rows ; row ++) {
        brickArr[row]=[];
        for(let c = 0 ; c < brick.col ; c ++) {
            brickArr[row][c] = {
                x:(c*(brick.offsetLeft+brick.width)+brick.offsetLeft),
                y:((row*(brick.offsetTop+brick.height)+brick.offsetLeft)+brick.marginTop),
                status:true
            };
        }
    }
    createPattern = true
}

function drawBricks() {
    for(let row = 0 ; row < brick.rows ; row ++){
        for(let c = 0 ; c < brick.col ; c ++){
            let bk = brickArr[row][c];
            if(brickArr[row][c].status) {
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(bk.x,bk.y,brick.width,brick.height);
            }
        }
    }
}