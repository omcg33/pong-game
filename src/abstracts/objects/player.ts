import { Point } from "src/interfaces/common";
import { DIRECTION } from "src/interfaces/enums";
import { IPlayer } from "../../interfaces/objects/player";

export class AbstractPlayer implements IPlayer {
    getPosition(): Point {
        throw new Error("Method not implemented.");
    }
    setPosition(point: Point): void {
        throw new Error("Method not implemented.");
    }
    move(direction: DIRECTION): void {
        throw new Error("Method not implemented.");
    }
    draw(): void {
        throw new Error("Method not implemented.");
    }
}