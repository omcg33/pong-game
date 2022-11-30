import { DIRECTION } from './consts.js';

export class UserKeyboardInput {

    constructor(players, keysMap) {
        this.players = players;
        this.keysMap = this.convertKeysMap(keysMap);
        this.inputsByPlayer = this.players.reduce((acc) => { acc.push([]); return acc }, []);

        this.eventKeyDownHandler = this.eventKeyDownHandler.bind(this);
        this.eventKeyUpHandler = this.eventKeyUpHandler.bind(this);
        this.addEventListeners();
    }

    destroy() {
        this.removeEventListeners();
    }

    convertKeysMap(keysMap) {
        return keysMap.map(map => {
            const keys = Object.keys(map);
            return keys.reduce((acc, key) => {
                acc[map[key]['code']] = key
                return acc
            }, {})
        })
    }
    
    getAvailableKeys(keysMap) {
        return keysMap
            .reduce((acc, map) => acc.concat(
                Object.keys(map).map(key => parseInt(key, 10))
            ), [])
    }

    eventKeyDownHandler(event) {
        const code = event.keyCode;
        const availableKeyCodes = this.getAvailableKeys(this.keysMap);

        if (!availableKeyCodes.includes(code))
            return;

        this.inputsByPlayer = this.keysMap.map(map => {
            return map[code];
        })
    }

    eventKeyUpHandler() {
        this.inputsByPlayer = this.players.reduce((acc) => { acc.push([]); return acc }, []);
    }

    addEventListeners() {
        document.addEventListener('keydown', this.eventKeyDownHandler)
        document.addEventListener('keyup', this.eventKeyUpHandler)
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.eventKeyDownHandler)
        document.removeEventListener('keyup', this.eventKeyUpHandler)
    }

    get() {
        return this.inputsByPlayer;       
    }
}