import { IThemeInitialState, IThemes } from './theme.interface';

export const THEME: IThemes = {
  light: 'light',
  dark: 'dark'
};

export const INITIAL_STATE: IThemeInitialState = {
  auto: false,
  theme: THEME.light
};
