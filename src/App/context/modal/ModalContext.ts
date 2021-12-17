import { createContext } from 'react';

import { InitialContext } from '../../lib/constants';
import { IModalContext } from './ModalContext.interface';

export const ModalContext = createContext<IModalContext>(InitialContext);
