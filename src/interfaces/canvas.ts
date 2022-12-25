export interface ICanvasSettings {
    width: number;
    height: number;

    zIndex?: number;
}

export interface IRectangleParams {
    radius?: number;
    fillColor?: string;
}

export interface ITextParams {
    size: string;
    color: string;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
}

export interface ILineParams {
    color: string;
    width: number;
}

export interface ICircleParams {
    lineWidth?: number;
    lineColor?: string;
    fillColor?: string;
    isStroke?: boolean;
}

export interface ICanvas {
    show(): void;
    hide(): void;
    clear(): void;
    getElement(): HTMLCanvasElement;
    drawRectangle(x: number, y:number, width:number, height:number, options?: IRectangleParams): void;
    drawText(text: string, x: number, y:number, options?: ITextParams): void;
    drawLine(xS: number, yS: number, xE: number, yE: number, options?: ILineParams): void;
    drawCircle(x: number, y: number, radius: number, options?: ICircleParams): void;
}