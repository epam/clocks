import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';

import AddCity from './AddCity';
import i18n from '../../../../dictionary';

const MockAddLocation = jest.fn();
const MockVisibilityHandler = jest.fn();

jest.mock('../../../../hooks/useUrl', () => ({
  useUrl: () => ({
    GetLocationsFromUrl: () => [
      'Tashkent_UZ_41_69',
      'Seoul_KR_37_126',
      'Tokyo_JP_35_139'
    ],
    AddLocation: MockAddLocation
  })
}));

const MockComponent = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AddCity visibility visibilityHandler={MockVisibilityHandler} />
    </I18nextProvider>
  );
};

describe('AddCity component', () => {
  it('renders properly', () => {
    render(<MockComponent />);
    expect(screen.getByLabelText('Close Drawer Button')).toBeInTheDocument();
    expect(screen.getByTestId(/search-input/i)).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
  it('closes on button click', () => {
    render(<MockComponent />);
    userEvent.click(screen.getByLabelText('Close Drawer Button'));
    expect(MockVisibilityHandler).toHaveBeenCalledTimes(1);
  });
  it('input correctly works', () => {
    render(<MockComponent />);
    const input = screen.getByTestId(/search-input/i);
    userEvent.type(input, 'Tokyo');
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Added')).toBeInTheDocument();
  });
});
