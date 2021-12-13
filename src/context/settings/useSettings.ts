import { useState } from 'react';

import { ISettingsContext } from './SettingsContext.interface';

export const useSettings = (): ISettingsContext => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);

  const SettingsModalHandler = (isOpen?: boolean) => {
    if (typeof isOpen === 'boolean') setIsSettingsModalOpen(isOpen);
    else setIsSettingsModalOpen(prev => !prev);
  };
  return {
    state: { isSettingsModalOpen },
    actions: { SettingsModalHandler }
  };
};
