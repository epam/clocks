import { IFont, INavbarInitialState, IThemes } from './navbar.interface';

export const CLOCKS_FONTS: {
  [fontName: string]: IFont;
} = {
  ROBOTO: {
    value: 'roboto',
    label: 'Roboto'
  },
  ROBOTO_MONO: {
    value: 'roboto-mono',
    label: 'Roboto Mono'
  },
  PRESS_START: {
    value: 'press-start',
    label: 'Press Start'
  },
  ORBITRON: {
    value: 'orbitron',
    label: 'Orbitron'
  },
  QAHIRI: {
    value: 'qahiri',
    label: 'Qahiri'
  },
  OPEN_SANS: {
    value: 'open-sans',
    label: 'Open Sans'
  },
  ESTONIA: {
    value: 'estonia',
    label: 'Estonia'
  }
};

export const AUTO_THEMING = 'AUTO_THEMING';
export const THEME = 'THEME';

export const THEMES: IThemes = {
  light: 'light',
  dark: 'dark'
} as const;

export const INITIAL_STATE: INavbarInitialState = {
  dashboardFont: CLOCKS_FONTS.ROBOTO,
  hasCountry: true,
  hasDate: true,
  hasTimezone: true,
  auto: false,
  theme: THEMES.light
};
