import { AbstractBall } from "../abstracts/objects/ball";
import { AbstractPlayer } from "../abstracts/objects/player";
import { AbstractCanvas } from "../abstracts/canvas";
import { AbstractScoreTrigger } from "../abstracts/objects/scoreTrigger";

export type Score = number[];

export interface IGameFieldObjects {
    players: AbstractPlayer[]
    ball: AbstractBall
    triggers: AbstractScoreTrigger[]
}

export interface IGameFieldParams {
    node: HTMLElement;
    width: number;
    height: number;
    physics: any;
    inputsMap: string[][];
    Canvas: typeof AbstractCanvas
    zIndex?: number; 
}

export interface IGameField {
    renderScore(score: Score): void
    createObjects(): IGameFieldObjects;
    resetObjects(): void;

    show(): void;
    hide(): void;
    clear(): void;
    clearBackground(): void;
    clearBriefing(): void;

    render(): void;
    renderBriefing(): void;
    renderBackground(): void;
    renderThrowNewBallScreen(): void;
    renderGoalScreen(): void;
}