import { useState } from 'react';

export const useSettings = () => {
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
