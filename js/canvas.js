export class Canvas {
    constructor(node, settings) {      
      const { width, height } = settings;

      this.element = document.createElement('canvas')
      this.element.style.position='absolute';
      this.element.style.display='block';
      this.element.style.top=0;
      this.element.style.left=0;
      this.element.style.right=0;
      this.element.style.bottom=0;
      
      this.ctx = this.element.getContext('2d')
      this.element.width = width;
      this.element.height = height;

      node.style='position: relative';
      node.appendChild(this.element)
    }

    show() {
        this.element.style.display='block';
    }

    hide() {
        this.element.style.display='none';
    }
    
    drawText(text, x, y, options) {
        const { fontSize, color, align = "center", baseline = "middle" } = options;

        this.ctx.fillStyle = color
        this.ctx.font = `bold ${fontSize} monospace`
        this.ctx.textAlign = align
        this.ctx.textBaseline = baseline

        this.ctx.fillText(text, x, y)        
    }

    drawRectangle(x, y, width, height, options) {
        const { radius = 0, fillColor } = options
        // beginPath() начинает вектор
        this.ctx.beginPath()

        // Указываем координаты начальной точки линии
        this.ctx.moveTo(x + radius, y)
        // Указываем координаты следующей точки линии
        this.ctx.lineTo(x + width - radius, y)
        // Указываем координаты точки, до куда будет идти закругление
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
        // Указываем координаты следующей точки линии и т.д
        this.ctx.lineTo(x + width, y + height - radius)
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        this.ctx.lineTo(x + radius, y + height)
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        this.ctx.lineTo(x, y + radius)
        this.ctx.quadraticCurveTo(x, y, x + radius, y)

        this.ctx.fillStyle = fillColor
        this.ctx.fill()

        // Завершем создание вектора
        this.ctx.closePath()
    }

    drawCircle(x, y, radius, options) {
        const { lineWidth, lineColor, fillColor, isStroke = true } = options;

        // beginPath() начинает вектор
        this.ctx.beginPath()
        // Создаем арку. Агругументами выступают координаты
        // центра окружности, радиус, начальный угол в радианах
        // и конечный угол в радианах.
        // Math.PI*2 это число Пи умноженное на 2, дает замкнутый круг. 
        this.ctx.arc(x, y, radius, 0, Math.PI * 2)
        // Указываем цвет заливки    
        
        
        // Если нам не нужна обводка, то аргументам мы передаем false,
        // а по умолчанию обводка есть
        if (isStroke) {
        
          // Указываем толщину линии
          this.ctx.lineWidth = lineWidth
          
          // Указываем цвет обводки
          this.ctx.strokeStyle = lineColor
          
          // Рисуем обводку
          this.ctx.stroke()
        }

        this.ctx.fillStyle = fillColor
        // Создаем заливку
        this.ctx.fill() 

        // Завершем создание вектора
        this.ctx.closePath()
    }

    drawLine(xS, yS, xE, yE, options) {
        const { lineColor, lineWidth } = options;

        // Указываем, что линия будет с закруглениями на концах
        this.ctx.lineCap = 'round'
        // beginPath() начинает вектор

        this.ctx.beginPath() 
        // Аргументами указываем координаты начальной точки линии
        this.ctx.moveTo(xS, yS)
        // Аргументами  указываем координаты конечной точки линии
        this.ctx.lineTo(xE, yE)
        // Указываем толщину линии, ее мы также передаем аргументом
        this.ctx.lineWidth = lineWidth / 2
        // Указываем цвет обводки
        this.ctx.strokeStyle = lineColor
        // Рисуем обводку (линию)
        this.ctx.stroke()

        // Завершем создание вектора
        this.ctx.closePath()
    }

    drawArc(x, y, radius, sAngle, eAngle, options) {
        const { lineColor, lineWidth, lineCap = 'round' } = options;

        this.ctx.lineCap = lineCap
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, sAngle, eAngle)
        this.ctx.lineWidth = lineWidth
        this.ctx.strokeStyle = lineColor        
        this.ctx.stroke()
        this.ctx.closePath()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }
}