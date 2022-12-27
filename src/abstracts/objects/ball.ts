import { Point } from "src/interfaces/common";
import { IBall } from "../../interfaces/objects/ball";

export class AbstractBall implements IBall {
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