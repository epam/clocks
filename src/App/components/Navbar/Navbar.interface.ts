import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ISnackbar } from '../../redux/snackbarRedux/snackbar.interface';
import { TTheme } from '../../redux/themeRedux/theme.interface';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';

export interface INavbarProps {
  autoTheming: boolean;
  type: TTheme;
  setTheme: ActionCreatorWithPayload<TTheme, string>;
  toggleAutoTheming: ActionCreatorWithPayload<boolean, string>;
  addCitySidebarHandler: () => void;
  locations: IAppLocation[];
  snackbar: ActionCreatorWithPayload<ISnackbar, string>;
}
