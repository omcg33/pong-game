import { timeout } from ".";
import { AbstractCanvas } from "../abstracts/canvas";
import { AbstractGameInterface } from "../abstracts/gameInterface";
import { IGameInterfaceParams, IGameInterfaceSettings } from "../interfaces/gameInterface";

export class GameInterface extends AbstractGameInterface {
    private _layers: Map<string, AbstractCanvas>;
    private _settings: IGameInterfaceSettings;

    constructor(params: IGameInterfaceParams) {
        super(params);

        const { node, width, height, Canvas, zIndex } = params;

        this._settings = {
            width,
            height,
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
                    main: '#fff'
                }
            }         
        }

        this._layers = new Map([
            ['hello', new Canvas(node, { width, height, zIndex })],
            ['start', new Canvas(node, { width, height, zIndex })],            
        ]);

        this._layers.forEach(layer => layer.hide())
    }

    show() {
        this._layers.forEach(layer => layer.show())
    }

    hide() {
        this._layers.forEach(layer => layer.hide())
    }

    async renderHelloScreen() {
        const { width, height, colors } = this._settings;
        const canvas = this._layers.get('hello');
        this._layers.forEach(layer => layer.hide())
        canvas.show();

        // Рисуем газон
        canvas.drawRectangle(0, 0, width, height, { radius: 0, fillColor: colors.background.main })     

        // Рисуем приветствие
        canvas.drawText('Pong\nGame', width / 2, height / 2, { size: '55px', color: colors.text.main })
        canvas.drawText('click to start', width / 2, height / 2 + 50, { size: '20px', color: colors.text.secondary })

        return new Promise<void>((resolve) => { 
            canvas.getElement().addEventListener('click', () => { 
                canvas.clear();
                canvas.hide();
                resolve();
            });           
        })
    } 

    async renderStartScreen() {
        const { width, height, colors } = this._settings;
        const canvas = this._layers.get('start');
        this._layers.forEach(layer => layer.hide())
        canvas.show();
        
        for(const text of ['3','2','1','GO']) {
            canvas.clear()
            canvas.drawText(text, width / 2, height / 2, { size: '75px', color: colors.text.main })
            await timeout(1000);  
        }

        canvas.clear()
        canvas.hide()
    }
} 