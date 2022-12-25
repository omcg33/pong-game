import { AbstractCanvas } from "../abstracts/canvas";
import { ICanvasSettings, ICircleParams, ILineParams, IRectangleParams, ITextParams } from "../interfaces/canvas";

export class Canvas extends AbstractCanvas {
    private _element: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(node: HTMLElement, settings: ICanvasSettings) {
        super(node, settings);

        const { width, height, zIndex } = settings;
  
        this._element = document.createElement('canvas')
        this._element.width = width;
        this._element.height = height;
        this._element.style.position='absolute';
        this._element.style.display='block';
        this._element.style.top='0';
        this._element.style.left='0';
        this._element.style.right='0';
        this._element.style.bottom='0';

        if (typeof zIndex === "number") {
            this._element.style.zIndex=String(zIndex);
        }

        
        this._ctx = this._element.getContext('2d')
                
        node.appendChild(this._element)
      }

    drawRectangle(x: number, y: number, width: number, height: number, options?: IRectangleParams): void {
        const { radius = 0, fillColor } = options
        // beginPath() начинает вектор
        this._ctx.beginPath()

        // Указываем координаты начальной точки линии
        this._ctx.moveTo(x + radius, y)
        // Указываем координаты следующей точки линии
        this._ctx.lineTo(x + width - radius, y)
        // Указываем координаты точки, до куда будет идти закругление
        this._ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
        // Указываем координаты следующей точки линии и т.д
        this._ctx.lineTo(x + width, y + height - radius)
        this._ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        this._ctx.lineTo(x + radius, y + height)
        this._ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        this._ctx.lineTo(x, y + radius)
        this._ctx.quadraticCurveTo(x, y, x + radius, y)

        this._ctx.fillStyle = fillColor
        this._ctx.fill()

        // Завершем создание вектора
        this._ctx.closePath()
    }

    drawText(text: string, x: number, y: number, options?: ITextParams) {
        const { size, color, align = "center", baseline = "middle" } = options;

        this._ctx.fillStyle = color
        this._ctx.font = `bold ${size} monospace`
        this._ctx.textAlign = align
        this._ctx.textBaseline = baseline

        this._ctx.fillText(text, x, y)        
    }

    drawLine(xS: number, yS: number, xE: number, yE: number, options?: ILineParams) {
        const { color, width } = options;

        // Указываем, что линия будет с закруглениями на концах
        this._ctx.lineCap = 'round'
        // beginPath() начинает вектор

        this._ctx.beginPath() 
        // Аргументами указываем координаты начальной точки линии
        this._ctx.moveTo(xS, yS)
        // Аргументами  указываем координаты конечной точки линии
        this._ctx.lineTo(xE, yE)
        // Указываем толщину линии, ее мы также передаем аргументом
        this._ctx.lineWidth = width / 2
        // Указываем цвет обводки
        this._ctx.strokeStyle = color
        // Рисуем обводку (линию)
        this._ctx.stroke()

        // Завершем создание вектора
        this._ctx.closePath()
    }

    drawCircle(x: number, y: number, radius: number, options?: ICircleParams) {
        const { lineWidth, lineColor, fillColor, isStroke = true } = options;

        // beginPath() начинает вектор
        this._ctx.beginPath()
        // Создаем арку. Агругументами выступают координаты
        // центра окружности, радиус, начальный угол в радианах
        // и конечный угол в радианах.
        // Math.PI*2 это число Пи умноженное на 2, дает замкнутый круг. 
        this._ctx.arc(x, y, radius, 0, Math.PI * 2)
        // Указываем цвет заливки    
        
        
        // Если нам не нужна обводка, то аргументам мы передаем false,
        // а по умолчанию обводка есть
        if (isStroke) {
        
          // Указываем толщину линии
          this._ctx.lineWidth = lineWidth
          
          // Указываем цвет обводки
          this._ctx.strokeStyle = lineColor
          
          // Рисуем обводку
          this._ctx.stroke()
        }

        this._ctx.fillStyle = fillColor
        // Создаем заливку
        this._ctx.fill() 

        // Завершем создание вектора
        this._ctx.closePath()
    }

    show() {
        this._element.style.display='block';
    }

    hide() {
        this._element.style.display='none';
    }

    getElement() {
        return this._element;
    }

    clear() {
        this._ctx.clearRect(0, 0, this._element.width, this._element.height);
    }
}