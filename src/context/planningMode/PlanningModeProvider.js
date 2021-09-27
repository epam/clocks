import React from 'react';
import { PlanningModeContext } from './PlanningModeContext';
import { usePlanningMode } from './usePlanningMode';

export const PlanningModeProvider = ({ children }) => {
    const store = usePlanningMode();
    return <PlanningModeContext.Provider value={store}>{children}</PlanningModeContext.Provider>;
};
