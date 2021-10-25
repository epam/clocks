import { createContext } from 'react';
import { IPlanningModeContext } from './PlanningModeContext.type';

export const PlanningModeContext = createContext<IPlanningModeContext>({ state: {}, actions: {} });
