import { FC } from 'react';

import { ScreenSizesContext } from './ScreenSizesContext';
import { useScreenSizes } from './useScreenSizes';
import { IProviderProp } from '../../types/provider';

export const ScreenSizesProvider: FC<IProviderProp> = ({ children }) => {
  const store = useScreenSizes();
  return (
    <ScreenSizesContext.Provider value={store}>
      {children}
    </ScreenSizesContext.Provider>
  );
};
