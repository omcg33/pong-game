import { IKeyboardInputMap, ISettings, ISettingsParams } from "../interfaces/settings";

export class Settings implements ISettings {
    public keyboardInputsMap: IKeyboardInputMap[];
    
    constructor(params: ISettingsParams) {
        const { keyboardInputsMap } = params;

        this.keyboardInputsMap = keyboardInputsMap
    }
  
}