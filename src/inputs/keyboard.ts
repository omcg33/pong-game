import { DIRECTION } from "../interfaces/enums";
import { AbstractUsersInput } from "../abstracts/userInput";

export class UsersKeyboardInput extends AbstractUsersInput {
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
    ]

    constructor() {
        super();

    }

    getMap(): string[][] {
        return this._settings.map(keyboardMap => Object.values(keyboardMap).map(value => value.label))
    }
}