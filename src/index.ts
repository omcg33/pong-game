import { Game } from './game';
import { Settings } from './helpers/settings';
import { DIRECTION } from './interfaces/enums';
import { GameFieldForTwoPlayers } from './fields/forTwoPlayers';
import { UserKeyboardInput } from './inputs/keyboard';
import { Canvas } from './helpers/canvas';
import { GameInterface } from './helpers/gameInterface';
      
const settings = new Settings({
    keyboardInputsMap: [
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
});


new Game({
    node: document.querySelector('.js-game-field-two-default'),
    settings,
    Interface: GameInterface,
    Canvas: Canvas,
    Field: GameFieldForTwoPlayers,
    UserInput: UserKeyboardInput
})