import { IScoreTrigger } from "../../interfaces/objects/scoreTrigger";
import { AbstractPlayer } from "./player";
import { AbstractWall } from "./wall";

export class AbstractScoreTrigger extends AbstractWall implements IScoreTrigger {
    player: AbstractPlayer;
}