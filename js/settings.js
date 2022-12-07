import { DIRECTION } from './consts.js';

export class Settings {
    constructor() {
        this.game = {
            ball: {
                speedIncrease: 0.5
            }
        }
        this.gameField = {
            width: 800,
            height: 600            
        }
        this.playersInputMap = [
            {
                [DIRECTION.FORWARD]: {
                    code: 87,
                    label: 'W'
                },
                [DIRECTION.BACKWARD]: {
                    code: 83,
                    label: 'S'
                }
            },
            {
                [DIRECTION.FORWARD]: {
                    code: 38,
                    label: '↑'
                },
                [DIRECTION.BACKWARD]: {
                    code: 40,
                    label: '↓'
                }
            },
        ]
    }
}