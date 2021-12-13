import { createContext } from 'react';

import { InitialContext } from '../../constants';
import { ISnackbarContext } from './SnackbarContext.interface';

export const SnackbarContext = createContext<ISnackbarContext>(InitialContext);
