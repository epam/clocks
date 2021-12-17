import { createContext } from 'react';

import { InitialContext } from '../../lib/constants';
import { ISettingsContext } from './SettingsContext.interface';

export const SettingsContext = createContext<ISettingsContext>(InitialContext);
