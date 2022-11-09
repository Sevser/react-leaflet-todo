import { useEffect } from "react";
import { useMobxStores } from "../../store/storeContext";

const BeforeUnload = () => {
    const store = useMobxStores();
    const saveStoreInLocalStorage = () => {
        localStorage.setItem('store', JSON.stringify(store));
    };
    useEffect(() => {
        window.addEventListener('beforeunload', saveStoreInLocalStorage)
        console.log('use effect store provider');
        return () => {
            window.removeEventListener('beforeunload', saveStoreInLocalStorage)
        }
    })
    return (<></>)
}

export default BeforeUnload;