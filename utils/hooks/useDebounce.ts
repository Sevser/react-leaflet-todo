import { useEffect, useState } from "react";

const useDebounce = <t>(value: t, delay: number): t => {
    const [debouncedValue, setDebouncedValue] = useState<t>(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );
    return debouncedValue;
}