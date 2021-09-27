import React from 'react';
import { LocationsContext } from './LocationsContext';
import { useLocations } from './useLocations';

export const LocationsProvider = ({ children }) => {
    const store = useLocations();
    return <LocationsContext.Provider value={store}>{children}</LocationsContext.Provider>;
};
