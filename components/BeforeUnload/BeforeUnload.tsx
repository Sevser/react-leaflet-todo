import { useEffect } from "react";
import { useMobxStores } from "../../store/storeContext";

const BeforeUnload = () => {
    const store = useMobxStores();
    const saveStoreInLocalStorage = () => {
        console.log(JSON.stringify(store));
        localStorage.setItem('store', JSON.stringify(store));
    };
    useEffect(() => {
        window.addEventListener('beforeunload', saveStoreInLocalStorage)
        return () => {
            window.removeEventListener('beforeunload', saveStoreInLocalStorage)
        }
    })
    return (<></>)
}

export default BeforeUnload;