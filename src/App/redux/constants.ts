export const ACTION_TYPE = {
  setTheme: '/set-theme',
  setDeleteMode: '/set-delete-mode',
  setPlanningMode: '/set-planning-mode',
  setSettings: '/set-settings',
  setSnackbar: '/set-snackbar',
  setUserLocation: '/set-user-location',
  setCounter: '/set-counter',
};

export const THEME = {
  light: 'light',
  dark: 'dark'
};

export const TIME_FORMAT = {
  H24: 'H24',
  H12: 'H12'
};

export const CLOCK_MARKS = {
  horizontal: [
    { value: -12, label: '-12' },
    { value: -11, label: '' },
    { value: -10, label: '-10' },
    { value: -9, label: '' },
    { value: -8, label: '-8' },
    { value: -7, label: '' },
    { value: -6, label: '-6' },
    { value: -5, label: '' },
    { value: -4, label: '-4' },
    { value: -3, label: '' },
    { value: -2, label: '-2' },
    { value: -1, label: '' },
    { value: 0, label: '0' },
    { value: 1, label: '' },
    { value: 2, label: '+2' },
    { value: 3, label: '' },
    { value: 4, label: '+4' },
    { value: 5, label: '' },
    { value: 6, label: '+6' },
    { value: 7, label: '' },
    { value: 8, label: '+8' },
    { value: 9, label: '' },
    { value: 10, label: '+10' },
    { value: 11, label: '' },
    { value: 12, label: '+12' }
  ],
  vertical: [
    { value: -12, label: '' },
    { value: -11, label: '' },
    { value: -10, label: '' },
    { value: -9, label: '' },
    { value: -8, label: '' },
    { value: -7, label: '' },
    { value: -6, label: '' },
    { value: -5, label: '' },
    { value: -4, label: '' },
    { value: -3, label: '' },
    { value: -2, label: '' },
    { value: -1, label: '' },
    { value: 0, label: '' },
    { value: 1, label: '' },
    { value: 2, label: '' },
    { value: 3, label: '' },
    { value: 4, label: '' },
    { value: 5, label: '' },
    { value: 6, label: '' },
    { value: 7, label: '' },
    { value: 8, label: '' },
    { value: 9, label: '' },
    { value: 10, label: '' },
    { value: 11, label: '' },
    { value: 12, label: '' }
  ]
};
