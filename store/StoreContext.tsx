import React from 'react';
import { IStore } from '.';

const StoreContext = React.createContext<IStore>({} as IStore);

export function StoreProvider(props: { value: IStore, children: [] | JSX.Element }) {
    return <StoreContext.Provider
        value={props.value}>
        {props.children}
    </StoreContext.Provider>;
}

export function useMobxStores() {
    return React.useContext(StoreContext);
}