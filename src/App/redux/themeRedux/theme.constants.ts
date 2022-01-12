import { IThemeInitialState, IThemes } from './theme.interface';

export const AUTO_THEMING = 'AUTO_THEMING';
export const THEME = 'THEME';

export const THEMES: IThemes = {
  light: 'light',
  dark: 'dark'
} as const;

export const INITIAL_STATE: IThemeInitialState = {
  auto: false,
  theme: THEMES.light
};
