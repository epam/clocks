import { Theme } from '@material-ui/core';
import { IContext } from '../../types/context';

interface IState {
    type: string;
    theme: Theme;
}

interface IActions {
    ThemeHandler: () => void;
}

interface IThemeContext extends IContext<IState, IActions> {}

export type { IThemeContext };
