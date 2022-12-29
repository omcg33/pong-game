import { IPlayer } from "./player";
import { IWall } from "./wall";

export interface IScoreTrigger extends IWall {
   player: IPlayer
}