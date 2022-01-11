import { IThemeInitialState, IThemes } from './theme.interface';
import { getUserTheme } from '../../handlers';

export const AUTO_THEMING = 'AUTO_THEMING';
export const THEME = 'THEME';

export const THEMES: IThemes = {
  light: 'light',
  dark: 'dark'
} as const;

const autoTheming = localStorage.getItem(AUTO_THEMING);

// object is not a function ?? console.log('hello: ', getUserTheme());

export const INITIAL_STATE: IThemeInitialState = {
  auto: autoTheming ? Boolean(autoTheming) : false,
  theme: 'light'
};
