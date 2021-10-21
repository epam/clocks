import { createContext } from 'react';
import { ILocationContext } from './LocationContext.type';

export const LocationsContext = createContext<ILocationContext>({
    state: {},
    actions: {}
});
