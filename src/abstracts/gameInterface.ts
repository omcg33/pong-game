import { IGameInterface, IGameInterfaceParams } from "src/interfaces/gameInterface";

export class AbstractGameInterface implements IGameInterface {
    constructor(params: IGameInterfaceParams){}
    show(): void {
        throw new Error("Method not implemented.");
    }
    hide(): void {
        throw new Error("Method not implemented.");
    }

    renderHelloScreen(): Promise<void> {
        throw new Error("Method not implemented.");
    }   
    renderStartScreen(): Promise<void> {
        throw new Error("Method not implemented.");
    }    
}