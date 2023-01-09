import { Game } from './game';
import { GameField } from './fields/default';
import { GameFieldFour } from './fields/four';
import { UsersKeyboardInputForTwo } from './inputs/keyboardForTwo';
import { Canvas } from './helpers/canvas';
import { GameInterface } from './helpers/gameInterface';
import { UsersKeyboardInputForFour } from './inputs/keyboardForFour';
  
new Game({
    node: document.querySelector('.js-game-field-default'),
    Interface: GameInterface,
    Canvas: Canvas,
    Field: GameField,
    UserInput: UsersKeyboardInputForTwo
})

 
new Game({
    node: document.querySelector('.js-game-field-four'),
    Interface: GameInterface,
    Canvas: Canvas,
    Field: GameFieldFour,
    UserInput: UsersKeyboardInputForFour
})