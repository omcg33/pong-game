import { Point } from "../common";
import { DIRECTION } from "../enums";

export interface IPlayer {
    physicShape: any;

    getPosition(): Point;
    setPosition(point: Point): void;
    move(direction: DIRECTION): void;
    canMove(direction: DIRECTION): boolean;
    draw(): void;
}