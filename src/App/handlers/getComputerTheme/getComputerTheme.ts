import { THEMES } from '../../lib/constants';
import { TTheme } from '../../context/theme/ThemeContext.interface';

function getComputerTheme(): TTheme {
  const darkModeMediaQuery = window.matchMedia(
    `(prefers-color-scheme: ${THEMES.dark})`
  );
  if (darkModeMediaQuery.matches) {
    return THEMES.dark;
  }
  return THEMES.light;
}

export default getComputerTheme;