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
export const HAS_COUNTRY = 'HAS_COUNTRY';
export const HAS_DATE = 'HAS_DATE';
export const HAS_TIMEZONE = 'HAS_TIMEZONE';
export const CLOCKS_FONT = 'CLOCKS_FONT';

export const THEMES: IThemes = {
  light: 'light',
  dark: 'dark'
} as const;

export const INITIAL_STATE: INavbarInitialState = {
  dashboardFont: CLOCKS_FONTS.ROBOTO.value,
  hasCountry: true,
  hasDate: true,
  hasTimezone: true,
  auto: false,
  theme: THEMES.light
};
