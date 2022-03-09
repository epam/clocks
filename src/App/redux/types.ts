import { AlertColor } from '@mui/material';

export interface IInitialState {
  locations: {
    locationsDB: ILocation[];
    userLocation?: ILocation;
  };
  deleteMode: {
    isOn: boolean;
  };
  dragDropMode: {
    isOn: boolean;
  };
  settings: {
    theme: string;
    autoTheme?: boolean;
    showDate: boolean;
    showCountry: boolean;
    showTimezone: boolean;
    timeFormat: string;
    autoSorting: boolean;
  };
  snackbar: {
    status: boolean;
    text?: string;
    color?: AlertColor;
  };
  planningMode: {
    isOn: boolean;
    additionalHours: number;
  };
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
  showTimezone: boolean;
  timeFormat: string;
  autoSorting: boolean;
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
  isOn: boolean;
  additionalHours?: number;
}
