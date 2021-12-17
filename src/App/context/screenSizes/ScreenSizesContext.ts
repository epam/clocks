import { createContext } from 'react';

import { InitialContext } from '../../lib/constants';
import { IScreenSizesContext } from './ScreenSizesContext.interface';

export const ScreenSizesContext =
  createContext<IScreenSizesContext>(InitialContext);
