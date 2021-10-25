import { createContext } from 'react';
import { DefaultContext } from '../default';
import { IPlanningModeContext } from './PlanningModeContext.type';

export const PlanningModeContext = createContext<IPlanningModeContext>(DefaultContext);
