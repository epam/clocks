import { IContext } from './interfaces';
import { IThemes } from '../context/theme/ThemeContext.interface';

export const editorConfig = {
  toolbar: {
    items: ['bold', 'italic']
  },
  language: 'en',
  licenseKey: ''
};

export const CLOCKS_FONTS: {
  [fontName: string]: {
    value: string;
    label: string;
  };
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

export const InitialContext: IContext<{}, {}> = {
  state: {},
  actions: {}
};

export const THEMES: IThemes = {
  light: 'light',
  dark: 'dark'
};

export const PARAM_KEYWORD = 'locations';
export const DASHBOARD_PARAM_KEYWORD = 'name';
export const CURRENT_USER_LOCATION_ID = 'CURRENT_USER_LOCATION_ID';
export const HAS_COUNTRY = 'HAS_COUNTRY';
export const HAS_DATE = 'HAS_DATE';
export const HAS_TIMEZONE = 'HAS_TIMEZONE';
export const CLOCKS_FONT = 'CLOCKS_FONT';
export const AUTO_THEMING = 'AUTO_THEMING';
export const THEME = 'THEME';
