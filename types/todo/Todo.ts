import { makeAutoObservable, observable, set } from "mobx";
import createGuid from "../../utils/guid";
import { BaseError } from "../Errors/BaseError";
import { IPoint } from "../Point/IPoint";
import { Point } from "../Point/Point";
import { ITodo } from "./ITodo";

export class Todo implements ITodo {
    @observable completed = false;
    @observable description = '';
    @observable title = '';
    public id: string;
    public point: IPoint;
    public creationDate?: Date;
    constructor(props: Partial<ITodo>) {
        makeAutoObservable(this);
        if (props === undefined) {
            throw new BaseError('Required field is missing');
        }
        this.completed = props.completed || false
        this.description = props.description || '';
        this.title = props.title || '';
        this.point = new Point(props.point);
        this.id = props.id || createGuid();
        if (props.creationDate) {
            this.creationDate = new Date(props.creationDate);
        }
    }
    setCompleted() {
        this.completed = !this.completed;
    }
}