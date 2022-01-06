import { ISnackbarInitialState } from './snackbar.interface';

export const Snackbar = {
  success: 'success',
  info: 'info',
  error: 'error',
  warning: 'warning'
} as const;

export const INITIAL_STATE: ISnackbarInitialState = {
  visibility: false,
  message: '',
  type: Snackbar.success
};
