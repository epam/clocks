import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeContext, ThemeProvider } from '../../context/theme';
import { SettingsContext } from '../../context/settings';
import {
  AUTO_THEMING,
  HAS_COUNTRY,
  HAS_DATE,
  HAS_TIMEZONE,
  THEME,
  THEMES
} from '../../lib/constants';

import SettingsModal from './SettingsModal';

const MockSettingsModalHandler = jest.fn();
const MockSetItem = jest.fn();
const MockThemeHandler = jest.fn();
const MockAutoThemingHandler = jest.fn();

jest.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    setItem: MockSetItem,
    getItem: (key: string) => {
      switch (key) {
        case 'THEME':
          return 'dark';
        case 'AUTO_THEMING':
          return 'false';
        default:
          return null;
      }
    }
  })
}));

const localStorageMock = {
  getItem: (itemKey: string) => {
    switch (itemKey) {
      case HAS_DATE:
        return 'false';
      case HAS_TIMEZONE:
        return 'true';
      case HAS_COUNTRY:
        return 'true';
      default:
        return undefined;
    }
  },
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

const MockMatchMedia = (query: string) => {
  switch (query) {
    case '(prefers-color-scheme)':
      return {
        matches: true,
        media: query
      };
    case `(prefers-color-scheme: ${THEMES.dark})`:
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

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'matchMedia', { value: MockMatchMedia });

const settingsWrapper = (children: any) => {
  return (
    <SettingsContext.Provider
      value={{
        state: { isSettingsModalOpen: true },
        actions: { SettingsModalHandler: MockSettingsModalHandler }
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const mockThemeWrapper = (children: ReactNode) => {
  const store = {
    actions: {
      ThemeHandler: MockThemeHandler,
      AutoThemingHandler: MockAutoThemingHandler
    },
    state: { type: 'dark', autoTheming: false }
  };
  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
};

describe('test cases for settings modal', () => {
  it('render settings modal', () => {
    const { getByRole, getAllByRole, getAllByTestId } = render(
      settingsWrapper(<SettingsModal />)
    );

    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(7);

    const headings = getAllByRole('heading');
    expect(headings.length).toBe(3);

    const openEyeIcons = getAllByTestId('open-eye-icon');
    const closedEyeIcons = getAllByTestId('closed-eye-icon');
    expect(openEyeIcons.length).toBe(2);
    expect(closedEyeIcons.length).toBe(1);

    const cancelButton = getByRole('button', { name: /Cancel/i });
    const saveButton = getByRole('button', { name: /Save/i });
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
  it('close modal by clicking Cancel button', () => {
    const { getByRole } = render(settingsWrapper(<SettingsModal />));
    const cancelButton = getByRole('button', { name: /Save/i });
    userEvent.click(cancelButton);
    expect(MockSettingsModalHandler).toHaveBeenCalledTimes(1);
  });
  it('save changes and close modal by clicking Save button', () => {
    const { getByRole, getAllByTestId } = render(
      settingsWrapper(<SettingsModal />)
    );
    const eyeIcon = getAllByTestId('open-eye-icon')[0];
    userEvent.click(eyeIcon);

    const saveButton = getByRole('button', { name: /Save/i });
    userEvent.click(saveButton);

    expect(MockSettingsModalHandler).toHaveReturnedTimes(1);
    expect(MockSetItem).toHaveBeenCalledTimes(6);
    expect(MockSetItem).toHaveBeenCalledWith(HAS_DATE, false);
    expect(MockSetItem).toHaveBeenCalledWith(HAS_COUNTRY, true);
    expect(MockSetItem).toHaveBeenCalledWith(HAS_TIMEZONE, false);
  });
  it('switching icons', () => {
    const { getAllByTestId } = render(settingsWrapper(<SettingsModal />));
    const eyeIcon = getAllByTestId('open-eye-icon')[0];
    userEvent.click(eyeIcon);
    const closedEyeIcon = getAllByTestId('closed-eye-icon')[0];
    const eyeIcons = getAllByTestId('open-eye-icon');
    expect(closedEyeIcon).toBeInTheDocument();
    expect(eyeIcons.length).toBe(1);
  });
  it('switch auto theming', () => {
    const { getByRole } = render(
      mockThemeWrapper(settingsWrapper(<SettingsModal />))
    );
    const autoThemeSwitcher = getByRole('checkbox', { name: /Auto Theming/i });
    userEvent.click(autoThemeSwitcher);
    expect(MockAutoThemingHandler).toHaveBeenCalledTimes(1);
  });
  it('change theme by clicking theme button', () => {
    const { getByRole } = render(
      mockThemeWrapper(settingsWrapper(<SettingsModal />))
    );
    const themeButton = getByRole('button', { name: /dark/i });
    userEvent.click(themeButton);
    expect(MockThemeHandler).toHaveBeenCalledTimes(1);
  });
  it('save theme changes into localStorage', () => {
    const { getByRole } = render(
      settingsWrapper(
        <ThemeProvider>
          <SettingsModal />
        </ThemeProvider>
      )
    );
    const autoThemeSwitcher = getByRole('checkbox', { name: /Auto Theming/i });
    userEvent.click(autoThemeSwitcher);
    const themeButton = getByRole('button', { name: /dark/i });
    expect(themeButton).toBeInTheDocument();
    userEvent.click(themeButton);
    const saveButton = getByRole('button', { name: /save/i });
    userEvent.click(saveButton);
    expect(MockSetItem).toHaveBeenCalledWith(AUTO_THEMING, false);
    expect(MockSetItem).toHaveBeenLastCalledWith(THEME, THEMES.light);
  });
  it('reverting all by clicking Cancel button', () => {
    const { getByRole } = render(
      mockThemeWrapper(settingsWrapper(<SettingsModal />))
    );
    const cancelButton = getByRole('button', { name: /cancel/i });
    userEvent.click(cancelButton);
    expect(MockSetItem).toHaveBeenCalledTimes(0);
    expect(MockAutoThemingHandler).toHaveBeenCalledWith(false);
    expect(MockThemeHandler).toHaveBeenCalledWith('dark');
  });
});
