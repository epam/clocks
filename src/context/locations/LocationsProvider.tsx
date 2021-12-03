import { FC } from 'react';
import { IProviderProp } from '../../types/provider';
import { LocationsContext } from './LocationsContext';
import { useLocations } from './useLocations';

export const LocationsProvider: FC<IProviderProp> = ({ children }) => {
  const store = useLocations();
  return (
    <LocationsContext.Provider value={store}>
      {children}
    </LocationsContext.Provider>
  );
};
