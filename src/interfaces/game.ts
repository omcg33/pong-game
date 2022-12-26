import { AbstractCanvas } from "../abstracts/canvas";
import { AbstractGameInterface } from "../abstracts/gameInterface";
import { AbstractGameField } from "../abstracts/gameField"
import { AbstractUsersInput } from "../abstracts/userInput"

export interface IGameParams {
    node: HTMLElement;    
    Interface: typeof AbstractGameInterface
    Canvas: typeof AbstractCanvas
    Field: typeof AbstractGameField
    UserInput: typeof AbstractUsersInput
}

export interface IGame {
   
}