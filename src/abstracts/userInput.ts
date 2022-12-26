import { DIRECTION } from "../interfaces/enums";
import { IUsersInput } from "../interfaces/userInput";

export class AbstractUsersInput implements IUsersInput {
    getMap(): string[][] {
        throw new Error("Method not implemented.");
    }
    get(): DIRECTION[] {
        throw new Error("Method not implemented.");
    }    
}