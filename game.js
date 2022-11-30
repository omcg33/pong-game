class Ball {
    constructor(settings) {
        const { x, y, dx, dy, radius, color, speed, canvas } = settings;

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.speed = speed;

        this.canvas = canvas;
    }

    move() {
        this.x += (this.dx * this.speed);
        this.y += (this.dy * this.speed);
    }
        
    update() {        
        this.move();
        this.draw();
    }
    
    draw() {
        this.canvas.drawCircle(
            this.x, 
            this.y, 
            this.radius, 
            { 
                isStroke: false, 
                fillColor: this.color
            }
        );
    }
}

class Canvas {
    constructor(node, settings) {      
      const { width, height } = settings;

      this.element = document.createElement('canvas');
      this.element.style.position='absolute';
      this.element.style.display='block';
      this.element.style.top=0;
      this.element.style.left=0;
      this.element.style.right=0;
      this.element.style.bottom=0;
      
      this.ctx = this.element.getContext('2d');
      this.element.width = width;
      this.element.height = height;

      node.style='position: relative';
      node.appendChild(this.element);
    }

    show() {
        this.element.style.display='block';
    }

    hide() {
        this.element.style.display='none';
    }
    
    drawText(text, x, y, options) {
        const { fontSize, color, align = "center", baseline = "middle" } = options;

        this.ctx.fillStyle = color;
        this.ctx.font = `bold ${fontSize} monospace`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;

        this.ctx.fillText(text, x, y);        
    }

    drawRectangleRound(x, y, width, height, radius, fillColor) {
        // beginPath() начинает вектор
        this.ctx.beginPath();

        // Указываем координаты начальной точки линии
        this.ctx.moveTo(x + radius, y);
        // Указываем координаты следующей точки линии
        this.ctx.lineTo(x + width - radius, y);
        // Указываем координаты точки, до куда будет идти закругление
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        // Указываем координаты следующей точки линии и т.д
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);

        // Завершем создание вектора
        this.ctx.closePath();
        
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
    }

    drawCircle(x, y, radius, options) {
        const { lineWidth, lineColor, fillColor, isStroke = true } = options;

        // beginPath() начинает вектор
        this.ctx.beginPath();
        // Создаем арку. Агругументами выступают координаты
        // центра окружности, радиус, начальный угол в радианах
        // и конечный угол в радианах.
        // Math.PI*2 это число Пи умноженное на 2, дает замкнутый круг. 
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        // Указываем цвет заливки    
        this.ctx.fillStyle = fillColor;
        
        // Если нам не нужна обводка, то аргументам мы передаем false,
        // а по умолчанию обводка есть
        if (isStroke) {
        
          // Указываем толщину линии
          this.ctx.lineWidth = lineWidth;
          
          // Указываем цвет обводки
          this.ctx.strokeStyle = lineColor;
          
          // Рисуем обводку
          this.ctx.stroke();
        }

        // Создаем заливку
        this.ctx.fill(); 

        // Завершем создание вектора
        this.ctx.closePath();
    }

    drawLine(xS, yS, xE, yE, options) {
        const { lineColor, lineWidth } = options;

        // Указываем, что линия будет с закруглениями на концах
        this.ctx.lineCap = 'round';
        // beginPath() начинает вектор

        this.ctx.beginPath(); 
        // Аргументами указываем координаты начальной точки линии
        this.ctx.moveTo(xS, yS);
        // Аргументами  указываем координаты конечной точки линии
        this.ctx.lineTo(xE, yE);
        // Указываем толщину линии, ее мы также передаем аргументом
        this.ctx.lineWidth = lineWidth / 2;
        // Указываем цвет обводки
        this.ctx.strokeStyle = lineColor;
        // Рисуем обводку (линию)
        this.ctx.stroke();

        // Завершем создание вектора
        this.ctx.closePath();
    }

    drawArc(x, y, radius, sAngle, eAngle, options) {
        const { lineColor, lineWidth, lineCap = 'round' } = options;

        this.ctx.lineCap = lineCap;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, sAngle, eAngle);
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = lineColor;        
        this.ctx.stroke();
        this.ctx.closePath();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const SETTINGS = {
    borderRadius: 20,
    backgroundColor: '#333',
    lineColor: '#232323',
    lineWidth: 6,
    lineColorActive: '#666',
    score: {
        start: [0.4, 0.05],
        end: [0.6, 0.05],
        fontSize: 40,
    },
    briefing: {
        navigation: [
            {
                start: [0.1, 0.5],                
                color: '#ff00e1',
            },
            {
                start: [0.9, 0.5],                
                color: '#00ff02'
            }
        ]
    },
    ball: {
        x: 0.5,
        y: 0.5,
        speed: 5,
        radius: 10,
        color: '#fff'
    },
    players: [
        {
            start: [0.05, 0.1],
            end: [0.05, 0.9],
            color: '#ff00e1',
        },
        {
            start: [0.95, 0.1],
            end: [0.95, 0.9],
            color: '#00ff02'
        }
    ]   
};

