import { IGame, IGameParams } from "./interfaces/game";

export class Game implements IGame {
    constructor(options: IGameParams) {
        console.log(options);
    }
}