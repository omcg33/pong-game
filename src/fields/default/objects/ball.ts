import { VectorN } from "../../../interfaces/common";
import { AbstractBall } from "../../../abstracts/objects/ball";

export interface IBallSettings {
    x: number;
    y: number;
    dx: number;
    dy: number;
   
    radius: number;
    speed: number;
    color: string;

    canvas: any;
    physics: any;    
}

export class Ball extends AbstractBall {   
    private _dx: number;
    private _dy: number;

    private _radius: number;
    private _speed: number;
    private _color: string;

    private _physics: any;    
    private _canvas: any;
    
    constructor(settings: IBallSettings) {
        super();
        const { x, y, dx, dy, speed, radius, color, canvas, physics, } = settings;
                 
        this._dx = dx;
        this._dy = dy;
        this._radius = radius;
        this._speed = speed;
        this._color = color;

        this._canvas = canvas;
        this._physics = physics;
        this.physicShape = this._physics.createCircle({ x, y }, this._radius);
    }

    getPosition() {
        return {
            x: this.physicShape.x,
            y: this.physicShape.y,
        }
    }

    setPosition(point) {
        this.physicShape.setPosition(point.x, point.y)
    }

    setDirection(dx, dy) {
        this._dx = dx;
        this._dy = dy;
    }

    setSpeed(speed: number) {
        this._speed = speed;
    }

    updateDirection(vectorN: VectorN) {
        const { x, y } = vectorN;

        if (x !== 0 ) this._dx *= -1;
        if (y !== 0 ) this._dy *= -1;
    }

    // setLastTouchedPlayer(player) {
    //     this.lastTouchedPlayer = player
    // }
    
    move() {
        const position = this.getPosition()
        const point = {
            x: position.x + this._dx * this._speed,
            y: position.y + this._dy * this._speed,
        }

        this.setPosition(point)       
    }

    draw() {
        const { x, y } = this.getPosition();
        this._canvas.drawCircle(
            x,
            y,
            this._radius, 
            { 
                isStroke: false, 
                fillColor: this._color
            }
        )

        // if (this.debug) {       
        //     this.canvas.drawLine(
        //         this.x, 
        //         this.y,
        //         this.x + this.radius * 2 * this.dx,
        //         this.y + this.radius * 2 * this.dy,
        //         {
        //             lineColor: "#ff0000",
        //             lineWidth: 1
        //         }
        //     )

        //     this.canvas.ctx.strokeStyle = "#ff0000";
        //     this.canvas.ctx.beginPath();
        //     this.physicShape.draw(this.canvas.ctx);
        //     this.canvas.ctx.stroke();
        //     this.canvas.ctx.closePath();
        // }
    }
}