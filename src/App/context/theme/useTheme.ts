import { useState, useEffect } from 'react';
import { createTheme, Theme } from '@material-ui/core';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  getUserTheme,
  getComputerTheme,
  checkComputerThemeSupport
} from '../../handlers';

import { TTheme } from './ThemeContext.interface';
import {
  AUTO_THEMING,
  THEME,
  THEMES
} from '../../redux/themeRedux/theme.constants';

export const useTheme = () => {
  const [type, setType] = useState<TTheme>('light');
  const [autoTheming, setAutoTheming] = useState<boolean>(
    Boolean(JSON.parse(localStorage.getItem(AUTO_THEMING) || 'true'))
  );
  const { getItem } = useLocalStorage();

  const customStyles = {
    light: {},
    dark: {}
  };

  const themes = (type: 'light' | 'dark'): Theme => {
    return createTheme({
      palette: {
        type,
        ...customStyles[type]
      }
    });
  };

  const theme = themes(type);
  const ThemeHandler = (type?: TTheme) => {
    if (type === 'light' || type === 'dark') {
      return setType(type);
    }
    setType(type => (type === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const theme = getUserTheme();
    setType(theme);
    setAutoTheming(
      Boolean(JSON.parse(localStorage.getItem(AUTO_THEMING) || 'true'))
    );
  }, []);

  const AutoThemingHandler = (isAutoThemingOn?: boolean) => {
    const doesComputerSupport = checkComputerThemeSupport();
    if (!doesComputerSupport) return;
    if (typeof isAutoThemingOn === 'boolean') {
      if (isAutoThemingOn) {
        const computerTheme = getComputerTheme();
        setType(computerTheme);
      } else {
        const theme = getItem(THEME) || THEMES.light;
        // @ts-ignore
        setType(theme);
      }
      return setAutoTheming(isAutoThemingOn);
    }
    if (autoTheming) {
      const theme = getItem(THEME) || THEMES.light;
      // @ts-ignore
      setType(theme);
    } else {
      const computerTheme = getComputerTheme();
      setType(computerTheme);
    }
    setAutoTheming(prev => !prev);
  };

  return {
    state: { theme, type, autoTheming },
    actions: { ThemeHandler, AutoThemingHandler }
  };
};
