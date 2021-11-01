import { createContext } from 'react';
import { InitialContext } from '../../constants';
import { IPlanningModeContext } from './PlanningModeContext.type';

export const PlanningModeContext = createContext<IPlanningModeContext>(InitialContext);
