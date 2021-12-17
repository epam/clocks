import { IContext } from '../../lib/interfaces';

type Vertical = 'bottom' | 'top';
type Horizontal = 'left' | 'right' | 'center';
type TSnackbarContextStatus = 'warning' | 'error' | 'info' | 'success';

interface ISnackbarContextPosition {
  vertical: Vertical;
  horizontal: Horizontal;
}

interface ISnackbarContextState {
  isSnackbarOpen: boolean;
  message: string;
  position: ISnackbarContextPosition;
  status: TSnackbarContextStatus;
}

interface ISnackbarContextActions {
  SnackbarHandler: (isOpen?: boolean) => void;
  OpenSnackbar: (
    message: string,
    status?: TSnackbarContextStatus,
    position?: ISnackbarContextPosition
  ) => void;
  SetSnackbarPosition: ({
    vertical,
    horizontal
  }: ISnackbarContextPosition) => void;
  SetSnackbarStatus: (status: TSnackbarContextStatus) => void;
}

interface ISnackbarContext
  extends IContext<ISnackbarContextState, ISnackbarContextActions> {}

export type {
  ISnackbarContext,
  TSnackbarContextStatus,
  ISnackbarContextPosition
};
