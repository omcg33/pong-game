import { System } from 'detect-collisions';

import { AbstractGameField } from "./abstracts/gameField";
import { AbstractGameInterface } from "./abstracts/gameInterface";
import { AbstractPlayer } from './abstracts/objects/player';
import { AbstractUsersInput } from './abstracts/userInput';
import { UsersKeyboardInput } from './inputs/keyboard';
import { IGame, IGameParams } from "./interfaces/game";

export class Game implements IGame {
    private _interface: AbstractGameInterface;
    private _field: AbstractGameField;
    private _usersInput: AbstractUsersInput;

    private _players: AbstractPlayer[];
    private _isLoopActive: boolean = true;

    constructor(params: IGameParams) {
        const { node, Interface, Canvas, Field, UserInput } = params
        const width = node.offsetWidth;
        const height = node.offsetHeight;

        const physics = new System();

        this._usersInput = new UserInput();
        this._interface = new Interface({ node, width, height, Canvas, zIndex: 100 });
        this._field = new Field({ node, width, height, physics, Canvas, zIndex: 50, inputsMap: this._usersInput.getMap() });

        // this._startNewGame();
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
        this._startNewGame();    
    }
    
    async _startNewGame() {
        this._field.show();
        this._field.renderBackground();

        const { players } = this._field.createObjects();
                
        this._players = players;
        
        this._isLoopActive = true;
        this._timeLoop()
    }


    private _timeLoop() {
        this._field.clear();
        this._processLogic();
        // this.checkCollisions();        
        this._field.render();
       
        if (this._isLoopActive) {
            requestAnimationFrame(() => this._timeLoop())
        }       
    }

    private _processLogic() {
        // this.ball.setPosition(
        //     this.ball.x + this.ball.dx * this.ball.speed,
        //     this.ball.y + this.ball.dy * this.ball.speed,
        // );

        const playersMovements = this._usersInput.get();
        
        this._players.forEach((player, index) => {
            const movements = playersMovements[index];

            if (!movements || movements.length === 0) return;

            movements.forEach(movement => {
                player.move(movement);
            })
            
        })
    }
} 