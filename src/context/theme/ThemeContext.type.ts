import { Theme } from '@material-ui/core';
import { IContext } from '../../types/context';

type TTheme = 'light' | 'dark';

interface IState {
  type: string;
  theme: Theme;
  autoTheming: boolean;
}

interface IActions {
  ThemeHandler: (type?: TTheme) => void;
  AutoThemingHandler: (isAutoThemingOn?: boolean) => void;
}

interface IThemeContext extends IContext<IState, IActions> {}

export type { IThemeContext, TTheme };
