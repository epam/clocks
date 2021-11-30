import { useState, useEffect } from 'react';

export const useScreenSizes = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        });
    }, []);

    return {
        state: { width, height },
        actions: {}
    };
};
