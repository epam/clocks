import React from 'react';
import { SnackbarContext } from './Context';
import { useSnackbar } from './hook';

export const SnackbarProvider = ({ children }) => {
    const store = useSnackbar();
    return <SnackbarContext.Provider value={store}>{children}</SnackbarContext.Provider>;
};
