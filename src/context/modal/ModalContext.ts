import { createContext } from 'react';
import { InitialContext } from '../../constants';
import { IModalContext } from './ModalContext.type';

export const ModalContext = createContext<IModalContext>(InitialContext);
