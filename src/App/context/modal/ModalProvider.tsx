import { FC } from 'react';

import { ModalContext } from './ModalContext';
import { useModal } from './useModal';
import { IProviderProp } from '../../lib/interfaces';

export const ModalProvider: FC<IProviderProp> = ({ children }) => {
  const store = useModal();
  return (
    <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
  );
};
