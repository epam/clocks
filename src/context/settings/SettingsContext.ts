import { createContext } from 'react';
import { InitialContext } from '../../constants';
import { ISettingsContext } from './ThemeContext.type';

export const SettingsContext = createContext<ISettingsContext>(InitialContext);
