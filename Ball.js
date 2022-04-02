class Ball {
    constructor(x, y, radius, color, speed, direction) {
        if (x == "random"){
            this.x = Math.random() * canvas.width
        } else {
            this.x = x
        }
        if (y == "random"){
            this.y = Math.random() * canvas.height
        } else {
            this.y = y
        }
        if (radius == "random"){
            this.radius = Math.random() * 2.5
        } else {
            this.radius = radius
        }
        if (color == "random"){
            this.color = "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")"
        } else {
            this.color = color
        }
        if (speed == "random"){
            this.speed = Math.random()*2+1
        } else {
            this.speed = speed
        }
        if (direction == "random"){
            this.direction = Math.random()*Math.PI*2
        } else {
            this.direction = direction
        }

        this.speedX = this.speed * Math.cos(this.direction)
        this.speedY = this.speed * Math.sin(this.direction)

    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    updatePosition(){
        if (this.y <= 0) {
            this.direction *= -1
        }
        if (this.y >= canvas.height) {
            this.direction = Math.PI*2 - this.direction
        }
        if (this.x <= 0){
            this.direction = Math.PI - this.direction
        }
        if (this.x >= canvas.width){
            this.direction = Math.PI*3 - this.direction
        }

        if (Math.sqrt(this.distSqTo(mousePos)) <= mouseConnectionDistance){
            //this.direction = Math.PI+this.dirTo(mousePos)
        }

        this.x += this.speed * Math.cos(this.direction)
        this.y += this.speed * Math.sin(this.direction)

    }

    drawConnections() {
        for (let i = 0; i < balls.length; i++) {
            let b2 = balls[i]
            if (b2 != this){
                let d = Math.sqrt(this.distSqTo(b2))
                if (d <= 120){
                    ctx.beginPath()
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 10/d
                    ctx.moveTo(this.x, this.y)
                    ctx.lineTo(b2.x, b2.y);
                    ctx.stroke()
                }
            }
        }
        let ds = Math.sqrt(this.distSqTo(mousePos))
        if (ds <= mouseConnectionDistance){
            ctx.beginPath()
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 100/ds
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke()
        }
    }

    updateAndDraw(){
        this.updatePosition()
        this.draw()
    }

    distSqTo = (point) => {
        return Math.pow(this.x-point.x, 2) + Math.pow(this.y-point.y, 2)
    }

    dirTo = (point) => {
        return Math.atan(point.y-this.y/point.x-this.x)
    }

}