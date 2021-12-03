import { useState } from 'react';
import { IPlanningModeContext } from './PlanningModeContext.type';

export const usePlanningMode = (): IPlanningModeContext => {
  const [isPlanningModeOn, setIsPlanningModeOn] = useState<boolean>(false);

  const PlanningModeHandler = (isPlanningModeOn?: boolean) => {
    if (typeof isPlanningModeOn === 'boolean') {
      return setIsPlanningModeOn(isPlanningModeOn);
    }
    setIsPlanningModeOn(prev => !prev);
  };

  return {
    state: { isPlanningModeOn },
    actions: { PlanningModeHandler }
  };
};
