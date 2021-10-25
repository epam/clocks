import { createContext } from 'react';
import { DefaultContext } from '../default';
import { IModalContext } from './ModalContext.type';

export const ModalContext = createContext<IModalContext>(DefaultContext);
