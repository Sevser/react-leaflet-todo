import { useState } from "react";

const useLocalStorage = <Type>(str: string): [Type | undefined, (f: (param?: Type | undefined) => {}) => void] => {
    const [data, setState] = useState<Type>();
    const setNewValue = (func: (param?: Type | undefined) => {}) => {
        
    };
    return [data, setNewValue];
};

export default useLocalStorage;