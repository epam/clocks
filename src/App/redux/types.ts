import { AlertColor } from '@mui/material';

export interface IInitialState {
  locations: {
    locationsDB: ILocation[];
    userLocation?: ILocation;
    timezonesDB: ITimezonesDB;
  };
  deleteMode: {
    isOn: boolean;
  };
  settings: {
    theme: string;
    autoTheme?: boolean;
    showDate: boolean;
    showCountry: boolean;
    showFooter: boolean;
    showTimezone: string;
    timeFormat: string;
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
  onboarding?: IOnboarding;
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
  showTimezone: string;
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
  population: number;
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

export interface ITimezonesDB {
  abbreviations: string[];
  timezones: { abbreviation: string; values: string[] }[];
}
export interface IOnboarding {
  planningMode: boolean;
  deleteButton: boolean;
  settingsModal: boolean;
  shareButton: boolean;
  addCity: boolean;
  comment: boolean;
  myLocation: boolean;
  helpModule: boolean;
  reloadOnboarding: boolean;
}
export interface IActionPlanningModePayload {
  isOn: boolean;
  additionalHours?: number;
}
