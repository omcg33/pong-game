import { Wall } from './wall.js';

export class ScoreTrigger extends Wall {
    constructor(player, settings) {
       super(settings)
 
       this.player = player;
    }
}