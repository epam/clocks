import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardName } from './DashboardName';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/',
    search:
      '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D&name=Q2xvY2tz',
    hash: ''
  }),
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe('test case for DashboardName component', () => {
  it('render DashboardName component with name param in the url', () => {
    const { getByRole, getByText } = render(<DashboardName />);
    const dashboardNameButton = getByRole('button', { name: 'Clocks' });
    const recycleBinIcon = getByRole('button', { name: 'recycle-bin' });
    const dashboardNameText = getByText(/Clocks/i);
    expect(dashboardNameButton).toBeInTheDocument();
    expect(recycleBinIcon).toBeInTheDocument();
    expect(dashboardNameText).toBeInTheDocument();
  });
  it('edit existing dashboard name on submit', () => {
    const { getByRole, getByText } = render(<DashboardName />);
    const nameButton = getByRole('button', { name: 'Clocks' });
    userEvent.dblClick(nameButton);
    const input = getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, 'New Name');
    userEvent.keyboard('{Enter}');
    const newDashboardName = getByText(/New Name/i);
    expect(newDashboardName).toBeInTheDocument();
  });
  it('edit dashboard name on blur', () => {
    const { getByRole, getByText, getByTestId } = render(<DashboardName />);
    const nameButton = getByRole('button', { name: 'Clocks' });
    userEvent.dblClick(nameButton);
    const input = getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, 'New Name');
    const form = getByTestId('form');
    userEvent.click(form);
    const newDashboardName = getByText(/New Name/i);
    expect(newDashboardName).toBeInTheDocument();
  });
  it.todo('delete dashboard name by clicking recycle-bin icon');
  it.todo('open input and set dashboard name');
  it.todo('render DashboardName component without name param in the url');
});
