import { IError } from "./IError";

export class BaseError implements IError {
    public message: string;
    constructor(props: IError | string) {
        if (typeof props === 'string') {
            this.message = props;
        } else if (typeof props === 'object') {
            this.message = props.message
        }
        throw 'Message for errror wasn\'t provided';        
    }
}