import { IContext } from '../../types/context';

interface IState {
  isSnackbarOpen: boolean;
  message: string;
}

interface IActions {
  SnackbarHandler: (isOpen?: boolean) => void;
  OpenSnackbar: (message: string) => void;
}

interface ISnackbarContext extends IContext<IState, IActions> {}

export type { ISnackbarContext };
