export class UserKeyboardInput {

    constructor(players, keysMap) {
        this.players = players;
        this.keysMap = this.convertKeysMap(keysMap);
        this.inputsByPlayers = this.players.reduce((acc) => { acc.push([]); return acc }, []);

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

        const currentInput = this.keysMap.map(map => {
            return map[code];
        });

        this.inputsByPlayers = this.inputsByPlayers.map((inputByPlayer, playerIndex) => {
            const code = currentInput[playerIndex];
            if (!code) return inputByPlayer;
            if (inputByPlayer.includes(code)) return inputByPlayer;

            return [...inputByPlayer, code]
        });
    }

    eventKeyUpHandler(event) {
        const code = event.keyCode;
        const availableKeyCodes = this.getAvailableKeys(this.keysMap);

        if (!availableKeyCodes.includes(code))
            return;

        const currentInput = this.keysMap.map(map => {
            return map[code];
        });

        this.inputsByPlayers = this.inputsByPlayers.map((inputByPlayer, playerIndex) => {
            const code = currentInput[playerIndex];
            
            if (!code) return inputByPlayer;
            if (!inputByPlayer.includes(code)) return inputByPlayer;

            return inputByPlayer.filter(prevCode => prevCode !== code)
        });
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
        return this.inputsByPlayers;       
    }
}