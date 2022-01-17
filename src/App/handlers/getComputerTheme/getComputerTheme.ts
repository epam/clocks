import { TTheme } from '../../redux/navbarRedux/navbar.interface';
import { THEMES } from '../../redux/navbarRedux/navbar.constants';

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
