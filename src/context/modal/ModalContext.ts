import { createContext } from 'react';
import { IModalContext } from './ModalContext.type';

export const ModalContext = createContext<IModalContext>({ state: {}, actions: {} });
