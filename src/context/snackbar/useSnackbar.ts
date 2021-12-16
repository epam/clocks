import { useState } from 'react';

import {
  ISnackbarContext,
  ISnackbarContextPosition,
  TSnackbarContextStatus
} from './SnackbarContext.interface';

export const useSnackbar = (): ISnackbarContext => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<ISnackbarContextPosition>({
    vertical: 'bottom',
    horizontal: 'center'
  });
  const [status, setStatus] = useState<TSnackbarContextStatus>('success');

  const SnackbarHandler = (isOpen?: boolean) => {
    if (typeof isOpen === 'boolean') {
      return setIsSnackbarOpen(isOpen);
    }
    setIsSnackbarOpen(prev => !prev);
  };

  const OpenSnackbar = (
    message: string,
    status?: TSnackbarContextStatus,
    position?: ISnackbarContextPosition
  ) => {
    if (status) {
      setStatus(status);
    } else if (position) {
      setPosition(prevState => ({ ...prevState, ...position }));
    }
    setMessage(message);
    setIsSnackbarOpen(true);
  };

  const SetSnackbarPosition = ({
    vertical = 'bottom',
    horizontal = 'center'
  }: ISnackbarContextPosition) => {
    setPosition({ vertical, horizontal });
  };

  const SetSnackbarStatus = (status: TSnackbarContextStatus = 'success') => {
    setStatus(status);
  };

  return {
    state: {
      isSnackbarOpen,
      position,
      message,
      status
    },
    actions: {
      SnackbarHandler,
      OpenSnackbar,
      SetSnackbarPosition,
      SetSnackbarStatus
    }
  };
};
