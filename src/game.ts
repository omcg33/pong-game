import { System } from 'detect-collisions';

import { AbstractGameField } from "./abstracts/gameField";
import { AbstractGameInterface } from "./abstracts/gameInterface";
import { AbstractBall } from './abstracts/objects/ball';
import { AbstractPlayer } from './abstracts/objects/player';
import { AbstractScoreTrigger } from './abstracts/objects/scoreTrigger';
import { AbstractUsersInput } from './abstracts/userInput';
import { IGame, IGameParams } from "./interfaces/game";

export class Game implements IGame {
    private _interface: AbstractGameInterface;
    private _field: AbstractGameField;
    private _usersInput: AbstractUsersInput;
    private _physics: any;

    private _ball: AbstractBall;
    private _players: AbstractPlayer[];
    private _triggers: AbstractScoreTrigger[];

    private _lastBallTouchedPlayer: AbstractPlayer;
    private _score: number[];
    private _isLoopActive: boolean = true;

    constructor(params: IGameParams) {
        const { node, Interface, Canvas, Field, UserInput } = params
        const width = node.offsetWidth;
        const height = node.offsetHeight;

        this._physics = new System();
        this._usersInput = new UserInput();
        this._interface = new Interface({ node, width, height, Canvas, zIndex: 100 });
        this._field = new Field({ node, width, height, physics: this._physics, Canvas, zIndex: 50, inputsMap: this._usersInput.getMap() });

        this._init();
    }

    async _init() {
        this._interface.show();
        await this._interface.renderHelloScreen();
        this._field.renderBackground();
        this._field.renderBriefing();
        await this._interface.renderStartScreen();
        this._interface.hide();
        this._field.clearBriefing();
        this._field.clearBackground();
        this._field.hide();
        this._startNewGame();    
    }
    
    async _startNewGame() {
        this._field.show();
        this._field.renderBackground();

        const { players, ball, triggers } = this._field.createObjects();
               
        this._ball = ball;
        this._players = players;
        this._triggers = triggers;
        
        this._score = Array(players.length).fill(0);
        this._field.renderScore(this._score);
        this._field.throwBall(this._ball);

        this._isLoopActive = true;
        this._timeLoop()
    }

    private _timeLoop() {
        this._field.clear();
        this._processLogic();
        this._checkCollisions();
        this._field.render();
       
        if (this._isLoopActive) {
            requestAnimationFrame(() => this._timeLoop())
        }       
    }

    private _processLogic() {        
        this._ball.move();

        const playersMovements = this._usersInput.get();
        
        this._players.forEach((player, index) => {
            const movements = playersMovements[index];

            if (!movements || movements.length === 0) return;

            movements.forEach(movement => {
                player.move(movement);
            })
            
        })
    }

    private _checkCollisions() {
        this._physics.checkAll(({ a, b, overlapN }) => {
            const isAisBall = a === this._ball.physicShape;
            const trigger = this._triggers.find(trigger => b === trigger.physicShape);
            const player = this._players.find(player => b === player.physicShape); 

            if (isAisBall) {
                this._ball.updateDirection(overlapN)

                if (trigger) {
                    const lastTouchedPlayer = this._lastBallTouchedPlayer;

                    if (!lastTouchedPlayer) {
                        this._throwNewBall()
                        return;
                    }

                    if (trigger.player === lastTouchedPlayer) {
                        this._reachGoal(lastTouchedPlayer, -1);
                        return;
                    }

                    this._reachGoal(lastTouchedPlayer, 1);
                    return;
                }
                
                if (player) {
                    this._lastBallTouchedPlayer = player;
                }
            }

        })
    }
    
    private _getNewScore(player, increment) {
        const playerIndex = this._players.indexOf(player);

        return this._score.map((playerScore, index) => {
            if (index !== playerIndex) return playerScore;

            return playerScore + increment
        })
    }

    private _stopBall() {  
        this._ball.setPosition({x: -99999, y: -99999})      
        this._ball.setSpeed(0)
    }

    private async _throwNewBall() {
        const speed = this._ball.getSpeed();

        this._lastBallTouchedPlayer = undefined;
        this._stopBall();
        await this._field.renderThrowNewBallScreen();
        this._field.throwBall(this._ball, speed);
    }

    private async _reachGoal(player, increment) {
        const speed = this._ball.getSpeed();

        this._lastBallTouchedPlayer = undefined;
        this._stopBall();
        this._score = this._getNewScore(player, increment)
        this._field.renderScore(this._score);
        await this._field.renderGoalScreen();
        this._field.throwBall(this._ball, speed * 1.05);
    }
} 