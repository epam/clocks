import { TIME_FORMAT } from '../../../../redux/constants';

export const SETTING_VALUE = {
  date: 'date',
  country: 'country',
  auto: 'auto',
  autoSorting: 'autoSorting',
  timezone: 'timezone',
  ...TIME_FORMAT
};

export const INPUT_IDS = {
  showDate: 'showDate',
  showCountryName: 'showCountryName',
  showTimeZone: 'showTimeZone',
  hourFormat24: 'hourFormat24',
  hourFormat12: 'hourFormat12',
  autoTheming: 'autoTheming',
  lightTheme: 'lightTheme',
  darkTheme: 'darkTheme'
};
