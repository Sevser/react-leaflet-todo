import { observer } from "mobx-react";
import { useEffect } from "react";
import { useMobxStores } from "../../store/StoreContext";

const BeforeUnload = observer(() => {
    const store = useMobxStores();
    const saveStoreInLocalStorage = () => {
        localStorage.setItem('store', JSON.stringify(store));
    };
    useEffect(() => {
        window.addEventListener('beforeunload', saveStoreInLocalStorage)
        return () => {
            window.removeEventListener('beforeunload', saveStoreInLocalStorage)
        }
    })
    return (<></>)
});

export default BeforeUnload;