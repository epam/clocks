import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationsContext } from '../../context/locations';
import Navbar from './Navbar';

const MockResetUrl = jest.fn();
const MockCreateFormHandler = jest.fn();

const wrapper = children => (
    <LocationsContext.Provider
        value={{ actions: { ResetUrl: MockResetUrl, CreateFormHandler: MockCreateFormHandler } }}
    >
        {children}
    </LocationsContext.Provider>
);

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
        const { getByRole } = render(<Navbar />);
        const navbar = getByRole('banner');
        const logoButton = getByRole('button', { name: 'logo' });
        const logoImg = getByRole('img', { name: 'logo' });
        const addCityButton = getByRole('button', { name: 'Add City' });
        expect(navbar).toBeInTheDocument();
        expect(logoButton).toBeInTheDocument();
        expect(logoImg).toBeInTheDocument();
        expect(addCityButton).toBeInTheDocument();
    });
    it('reset url by clocking the logo', () => {
        const { getByRole } = render(wrapper(<Navbar />));
        const logoButton = getByRole('button', { name: 'logo' });
        userEvent.click(logoButton);
        expect(MockResetUrl).toHaveBeenCalledTimes(1);
    });
    it('open sidebar by clicking the Add City Button', () => {
        const { getByRole } = render(wrapper(<Navbar />));
        const addCityButton = getByRole('button', { name: 'Add City' });
        userEvent.click(addCityButton);
        expect(MockCreateFormHandler).toHaveBeenCalledTimes(1);
        expect(MockCreateFormHandler).toHaveBeenCalledWith(true);
    });
});
