import { DIRECTION } from "../consts";

export class Player {
    constructor(settings) {
        const { x, y, width, height, color, speed, canvas, physics, debug = false } = settings;
       
        this.width = width;
        this.height = height;
        this.speed = speed;

        this.color = color;

        this.canvas = canvas;
        this.physics = physics;
        this.debug = debug;

        this.physicShape = this.physics.createBox({ x, y }, this.width, this.height, { isStatic: false });
    }

    setPosition(x, y) {
        this.physicShape.setPosition(x,y)
    }

    get x() {
        return this.physicShape.x
    }

    get y() {
        return this.physicShape.y
    }
    
    move(direction) {
        switch (direction) {
            case DIRECTION.FORWARD:
                this.setPosition(this.x, this.y - this.speed);
                break;
            case DIRECTION.BACKWARD:
                this.setPosition(this.x, this.y + this.speed);
                break;
        }
    }

    draw() {
        this.canvas.drawRectangle(
            this.x, 
            this.y, 
            this.width, 
            this.height,
            {             
                radius: 10,   
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