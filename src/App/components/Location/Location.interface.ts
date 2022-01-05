import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IAppLocation } from '../../lib/interfaces';

export interface ILocationProps extends IAppLocation {
  changeUserCurrentLocation: ActionCreatorWithPayload<any, string>;
}
