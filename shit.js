let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let elemLeft = canvas.offsetLeft + canvas.clientLeft,
    elemTop = canvas.offsetTop + canvas.clientTop

let indices = 0
let difficulty = 4

let circles = []
let particles = []
let circleAmount = 30
let score = 0
let defaultTime = 10
let time = defaultTime
let ingame = true
let t

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

document.onkeydown = function (e) {
    if (e.key == " "){
        ingame = !ingame
        console.log("space")
        if (ingame){
            if (time == 0){
                time = defaultTime
            }
            t = setInterval(() => time--,1000);
            animate()
        } else {
            clearInterval(t)
        }
    }
};
canvas.addEventListener("mousemove", function (event) {
    mousePos = getMousePos(canvas, event);
})

canvas.addEventListener('click', function(event) {
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    for (let i = 0; i < circles.length; i++) {
        let c =  circles[i]
        let cX = c.x
        let cY = c.y
        if (Math.abs(x - cX) < c.radius && Math.abs(y - cY) < c.radius){
            circles.splice(i, 1)
            circles.push(new Circle(0, Math.floor(Math.random() * canvas.height), Math.floor(Math.random() * 100)))
            score++

            particles.push(new Particle(c.x, c.y, c.radius, c.color))

        }
    }

}, false);

class Particle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.color = color
        this.step = 360
        this.radius = radius
        this.a = 1
    }

    show(){
        this.step -= 10*this.a
        ctx.beginPath();
        ctx.strokeStyle = this.color
        ctx.lineWidth = 5
        ctx.arc(this.x, this.y, this.radius, 0, this.step*0.01745)
        ctx.stroke()
        if (this.step == 0){
            this.a = 0
        }
    }

}

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')';
        this.speed = Math.ceil(Math.random()*2+radius/10)*(difficulty/6)
        this.width = 5
    }

    show(){
        this.x += this.speed
        //this.radius += 0.1
        ctx.beginPath();
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.width;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

init()
animate()

function animate() {
    if (ingame){
        indices++
        //logFps()
        document.getElementById("scoreId").innerHTML = "Score: " + score;
        document.getElementById("time").innerHTML = "Time: " + time;

        draw()
        for (let i = 0; i < circles.length; i++) {
            circles[i].show()
        }
        for (let i = 0; i < particles.length; i++) {
            particles[i].show()
        }
        spawnNewCircles()
        //removeParticles()
        drawCrossHair()

        requestAnimationFrame(animate);
        if (time == 0){
            ingame = false
            clearInterval(t)
            //time = 60
            score = 0
        }
    }

}

function drawCrossHair(){
    ctx.beginPath()
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1
    ctx.moveTo(mousePos.x, 0);
    ctx.lineTo(mousePos.x, canvas.height);
    ctx.moveTo(0, mousePos.y);
    ctx.lineTo(canvas.width, mousePos.y);
    ctx.stroke()
}

function spawnNewCircles() {
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i]
        if (circle.x > canvas.width){
            circles.splice(i, 1)
            circles.push(new Circle(0, Math.floor(Math.random() * canvas.height), Math.floor(Math.random() * 100)))
        }
    }
}

function removeParticles() {
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i]
        if (particle.step == 0){
            particles.splice(i, 1)
        }
    }
}

function draw(){
    resetCanvas()
}

function init(){
    for (let i = 0; i < circleAmount; i++) {
        circles.push(new Circle(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), Math.floor(Math.random() * 100)))
    }
    t = setInterval(() => time--,1000);
}

function resetCanvas(){
    ctx.beginPath()
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.stroke()
}

function logFps(){
    let fps = indices/(performance.now()/1000)
    console.log(fps)
}