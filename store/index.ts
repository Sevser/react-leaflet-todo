import isServer from '../utils/isServer';
import ToDo, { ITodoContext } from './TodoStore';


export interface IStore {
  todos: ITodoContext,
}

let clientSideStores: IStore | null = null;

const StoreInitialData: () => IStore = () => {
  if (isServer) {
    return {
      todos: new ToDo(),
    };
  }
  try {
    const rawStore = localStorage.getItem('store');
    const store: IStore = JSON.parse(rawStore as string);
    return {
      todos: new ToDo(store.todos),
    };
  } catch(e) {
    return {
      todos: new ToDo(),
    };
  }
}

export function getStores(initialData = StoreInitialData()) {
  if (isServer) {
    return {
      todos: new ToDo(),
    };
  }
  if (!clientSideStores) {
    clientSideStores = initialData;
  }
  return clientSideStores;
}
