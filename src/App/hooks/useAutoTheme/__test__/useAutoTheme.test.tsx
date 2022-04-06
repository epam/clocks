import { Provider } from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import configureStore, { MockStore, MockStoreCreator } from 'redux-mock-store';

import useAutoTheme from '../useAutoTheme';
import { THEME } from '../../../redux/constants';
import { setTheme } from '../../../redux/actions';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn() })
}));

let localStorageMock = (function () {
  var store: any = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    }
  };
})();

let initialState = {
  settings: {
    theme: THEME.light,
    autoTheme: undefined
  }
};
const mockStore: MockStoreCreator = configureStore();
const store: MockStore = mockStore(initialState);

describe('useAutoTheme behaviour', () => {
  let {
    result: { current }
  } = renderHook(useAutoTheme, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
  });

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('checks theme support & dark mode support/true', () => {
    act(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: jest.fn().mockImplementation(() => ({
          matches: true,
          media: `(prefers-color-scheme: ${THEME.dark})`
        }))
      });
      current.setAutoTheme();
    });

    let modeSupports = window.matchMedia('(prefers-color-scheme)').media;
    let currentModeMatches = window.matchMedia(`(prefers-color-scheme: ${THEME.dark})`).matches;
    let { theme, autoTheme } = JSON.parse(localStorageMock.getItem('settings'));

    expect(modeSupports).not.toBe('not all');
    expect(currentModeMatches).toBeTruthy();
    expect(theme).toBe(THEME.dark);
    expect(autoTheme).not.toBeDefined();
    expect(store.getActions()[0]).toEqual(setTheme(THEME.dark));
  });

  it('checks dark mode matches false || leave as default light mode', () => {
    act(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: jest.fn().mockImplementation(() => ({
          matches: false,
          media: `(prefers-color-scheme: ${THEME.dark})`
        }))
      });
      current.setAutoTheme();
    });

    let currentModeMatches = window.matchMedia(`(prefer-colors-scheme: ${THEME.dark})`).matches;
    let { theme, autoTheme } = JSON.parse(localStorageMock.getItem('settings'));

    expect(currentModeMatches).toBeFalsy();
    expect(theme).toBe(THEME.light);
    expect(autoTheme).not.toBeDefined();
  });

  it('checks theme does not support', () => {
    act(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: jest.fn().mockImplementation(() => ({
          matches: false,
          media: 'not all'
        }))
      });
      current.setAutoTheme();
    });
    let modeSupports = window.matchMedia('(prefers-color-scheme)').media;

    expect(modeSupports).toBe('not all');
  });
});
