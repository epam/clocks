import { IContext } from '../../types/context';

type Vertical = 'bottom' | 'top';
type Horizontal = 'left' | 'right' | 'center';
type Status = 'warning' | 'error' | 'info' | 'success';

interface Position {
  vertical: Vertical;
  horizontal: Horizontal;
}

interface ISnackbarContextState {
  isSnackbarOpen: boolean;
  message: string;
  position: Position;
  status: Status;
}

interface ISnackbarContextActions {
  SnackbarHandler: (isOpen?: boolean) => void;
  OpenSnackbar: (message: string, status?: Status, position?: Position) => void;
  SetSnackbarPosition: ({ vertical, horizontal }: Position) => void;
  SetSnackbarStatus: (status: Status) => void;
}

interface ISnackbarContext
  extends IContext<ISnackbarContextState, ISnackbarContextActions> {}

export type { ISnackbarContext, Status, Position };
