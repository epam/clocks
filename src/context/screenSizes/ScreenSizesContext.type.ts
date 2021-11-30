import { IContext } from '../../types/context';

interface IState {
    width: number;
    height: number;
}

interface IActions {
    WidthHandler: () => void;
    HeightHandler: () => void;
}

interface IScreenSizesContext extends IContext<IState, IActions> {}

export type { IScreenSizesContext };
