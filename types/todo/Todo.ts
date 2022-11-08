import { BaseError } from "../Errors/BaseError";
import { IPoint } from "../Point/IPoint";
import { Point } from "../Point/Point";
import { ITodo } from "./ITodo";

export class Todo implements ITodo {
    public completed: boolean;
    public description: string;
    public title: string;
    public point: IPoint;
    constructor(props: ITodo) {
        if (props === undefined) {
            throw new BaseError('Required field is missing');
        }
        this.completed = props.completed;
        this.description = props.description;
        this.point = new Point(props.point);
        this.title = props.title;
    }
}