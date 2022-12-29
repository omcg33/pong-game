import { Point } from "../../interfaces/common";
import { IWall } from "../../interfaces/objects/wall";

export class AbstractWall implements IWall {
    physicShape: any;

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