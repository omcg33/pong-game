import { Point } from "../common";

export interface IWall {
    physicShape: any;

    getPosition(): Point;
    setPosition(point: Point): void;
    
    draw(): void;
}