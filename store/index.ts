import isServer from '../utils/isServer';
import ToDo from './todo';

let clientSideStores;

export function getStores(initialData = { postStoreInitialData: {} }) {
  if (isServer) {
    return {
      postStore: new PostStore(initialData.postStoreInitialData),
      uiStore: new UIStore(),
    };
  }
  if (!clientSideStores) {
    clientSideStores = {
      postStore: new PostStore(initialData.postStoreInitialData),
      uiStore: new UIStore(),
    };
  }

  return clientSideStores;
}

const StoreContext = React.createContext();

export function StoreProvider(props) {
  return <StoreContext.Provider value={props.value}>{props.children}</StoreContext.Provider>;
}

export function useMobxStores() {
  return React.useContext(StoreContext);
}
