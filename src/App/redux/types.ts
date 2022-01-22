import { AlertColor } from '@mui/material';

export interface IInitialState {
  deleteMode: boolean;
  theme: string;
  autoTheme?: boolean;
  showDate: boolean;
  showCountry: boolean;
  userLocation?: ILocation;
  snackbarStatus: boolean;
  snackbarText?: string;
  snackbarColor?: AlertColor;
  counter: number;
}

export interface IActionPayload {
  type: string;
  payload: any;
}

export interface IActionSettingsPayload {
  theme: string;
  autoTheme?: boolean;
  showDate: boolean;
  showCountry: boolean;
}

export interface IActionSnackbarPayload {
  status: boolean;
  text?: string;
  color?: string;
}

export interface ILocation {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string;
  province: string;
  timezone: string;
  names: string;
  comment?: string;
}

export interface IUrlLocations {
  [key: string]: IUrlLocation;
}

export interface IUrlLocation {
  city: string;
  lat: number;
  comment?: string;
  userLocation?: boolean;
}
