import { Ball } from './objects/ball.js';
import { Wall } from './objects/wall.js';
import { ScoreTrigger } from './objects/scoreTrigger.js';
import { Player } from './objects/player.js';
import { Canvas } from './canvas.js';
import { convertAngleToCoordinatesChanges, timeout } from './helpers.js';
import { DIRECTION } from './consts.js';

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
            size: 0.2,
            speed: 5,
            color: '#ff00e1',
        },
        {
            start: [0.95, 0.1],
            end: [0.95, 0.9],
            size: 0.2,
            speed: 5,
            color: '#00ff02'
        }
    ],
    disabledBallDirectionAreas: [
        [0, 0.6], [1.27, 1.87], [2.54, 3.74], [4.41, 5.01], [5.68, 6.28]
    ]
} 

export class GameField {
    constructor(node, settings) {
        this.settings = { ...SETTINGS, ...settings};
        this.objects = [];

        this.layers = new Map([
            ['background', new Canvas(node, this.settings)],
            ['score', new Canvas(node, this.settings)],
            ['main', new Canvas(node, this.settings)],
            ['briefing', new Canvas(node, this.settings)],
        ])        
    }

    getBallStartPosition(options) {
        const { width: fieldWidth, height: fieldHeight } = this.settings;

        return { 
            x: fieldWidth * options.x, 
            y: fieldHeight * options.y,
        }
    }

    getPlayerSizes(player) {
        const { size } = player;
        const { height: fieldHeight } = this.settings;

        return {
            width: fieldHeight * size * 0.1,
            height: fieldHeight * size
        }
    }

    getPlayerStartPosition(player) {
        const { start, end } = player;
        const { width: fieldWidth, height: fieldHeight } = this.settings;
        const { width, height } = this.getPlayerSizes(player);
        
        const middleYposition = (start[1] + (end[1] - start[1]) / 2) ;

        return {
            x: start[0] * fieldWidth - (width / 2),
            y: middleYposition * fieldHeight - (height / 2)
        }
    }

    createObjects() {
        const { width, height, ball: ballSettings, physics, debug, players: playersSettings } = this.settings;
        const canvas = this.layers.get('main');

        const ball = new Ball({ 
            x: -9999,
            y: -9999,
            dx: 0,
            dy: 0,
            speed: 0,
            color: ballSettings.color,           
            radius: ballSettings.radius,

            canvas,
            physics,
            debug,
        })

        const walls = [
            new Wall({
                x: 0,
                y: 0,
                width: width,
                height: 1,
                color: '#fff',
                canvas,
                physics,
                debug,
            }),
            new Wall({
                x: 0,
                y: height,
                width: width,
                height: 1,
                canvas,
                physics,
                debug,
            })
        ]

        const players = playersSettings.map(player => {
            const { color, speed } = player;            
            const { width, height } = this.getPlayerSizes(player);

            return new Player(
                {
                    x: -9999,
                    y: -9999,

                    width,
                    height,
                    color,
                    speed,

                    canvas,
                    physics,
                    debug,
                }
            )
        })

        const scoreTriggers = [
            new ScoreTrigger(
               players[0],
                {
                    x: 0 - ball.radius * 2,
                    y: 0,
                    width: 1,
                    height: height,                
                    canvas,
                    physics,
                    debug,
                }
            ),
            new ScoreTrigger(
                players[1],
                {
                    x: width + ball.radius * 2,
                    y: 0,
                    width: 1,
                    height,                                
                    canvas,
                    physics,
                    debug,
                }
            )
        ]

        this.ball = ball;
        this.players = players;
        this.objects = [...this.objects, ...players, ...walls, ...scoreTriggers, ball];

        return {           
            ball,
            players,
            scoreTriggers       
        }
    }

    setObjectsStartParameters() {
        const { ball: ballSettings, players: playersSettings } = this.settings;
        const ballCoordinatesDimensions = convertAngleToCoordinatesChanges(this.getBallDirection());
        const ballPosition = this.getBallStartPosition(ballSettings)

        this.ball.setLastTouchedPlayer(undefined);

        this.ball.setPosition(
            ballPosition.x, 
            ballPosition.y,
        )
        this.ball.setDirection(
            ballCoordinatesDimensions.dx,
            ballCoordinatesDimensions.dy
        )
        this.ball.setSpeed(
            ballSettings.speed,
        )

        this.players.map((player, index) => {
            const settings = playersSettings[index];
            const position = this.getPlayerStartPosition(settings)

            player.setPosition(position.x, position.y)
        })
    }

    getPlayersAreas() {
        const { width, height, players } = this.settings;

        return players.map(player => {
            return {
                start: [width * player['start'][0], height * player['start'][1]],
                end: [width * player['end'][0], height * player['end'][1]],
            }
        })
    }

    getBallDirection() {
        const radians =  Math.random() * (6.3 - 0) + 0;

        const disabledAreas = this.settings.disabledBallDirectionAreas;

        if (disabledAreas.some((area) => radians >= area[0] && radians <= area[1])) {
            return this.getBallDirection()
        }
        
        return radians;
    }

    canPlayerMove(player, movement) {
        const index = this.players.indexOf(player);
        const area = this.getPlayersAreas()[index];
        const yStart = player.y;
        const yEnd = player.y + player.height;

        const areaYStart = area.start[1];
        const areaYEnd = area.end[1];

        switch (movement) {
            case DIRECTION.FORWARD:
                return yStart > areaYStart
            case DIRECTION.BACKWARD:
                return yEnd < areaYEnd           
        }
    }

