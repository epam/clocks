import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../dictionary';

import { DashboardName } from './DashboardName';

const MockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/',
    search:
      '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D&name=Q2xvY2tz',
    hash: ''
  }),
  useHistory: () => ({
    push: MockHistoryPush
  })
}));

const I18nWrapper = () => (
  <I18nextProvider i18n={i18n}>
    <DashboardName />
  </I18nextProvider>
);

describe('test case for DashboardName component', () => {
  it('render DashboardName component with name param in the url', () => {
    const { getByRole, getByText, getByTestId } = render(<I18nWrapper />);
    const dashboardNameButton = getByRole('button', { name: 'Clocks' });
    const editIcon = getByTestId(/edit-icon/i);
    const recycleBinIcon = getByTestId(/delete-icon/i);
    const dashboardNameText = getByText(/Clocks/i);
    expect(dashboardNameButton).toBeInTheDocument();
    expect(recycleBinIcon).toBeInTheDocument();
    expect(editIcon).toBeInTheDocument();
    expect(dashboardNameText).toBeInTheDocument();
  });
  it('edit existing dashboard name on submit', () => {
    const { getByRole, getByText } = render(<I18nWrapper />);
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
    const { getByRole, getByText, getByTestId } = render(<I18nWrapper />);
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
  it('delete dashboard name by clicking recycle-bin icon', () => {
    const urlWithoutNameParam =
      '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D';
    const { getByTestId } = render(<I18nWrapper />);
    const recycleBinIcon = getByTestId(/delete-icon/i);
    userEvent.click(recycleBinIcon);
    expect(MockHistoryPush).toHaveBeenCalledWith(urlWithoutNameParam);
  });
  it('open input and set dashboard name by clicking edit icon', () => {
    const { getByTestId, getByRole, getByText } = render(<I18nWrapper />);

    const editIcon = getByTestId(/edit-icon/i);
    userEvent.click(editIcon);

    const input = getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, 'New name');

    const form = getByTestId(/form/i);
    userEvent.click(form);

    const dashboardName = getByText('New name');
    expect(dashboardName).toBeInTheDocument();
  });
  it('open input and set dashboard name by clicking name button', () => {
    const { getByTestId, getByRole, getByText } = render(<I18nWrapper />);

    const editIcon = getByRole('button', { name: /Clocks/i });
    userEvent.click(editIcon);

    const input = getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, 'New name');

    const form = getByTestId(/form/i);
    userEvent.click(form);

    const dashboardName = getByText('New name');
    expect(dashboardName).toBeInTheDocument();
  });
});
