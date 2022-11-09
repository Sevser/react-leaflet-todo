import { observable, action } from 'mobx';
import { ITodo } from '../types/todo/ITodo';
import { Todo } from '../types/todo/Todo';


export interface ITodoContext {
  list: ITodo[],
  addToDo: (p: ITodo) => void,
}

class PostStore implements ITodoContext {
  @observable list: ITodo[] = [];

  constructor(initialData = { list: new Array<Todo>() }) {
    this.list = initialData.list;
  }

  @action addToDo(todo: ITodo) {
    this.list.push(todo);
  }

  __data() {
    return {
      list: this.list,
    };
  }
}

export default PostStore;