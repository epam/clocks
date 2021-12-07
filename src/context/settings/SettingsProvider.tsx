import { FC } from 'react';
import { IProviderProp } from '../../types/provider';
import { SettingsContext } from './SettingsContext';
import { useSettings } from './useSettings';

export const SettingsProvider: FC<IProviderProp> = ({ children }) => {
  const store = useSettings();
  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  );
};
