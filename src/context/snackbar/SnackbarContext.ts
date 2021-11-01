import { createContext } from 'react';
import { InitialContext } from '../../constants';
import { ISnackbarContext } from './SnackbarContext.type';

export const SnackbarContext = createContext<ISnackbarContext>(InitialContext);