class GameField {
    constructor(node, settings) {
        this.settings = { ...SETTINGS, ...settings};
        
        this.layers = new Map([
            ['background', new Canvas(node, this.settings)],
            ['score', new Canvas(node, this.settings)],
            ['main', new Canvas(node, this.settings)],
            ['briefing', new Canvas(node, this.settings)],
        ]);

        this.render();
    }

    getPlayersAreas() {
        const { width, height } = this.settings;

        return this.settings.players.map(player => {
            return {
                start: [width * player['start'][0], width * player['start'][1]],
                end: [height * player['end'][0], height * player['end'][1]],
            }
        })
    }

    render() {
        this.renderBackground();
        this.renderLines();             
    }

    renderBackground() {
        const { width, height, borderRadius, backgroundColor } = this.settings;

        const canvas = this.layers.get('background');

        canvas.drawRectangleRound(0, 0, width, height, borderRadius, backgroundColor);
    }

    renderLines() {
        const { width, height, lineColor, lineWidth, backgroundColor, players } = this.settings;
        const canvas = this.layers.get('background');
        
        players.forEach(player => {
            // Рисуем линии для игроков
            canvas.drawLine(
                width*player['start'][0],  height*player['start'][1],
                width*player['end'][0], height*player['end'][1],
                { lineColor, lineWidth }
            );
        });

        // Рисуем вертикальную линию посередине
        canvas.drawLine((width / 2), 0, (width / 2), height, { lineColor, lineWidth });
        // Рисуем круг посередине, с радиусом в 1/4 высоты поля        
        canvas.drawCircle((width / 2), (height / 2), (height / 4), { fillColor: backgroundColor, lineWidth: lineWidth }); 
    }

    renderScore(score) {
        const { width, score: scoreSettings, players } = this.settings;
        const canvas = this.layers.get('score');
        const scoreWidth = width*(scoreSettings['end'][0] - scoreSettings['start'][0]);
        // const scoreHeight = height*(scoreSettings['end'][1] - scoreSettings['start'][1]);
        const scoreLength = score.length;

        
        score.forEach((value, index) => {
            const color = players[index]['color'];
            
            canvas.drawText(
                value,
                width*scoreSettings['start'][0] + index *((index+1) / scoreLength) * scoreWidth - scoreSettings.fontSize / 8,
                width*scoreSettings['start'][1],
                { fontSize: scoreSettings.fontSize + 'px', color }
            );
        });
    }

    renderPlayer(xS, yS, xE, yE, options) {
        const canvas = this.layers.get('game');

        canvas.drawLine(xS, yS, xE, yE, options);        
    }
    
    renderInitialScreen(options) {
        const { onStartClick = () => {} } = options;
        const { width, height } = this.settings;
        const canvas = this.layers.get('briefing');
        
        canvas.clear();
        canvas.show();

        let alpha = 1;
        let direction = -1;

        canvas.element.addEventListener('click', onStartClick, false);
        const textTimerId = setInterval(() => {
            if (alpha < 0.2) { alpha = 0.2; direction = 1; }
            if (alpha > 1) { alpha = 1; direction = -1; }
            alpha = alpha + direction * 0.1;
            canvas.clear();

            canvas.drawText(
                'START',
                width / 2 , 
                height / 2 , 
                { 
                    fontSize: '45px', 
                    align: 'center', 
                    color: `rgba(255, 255, 255, ${alpha})`
                }
            );
            
        }, 100);
        
        return () => {
            canvas.clear();
            canvas.hide();
            clearTimeout(textTimerId);
            canvas.element.removeEventListener('click', onStartClick, false);
        }
    }

