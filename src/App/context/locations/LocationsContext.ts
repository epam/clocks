import { createContext } from 'react';

import { InitialContext } from '../../lib/constants';
import { ILocationContext } from './LocationsContext.interface';

export const LocationsContext = createContext<ILocationContext>(InitialContext);
