import { AbstractPlayer } from "../../../abstracts/objects/player";

export interface IPlayerSettings {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    color: string;

    canvas: any;
    physics: any;
}

export class Player extends AbstractPlayer {
    constructor(params: IPlayerSettings) {
        super();
        const { x, y, width, height, color, speed, canvas, physics } = params;
    }
}