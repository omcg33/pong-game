import { AbstractCanvas } from "src/abstracts/canvas";
import { AbstractGameInterface } from "src/abstracts/gameInterface";
import { Settings } from "src/helpers/settings"
import { AbstractGameField } from "../abstracts/gameField"
import { AbstractUserInput } from "../abstracts/userInput"

export interface IGameParams {
    node: HTMLElement;
    settings: Settings;
    Interface: typeof AbstractGameInterface
    Canvas: typeof AbstractCanvas
    Field: typeof AbstractGameField
    UserInput: typeof AbstractUserInput
}

export interface IGame {
   
}