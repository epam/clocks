import React from 'react';
import { SnackbarContext } from './SnackbarContext';
import { useSnackbar } from './useSnackbar';

export const SnackbarProvider = ({ children }) => {
    const store = useSnackbar();
    return <SnackbarContext.Provider value={store}>{children}</SnackbarContext.Provider>;
};
