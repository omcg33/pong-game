import { DIRECTION } from "../interfaces/enums";
import { AbstractUsersInput } from "../abstracts/userInput";

export class UsersKeyboardInputForTwo extends AbstractUsersInput {
    private _keysMap: any;
    private _inputs: DIRECTION[][];
    private _settings = [
        {
            [DIRECTION.FORWARD]: {
                code: 87,
                label: 'W'
            },
            [DIRECTION.BACKWARD]: {
                code: 83,
                label: 'S'
            }
        },
        {
            [DIRECTION.FORWARD]: {
                code: 38,
                label: '↑'
            },
            [DIRECTION.BACKWARD]: {
                code: 40,
                label: '↓'
            }
        },
    ];

    constructor() {
        super();

        this._keysMap = this._convertKeysMap(this._settings);
        this._inputs = this._settings.reduce((acc) => { acc.push([]); return acc }, []);

        this._eventKeyDownHandler = this._eventKeyDownHandler.bind(this);
        this._eventKeyUpHandler = this._eventKeyUpHandler.bind(this);
        this._addEventListeners();
    }

    private _convertKeysMap(settings) {
        return settings.map(map => {
            const keys = Object.keys(map);
            return keys.reduce((acc, key) => {
                acc[map[key]['code']] = key
                return acc
            }, {})
        })
    }

    private _getAvailableKeys(keysMap) {
        return keysMap
            .reduce((acc, map) => acc.concat(
                Object.keys(map).map(key => parseInt(key, 10))
            ), [])
    }

    private _eventKeyDownHandler(event) {
        const code = event.keyCode;
        const availableKeyCodes = this._getAvailableKeys(this._keysMap);

        if (!availableKeyCodes.includes(code))
            return;

        const currentInput = this._keysMap.map(map => {
            return map[code];
        });

        this._inputs = this._inputs.map((inputByPlayer, playerIndex) => {
            const code = currentInput[playerIndex];
            if (!code) return inputByPlayer;
            if (inputByPlayer.includes(code)) return inputByPlayer;

            return [...inputByPlayer, code]
        });
    }

    private _eventKeyUpHandler(event) {
        const code = event.keyCode;
        const availableKeyCodes = this._getAvailableKeys(this._keysMap);

        if (!availableKeyCodes.includes(code))
            return;

        const currentInput = this._keysMap.map(map => {
            return map[code];
        });

        this._inputs = this._inputs.map((inputByPlayer, playerIndex) => {
            const code = currentInput[playerIndex];
            
            if (!code) return inputByPlayer;
            if (!inputByPlayer.includes(code)) return inputByPlayer;

            return inputByPlayer.filter(prevCode => prevCode !== code)
        });
    }

    private _addEventListeners() {
        document.addEventListener('keydown', this._eventKeyDownHandler)
        document.addEventListener('keyup', this._eventKeyUpHandler)
    }

    private _removeEventListeners() {
        document.removeEventListener('keydown', this._eventKeyDownHandler)
        document.removeEventListener('keyup', this._eventKeyUpHandler)
    }

    get() {
        return this._inputs;      
    }

    getMap(): string[][] {
        return this._settings.map(keyboardMap => Object.values(keyboardMap).map(value => value.label))
    }
}