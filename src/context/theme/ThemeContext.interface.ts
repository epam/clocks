import { Theme } from '@material-ui/core';

import { IContext } from '../../types/context';

interface IThemeContextState {
  type: string;
  theme: Theme;
}

interface IThemeContextActions {
  ThemeHandler: () => void;
}

interface IThemeContext
  extends IContext<IThemeContextState, IThemeContextActions> {}

export type { IThemeContext };
