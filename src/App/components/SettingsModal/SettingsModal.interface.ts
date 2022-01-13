import { Dispatch, SetStateAction } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TTheme } from '../../redux/themeRedux/theme.interface';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';
import { IFont } from '../../redux/navbarRedux/locations.interface';

export interface ISettingsModalProps {
  autoTheming: boolean;
  type: TTheme;
  setTheme: ActionCreatorWithPayload<TTheme, string>;
  toggleAutoTheming: ActionCreatorWithPayload<boolean, string>;
  locations: IAppLocation[];
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  hasCountry: boolean;
  hasDate: boolean;
  hasTimezone: boolean;
  hasCountryHandler: ActionCreatorWithPayload<any, string>;
  hasDateHandler: ActionCreatorWithPayload<any, string>;
  hasTimezoneHandler: ActionCreatorWithPayload<any, string>;
  fontHandler: ActionCreatorWithPayload<any, string>;
  dashboardFont: IFont;
}
