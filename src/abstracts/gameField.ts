import { IGameFieldParams, IGameField, Score } from "src/interfaces/gameField";

export class AbstractGameField implements IGameField {
    constructor(params: IGameFieldParams) {      
    }
    renderBackground(): void {
        throw new Error("Method not implemented.");
    }

    renderScore(score: Score): void {
        throw new Error("Method not implemented.");
    }
    createObjects(): void {
        throw new Error("Method not implemented.");
    }
    resetObjects(): void {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    render(): void {
        throw new Error("Method not implemented.");
    }
    renderThrowNewBallScreen(): void {
        throw new Error("Method not implemented.");
    }
    renderGoalScreen(): void {
        throw new Error("Method not implemented.");
    }
    
}