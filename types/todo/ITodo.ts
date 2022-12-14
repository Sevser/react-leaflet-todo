import { IPoint } from "../Point/IPoint";

export interface ITodo {
    point: IPoint,
    completed: boolean,
    description: string,
    title: string,
    creationDate?: Date,
    id: string,
}