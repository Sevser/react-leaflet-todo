import { useState, useCallback, useEffect } from 'react';
import { MapSize } from '../../types/MapSize/MapSize';

const useResize = (ref: RefObject<HTMLDivElement>): [MapSize | null, () => void] => {
    const [value, setValue] = useState<MapSize | null>(null);

    const updateResizeCallback = () => {
        if (ref.current) {
            const whattype = ref.current;
            setValue(() => new MapSize({
                height: whattype.clientHeight,
                width: whattype.clientWidth,
            }));
        }
    };

    const handleUserKeyPress = useCallback(updateResizeCallback, []);

    useEffect(() => {
        window.addEventListener("resize", handleUserKeyPress);
        return () => {
            window.removeEventListener("resize", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    useEffect(updateResizeCallback, [ref]);

    return [value, setValue as () => void]
};

export default useResize;