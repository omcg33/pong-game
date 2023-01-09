import { Radians, RelativePoint } from "../../interfaces/common";
import { AbstractGameField } from "../../abstracts/gameField";
import { IGameFieldParams } from "../../interfaces/gameField";
import { IPlayerSettings, Player } from "./objects/player";
import { convertAngleToCoordinatesChanges, convertRelativePointToPoint, timeout } from "../../helpers";
import { Ball } from "./objects/ball";
import { Wall } from "./objects/wall";
import { ScoreTrigger } from "./objects/scoreTrigger";
import { IBall } from "src/interfaces/objects/ball";

interface INavigationSettings {
    start: RelativePoint;
    color: string;
}

interface IGameFieldPlayerSettings {
    start: RelativePoint;
    end: RelativePoint;
    size: number;
    speed: number;
    color: string;
}

const COLORS = {
    background: {
        main: '#333',
        secondary: '#999',
    },
    text: {
        main: '#fff',
        secondary: '#666'
    },
    border: {
        main: '#666',
        secondary: '#232323'
    },
    players: [
        {
            main: '#ff00e1'
        },
        {
            main: '#00ff02'
        },
        {
            main: 'yellow'
        },
        {
            main: 'blue'
        }
    ],
    ball: {
        fill: 'red'
    }  
};

export interface IGameFieldSettings {
    width: number;
    height: number;   
    inputsMap: string[][];
    score: {
        start: RelativePoint;
        end: RelativePoint;    
        fontSize: number;
    },
    briefing: {
        navigation: INavigationSettings[]
    };
    players: IGameFieldPlayerSettings[];
    ball: {
        radius: number;
        speed: number;
    },
    disabledBallDirectionAreas: Radians[][]
}

export class GameFieldFour extends AbstractGameField {   
    private _layers: Map<string, any>;
    private _settings: IGameFieldSettings;

    private _ball: Ball;
    private _players: Player[];

    private _physics: any;
    private _objects: (Player | Ball | Wall)[];

    constructor(params: IGameFieldParams) {
        super(params);
        const { node, width, height, physics, zIndex, Canvas, inputsMap } = params;

        this._physics = physics;

        this._settings = {
            width,
            height,
            inputsMap,
            score: {
                start: { x: 0.05, y: 0.05 },
                end: { x: 0.45, y: 0.05 },
                fontSize: 40,
            },
            players: [
                {
                    start: { x: 0.05, y: 0.1 },
                    end: { x: 0.05, y: 0.9 },
                    size: 0.2,
                    speed: 5,
                    color: COLORS.players[0].main
                },
                {
                    start: { x: 0.95, y: 0.1 },
                    end: { x: 0.95, y: 0.9},
                    size: 0.2,
                    speed: 5,
                    color: COLORS.players[1].main
                },
                {
                    start: { x: 0.1, y: 0.1 },
                    end: { x: 0.9, y: 0.1 },
                    size: 0.2,
                    speed: 5,
                    color: COLORS.players[2].main
                },
                {
                    start: { x: 0.1, y: 0.9 },
                    end: { x: 0.9, y: 0.9},
                    size: 0.2,
                    speed: 5,
                    color: COLORS.players[3].main
                }
            ],
            briefing: {
                navigation: [
                    {
                        start: { x: 0.1, y: 0.5 },
                        color: COLORS.players[0].main
                    },
                    {
                        start: { x: 0.9, y: 0.5 } ,
                        color: COLORS.players[1].main
                    },
                    {
                        start: { x: 0.5, y: 0.1 },
                        color: COLORS.players[2].main
                    },
                    {
                        start: { x: 0.5, y: 0.9 } ,
                        color: COLORS.players[3].main
                    }
                ]
            },
            ball: {
                radius: 0.015,
                speed: 0.01
            },
            disabledBallDirectionAreas: [
                [0, 0.4], [1.27, 1.87], [2.74, 3.54], [4.41, 5.01], [5.88, 6.28]
            ]
        }

        this._layers = new Map([
            ['background', new Canvas(node, { width, height, zIndex: zIndex - 10 })],            
            ['main', new Canvas(node, { width, height, zIndex })],
            ['score', new Canvas(node, { width, height, zIndex: zIndex + 10 })],
            ['information', new Canvas(node, { width, height, zIndex: zIndex + 20 })],
        ])        
        
        this._layers.forEach(layer => layer.hide());
    }

