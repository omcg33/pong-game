export interface IKeyboardInputMap {

}
export interface IFieldParams {
    width: number
    height: number
}
export interface IBallParams {
    speedIncrease: number
}

export interface ISettingsParams {

}
export interface ISettings {
    constructor(params: ISettingsParams);

    ball: IBallParams
    field: IFieldParams
    keyboardInputsMap: IKeyboardInputMap[]
}