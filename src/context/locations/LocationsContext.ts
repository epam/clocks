import { createContext } from 'react';
import { ILocationContext } from './LocationsContext.type';

export const LocationsContext = createContext<ILocationContext>({
    state: {},
    actions: {}
});
