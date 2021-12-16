import { AUTO_THEMING, THEME, THEMES } from '../../constants';
import { TTheme } from '../../context/theme/ThemeContext.interface';
import getComputerTheme from '../getComputerTheme/getComputerTheme';
import checkComputerThemeSupport from '../checkComputerThemeSupport/checkComputerThemeSupport';

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

  //  @ts-ignore
  return localStorage.getItem(THEME) || THEMES.light;
}

export default getUserTheme;
