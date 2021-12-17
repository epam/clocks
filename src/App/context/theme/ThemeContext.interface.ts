import { Theme } from '@material-ui/core';

import { IContext } from '../../lib/interfaces';

type TTheme = 'light' | 'dark';

export interface IThemes {
  [key: string]: TTheme;
}

interface IThemeContextState {
  type: string;
  theme: Theme;
  autoTheming: boolean;
}

interface IThemeContextActions {
  ThemeHandler: (type?: TTheme) => void;
  AutoThemingHandler: (isAutoThemingOn?: boolean) => void;
}

interface IThemeContext
  extends IContext<IThemeContextState, IThemeContextActions> {}

export type { IThemeContext, TTheme };
