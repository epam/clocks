import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ISnackbar } from '../../../../redux/snackbarRedux/snackbar.interface';

export interface IProps {
  snackbar: ActionCreatorWithPayload<ISnackbar, string>;
}
