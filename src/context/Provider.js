import React from 'react';
import { LocationsContext } from './Context';
import { useLocations } from './hook';

export const LocationsProvider = ({ children }) => {
    const store = useLocations();
    return <LocationsContext.Provider store={store}>{children}</LocationsContext.Provider>;
};
