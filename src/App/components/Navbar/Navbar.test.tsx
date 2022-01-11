import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import Navbar from './Navbar';
import i18n from '../../dictionary';

const MockAddCitySidebarHandler = jest.fn();
const MockResetUrl = jest.fn();
const MockSetTheme = jest.fn();

// const wrapper = () => (
//   <I18nextProvider i18n={i18n}>
//     <Navbar
//       type="light"
//       autoTheming={false}
//       setTheme={MockSetTheme}
//       locations={[]}
//       addCitySidebarHandler={MockAddCitySidebarHandler}
//     />
//   </I18nextProvider>
// );

jest.mock('../../hooks/useQueryParams', () => ({
  useQueryParams: () => ({
    SetParam: jest.fn(),
    GetParam: jest.fn(),
    DeleteParam: jest.fn()
  })
}));

jest.mock('../../hooks/useUrl', () => ({
  useUrl: () => ({
    ResetUrl: MockResetUrl
  })
}));

describe('test Navbar component', () => {
  test('mock test', () => {});
  // it('renders Navbar component', () => {
  //   const { getByRole, getByText, getByTestId } = render(wrapper());
  //   const navbar = getByRole('banner');
  //   const logoButton = getByRole('button', { name: 'logo' });
  //   const logoImg = getByRole('img', { name: 'logo' });
  //   const addCityButton = getByText('ADD CITY');
  //   const settingsIcon = getByTestId(/settings-icon/i);
  //   expect(navbar).toBeInTheDocument();
  //   expect(logoButton).toBeInTheDocument();
  //   expect(logoImg).toBeInTheDocument();
  //   expect(addCityButton).toBeInTheDocument();
  //   expect(settingsIcon).toBeInTheDocument();
  // });
  // it('reset url by clocking the logo', () => {
  //   const { getByRole } = render(
  //     wrapper(
  //       <Navbar
  //         locations={[]}
  //         addCitySidebarHandler={MockAddCitySidebarHandler}
  //       />
  //     )
  //   );
  //   const logoButton = getByRole('button', { name: 'logo' });
  //   userEvent.click(logoButton);
  //   expect(MockResetUrl).toHaveBeenCalledTimes(1);
  // });
  // it('open sidebar by clicking the Add City Button', () => {
  //   const { getByText } = render(
  //     wrapper(
  //       <Navbar
  //         locations={[]}
  //         addCitySidebarHandler={MockAddCitySidebarHandler}
  //       />
  //     )
  //   );
  //   const addCityButton = getByText('ADD CITY');
  //   userEvent.click(addCityButton);
  //   expect(MockAddCitySidebarHandler).toHaveBeenCalledTimes(1);
  // });
});
