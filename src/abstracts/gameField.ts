import { IGameFieldParams, IGameField, Score, IGameFieldObjects } from "src/interfaces/gameField";
import { AbstractBall } from "./objects/ball";

export class AbstractGameField implements IGameField {
    constructor(params: IGameFieldParams) {      
    }
    throwBall(ball: AbstractBall, speed?: number): void {
        throw new Error("Method not implemented.");
    }
   
    createObjects(): IGameFieldObjects {
        throw new Error("Method not implemented.");
    }   
    show(): void {
        throw new Error("Method not implemented.");
    }
    hide(): void {
        throw new Error("Method not implemented.");
    }
    renderBackground(): void {
        throw new Error("Method not implemented.");
    }
    clearBackground(): void {
        throw new Error("Method not implemented.");
    }
    renderBriefing(): void {
        throw new Error("Method not implemented.");
    }
    clearBriefing(): void {
        throw new Error("Method not implemented.");
    }
    renderScore(score: Score): void {
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