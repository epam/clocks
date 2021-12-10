import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardName } from './DashboardName';

const MockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/',
    search:
      '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D',
    hash: ''
  }),
  useHistory: () => ({
    push: MockHistoryPush
  })
}));

describe('test case for DashboardName component', () => {
  it('render DashboardName component without name param in the url', () => {
    const { getByRole } = render(<DashboardName />);
    const nameDashboardButton = getByRole('button', {
      name: /Dashboard Name/i
    });
    expect(nameDashboardButton).toBeInTheDocument();
  });
  it('add name param to the url', () => {
    const { getByRole, getByTestId } = render(<DashboardName />);
    const nameDashboardButton = getByRole('button', {
      name: /Dashboard Name/i
    });
    userEvent.click(nameDashboardButton);

    const input = getByRole('textbox');
    userEvent.type(input, 'Clocks');

    const form = getByTestId(/form/);
    userEvent.click(form);

    const urlWithNameParam =
      '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D&name=Q2xvY2tz';
    expect(MockHistoryPush).toHaveBeenCalledWith(urlWithNameParam);
  });
});
