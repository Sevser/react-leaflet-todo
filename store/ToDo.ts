import { observable, action } from 'mobx';
import { ITodo } from '../types/todo/ITodo';


export interface ITodoContext {
  list: ITodo[],
  addToDo: (p: ITodo) => void,
}

class PostStore implements ITodoContext {
  @observable list: ITodo[] = [];

  constructor(initialData = { list: [] }) {
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