import { observable, action, isObservable, set, makeAutoObservable } from 'mobx';
import { ITodo } from '../types/todo/ITodo';
import { Todo } from '../types/todo/Todo';


export interface ITodoContext {
  list: ITodo[],
  addToDo: (p: Todo) => void,
  markAsCompleted: (p: Todo) => void,
}

class TodoStore implements ITodoContext {
  @observable.deep list: Todo[] = [];

  constructor(initialData = { list: new Array<Todo>() }) {
    makeAutoObservable(this);
    this.list = initialData.list.map(item => new Todo(item));
  }

  addToDo(todo: Todo) {
    this.list.push(todo);
  }

  markAsCompleted(todo: Todo) {
    let item = this.list.find((el) => el.id === todo.id);
    if (item !== undefined) {
      item.setCompleted();
    }
  }

  __data() {
    return {
      list: this.list,
    };
  }
}

export default TodoStore;