import { TTheme } from '../../redux/themeRedux/theme.interface';
import { THEMES } from '../../redux/themeRedux/theme.constants';

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
