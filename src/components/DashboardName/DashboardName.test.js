import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardName } from './DashboardName';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        pathname: '/',
        search: '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D',
        hash: ''
    }),
    useHistory: () => ({
        push: jest.fn()
    })
}));

describe('test case for DashboardName component', () => {
    it('render DashboardName component without name param in the url', () => {
        const { getByRole } = render(<DashboardName />);
        const nameDashboardButton = getByRole('button', { name: /Name Dashboard/i });
        expect(nameDashboardButton).toBeInTheDocument();
    });
    it('open input by clicking "Name Dashboard" button', () => {
        const { getByRole } = render(<DashboardName />);
        const nameDashboardButton = getByRole('button', { name: /Name Dashboard/i });
        userEvent.click(nameDashboardButton);
        const input = getByRole('textbox');
        expect(input).toBeInTheDocument();
    });
});
