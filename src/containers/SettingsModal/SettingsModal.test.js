import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsModal from './SettingsModal';
import { CLOCKS_FONT, CLOCKS_FONTS, HAS_COUNTRY, HAS_DATE, HAS_TIMEZONE } from '../../constants';
import { SettingsContext } from '../../context/settings';

const MockSettingsModalHandler = jest.fn();
const MockSetItem = jest.fn();

jest.mock('../../hooks/useLocalStorage', () => ({
    useLocalStorage: () => ({
        setItem: MockSetItem
    })
}));

const localStorageMock = {
    getItem: itemKey => {
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

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const settingsWrapper = children => {
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
describe('test cases for settings modal', () => {
    it('render settings modal', () => {
        const { getByRole, getAllByRole, getAllByTestId } = render(settingsWrapper(<SettingsModal />));

        const buttons = getAllByRole('button');
        expect(buttons.length).toBe(5);

        const headings = getAllByRole('heading');
        expect(headings.length).toBe(4);

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
        const { getByRole, getAllByTestId } = render(settingsWrapper(<SettingsModal />));
        const eyeIcon = getAllByTestId('open-eye-icon')[0];
        userEvent.click(eyeIcon);
        const saveButton = getByRole('button', { name: /Save/i });
        userEvent.click(saveButton);

        expect(MockSettingsModalHandler).toHaveReturnedTimes(1);
        expect(MockSetItem).toHaveBeenCalledTimes(4);
        expect(MockSetItem).toHaveBeenCalledWith(HAS_DATE, false);
        expect(MockSetItem).toHaveBeenCalledWith(HAS_COUNTRY, false);
        expect(MockSetItem).toHaveBeenCalledWith(HAS_TIMEZONE, true);
        expect(MockSetItem).toHaveBeenCalledWith(CLOCKS_FONT, CLOCKS_FONTS.ROBOTO.value);
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
    it('change font by selecting new font', () => {
        const { getByRole } = render(settingsWrapper(<SettingsModal />));
        const select = getByRole('combobox', { name: /Select a font/ });
        const saveButton = getByRole('button', { name: /Save/i });

        userEvent.selectOptions(select, CLOCKS_FONTS.OPEN_SANS.value);
        userEvent.click(saveButton);

        expect(MockSetItem).toHaveBeenCalledWith(CLOCKS_FONT, CLOCKS_FONTS.OPEN_SANS.value);
    });
});
