import { IThemeInitialState, IThemes } from './theme.interface';
import { AUTO_THEMING } from '../../lib/constants';
import { getUserTheme } from '../../handlers';

export const THEME: IThemes = {
  light: 'light',
  dark: 'dark'
} as const;

const autoTheming = localStorage.getItem(AUTO_THEMING);

export const INITIAL_STATE: IThemeInitialState = {
  auto: autoTheming ? Boolean(autoTheming) : false,
  theme: getUserTheme()
};
