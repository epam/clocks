import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';

export interface ILocationProps extends IAppLocation {
  visibility: boolean;
  changeUserCurrentLocation: ActionCreatorWithPayload<any, string>;
  snackbar: ActionCreatorWithPayload<any, string>;
}
