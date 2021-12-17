import { FC } from 'react';

import { LocationsContext } from './LocationsContext';
import { useLocations } from './useLocations';
import { IProviderProp } from '../../lib/interfaces';

export const LocationsProvider: FC<IProviderProp> = ({ children }) => {
  const store = useLocations();
  return (
    <LocationsContext.Provider value={store}>
      {children}
    </LocationsContext.Provider>
  );
};
