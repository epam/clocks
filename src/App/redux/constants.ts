export const ACTION_TYPE = {
  setTheme: '/set-theme',
  setDeleteMode: '/set-delete-mode',
  setPlanningMode: '/set-planning-mode',
  setSettings: '/set-settings',
  setSnackbar: '/set-snackbar',
  setUserLocation: '/set-user-location',
  setCounter: '/set-counter',
  setTimeFormat: '/set-time-format'
};

export const THEME = {
  light: 'light',
  dark: 'dark'
};

export const TIME_FORMAT = {
  H24: 'H24',
  H12: 'H12'
};

export const CLOCK_MARKS = [
  { value: -12, label: '-12' },
  { value: -11, label: '-11' },
  { value: -10, label: '-10' },
  { value: -9, label: '-9' },
  { value: -8, label: '-8' },
  { value: -7, label: '-7' },
  { value: -6, label: '-6' },
  { value: -5, label: '-5' },
  { value: -4, label: '-4' },
  { value: -3, label: '-3' },
  { value: -2, label: '-2' },
  { value: -1, label: '-1' },
  { value: 0, label: '0' },
  { value: 1, label: '+1' },
  { value: 2, label: '+2' },
  { value: 3, label: '+3' },
  { value: 4, label: '+4' },
  { value: 5, label: '+5' },
  { value: 6, label: '+6' },
  { value: 7, label: '+7' },
  { value: 8, label: '+8' },
  { value: 9, label: '+9' },
  { value: 10, label: '+10' },
  { value: 11, label: '+11' },
  { value: 12, label: '+12' }
];
