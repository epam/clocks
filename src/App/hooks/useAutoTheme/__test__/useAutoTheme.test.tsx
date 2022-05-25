import reducer from '../../../redux/reducer';
import { locationsDB } from '../../../redux/locationsDB';
import { THEME, TIME_FORMAT } from '../../../redux/constants';
import { ACTION_TYPE } from '../../../redux/constants';

jest.mock('../../useAutoTheme');
let mockState = {
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
};

describe('useAutoTheme test', () => {
  test('initial state of the autoTheme should be undefined in the store', () => {
    expect(reducer(undefined, { type: '', payload: '' })).toEqual({
      ...mockState,
      settings: { ...mockState.settings, theme: THEME.light }
    });
  });

  test('state should change to dark theme when dark mode is selected', () => {
    expect(reducer(undefined, { type: ACTION_TYPE.setTheme, payload: THEME.dark })).toEqual({
      ...mockState,
      settings: { ...mockState.settings, theme: THEME.dark }
    });
  });

  test('state should change to light theme when light mode is selected', () => {
    expect(reducer(undefined, { type: ACTION_TYPE.setTheme, payload: THEME.light })).toEqual({
      ...mockState,
      settings: { ...mockState.settings, theme: THEME.light }
    });
  });
});
