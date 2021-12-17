import { createContext } from 'react';

import { InitialContext } from '../../lib/constants';
import { IPlanningModeContext } from './PlanningModeContext.interface';

export const PlanningModeContext =
  createContext<IPlanningModeContext>(InitialContext);
