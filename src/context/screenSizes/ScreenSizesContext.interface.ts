import { IContext } from '../../types/context';

interface IScreenSizesContextState {
  width: number;
  height: number;
  showDrawerMobile: boolean;
}

interface IScreenSizesContextActions {
  WidthHandler: () => void;
  HeightHandler: () => void;
  HandleDrawerMobile: (nextState: boolean) => void;
}

interface IScreenSizesContext
  extends IContext<IScreenSizesContextState, IScreenSizesContextActions> {}

export type { IScreenSizesContext };
