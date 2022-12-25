import { DIRECTION } from "src/interfaces/enums";
import { IUserInput } from "src/interfaces/userInput";

export class AbstractUserInput implements IUserInput {
    get(): DIRECTION[] {
        throw new Error("Method not implemented.");
    }    
}