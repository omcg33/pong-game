import { DIRECTION } from "../../../interfaces/enums";
import { IMovement } from "../../../interfaces/userInput";
import { AbstractPlayer } from "../../../abstracts/objects/player";
import { convertRelativePointToPoint } from "src/helpers";

export interface IPlayerSettings {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    color: string;

    canvas: any;
    physics: any;
    availableArea: any;
}

export class Player extends AbstractPlayer {
    private _width: number;
    private _height: number;
    private _speed: number;
    private _color: string;

    private _physics: any;
    private _physicShape: any;
    private _canvas: any;
    private _availableArea: any;

    constructor(params: IPlayerSettings) {
        super();
        const { x, y, width, height, color, speed, canvas, physics, availableArea } = params;

        this._width = width;
        this._height = height;
        this._speed = speed;

        this._color = color;

        this._canvas = canvas;
        this._physics = physics;
        this._availableArea = availableArea;

        this._physicShape = this._physics.createBox({ x, y }, this._width, this._height, { isStatic: false });
    }

    canMove(movement: IMovement): boolean {
        const area = this._availableArea;
        const position = this.getPosition();

        const yStart = position.y;
        const yEnd = position.y + this._height;
    
        const areaYStart = area.start.y;
        const areaYEnd = area.end.y;

        switch (movement) {
            case DIRECTION.FORWARD:
                return yStart > areaYStart
            case DIRECTION.BACKWARD:
                return yEnd < areaYEnd
            default:
                return false;
        }
    }

    getPosition() {
        return {
            x: this._physicShape.x,
            y: this._physicShape.y,
        }
    }

    setPosition(point) {
        this._physicShape.setPosition(point.x, point.y)
    }
    
    move(direction) {
        const position = this.getPosition();

        if (!this.canMove(direction)) return;

        switch (direction) {
            case DIRECTION.FORWARD:
                this.setPosition({ x: position.x, y: position.y - this._speed });
                break;
            case DIRECTION.BACKWARD:
                this.setPosition({ x: position.x, y: position.y + this._speed });
                break;
        }
    }

    draw() {
        const { x, y } = this.getPosition();

        this._canvas.drawRectangle(
            x, 
            y, 
            this._width, 
            this._height,
            {             
                radius: this._width / 2,   
                fillColor: this._color
            }
        )
    }
}