import { IContext } from '../../types/context';

interface IState {
  isPlanningModeOn: boolean;
}

interface IActions {
  PlanningModeHandler: (isPlanningModeOn?: boolean) => void;
}

interface IPlanningModeContext extends IContext<IState, IActions> {}

export type { IPlanningModeContext };
