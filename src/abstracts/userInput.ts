import { DIRECTION } from "../interfaces/enums";
import { IUsersInput } from "../interfaces/userInput";

export class AbstractUsersInput implements IUsersInput {
    get(): DIRECTION[][] {
        throw new Error("Method not implemented.");
    }
    getMap(): string[][] {
        throw new Error("Method not implemented.");
    }
       
}