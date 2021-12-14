import { IContext } from '../../types/context';

type TSnackbarContextVertical = 'bottom' | 'top';
type TSnackbarContextHorizontal = 'left' | 'right' | 'center';
type TSnackbarContextStatus = 'warning' | 'error' | 'info' | 'success';

interface ISnackbarContextPosition {
  vertical: TSnackbarContextVertical;
  horizontal: TSnackbarContextHorizontal;
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
  ISnackbarContextPosition,
  TSnackbarContextStatus
};