    private _getPlayerParams(settings: IGameFieldPlayerSettings): Pick<IPlayerSettings, 'x' | 'y' | 'width' | 'height'> {
        const { width: fieldWidth, height: fieldHeight } = this._settings;
        const { start, end, size } = settings;
        
        const isVertical = start.y === end.y;
        const width = isVertical ? fieldHeight * size * 0.1 : fieldHeight * size ;
        const height = isVertical ? fieldHeight * size : ;
        const middleYposition = (start.y + (end.y - start.y) / 2) ;

        return {
            x: start.x * fieldWidth - (width / 2),
            y: middleYposition * fieldHeight - (height / 2),

            width,
            height,
        }
    }

    private _getPlayerAvailableArea(settings: IGameFieldPlayerSettings) {
        const { width, height } = this._settings;

        return {
            start: convertRelativePointToPoint(settings.start, width, height),
            end: convertRelativePointToPoint(settings.end, width, height),
        }
    }

    private _createPlayer(settings: IGameFieldPlayerSettings): Player {
        const { color, speed } = settings;
          
        const { width, height, x, y } = this._getPlayerParams(settings);
        const availableArea = this._getPlayerAvailableArea(settings);

        return new Player({
            x,
            y,
            width,
            height,

            color,
            speed,

            physics: this._physics,
            canvas: this._layers.get('main'),
            availableArea,
        })
    }

    private _createWalls() {
        const { width, height } = this._settings;

        return [
            new Wall({
                x: 0,
                y: 0,
                width: width,
                height: 1,
                color: 'rgba(0,0,0,0)',
                physics: this._physics,
                canvas: this._layers.get('main'),
            }),
            new Wall({
                x: 0,
                y: height,
                width: width,
                height: 1,
                color: 'rgba(0,0,0,0)',
                physics: this._physics,
                canvas: this._layers.get('main'),
            })
        ]
    }

    private _createScoreTriggers(players: Player[], ballRadius: number ) {
        const { width, height } = this._settings;

        return [
            new ScoreTrigger(
                players[0],
                {
                    x: 0 - ballRadius * 2,
                    y: 0,
                    width: 1,
                    height: height,                
                    color: 'rgba(0,0,0,0)',
                    physics: this._physics,
                    canvas: this._layers.get('main'),
                }
             ),
             new ScoreTrigger(
                players[1],
                {
                    x: width + ballRadius * 2,
                    y: 0,
                    width: 1,
                    height,                                
                    color: 'rgba(0,0,0,0)',
                    physics: this._physics,
                    canvas: this._layers.get('main'),
                }
             )
        ]
    }

    private _getBallDirection() {
        const radians =  Math.random() * (6.3 - 0) + 0;

        const disabledAreas = this._settings.disabledBallDirectionAreas;

        if (disabledAreas.some((area) => radians >= area[0] && radians <= area[1])) {
            return this._getBallDirection()
        }
        
        return radians;
    }

    show() {
        this._layers.forEach(layer => layer.show())
    }

    hide() {
        this._layers.forEach(layer => layer.hide())
    }
    
    clear() {
        this._layers.get('main').clear();
    }

    render() {
        this._objects.forEach(obj => obj.draw())
    }

    renderBackground() {
        const { width, height, players, disabledBallDirectionAreas } = this._settings;
        const canvas = this._layers.get('background');
        canvas.show();

        const lineWidth = 4;
        const fillColor = COLORS.background.main;
        const lineColor = COLORS.border.main;

        // Рисуем газон
        canvas.drawRectangle(0, 0, width, height, { radius: 20, fillColor })       
        // Рисуем вертикальную линию посередине
        canvas.drawLine((width / 2), 0, (width / 2), height, { color: lineColor, width: lineWidth })
        // Рисуем круг посередине, с радиусом в 1/4 высоты поля        
        canvas.drawCircle((width / 2), (height / 2), (height / 4), { fillColor, lineWidth, lineColor }) 
 
        // Рисуем линии для игроков
        players.forEach(player => {
            const startPoint = convertRelativePointToPoint(player.start, width, height);
            const endPoint = convertRelativePointToPoint(player.end, width, height);

            canvas.drawLine(
                startPoint.x, startPoint.y,
                endPoint.x, endPoint.y,
                { color: lineColor, width: lineWidth }
            )
        })

        const length = 400;
            
        disabledBallDirectionAreas.forEach(area => {            
            const min = area[0];
            const max = area[1];

            for (let i = min; i <= max; i+=0.01) {
                canvas.drawLine( width / 2, height / 2, width / 2 + length * Math.sin(i),  height / 2 + length * Math.cos(i), { lineColor, lineWidth: 1 })
            }
        })

    }

