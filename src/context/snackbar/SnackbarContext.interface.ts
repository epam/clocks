import { IContext } from '../../types/context';

interface ISnackbarContextState {
  isSnackbarOpen: boolean;
  message: string;
}

interface ISnackbarContextActions {
  SnackbarHandler: (isOpen?: boolean) => void;
  OpenSnackbar: (message: string) => void;
}

interface ISnackbarContext
  extends IContext<ISnackbarContextState, ISnackbarContextActions> {}

export type { ISnackbarContext };
