import { createContext } from 'react';
import { InitialContext } from '../../constants';
import { IThemeContext } from './ThemeContext.type';

export const ThemeContext = createContext<IThemeContext>(InitialContext);
