import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationsContext } from '../../context/locations';
import { SettingsContext } from '../../context/settings';
import Navbar from './Navbar';

const MockResetUrl = jest.fn();
const MockCreateFormHandler = jest.fn();
const MockSettingsModalHandler = jest.fn();

const wrapper = (children: any) => (
  <LocationsContext.Provider
    value={{
      actions: {
        ResetUrl: MockResetUrl,
        CreateFormHandler: MockCreateFormHandler
      },
      state: {}
    }}
  >
    {children}
  </LocationsContext.Provider>
);

const settingsWrapper = (children: any) => (
  <SettingsContext.Provider
    value={{
      actions: { SettingsModalHandler: MockSettingsModalHandler },
      state: {}
    }}
  >
    {children}
  </SettingsContext.Provider>
);

jest.mock('../../hooks/useQueryParams', () => {
  const originalModule = jest.requireActual('../../hooks/useQueryParams');
  return {
    __esModule: true,
    ...originalModule,
    useQueryParams: () => ({
      SetParam: jest.fn(),
      GetParam: jest.fn(),
      DeleteParam: jest.fn()
    })
  };
});

describe('test Navbar component', () => {
  it('renders Navbar component', () => {
    const { getByRole, getByText, getByTestId } = render(<Navbar />);
    const navbar = getByRole('banner');
    const logoButton = getByRole('button', { name: 'logo' });
    const logoImg = getByRole('img', { name: 'logo' });
    const addCityButton = getByText('Add City');
    const settingsIcon = getByTestId(/settings-icon/i);
    expect(navbar).toBeInTheDocument();
    expect(logoButton).toBeInTheDocument();
    expect(logoImg).toBeInTheDocument();
    expect(addCityButton).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
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
  it('open settings modal', () => {
    const { getByTestId } = render(settingsWrapper(<Navbar />));
    const settingsIconButton = getByTestId(/settings-icon/i);
    userEvent.click(settingsIconButton);
    expect(MockSettingsModalHandler).toHaveBeenCalledTimes(1);
  });
});
