import { FC } from 'react';
import { IProviderProp } from '../../types/provider';
import { ScreenSizesContext } from './ScreenSizesContext';
import { useScreenSizes } from './useScreenSizes';

export const ScreenSizesProvider: FC<IProviderProp> = ({ children }) => {
  const store = useScreenSizes();
  return (
    <ScreenSizesContext.Provider value={store}>
      {children}
    </ScreenSizesContext.Provider>
  );
};
