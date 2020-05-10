var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var paddleWidth = 200;
var paddleHeight = 150;
var paddleX = (canvas.width-paddleWidth)/2;
var circleRadius= 10;
var circleRows = 6;
var circleColumns = 7;
var ballRadius = 10;
var x = canvas.width / 2;
var y = ballRadius;
var dx = 2;
var dy = 2;
var rightPressed = false;
var leftPressed = false;
var circlePadding = 5;
var circleOffsetTop = 30;
var circleOffsetLeft = 30;

// Key Eveent Handlers
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        rightPressed = true;
    } else if(e.keyCode == 39) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 37) {
        rightPressed = false;
    } else if(e.keyCode == 39) {
        leftPressed = false;
    }
}

var circlesArr = [];
function initTheCricles() {
    for(c=0; c< circleColumns; c++) {
        circlesArr[c] = [];
        for(r=0; r < circleRows; r++) {
            circlesArr[c][r] = {x:0, y:0, status:1}
        }
    }
}

function drawCircles() {
    for(c=0; c < circleColumns; c++) {
        for(r=0; r < circleRows; r++) {
            if(circlesArr.status == 1) {
                var circleX = (c*(circleRadius+circlePadding)) + circleOffsetLeft;
                var circleY = (r*(circleRadius+circlePadding)) + circleOffsetTop;
                circles[c][r].x = circleX;
                circles[c][r].y = circleY;
                ctx.beginPath();
                ctx.arc(circleX, circleY, circleRadius, Math.PI);
                ctx.fillStyle = '#ffff';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function collisionDetector() {

}

//Draw a Net
function drawCollector() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
   // drawCircles();
    ctx.arc(paddleWidth+3, paddleHeight+3, 0, 0, Math.PI*2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
}

//Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#000DFF';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawCollector();    
    y += dy;

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

    requestAnimationFrame(draw);
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
		paddleX = relativeX - paddleWidth/2;
	}
}

draw();