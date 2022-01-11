import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  ISnackbar,
  ISnackbarInitialState
} from '../../redux/snackbarRedux/snackbar.interface';

export interface ISnackbarProps extends ISnackbarInitialState {
  snackbar: ActionCreatorWithPayload<ISnackbar, string>;
}
