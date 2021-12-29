import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { LocationsContext } from '../../context/locations';
import Navbar from './Navbar';
import i18n from '../../dictionary';

const MockResetUrl = jest.fn();
const MockCreateFormHandler = jest.fn();

const wrapper = (children: any) => (
  <I18nextProvider i18n={i18n}>
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
  </I18nextProvider>
);

const settingsWrapper = (children: any) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
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
    const { getByRole, getByText, getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <Navbar />
      </I18nextProvider>
    );
    const navbar = getByRole('banner');
    const logoButton = getByRole('button', { name: 'logo' });
    const logoImg = getByRole('img', { name: 'logo' });
    const addCityButton = getByText('ADD CITY');
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
    const addCityButton = getByText('ADD CITY');
    userEvent.click(addCityButton);
    expect(MockCreateFormHandler).toHaveBeenCalledTimes(1);
    expect(MockCreateFormHandler).toHaveBeenCalledWith(true);
  });
});
