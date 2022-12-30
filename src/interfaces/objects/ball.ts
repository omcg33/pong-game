import { Point, VectorN } from "../common";

export interface IBall {
    physicShape: any;

    getPosition(): Point;
    setPosition(point: Point): void;

    setSpeed(speed: number): void;
    getSpeed(): number;

    setDirection(dx: number, dy: number): void;
    updateDirection(vectorN: VectorN): void;
    
    draw(): void;
    move(): void;
}