import { Dispatch, SetStateAction } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IAppLocation } from '../../lib/interfaces';
import { TTheme } from '../../redux/themeRedux/theme.interface';

export interface ISettingsModalProps {
  autoTheming: boolean;
  type: TTheme;
  setTheme: ActionCreatorWithPayload<TTheme, string>;
  toggleAutoTheming: ActionCreatorWithPayload<boolean, string>;
  locations: IAppLocation[];
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}