    renderBackground() {
        const { width, height, lineColor, lineWidth, backgroundColor, players, borderRadius, disabledBallDirectionAreas, debug } = this.settings;

        const canvas = this.layers.get('background');

        // Рисуем газон
        canvas.drawRectangle(0, 0, width, height, { radius: borderRadius, fillColor: backgroundColor })       
        // Рисуем вертикальную линию посередине
        canvas.drawLine((width / 2), 0, (width / 2), height, { lineColor, lineWidth })
        // Рисуем круг посередине, с радиусом в 1/4 высоты поля        
        canvas.drawCircle((width / 2), (height / 2), (height / 4), { fillColor: backgroundColor, lineWidth: lineWidth, lineColor }) 
 
        // Рисуем линии для игроков
        players.forEach(player => {
            canvas.drawLine(
                width*player['start'][0],  height*player['start'][1],
                width*player['end'][0], height*player['end'][1],
                { lineColor, lineWidth }
            )
        })

        if (debug) {
            const length = 400;
            
            disabledBallDirectionAreas.forEach(area => {            
                const min = area[0];
                const max = area[1];

                for (let i = min; i <= max; i+=0.01) {
                    canvas.drawLine( width / 2, height / 2, width / 2 + length * Math.sin(i),  height / 2 + length * Math.cos(i), { lineColor, lineWidth: 1 })
                }
            })
        }
    }

    renderScore(score) {
        const { width, score: scoreSettings, players } = this.settings;
        const canvas = this.layers.get('score');
        const scoreWidth = width*(scoreSettings['end'][0] - scoreSettings['start'][0]);
        // const scoreHeight = height*(scoreSettings['end'][1] - scoreSettings['start'][1]);
        const scoreLength = score.length;

        canvas.clear();
        canvas.show();
        
        score.forEach((value, index) => {
            const color = players[index]['color']
            
            canvas.drawText(
                value,
                width*scoreSettings['start'][0] + index *((index+1) / scoreLength) * scoreWidth - scoreSettings.fontSize / 8,
                width*scoreSettings['start'][1],
                { fontSize: scoreSettings.fontSize + 'px', color }
            )
        })
    }
    
    renderInitialScreen() {       
        const { width, height } = this.settings;
        const canvas = this.layers.get('briefing');
        
        canvas.clear()
        canvas.show()

        return new Promise((resolve) => {
            let alpha = 1;
            let direction = -1;

            const textTimerId = setInterval(() => {
                if (alpha < 0.2) { alpha = 0.2; direction = 1 }
                if (alpha > 1) { alpha = 1; direction = -1 }
                alpha = alpha + direction * 0.1
                canvas.clear()
    
                canvas.drawText(
                    'START',
                    width / 2 , 
                    height / 2 , 
                    { 
                        fontSize: '45px', 
                        align: 'center', 
                        color: `rgba(255, 255, 255, ${alpha})`
                    }
                )
                
            }, 100);

            canvas.element.addEventListener('click', () => {
                clearTimeout(textTimerId);
                canvas.clear();
                canvas.hide();
                resolve();
            }, false);
        })
    }

    async renderBriefing() {
        const { width, height, lineColorActive, lineWidth, briefing: { navigation } } = this.settings;
        const canvas = this.layers.get('briefing');
        canvas.clear()
        canvas.show()

        let angle = 0;

        const xF = width * navigation[0]['start']['0'];
        const yF = height * navigation[0]['start']['1'];
        const colorF = navigation[0]['color'];

        const xS = width * navigation[1]['start']['0'];
        const yS = height * navigation[1]['start']['1'];
        const colorS = navigation[1]['color'];

        const circleTimerId = setInterval(() => {
            angle = angle + 0.08
            if (angle > 2) angle = 0;
            canvas.clear()

            canvas.drawText('keys:', xF , yF - 10, { fontSize: '15px', align: 'left', color: colorF })
            canvas.drawText('W and S', xF , yF + 10, { fontSize: '15px', align: 'left', color: colorF })
    
            canvas.drawText('keys:', xS , yS - 10, { fontSize: '15px', align: 'right', color: colorS })
            canvas.drawText('↑ and ↓', xS , yS + 10, { fontSize: '15px', align: 'right', color: colorS })
    
            canvas.drawArc(width / 2, height / 2, (height / 4), Math.PI * angle - 0.3, Math.PI * angle + 0.3, { lineColor: lineColorActive, lineWidth })
        }, 100)
        
        
        await timeout(3000);

        canvas.clear()
        clearTimeout(circleTimerId)
        canvas.drawText('GO', width / 2 , height / 2, { fontSize: '55px', align: 'center', color: '#fff' })

        await timeout(2000);

        canvas.hide();
        canvas.clear();        
    }

    async renderThrowNewBallScreen() {
        const { width, height } = this.settings;
        const canvas = this.layers.get('briefing');

        canvas.clear()
        canvas.show()

        canvas.drawText(
            'AGAIN',
            width / 2 , 
            height / 2 , 
            { 
                fontSize: '45px', 
                align: 'center', 
                color: '#fff'
            }
        )

        await timeout(2000);

        canvas.clear()
        canvas.hide()
    }

    async renderGoalScreen() {
        const { width, height } = this.settings;
        const canvas = this.layers.get('briefing');

        canvas.clear()
        canvas.show()

        canvas.drawText(
            '!!!GOAL!!!',
            width / 2 , 
            height / 2 , 
            { 
                fontSize: '45px', 
                align: 'center', 
                color: '#fff'
            }
        )

        await timeout(2000);

        canvas.clear()
        canvas.hide()
    }

    renderGameLayout() {
        this.objects.forEach(obj => obj.draw())
    }

    clearGameLayout() {
        this.clearLayer('main')
    }

    clearLayer(name) {
        this.layers.get(name).clear()    
    }
}