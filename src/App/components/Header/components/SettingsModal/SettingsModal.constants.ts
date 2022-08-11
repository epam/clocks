import { TIME_FORMAT, TIMEZONE } from '../../../../redux/constants';

export const SETTING_VALUE = {
  date: 'date',
  country: 'country',
  auto: 'auto',
  autoSorting: 'autoSorting',
  ...TIMEZONE,
  ...TIME_FORMAT
};

export const INPUT_IDS = {
  showDate: 'showDate',
  showCountryName: 'showCountryName',
  hourFormat24: 'hourFormat24',
  hourFormat12: 'hourFormat12',
  autoSorting: 'autoSorting',
  autoTheming: 'autoTheming',
  lightTheme: 'lightTheme',
  darkTheme: 'darkTheme',
  disableTimezone: 'disableTimezone',
  abbreviationTimezone: 'abbreviationTimezone',
  countryTimezone: 'countryTimezone',
  abbreviationAndCountryTimezone: 'abbreviationAndCountryTimezone'
};
