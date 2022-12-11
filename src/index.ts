import { Settings } from './settings';
import { Game } from './game';
      
new Game({
    node: document.querySelector('js-game-field'),
    settings: new Settings
})