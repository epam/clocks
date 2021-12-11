import { createContext } from 'react';
import { InitialContext } from '../../constants';
import { IScreenSizesContext } from './ScreenSizesContext.type';

export const ScreenSizesContext =
  createContext<IScreenSizesContext>(InitialContext);
