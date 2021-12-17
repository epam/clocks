import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocationsContext } from '../../context/locations';
import InputDrawer from './AddCity';

const MockComponent = ({ open, close, AddLocationMock }: any) => {
  const GetLocationsFromUrl = () => [
    'Tashkent_UZ_41_69',
    'Seoul_KR_37_126',
    'Tokyo_JP_35_139'
  ];
  const store = {
    actions: { AddLocationMock, GetLocationsFromUrl },
    state: {}
  };
  return (
    <LocationsContext.Provider value={store}>
      <InputDrawer visibility={open} setVisibility={close} />
    </LocationsContext.Provider>
  );
};

describe('InputDrawer component', () => {
  const add = jest.fn();
  const close = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders properly', () => {
    render(<MockComponent open close={close} AddLocationMock={add} />);
    expect(screen.getByLabelText('Close Drawer Button')).toBeInTheDocument();
    expect(screen.getByTestId(/search-input/i)).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
  it('closes on button click', () => {
    render(<MockComponent open close={close} AddLocationMock={add} />);
    userEvent.click(screen.getByLabelText('Close Drawer Button'));
    expect(close).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenLastCalledWith(false);
  });
  it('input correctly works', () => {
    render(<MockComponent open close={close} AddLocationMock={add} />);
    const input = screen.getByTestId(/search-input/i);
    userEvent.type(input, 'Tokyo');
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Added')).toBeInTheDocument();
  });
});
