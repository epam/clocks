import { createContext } from 'react';
import { DefaultContext } from '../default';
import { ISnackbarContext } from './SnackbarContext.type';

export const SnackbarContext = createContext<ISnackbarContext>(DefaultContext);
