import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IAppLocation } from '../../lib/interfaces';
import { TTheme } from '../../redux/themeRedux/theme.interface';

export interface ILocationProps extends IAppLocation {
  type: TTheme;
  visibility: boolean;
  changeUserCurrentLocation: ActionCreatorWithPayload<any, string>;
  snackbar: ActionCreatorWithPayload<any, string>;
}
