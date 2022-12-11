export interface IGameParams {
    node: Element
}

export interface IGame {
    constructor(params: IGameParams)
}