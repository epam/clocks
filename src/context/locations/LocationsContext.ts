import { createContext } from 'react';
import { DefaultContext } from '../default';
import { ILocationContext } from './LocationsContext.type';

export const LocationsContext = createContext<ILocationContext>(DefaultContext);
