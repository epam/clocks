import { createContext } from 'react';

import { InitialContext } from '../../lib/constants';
import { IThemeContext } from './ThemeContext.interface';

export const ThemeContext = createContext<IThemeContext>(InitialContext);
