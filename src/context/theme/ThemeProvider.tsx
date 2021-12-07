import { FC } from 'react';
import { ThemeProvider as Theme } from '@material-ui/core/styles';
import { IProviderProp } from '../../types/provider';
import { ThemeContext } from './ThemeContext';
import { useTheme } from './useTheme';

export const ThemeProvider: FC<IProviderProp> = ({ children }) => {
  const store = useTheme();
  return (
    <Theme theme={store.state.theme}>
      <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
    </Theme>
  );
};
