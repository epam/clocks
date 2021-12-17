import { createContext } from 'react';

import { InitialContext } from '../../lib/constants';
import { ISnackbarContext } from './SnackbarContext.interface';

export const SnackbarContext = createContext<ISnackbarContext>(InitialContext);
