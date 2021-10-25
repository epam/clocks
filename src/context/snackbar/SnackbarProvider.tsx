import { FC } from 'react';
import { IProviderProp } from '../../types/provider';
import { SnackbarContext } from './SnackbarContext';
import { useSnackbar } from './useSnackbar';

export const SnackbarProvider: FC<IProviderProp> = ({ children }) => {
    const store = useSnackbar();
    return <SnackbarContext.Provider value={store}>{children}</SnackbarContext.Provider>;
};
