import { DIRECTION } from "./enums"

export type IMovement = DIRECTION

export interface IUsersInput {
    get(): IMovement[]
    getMap(): string[][]
}