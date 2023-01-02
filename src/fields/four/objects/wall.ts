import { AbstractWall } from "../../../abstracts/objects/wall";

export interface IWallSettings {
    x: number;
    y: number;

    width: number;
    height: number;

    canvas: any;
    physics: any;

    color?: string;
}

export class Wall extends AbstractWall {
    private _width: number;
    private _height: number;

    private _canvas: any;
    private _physics: any;    

    private _color?: string;

    constructor(settings: IWallSettings) {
        super();

        const { x, y, width, height, color, canvas, physics} = settings;
       
        this._width = width;
        this._height = height;

        this._color = color;

        this._canvas = canvas;
        this._physics = physics;        

        this.physicShape = this._physics.createBox({ x, y }, this._width, this._height, { isStatic: true });
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

    draw() {
        const { x, y } = this.getPosition();

        this._canvas.drawRectangle(
            x, 
            y, 
            this._width, 
            this._height,
            { 
                isStroke: false, 
                fillColor: this._color
            }
        )
        // if (this.debug) {
        //     this.canvas.ctx.strokeStyle = "#ff0000";
        //     this.canvas.ctx.beginPath();
        //     this.physicShape.draw(this.canvas.ctx);
        //     this.canvas.ctx.stroke();
        //     this.canvas.ctx.closePath();
        // }
    }
}