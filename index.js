var main = document.getElementById('Container');
var ball =document.createElement('div');
var b ={
    x:20,
    y:0,
    w:30,
    h:30,
    xd:1,
    yd:1,
    speed:10,
    ani:{}
}
ball.style.width='30px';
ball.style.height='30px';
ball.style.borderRadius='50%';
ball.style.backgroundColor='red';
ball.style.position='relative'
ball.style.left='0px';
ball.style.top='0px';
var start = document.getElementsByTagName('input')[0];
var stop = document.getElementsByTagName('input')[1];
start.addEventListener('click',()=>{
    b.ani = requestAnimationFrame(startAnimation)
});
function startAnimation () {
    if (b.y > 500-b.h || b.y < 0) {
        b.yd *= -1;
    }
    if (b.x > 700-b.h || b.x < 0) {
        b.xd *= -1;
    }
    b.x+=b.xd * b.speed ;
    b.y+=b.yd * b.speed;
    ball.style.left = `${b.x}px`
    ball.style.top = `${b.y}px`
    b.ani = requestAnimationFrame(startAnimation)
}
main.append(ball);


