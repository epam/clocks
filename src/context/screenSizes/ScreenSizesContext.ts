import { createContext } from 'react';

import { InitialContext } from '../../constants';
import { IScreenSizesContext } from './ScreenSizesContext.interface';

export const ScreenSizesContext =
  createContext<IScreenSizesContext>(InitialContext);
