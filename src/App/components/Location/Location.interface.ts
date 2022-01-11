import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TTheme } from '../../redux/themeRedux/theme.interface';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';

export interface ILocationProps extends IAppLocation {
  type: TTheme;
  visibility: boolean;
  changeUserCurrentLocation: ActionCreatorWithPayload<any, string>;
  snackbar: ActionCreatorWithPayload<any, string>;
}
