export type TSnackbarType = 'warning' | 'error' | 'info' | 'success';

export interface ISnackbarInitialState {
  visibility: boolean;
  message: string;
  type: TSnackbarType;
}

export interface ISnackbar {
  visibility: boolean;
  message?: string;
  type?: TSnackbarType;
}
