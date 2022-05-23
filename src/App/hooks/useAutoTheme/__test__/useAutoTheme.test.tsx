import reducer from '../../../redux/reducer';
import { locationsDB } from '../../../redux/locationsDB';
import { THEME, TIME_FORMAT } from '../../../redux/constants';
import { ACTION_TYPE } from '../../../redux/constants';

jest.mock('../../useAutoTheme');

describe('useAutoTheme test', () => {
  test('initial state of the autoTheme should be undefined in the store', () => {
    expect(reducer(undefined, { type: '', payload: '' })).toEqual({
      locations: {
        locationsDB: locationsDB,
        userLocation: undefined
      },
      deleteMode: {
        isOn: false
      },
      dragDropMode: {
        isOn: false
      },
      settings: {
        theme: THEME.light,
        autoTheme: undefined,
        showDate: true,
        showCountry: true,
        timeFormat: TIME_FORMAT.H24,
        autoSorting: false,
        showTimezone: false
      },
      snackbar: {
        status: false,
        text: undefined,
        color: undefined
      },
      onboarding: undefined,
      planningMode: {
        isOn: false,
        additionalHours: 0
      },
      counter: 0
    });
  });

  test('state should change to dark theme when dark mode is selected', () => {
    expect(reducer(undefined, { type: ACTION_TYPE.setTheme, payload: THEME.dark })).toEqual({
      locations: {
        locationsDB: locationsDB,
        userLocation: undefined
      },
      deleteMode: {
        isOn: false
      },
      dragDropMode: {
        isOn: false
      },
      settings: {
        theme: THEME.dark,
        autoTheme: undefined,
        showDate: true,
        showCountry: true,
        timeFormat: TIME_FORMAT.H24,
        autoSorting: false,
        showTimezone: false
      },
      snackbar: {
        status: false,
        text: undefined,
        color: undefined
      },
      onboarding: undefined,
      planningMode: {
        isOn: false,
        additionalHours: 0
      },
      counter: 0
    });
  });

  test('state should change to loght theme when light mode is selected', () => {
    expect(reducer(undefined, { type: ACTION_TYPE.setTheme, payload: THEME.light })).toEqual({
      locations: {
        locationsDB: locationsDB,
        userLocation: undefined
      },
      deleteMode: {
        isOn: false
      },
      dragDropMode: {
        isOn: false
      },
      settings: {
        theme: THEME.light,
        autoTheme: undefined,
        showDate: true,
        showCountry: true,
        timeFormat: TIME_FORMAT.H24,
        autoSorting: false,
        showTimezone: false
      },
      snackbar: {
        status: false,
        text: undefined,
        color: undefined
      },
      onboarding: undefined,
      planningMode: {
        isOn: false,
        additionalHours: 0
      },
      counter: 0
    });
  });
});
