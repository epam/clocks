import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ConnectedProps } from 'react-redux';

import { ISnackbar } from '../../redux/snackbarRedux/snackbar.interface';
import { TTheme } from '../../redux/themeRedux/theme.interface';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';

import { connector } from './NavbarContainer';

export interface INavbarProps {
  autoTheming: boolean;
  type: TTheme;
  setTheme: ActionCreatorWithPayload<TTheme, string>;
  toggleAutoTheming: ActionCreatorWithPayload<boolean, string>;
  addCitySidebarHandler: () => void;
  locations: IAppLocation[];
  snackbarHandler: ActionCreatorWithPayload<ISnackbar, string>;
}

export interface INavbarPropsR extends ConnectedProps<typeof connector> {}
