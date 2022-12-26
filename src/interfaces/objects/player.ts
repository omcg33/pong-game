import { Point } from "../common";
import { DIRECTION } from "../enums";

export interface IPlayer {
    getPosition(): Point;
    setPosition(point: Point): void;
    move(direction: DIRECTION): void;
    draw(): void;
}