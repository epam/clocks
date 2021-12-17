import { FC } from 'react';

import { SnackbarContext } from './SnackbarContext';
import { useSnackbar } from './useSnackbar';
import { IProviderProp } from '../../lib/interfaces';

export const SnackbarProvider: FC<IProviderProp> = ({ children }) => {
  const store = useSnackbar();
  return (
    <SnackbarContext.Provider value={store}>
      {children}
    </SnackbarContext.Provider>
  );
};
