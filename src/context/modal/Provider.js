import React from 'react';
import { ModalContext } from './Context';
import { useModal } from './hook';

export const ModalProvider = ({ children }) => {
    const store = useModal();
    return <ModalContext.Provider value={store}>{children}</ModalContext.Provider>;
};
