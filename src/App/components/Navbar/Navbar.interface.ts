import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IAppLocation } from '../../lib/interfaces';
import { ISnackbar } from '../../redux/snackbarRedux/snackbar.interface';
import { TTheme } from '../../redux/themeRedux/theme.interface';

export interface INavbarProps {
  autoTheming: boolean;
  type: TTheme;
  setTheme: ActionCreatorWithPayload<TTheme, string>;
  toggleAutoTheming: ActionCreatorWithPayload<boolean, string>;
  addCitySidebarHandler: () => void;
  locations: IAppLocation[];
  snackbar: ActionCreatorWithPayload<ISnackbar, string>;
}
