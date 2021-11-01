import { createContext } from 'react';
import { InitialContext } from '../../constants';
import { ILocationContext } from './LocationsContext.type';

export const LocationsContext = createContext<ILocationContext>(InitialContext);
