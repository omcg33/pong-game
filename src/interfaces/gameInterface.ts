import { AbstractCanvas } from "src/abstracts/canvas";

export interface IGameInterfaceSettings {
    width: number;
    height: number;
    colors: Record<string, Record<string, string>>
}

export interface IGameInterfaceParams {
    node: HTMLElement;
    width: number;
    height: number;
    Canvas: typeof AbstractCanvas
    zIndex: number;
}

export interface IGameInterface {
    show(): void;
    hide(): void;

    renderHelloScreen(): Promise<void>;
    renderStartScreen(): Promise<void>;
}