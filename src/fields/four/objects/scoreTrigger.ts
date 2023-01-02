
import { IPlayer } from '../../../interfaces/objects/player';
import { IScoreTrigger } from '../../../interfaces/objects/scoreTrigger';
import { IWallSettings, Wall } from './wall';

export class ScoreTrigger extends Wall implements IScoreTrigger {
    public player: IPlayer;

    constructor(player, settings: IWallSettings) {
       super(settings)
 
       this.player = player;
    }
}