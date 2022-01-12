import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TTheme } from '../../redux/themeRedux/theme.interface';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';
import { ISnackbar } from '../../redux/snackbarRedux/snackbar.interface';

export interface ILocationProps extends IAppLocation {
  type: TTheme;
  visibility: boolean;
  changeUserCurrentLocation: ActionCreatorWithPayload<any, string>;
  snackbar: ActionCreatorWithPayload<ISnackbar, string>;
}
