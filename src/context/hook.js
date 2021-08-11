import { useMemo } from 'react';

export const useLocations = () => {
    const userCurrentTimeZone = useMemo(() => {}, []);
    return { userCurrentTimeZone };
};
