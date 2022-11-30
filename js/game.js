import { System } from 'detect-collisions';
import { GameField } from './gameField.js'
import { Settings } from './settings.js';
import { UserKeyboardInput } from './userKeyboardInput.js';

export class Game {    
    constructor(selector) {
        this.node = document.querySelector(selector);

        if (!this.node) {
            throw new Error(`Game node "${selector}" does not found`)
        }

        this.debug = false;
        this.settings = new Settings();
        this.physics = new System();        
        this.field = new GameField(this.node, { ...this.settings.gameField, debug: this.debug, physics: this.physics});

        this.init();    
    }

    async init() {
        this.field.renderBackground();        

        await this.field.renderInitialScreen();

        this.start()
    }
    
    async start() {
        await this.field.renderBriefing()        

        const { ball, players, scoreTriggers } = this.field.createObjects();
        
        this.userInput = new UserKeyboardInput(players, this.settings.playersInputMap);
        this.score = players.map(() => 0);

        this.ball = ball;
        this.players = players;
        this.scoreTriggers = scoreTriggers;
        
        this.field.renderScore(this.score);
        this.field.setObjectsStartParameters();

        this.isLoopActive = true;
        this.timeLoop()
    }

    updateScore(player, count) {
        const playerIndex = this.players.indexOf(player);

        this.score = this.score.map((playerScore, index) => {
            if (index !== playerIndex) return playerScore;

            return playerScore + count
        })
    }

    processLogic() {
        this.ball.setPosition(
            this.ball.x + this.ball.dx * this.ball.speed,
            this.ball.y + this.ball.dy * this.ball.speed,
        );

        const playersMovements = this.userInput.get();
        
        this.players.forEach((player, index) => {
            const movement = playersMovements[index];

            if (!movement) return;

            const canMove = this.field.canPlayerMove(player, movement);

            if (!canMove) return;
            
            player.move(movement);
        })
    }
    
    checkCollisions() {
        this.physics.checkAll(({ a, b, overlapV, overlapN }) => {
            const isAisBall = a === this.ball.physicShape;
            const trigger = this.scoreTriggers.find(trigger => b === trigger.physicShape);
            const player = this.players.find(player => b === player.physicShape); 

            if (isAisBall) {
                this.ball.physicShape.setPosition(
                    this.ball.physicShape.x - overlapV.x,
                    this.ball.physicShape.y - overlapV.y
                );
                this.ball.updateDirection(overlapN)

                if (trigger) {
                    const lastTouchedPlayer = this.ball.lastTouchedPlayer;

                    if (!lastTouchedPlayer) {
                        this.throwNewBall()
                        return;
                    }

                    if (trigger.player === lastTouchedPlayer) {
                        this.reachGoal(lastTouchedPlayer, -1);
                        return;
                    }

                    this.reachGoal(lastTouchedPlayer, 1);
                    return;
                }
                
                if (player) {
                    this.ball.setLastTouchedPlayer(player)
                }
            }

        })
    }

    stopBall() {
        this.ball.setPosition(-9999, -9999);
        this.ball.setSpeed(0);
    }

    async throwNewBall() {
        this.stopBall();
        await this.field.renderThrowNewBallScreen();
        this.field.setObjectsStartParameters();        
    }

    async reachGoal(player, score) {
        this.stopBall();
        this.updateScore(player, score)
        this.field.renderScore(this.score);
        await this.field.renderGoalScreen();
        this.field.setObjectsStartParameters();
    }

    timeLoop() {
        this.field.clearGameLayout();
        this.processLogic();
        this.checkCollisions();        
        this.field.renderGameLayout();
       
        if (this.isLoopActive) {
            requestAnimationFrame(() => this.timeLoop())
        }       
    }
}