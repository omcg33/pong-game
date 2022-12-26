import { System } from 'detect-collisions';

import { AbstractGameField } from "./abstracts/gameField";
import { AbstractGameInterface } from "./abstracts/gameInterface";
import { AbstractUsersInput } from './abstracts/userInput';
import { IGame, IGameParams } from "./interfaces/game";

export class Game implements IGame {
    private _interface: AbstractGameInterface;
    private _field: AbstractGameField;
    private _usersInput: AbstractUsersInput;

    constructor(params: IGameParams) {
        const { node, Interface, Canvas, Field, UserInput } = params
        const width = node.offsetWidth;
        const height = node.offsetHeight;

        const physics = new System();

        this._usersInput = new UserInput();
        this._interface = new Interface({ node, width, height, Canvas, zIndex: 100 });
        this._field = new Field({ node, width, height, physics, Canvas, zIndex: 50, inputsMap: this._usersInput.getMap() });

        this._init();
    }

    async _init() {
        this._interface.show();
        await this._interface.renderHelloScreen();
        this._field.renderBackground();
        this._field.renderBriefing();
        await this._interface.renderStartScreen();
        this._interface.hide();
        this._field.hide();
        // this._startNewGame();    
    }
    
    async _startNewGame() {
        this._field.show();
        this._field.renderBackground();
        

        // const { ball, players, scoreTriggers } = this._field.createObjects();
    }
} 