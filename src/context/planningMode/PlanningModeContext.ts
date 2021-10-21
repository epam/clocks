import { createContext } from 'react';
import { IPlanningModeContext } from './PlanningMode.type';

export const PlanningModeContext = createContext<IPlanningModeContext>({ state: {}, actions: {} });
