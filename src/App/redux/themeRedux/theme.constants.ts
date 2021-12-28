import { IThemeInitialState } from './theme.interface';

export const THEME = {
  light: 'light',
  dark: 'dark'
};

export const INITIAL_STATE: IThemeInitialState = {
  auto: false,
  theme: THEME.light
};
