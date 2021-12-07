import { useState } from 'react';
import themes from '../../assets/themes/themes';

export const useTheme = () => {
  const [type, setType] = useState<'light' | 'dark'>('light');

  const theme = themes(type);
  const ThemeHandler = () =>
    setType(type => (type === 'light' ? 'dark' : 'light'));

  return {
    state: { theme, type },
    actions: { ThemeHandler }
  };
};
