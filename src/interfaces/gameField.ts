import { AbstractCanvas } from "../abstracts/canvas";

export type Score = number[];

export interface IGameFieldParams {
    node: HTMLElement;
    width: number;
    height: number;
    Canvas: typeof AbstractCanvas
    zIndex?: number; 
}

export interface IGameField {
    renderScore(score: Score): void
    createObjects(): void;
    resetObjects(): void;

    clear(): void;
    render(): void;
    renderBackground(): void;
    renderThrowNewBallScreen(): void;
    renderGoalScreen(): void;
}