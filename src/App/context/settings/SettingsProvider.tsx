import { FC } from 'react';

import { SettingsContext } from './SettingsContext';
import { useSettings } from './useSettings';
import { IProviderProp } from '../../lib/interfaces';

export const SettingsProvider: FC<IProviderProp> = ({ children }) => {
  const store = useSettings();
  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  );
};
