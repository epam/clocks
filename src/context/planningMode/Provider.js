import React from 'react';
import { PlanningModeContext } from './Context';
import { usePlanningMode } from './hook';

export const PlanningModeProvider = ({ children }) => {
    const store = usePlanningMode();
    return <PlanningModeContext.Provider value={store}>{children}</PlanningModeContext.Provider>;
};
