import { DIRECTION } from './enums';

export type IKeyboardInputMap = Record<DIRECTION, {
    code: number;
    label: string;
}>
// export interface IFieldParams {
//     width: number
//     height: number
// }
// export interface IBallParams {
//     speedIncrease: number
// }

export interface ISettingsParams {
    keyboardInputsMap: IKeyboardInputMap[]
}

export interface ISettings {   
    keyboardInputsMap: IKeyboardInputMap[]
}