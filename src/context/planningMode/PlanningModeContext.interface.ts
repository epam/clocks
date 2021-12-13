import { IContext } from '../../types/context';

interface IPlanningModeContextState {
  isPlanningModeOn: boolean;
}

interface IPlanningModeContextActions {
  PlanningModeHandler: (isPlanningModeOn?: boolean) => void;
}

interface IPlanningModeContext
  extends IContext<IPlanningModeContextState, IPlanningModeContextActions> {}

export type { IPlanningModeContext };
