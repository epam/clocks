import { AlertColor } from '@mui/material';

export interface IInitialState {
  deleteMode: boolean;
  planningMode: boolean;
  theme: string;
  autoTheme?: boolean;
  showDate: boolean;
  showCountry: boolean;
  locationsDB: ILocation[];
  userLocation?: ILocation;
  snackbarStatus: boolean;
  snackbarText?: string;
  snackbarColor?: AlertColor;
  counter: number;
  additionalHours: number;
  timeFormat: string;
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
  timeFormat: string;
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
  offset: number;
}

export interface IActionPlanningModePayload {
  status: boolean;
  additionalHours?: number;
}