    renderScore(score) {
        const { width, height, score: scoreSettings, players } = this._settings;
        const canvas = this._layers.get('score');
        const startPoint = convertRelativePointToPoint(scoreSettings.start, width, height)
        const endPoint = convertRelativePointToPoint(scoreSettings.end, width, height)
        const scoreWidth = endPoint.x - startPoint.x;
        const scoreLength = score.length;

        canvas.clear();
        canvas.show();
        
        score.forEach((value, index) => {
            const color = players[index]['color']
           
            canvas.drawText(
                value,
                startPoint.x + (index / scoreLength) * scoreWidth + scoreSettings.fontSize / 2,
                startPoint.y,
                { size: scoreSettings.fontSize + 'px', color }
            )
        })
    }

    renderBriefing() {
        const { width, height, briefing: { navigation }, inputsMap } = this._settings;
        const canvas = this._layers.get('information');
        canvas.clear();
        canvas.show();

        inputsMap.forEach((map, index) => {
            const { x, y } = convertRelativePointToPoint(navigation[index].start, width, height);
            const color = navigation[index].color;
            
            canvas.drawText('keys:', x , y - 10, { size: '20px', align: index === 0 ? 'left' : 'right', color })
            canvas.drawText(map.join(', '), x , y + 10, { size: '25px', align:  index === 0 ? 'left' : 'right', color })
        })
    }

    async renderThrowNewBallScreen() {
        const { width, height } = this._settings;
        const canvas = this._layers.get('information');
        canvas.clear()
        canvas.show()

        canvas.drawText(
            'AGAIN',
            width / 2 , 
            height / 2 , 
            { 
                size: '45px', 
                align: 'center', 
                color: '#fff'
            }
        )

        await timeout(2000);

        canvas.clear()
        canvas.hide()
    }
    
    async renderGoalScreen() {
        const { width, height } = this._settings;
        const canvas = this._layers.get('information');

        canvas.clear()
        canvas.show()

        canvas.drawText(
            '!!!GOAL!!!',
            width / 2 , 
            height / 2 , 
            { 
                size: '45px', 
                align: 'center', 
                color: '#fff'
            }
        )

        await timeout(2000);

        canvas.clear()
        canvas.hide()
    }

    clearBackground() {
        this._layers.get('background').clear();
    }
    
    clearBriefing() {
        this._layers.get('information').clear();
    }
    
    throwBall(ball: IBall, speed) {
        const { width, height, ball: { speed: speedDefault } } = this._settings;
        const ballCoordinatesDimensions = convertAngleToCoordinatesChanges(this._getBallDirection());        

        ball.setPosition({
            x: width / 2 ,
            y: height / 2,
        });
        ball.setDirection(
            ballCoordinatesDimensions.dx,
            ballCoordinatesDimensions.dy
        )
        ball.setSpeed(
            speed ?? Math.round(width * speedDefault)
        )
    }

    createObjects() {
        const { width, height, ball } = this._settings;
        const ballRadius = Math.round(width * ball.radius);

        this._ball = new Ball({
            x: width / 2 ,
            y: height / 2,
            dx: 0,
            dy: 0,
            speed: 0,
            color: COLORS.ball.fill,
            radius: ballRadius,

            physics: this._physics,
            canvas: this._layers.get('main'),           
        });
        
        this._players = this._settings.players.map(settings => this._createPlayer(settings));
        
        const triggers = this._createScoreTriggers(this._players, ballRadius );
        const walls = this._createWalls();
        
        this._objects = [
            ...this._players,
            ...walls,
            ...triggers,
            this._ball
        ]

        return {
            players: this._players,
            ball: this._ball,
            triggers,
        }
    }
}