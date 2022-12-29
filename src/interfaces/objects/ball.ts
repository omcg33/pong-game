import { Point, VectorN } from "../common";

export interface IBall {
    physicShape: any;

    getPosition(): Point;
    setPosition(point: Point): void;
    setDirection(dx: number, dy: number): void;
    setSpeed(speed: number): void;
    updateDirection(vectorN: VectorN): void;
    
    draw(): void;
    move(): void;
}