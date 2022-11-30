export class Wall {
    constructor(settings) {
        const { x, y, width, height, color, canvas, physics, debug = false } = settings;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.color = color;

        this.canvas = canvas;
        this.physics = physics;
        this.debug = debug;

        this.physicShape = this.physics.createBox({ x: this.x, y: this.y }, this.width, this.height, { isStatic: true });
    }

    draw() {
        this.canvas.drawRectangle(
            this.x, 
            this.y, 
            this.width, 
            this.height,
            { 
                isStroke: false, 
                fillColor: this.color
            }
        )

        if (this.debug) {
            this.canvas.ctx.strokeStyle = "#ff0000";
            this.canvas.ctx.beginPath();
            this.physicShape.draw(this.canvas.ctx);
            this.canvas.ctx.stroke();
            this.canvas.ctx.closePath();
        }
    }
}