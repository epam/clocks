import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationsContext } from '../../context/locations';
import { ThemeContext, useTheme } from '../../context/theme';
import Navbar from './Navbar';

const MockResetUrl = jest.fn();
const MockCreateFormHandler = jest.fn();
const MockThemeHandler = jest.fn();

const wrapper = children => (
    <LocationsContext.Provider
        value={{ actions: { ResetUrl: MockResetUrl, CreateFormHandler: MockCreateFormHandler } }}
    >
        {children}
    </LocationsContext.Provider>
);

const mockThemeWrapper = children => (
    <ThemeContext.Provider value={{ state: { type: 'light' }, actions: { ThemeHandler: MockThemeHandler } }}>
        {children}
    </ThemeContext.Provider>
);

const ThemeWrapper = () => {
    const store = useTheme();
    return (
        <ThemeContext.Provider value={store}>
            <Navbar />
        </ThemeContext.Provider>
    );
};

jest.mock('../../hooks/useQueryParams', () => {
    const originalModule = jest.requireActual('../../hooks/useQueryParams');
    return {
        __esModule: true,
        ...originalModule,
        useQueryParams: () => ({ SetParam: jest.fn(), GetParam: jest.fn(), DeleteParam: jest.fn() })
    };
});

describe('test Navbar component', () => {
    it('renders Navbar component', () => {
        const { getByRole, getByText, getByTestId } = render(<Navbar />);
        const navbar = getByRole('banner');
        const logoButton = getByRole('button', { name: 'logo' });
        const logoImg = getByRole('img', { name: 'logo' });
        const addCityButton = getByText('Add City');
        const themeIcon = getByTestId(/DarkModeIcon/i);
        expect(navbar).toBeInTheDocument();
        expect(logoButton).toBeInTheDocument();
        expect(logoImg).toBeInTheDocument();
        expect(addCityButton).toBeInTheDocument();
        expect(themeIcon).toBeInTheDocument();
    });
    it('reset url by clocking the logo', () => {
        const { getByRole } = render(wrapper(<Navbar />));
        const logoButton = getByRole('button', { name: 'logo' });
        userEvent.click(logoButton);
        expect(MockResetUrl).toHaveBeenCalledTimes(1);
    });
    it('open sidebar by clicking the Add City Button', () => {
        const { getByText } = render(wrapper(<Navbar />));
        const addCityButton = getByText('Add City');
        userEvent.click(addCityButton);
        expect(MockCreateFormHandler).toHaveBeenCalledTimes(1);
        expect(MockCreateFormHandler).toHaveBeenCalledWith(true);
    });
    it('changes theme by clicking theme icon button', () => {
        const { getByTestId } = render(mockThemeWrapper(<Navbar />));
        const themeIcon = getByTestId(/LightModeIcon/i);
        userEvent.click(themeIcon);
        expect(MockThemeHandler).toHaveBeenCalledTimes(1);
    });
    it('changes theme icon', () => {
        const { getByTestId } = render(<ThemeWrapper />);
        const lightThemeIcon = getByTestId(/LightModeIcon/i);
        userEvent.click(lightThemeIcon);
        const darkThemeIcon = getByTestId(/DarkModeIcon/i);
        expect(darkThemeIcon).toBeInTheDocument();
    });
});
