import { useState } from 'react';

import {
  ISnackbarContext,
  Position,
  Status
} from './SnackbarContext.interface';

export const useSnackbar = (): ISnackbarContext => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<Position>({
    vertical: 'bottom',
    horizontal: 'center'
  });
  const [status, setStatus] = useState<Status>('success');

  const SnackbarHandler = (isOpen?: boolean) => {
    if (typeof isOpen === 'boolean') {
      return setIsSnackbarOpen(isOpen);
    }
    setIsSnackbarOpen(prev => !prev);
  };

  const OpenSnackbar = (
    message: string,
    status?: Status,
    position?: Position
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
  }: Position) => {
    setPosition({ vertical, horizontal });
  };

  const SetSnackbarStatus = (status: Status = 'success') => {
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
