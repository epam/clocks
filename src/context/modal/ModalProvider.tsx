import { FC } from 'react';
import { IProviderProp } from '../../types/provider';
import { ModalContext } from './ModalContext';
import { useModal } from './useModal';

export const ModalProvider: FC<IProviderProp> = ({ children }) => {
  const store = useModal();
  return (
    <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
  );
};
