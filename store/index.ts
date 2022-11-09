import React from 'react';
import { ITodo } from '../types/todo/ITodo';
import isServer from '../utils/isServer';
import ToDo, { ITodoContext } from './ToDo';


export interface IStore {
  todos: ITodoContext,
}

let clientSideStores: IStore | null = null;

export function getStores(initialData = { postStoreInitialData: {} }) {
  if (isServer) {
    return {
      todos: new ToDo(),
    };
  }
  if (!clientSideStores) {
    clientSideStores = {
      todos: new ToDo(),
    };
  }

  return clientSideStores;
}
