import { IContext } from '../../types/context';

type Vertical = 'bottom' | 'top';
type Horizontal = 'left' | 'right' | 'center';
type Status = 'warning' | 'danger' | 'info' | 'success';

interface Position {
    vertical: Vertical;
    horizontal: Horizontal;
}

interface IState {
    isSnackbarOpen: boolean;
    message: string;
    position: Position;
    status: Status;
}

interface IActions {
    SnackbarHandler: (isOpen?: boolean) => void;
    OpenSnackbar: (message: string, status?: Status, position?: Position) => void;
    SetSnackbarPosition: ({ vertical, horizontal }: Position) => void;
    SetSnackbarStatus: (status: Status) => void;
}

interface ISnackbarContext extends IContext<IState, IActions> {}

export type { ISnackbarContext };
