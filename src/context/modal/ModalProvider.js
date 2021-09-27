import React from 'react';
import { ModalContext } from './ModalContext';
import { useModal } from './useModal';

export const ModalProvider = ({ children }) => {
    const store = useModal();
    return <ModalContext.Provider value={store}>{children}</ModalContext.Provider>;
};
