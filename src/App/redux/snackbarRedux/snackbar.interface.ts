export type TSnackbarType = 'warning' | 'error' | 'info' | 'success';

export interface ISnackbarInitialState {
  visibility: boolean;
  message: string;
  type: TSnackbarType;
}

export interface ISnackbarVisibility {
  visibility: boolean;
  message?: string;
  type?: TSnackbarType;
}
