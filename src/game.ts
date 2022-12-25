import { AbstractGameField } from "./abstracts/gameField";
import { AbstractGameInterface } from "./abstracts/gameInterface";
import { IGame, IGameParams } from "./interfaces/game";

export class Game implements IGame {
    private _interface: AbstractGameInterface;
    private _field: AbstractGameField;

    constructor(params: IGameParams) {
        const { node, Interface, Canvas, Field } = params
        const width = node.offsetWidth;
        const height = node.offsetHeight;

        this._interface = new Interface({ node, width, height, Canvas, zIndex: 100 });
        this._field = new Field({ node, width, height, Canvas, zIndex: 50 });

        this._init();
    }

    async _init() {
        this._interface.show();
        await this._interface.renderHelloScreen();
        this._field.renderBackground();
        await this._interface.renderStartScreen();
        this._interface.hide();
    }
    
} 