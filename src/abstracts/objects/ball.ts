import { Point, VectorN } from "src/interfaces/common";
import { IBall } from "../../interfaces/objects/ball";

export class AbstractBall implements IBall {
    getSpeed(): number {
        throw new Error("Method not implemented.");
    }
    updateDirection(vectorN: VectorN): void {
        throw new Error("Method not implemented.");
    }
    public physicShape: any;

    move(): void {
        throw new Error("Method not implemented.");
    }
    setSpeed(speed: number): void {
        throw new Error("Method not implemented.");
    }
    setDirection(dx: number, dy: number): void {
        throw new Error("Method not implemented.");
    }
    
    getPosition(): Point {
        throw new Error("Method not implemented.");
    }
    setPosition(point: Point): void {
        throw new Error("Method not implemented.");
    }
    
    draw(): void {
        throw new Error("Method not implemented.");
    }
}