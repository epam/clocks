import { IContext } from '../../lib/interfaces';

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
