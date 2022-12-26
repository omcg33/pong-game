import { Game } from './game';
import { GameField } from './fields/default';
import { UsersKeyboardInput } from './inputs/keyboard';
import { Canvas } from './helpers/canvas';
import { GameInterface } from './helpers/gameInterface';
  
new Game({
    node: document.querySelector('.js-game-field-two-default'),
    Interface: GameInterface,
    Canvas: Canvas,
    Field: GameField,
    UserInput: UsersKeyboardInput
})