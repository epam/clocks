import getComputerTheme from '../getComputerTheme/getComputerTheme';
import checkComputerThemeSupport from '../checkComputerThemeSupport/checkComputerThemeSupport';
import {
  AUTO_THEMING,
  THEME,
  THEMES
} from '../../redux/navbarRedux/navbar.constants';
import { TTheme } from '../../redux/navbarRedux/navbar.interface';

function getUserTheme(): TTheme {
  const autoTheming = localStorage.getItem(AUTO_THEMING);

  if (autoTheming === 'true') {
    return getComputerTheme();
  }

  if (autoTheming === null) {
    const doesComputerSupport = checkComputerThemeSupport();
    if (doesComputerSupport) {
      localStorage.setItem(AUTO_THEMING, 'true');
      const computerTheme = getComputerTheme();
      localStorage.setItem(THEME, computerTheme);
      return computerTheme;
    }
  }

  return (localStorage.getItem(THEME) as TTheme) || THEMES.light;
}

export default getUserTheme;
