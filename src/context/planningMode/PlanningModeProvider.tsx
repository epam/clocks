import { FC } from 'react';

import { IProviderProp } from '../../types/provider';
import { PlanningModeContext } from './PlanningModeContext';
import { usePlanningMode } from './usePlanningMode';

export const PlanningModeProvider: FC<IProviderProp> = ({ children }) => {
  const store = usePlanningMode();
  return (
    <PlanningModeContext.Provider value={store}>
      {children}
    </PlanningModeContext.Provider>
  );
};
