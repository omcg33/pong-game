import { RelativePoint } from "../../interfaces/common";
import { AbstractGameField } from "../../abstracts/gameField";
import { IGameFieldObjects, IGameFieldParams } from "../../interfaces/gameField";
import { IPlayerSettings, Player } from "./objects/player";
import { convertRelativePointToPoint } from "../../helpers";

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

export interface IGameFieldSettings {
    width: number;
    height: number;
    colors: Record<string, Record<string, string>>;
    inputsMap: string[][];
    briefing: {
        navigation: INavigationSettings[]
    },
    players: IGameFieldPlayerSettings[]
}

export class GameField extends AbstractGameField {   
    private _layers: Map<string, any>;
    private _settings: IGameFieldSettings;
    private _players: Player[];
    private _physics: any;
    private _objects: (Player)[];

    constructor(params: IGameFieldParams) {
        super(params);
        const { node, width, height, physics, zIndex, Canvas, inputsMap } = params;

        this._physics = physics;

        this._settings = {
            width,
            height,
            inputsMap,
            players: [
                {
                    start: { x: 0.05, y: 0.1 },
                    end: { x: 0.05, y: 0.9 },
                    size: 0.2,
                    speed: 5,
                    color: '#ff00e1',
                },
                {
                    start: { x: 0.95, y: 0.1 },
                    end: { x: 0.95, y: 0.9},
                    size: 0.2,
                    speed: 5,
                    color: '#00ff02'
                }
            ],
            briefing: {
                navigation: [
                    {
                        start: { x: 0.1, y: 0.5 },
                        color: '#ff00e1'
                    },
                    {
                        start: { x: 0.9, y: 0.5 } ,
                        color: '#00ff02'
                    }
                ]
            },
            colors: {
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
            }         
        }

        this._layers = new Map([
            ['background', new Canvas(node, { width, height, zIndex: zIndex - 10 })],
            ['score', new Canvas(node, { width, height, zIndex: zIndex + 10 })],
            ['main', new Canvas(node, { width, height, zIndex })],
            ['briefing', new Canvas(node, { width, height, zIndex: zIndex + 10 })],
        ])        
        
        this._layers.forEach(layer => layer.hide());
    }

    private _getPlayerParams(settings: IGameFieldPlayerSettings): Pick<IPlayerSettings, 'x' | 'y' | 'width' | 'height'> {
        const { width: fieldWidth, height: fieldHeight } = this._settings;
        const { start, end, size } = settings;
        
        const width = fieldHeight * size * 0.1;
        const height = fieldHeight * size;
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

    show() {
        this._layers.forEach(layer => layer.show())
    }

    hide() {
        this._layers.forEach(layer => layer.hide())
    }
    
    clear() {
        const canvas = this._layers.get('main').clear();
    }
    render() {
        this._objects.forEach(obj => obj.draw())
    }

    renderBackground(): void {
        const { width, height, colors, players } = this._settings;
        const canvas = this._layers.get('background');
        canvas.show();

        const lineWidth = 4;
        const fillColor = colors.background.main;
        const lineColor = colors.border.main;

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

    }

    renderBriefing(): void {
        const { width, height, briefing: { navigation }, inputsMap } = this._settings;
        const canvas = this._layers.get('briefing');
        canvas.clear();
        canvas.show();

        inputsMap.forEach((map, index) => {
            const { x, y } = convertRelativePointToPoint(navigation[index].start, width, height);
            const color = navigation[index].color;
            
            canvas.drawText('keys:', x , y - 10, { size: '20px', align: index === 0 ? 'left' : 'right', color })
            canvas.drawText(map.join(', '), x , y + 10, { size: '25px', align:  index === 0 ? 'left' : 'right', color })
        })
    }
    
    createObjects() {
        this._players = this._settings.players.map(settings => this._createPlayer(settings));
        
        this._objects = [
            ...this._players
        ]

        return {
            players: this._players
        }
    }

}