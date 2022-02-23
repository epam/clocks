import { TSliderType } from './types';

export const ACTION_TYPE = {
  setTheme: '/set-theme',
  setDeleteMode: '/set-delete-mode',
  setPlanningMode: '/set-planning-mode',
  setSettings: '/set-settings',
  setSnackbar: '/set-snackbar',
  setUserLocation: '/set-user-location',
  setCounter: '/set-counter'
};

export const THEME = {
  light: 'light',
  dark: 'dark'
};

export const TIME_FORMAT = {
  H24: 'H24',
  H12: 'H12'
};

export const SLIDER_TYPE: { VERTICAL: TSliderType; HORIZONTAL: TSliderType } = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};
