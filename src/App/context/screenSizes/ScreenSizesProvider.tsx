import { FC } from 'react';

import { ScreenSizesContext } from './ScreenSizesContext';
import { useScreenSizes } from './useScreenSizes';
import { IProviderProp } from '../../lib/interfaces';

export const ScreenSizesProvider: FC<IProviderProp> = ({ children }) => {
  const store = useScreenSizes();
  return (
    <ScreenSizesContext.Provider value={store}>
      {children}
    </ScreenSizesContext.Provider>
  );
};
