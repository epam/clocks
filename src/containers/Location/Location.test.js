import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationsContext } from '../../context/locations';
import { ModalContext } from '../../context/modal';
import Location from './Location';

const mockLocation = {
    timezone: 'Asia/Tashkent',
    city: 'Tashkent',
    country: 'Uzbekistan',
    offset: { hours: 0, minutes: 0 },
    host: false,
    id: 'Tashkent_UZ_41_69',
    message: ''
};

const MockChangeUserCurrentLocation = jest.fn();
const MockAddComment = jest.fn();
const MockOpenDeleteModal = jest.fn();

const locationsWithSnackbarWrapper = children => (
    <LocationsContext.Provider
        value={{
            actions: { AddComment: MockAddComment, ChangeUserCurrentLocation: MockChangeUserCurrentLocation }
        }}
    >
        {children}
    </LocationsContext.Provider>
);

const deleteModalWrapper = children => (
    <ModalContext.Provider value={{ actions: { OpenDeleteModal: MockOpenDeleteModal } }}>
        {children}
    </ModalContext.Provider>
);

describe('test Location component', () => {
    it('renders Location component', () => {
        const { getAllByRole, getByTestId, getByRole } = render(<Location {...mockLocation} />);
        const headings = getAllByRole('heading');
        const recycleBinButton = getByRole('button', { name: 'recycle-bin' });
        const commentButton = getByTestId('commentButton');
        const recycleBinIcon = getByRole('img', { name: 'recycle-bin' });
        const city = getByRole('heading', { name: 'Tashkent' });
        const country = getByRole('heading', { name: 'Uzbekistan' });
        expect(headings.length).toBe(5);
        expect(recycleBinButton).toBeInTheDocument();
        expect(recycleBinIcon).toBeInTheDocument();
        expect(city).toBeInTheDocument();
        expect(country).toBeInTheDocument();
        expect(commentButton).toBeInTheDocument();
    });
    it('renders textarea for adding comment', () => {
        const { getByTestId, getByRole } = render(<Location {...mockLocation} />);
        const commentButton = getByTestId('commentButton');
        userEvent.click(commentButton);
        const textarea = getByRole('textbox');
        expect(textarea).toBeInTheDocument();
    });
    it('renders Location component with comment message', () => {
        const commentMessageText = 'This is test comment';
        mockLocation.message = commentMessageText;
        const { getByText } = render(<Location {...mockLocation} />);
        const commentMessage = getByText(commentMessageText);
        expect(commentMessage).toBeInTheDocument();
    });
    it('set current user location id by clicking recycle bin icon', () => {
        const { getByRole } = render(locationsWithSnackbarWrapper(<Location {...mockLocation} />));
        const recycleBinButton = getByRole('button', { name: 'home' });
        userEvent.click(recycleBinButton);
        expect(MockChangeUserCurrentLocation).toHaveBeenCalledWith('Tashkent_UZ_41_69');
    });
    it('open delete modal by clicking delete icon button', () => {
        const { getByRole } = render(deleteModalWrapper(<Location {...mockLocation} />));
        const deleteButton = getByRole('button', { name: 'recycle-bin' });
        userEvent.click(deleteButton);
        expect(MockOpenDeleteModal).toHaveBeenCalledWith('Tashkent_UZ_41_69');
    });
    it('not render home icon if location is host', () => {
        mockLocation.host = true;
        const { queryByRole } = render(locationsWithSnackbarWrapper(<Location {...mockLocation} />));
        const homeButton = queryByRole('button', { name: 'home' });
        expect(homeButton).toBe(null);
    });
    it('render "You are here label" if location is host', () => {
        mockLocation.host = true;
        const { getByRole } = render(<Location {...mockLocation} />);
        const youAreHereLabel = getByRole('heading', { name: 'You are here' });
        expect(youAreHereLabel).toBeInTheDocument();
    });
    it('opens textarea for adding comment by clicking comment message', () => {
        const commentMessageText = 'This is test comment message';
        mockLocation.message = commentMessageText;
        const { getByText, queryByRole } = render(<Location {...mockLocation} />);
        const commentMessage = getByText(commentMessageText);
        const textarea = queryByRole('textbox');
        expect(textarea).toBe(null);
        userEvent.click(commentMessage);
        const textareaAfterClick = queryByRole('textbox');
        expect(textareaAfterClick).toBeInTheDocument();
        expect(textareaAfterClick).toHaveAttribute('maxLength', '100');
    });
    it('add comment by blurring from the textarea', () => {
        const commentMessageText = 'This is test comment message';
        mockLocation.message = commentMessageText;
        const { getByText, getByRole } = render(locationsWithSnackbarWrapper(<Location {...mockLocation} />));
        const commentMessage = getByText(commentMessageText);
        userEvent.click(commentMessage);
        const textarea = getByRole('textbox');
        const heading = getByRole('heading', { name: 'Tashkent' });
        userEvent.clear(textarea);
        const newComment = 'New comment';
        userEvent.type(textarea, newComment);
        userEvent.click(heading);
        expect(MockAddComment).toHaveBeenCalledWith(mockLocation.id, newComment);
    });
});
