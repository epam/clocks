import { createContext } from 'react';

import { InitialContext } from '../../constants';
import { IThemeContext } from './ThemeContext.interface';

export const ThemeContext = createContext<IThemeContext>(InitialContext);
