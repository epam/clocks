import { IContext } from '../../types/context';

interface IState {
    width: number;
    height: number;
    showDrawerMobile: boolean;
}

interface IActions {
    WidthHandler: () => void;
    HeightHandler: () => void;
    HandleDrawerMobile: (nextState: boolean) => void;
}

interface IScreenSizesContext extends IContext<IState, IActions> {}

export type { IScreenSizesContext };
