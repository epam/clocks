import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderHook, act } from '@testing-library/react-hooks';

import useAutoTheme from '../useAutoTheme';
import reducer from '../../../redux/reducer';
import { THEME } from '../../../redux/constants';

jest.mock('react-i18next', () => ({
  useTranslation: () => jest.fn()
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

const MockMatchMedia = (query: string) => {
  switch (query) {
    case '(prefers-color-scheme)':
      return {
        matches: true,
        media: query
      };
    case `(prefers-color-scheme: ${THEME.dark})`:
      return {
        matches: true,
        media: query
      };
    default:
      return {
        matches: false,
        media: query
      };
  }
};

const store = createStore(reducer);

describe('useAutoTheme behaviour', () => {
  let windowSpy: jest.SpyInstance;

  let {
    result: { current }
  } = renderHook(useAutoTheme, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
  });

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => ({
      matchMedia: jest.fn(query => MockMatchMedia(query))
    }));

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  afterEach(() => {
    windowSpy.mockRestore();
    localStorage.clear();
  });

  it('checks device mode support ', () => {
    let modeSupports = window.matchMedia('(prefers-color-scheme)');
    expect(modeSupports).not.toBe('not all');
  });

  it('checks dark mode support/true', () => {
    let currentModeMatches;
    act(() => {
      currentModeMatches = window.matchMedia(`(prefers-color-scheme: ${THEME.dark})`).matches;
      current.setAutoTheme();
    });
    let { theme } = JSON.parse(localStorage.getItem('settings')!);

    expect(currentModeMatches).toBe(true);
    expect(store.getState().settings.theme).toEqual(THEME.dark);
    expect(theme).toBe(THEME.dark);
  });

  it('checks dark mode matches false', () => {
    let currentModeMatches;
    act(() => {
      currentModeMatches = window.matchMedia(`(prefer-colors-scheme: ${THEME.light})`).matches;
      current.setAutoTheme();
    });

    let { theme } = JSON.parse(localStorage.getItem('settings')!);
    console.log('default', theme);
    expect(currentModeMatches).toBeFalsy();
  });
});
