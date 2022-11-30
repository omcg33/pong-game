export class Ball {
    constructor(settings) {
        const { x, y, dx, dy, speed, radius, color, canvas, physics, debug = false } = settings;
                 
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.speed = speed;
        this.color = color;

        this.canvas = canvas;
        this.physics = physics;
        this.debug = debug;

        this.physicShape = this.physics.createCircle(
            { x, y },
            this.radius,
        );
    }
    
    get x() {
        return this.physicShape.x
    }

    get y() {
        return this.physicShape.y
    }

    setPosition(x, y) {
        this.physicShape.setPosition(x,y)
    }

    setDirection(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    updateDirection(vectorNormal) {
        const { x, y } = vectorNormal;

        if (x !== 0 ) this.dx *= -1;
        if (y !== 0 ) this.dy *= -1;
    }

    setLastTouchedPlayer(player) {
        this.lastTouchedPlayer = player
    }
    
    draw() {
        this.canvas.drawCircle(
            this.x, 
            this.y, 
            this.radius, 
            { 
                isStroke: false, 
                fillColor: this.color
            }
        )

        if (this.debug) {       
            this.canvas.drawLine(
                this.x, 
                this.y,
                this.x + this.radius * 2 * this.dx,
                this.y + this.radius * 2 * this.dy,
                {
                    lineColor: "#ff0000",
                    lineWidth: 1
                }
            )

            this.canvas.ctx.strokeStyle = "#ff0000";
            this.canvas.ctx.beginPath();
            this.physicShape.draw(this.canvas.ctx);
            this.canvas.ctx.stroke();
            this.canvas.ctx.closePath();
        }
    }
}