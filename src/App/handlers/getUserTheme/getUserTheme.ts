import { AUTO_THEMING, THEME, THEMES } from '../../lib/constants';
import getComputerTheme from '../getComputerTheme/getComputerTheme';
import checkComputerThemeSupport from '../checkComputerThemeSupport/checkComputerThemeSupport';
import { TTheme } from '../../redux/themeRedux/theme.interface';

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