    async renderBriefing() {
        const { width, height, lineColorActive, lineWidth, briefing: { navigation } } = this.settings;
        const canvas = this.layers.get('briefing');
        canvas.clear();
        canvas.show();

        let angle = 0;

        const xF = width * navigation[0]['start']['0'];
        const yF = height * navigation[0]['start']['1'];
        const colorF = navigation[0]['color'];

        const xS = width * navigation[1]['start']['0'];
        const yS = height * navigation[1]['start']['1'];
        const colorS = navigation[1]['color'];

        const circleTimerId = setInterval(() => {
            angle = angle + 0.08;
            if (angle > 2) angle = 0;
            canvas.clear();

            canvas.drawText('keys:', xF , yF - 10, { fontSize: '15px', align: 'left', color: colorF });
            canvas.drawText('W and S', xF , yF + 10, { fontSize: '15px', align: 'left', color: colorF });
    
            canvas.drawText('keys:', xS , yS - 10, { fontSize: '15px', align: 'right', color: colorS });
            canvas.drawText('↑ and ↓', xS , yS + 10, { fontSize: '15px', align: 'right', color: colorS });
    
            canvas.drawArc(width / 2, height / 2, (height / 4), Math.PI * angle - 0.3, Math.PI * angle + 0.3, { lineColor: lineColorActive, lineWidth });
        }, 100);
        
        
        await timeout(1000);

        canvas.clear();
        clearTimeout(circleTimerId);
        canvas.drawText('GO', width / 2 , height / 2, { fontSize: '55px', align: 'center', color: '#fff' });

        await timeout(2000);

        return () => {
            canvas.hide();
            canvas.clear();            
        }
    }

    renderGame(settings) {
        const { ball: ballSettings } = settings;
        const { width, height, ball: ballDefaultSettings } = this.settings;
        const canvas = this.layers.get('main');

        canvas.clear();
        canvas.show();

        const ball = new Ball({ 
            x: width * ballDefaultSettings.x, 
            y: height * ballDefaultSettings.y,
            dx: ballSettings.dx, 
            dy: ballSettings.dy, 
            speed: ballDefaultSettings.speed,
            color: ballDefaultSettings.color,
            radius: ballDefaultSettings.radius,
            canvas
        });

        return {           
            ball
        }
    }

    clearGame() {
        this.clearLayer('main');
    }

    clearLayer(name) {
        this.layers.get(name).clear();    
    }
}

class Settings {
    constructor() {
        this.gameField = {
            width: 800,
            height: 600            
        };
    }
}

class Game {
    constructor(selector) {
        this.node = document.querySelector(selector);

        if (!this.node) {
            throw new Error(`Game node ${selector} does not found`)
        }

        this.clearFunctions = [];
        this.settings = new Settings();
        this.field = new GameField(this.node, this.settings.gameField);

        this.collisionObjects = [];
        this.init();    

    }

    init() {
        this.clear();
        this.start();
        // this.field.renderBackground();
        // this.field.renderLines();

        // const clearInitialScreen = this.field.renderInitialScreen({
        //     onStartClick: () => this.start()
        // });

        // this.clearFunctions = [
        //     ...this.clearFunctions,
        //     clearInitialScreen
        // ]
    }

    getRandomDirection() {
        const value = Math.random() * (1 - -1 + 1) + -1;
        return value === 0 ? this.getRandomDirection() : value
    }

    async start() {
        this.clear();
        // const clearBriefingScreen = await this.field.renderBriefing()
        // clearBriefingScreen();
        
        const { ball } = this.field.renderGame({
            ball: {
                dx: this.getRandomDirection(),
                dy: this.getRandomDirection(),                
            }
        });

        this.collisionObjects = [ ball ];
        this.ball = ball;   
        
        this.isLoopActive = true;
        this.timeLoop();
    }


    checkCollision() {

    }

    timeLoop() {
        this.field.clearGame();
        this.ball.update();

        if (this.isLoopActive) {
            requestAnimationFrame(() => this.timeLoop());
        }
       
    }

    clear() {
        this.clearFunctions.map(func => func());
    }   
}

export { Game };
