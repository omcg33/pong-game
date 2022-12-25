import { ICanvas, ICanvasSettings, IRectangleParams, ITextParams, ILineParams, ICircleParams } from "../interfaces/canvas";

export class AbstractCanvas implements ICanvas {    
    constructor(node: HTMLElement, settings: ICanvasSettings) {
    }
    drawCircle(x: number, y: number, radius: number, options?: ICircleParams): void {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    getElement(): HTMLCanvasElement {
        throw new Error("Method not implemented.");
    }
    drawText(text: string, x: number, y: number, options?: ITextParams): void {
        throw new Error("Method not implemented.");
    }
    drawRectangle(x: number, y: number, width: number, height: number, options?: IRectangleParams): void {
        throw new Error("Method not implemented.");
    }
    drawLine(xS: number, yS: number, xE: number, yE: number, options?: ILineParams) {
        throw new Error("Method not implemented.");
    }
    show(): void {
        throw new Error("Method not implemented.");
    }
    hide(): void {
        throw new Error("Method not implemented.");
    }
}