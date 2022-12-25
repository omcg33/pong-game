import { DIRECTION } from "./enums"

export type IMovement = DIRECTION

export interface IUserInput {
    get(): IMovement[]
}