import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TTheme } from '../../context/theme/ThemeContext.interface';
import { IAppLocation } from '../../lib/interfaces';

export interface IDashboardProps {
  currentTheme: TTheme;
  locations: IAppLocation[];
  ChangeUserCurrentLocation: ActionCreatorWithPayload<any, string>;
  SetLocations: ActionCreatorWithPayload<any, string>;
}
