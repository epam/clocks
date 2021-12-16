import { TTheme } from '../context/theme/ThemeContext.interface';

interface IThemes {
  [name: string]: TTheme;
}

export const THEMES: IThemes = {
  light: 'light',
  dark: 'dark'
};
