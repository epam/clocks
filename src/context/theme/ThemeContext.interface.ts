import { Theme } from '@material-ui/core';

import { IContext } from '../../types/context';

type TTheme = 'light' | 'dark';

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
