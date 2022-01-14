import { Dispatch, SetStateAction } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IFont, TTheme } from '../../redux/navbarRedux/navbar.interface';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';

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
