let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let backgroundDarkness = 30
let ballCount = 200
let balls = []

let blackOnWhite = false

let mouseConnectionDistance = 200

let mousePos = {
    x: 0,
    y: 0
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener("mousemove", function (event) {
    mousePos = getMousePos(canvas, event);
})

var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        mouseConnectionDistance += 10
    } else {
        if (mouseConnectionDistance > 9){
            mouseConnectionDistance -= 10
        }
    }
    console.log(mouseConnectionDistance)
}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

function init() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    resetCanvas()
    addRandomBalls(ballCount)
    gameLoop()

}

function gameLoop() {

    resetCanvas()
    updateAndDrawBalls()
    drawConnections()
    requestAnimationFrame(gameLoop)

}

function drawConnections() {
    for (let i = 0; i < balls.length; i++) {
        let b = balls[i]
        b.drawConnections()
    }
}

function addRandomBalls(n) {
    if (!blackOnWhite){
        for (let i = 0; i < n; i++) {
            balls.push(new Ball("random", "random", "random", "white", "random", "random"))
        }
    } else {
        for (let i = 0; i < n; i++) {
            balls.push(new Ball("random", "random", "random", "black", "random", "random"))
        }
    }
}

function resetCanvas() {
    if (!blackOnWhite){
        ctx.fillStyle = "rgb(" + backgroundDarkness + ", " + backgroundDarkness + ", " + backgroundDarkness + ")"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "rgb(" + (255-backgroundDarkness) + ", " + (255-backgroundDarkness) + ", " + (255-backgroundDarkness) + ")"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function updateAndDrawBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].updateAndDraw()
    }
}

init()