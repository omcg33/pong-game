import { Point } from "../common";

export interface IBall {
    getPosition(): Point;
    setPosition(point: Point): void;
    setDirection(dx: number, dy: number): void;
    setSpeed(speed: number): void;

    draw(): void;
    move(): void;
}